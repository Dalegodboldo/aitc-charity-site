"use client";

/**
 * Shared chat state for the entire site. The floating ChatBubble
 * and the dedicated /chat page both subscribe to the same provider
 * so a conversation started in the bubble keeps going on /chat and
 * vice versa.
 *
 * Persistence: messages are mirrored to sessionStorage so the
 * conversation survives client-side navigation between routes
 * (Next.js keeps the layout mounted during App Router navigations
 * so React state would survive anyway, but sessionStorage also
 * covers hard refreshes within the same tab session). We don't use
 * localStorage on purpose — the chat resets when the visitor
 * closes the tab, which feels appropriate for a foundation site.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ChatMessage } from "@/lib/chat/types";

const STORAGE_KEY = "aitc:chat:messages:v1";

/** Generate a short stable ID for a new message. crypto.randomUUID
 *  is available in all modern browsers + Node 19+, so this is safe
 *  in both SSR and client paths. */
function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

type ChatContextValue = {
  messages: ChatMessage[];
  /** True while a request is in flight (from "send" to the final
   *  byte arriving). The UI shows a typing indicator while true. */
  isStreaming: boolean;
  /** Send a new user message and start streaming the reply. */
  sendMessage: (text: string) => Promise<void>;
  /** Wipe the conversation and start over. */
  clearMessages: () => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  // Track in-flight requests so we can abort if a new send fires
  // while the previous one is still streaming. (Edge case but real.)
  const abortRef = useRef<AbortController | null>(null);

  // Hydrate from sessionStorage on mount.
  //
  // The `react-hooks/set-state-in-effect` rule flags the synchronous
  // setMessages below, but this is the canonical SSR-safe hydration
  // pattern: we can't read sessionStorage during render (no DOM on
  // the server) and we can't read it in useState's initializer for
  // the same reason. A one-time read on mount, deferred via the
  // microtask queue, is the cheapest correct option here.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as ChatMessage[];
      if (Array.isArray(parsed)) {
        queueMicrotask(() => setMessages(parsed));
      }
    } catch {
      // Corrupt storage — wipe it and start clean.
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Persist on change.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Quota / private mode — silently degrade.
    }
  }, [messages]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isStreaming) return;

      // Cancel any in-flight request before starting a new one.
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      const userMessage: ChatMessage = {
        id: newId(),
        role: "user",
        content: trimmed,
        createdAt: new Date().toISOString(),
      };
      const assistantMessage: ChatMessage = {
        id: newId(),
        role: "assistant",
        content: "",
        createdAt: new Date().toISOString(),
      };

      // Capture the conversation history at the time of send so the
      // request body matches what the user sees on screen.
      const historyForRequest = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      // Show both messages immediately; the assistant one will fill
      // in as bytes arrive.
      setMessages((prev) => [...prev, userMessage, assistantMessage]);
      setIsStreaming(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: historyForRequest }),
          signal: controller.signal,
        });

        if (!response.ok || !response.body) {
          const errMsg = await response
            .json()
            .then((b) => (b as { error?: string }).error)
            .catch(() => null);
          throw new Error(errMsg ?? `Request failed (${response.status})`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
          // Update the placeholder assistant message in place.
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessage.id ? { ...m, content: accumulated } : m,
            ),
          );
        }
        // Flush any tail bytes the decoder is holding.
        accumulated += decoder.decode();
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessage.id ? { ...m, content: accumulated } : m,
          ),
        );
      } catch (err) {
        // Aborted by a follow-up send — leave the partial reply
        // in place and silently exit.
        if (err instanceof DOMException && err.name === "AbortError") return;

        const fallback =
          err instanceof Error
            ? err.message
            : "Sorry, something went wrong. Please try again.";
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessage.id
              ? { ...m, content: m.content || fallback }
              : m,
          ),
        );
      } finally {
        if (abortRef.current === controller) {
          abortRef.current = null;
          setIsStreaming(false);
        }
      }
    },
    [isStreaming, messages],
  );

  const clearMessages = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsStreaming(false);
    setMessages([]);
  }, []);

  return (
    <ChatContext.Provider
      value={{ messages, isStreaming, sendMessage, clearMessages }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat(): ChatContextValue {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    throw new Error("useChat must be used inside <ChatProvider>");
  }
  return ctx;
}

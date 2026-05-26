"use client";

/**
 * Shared chat UI — message list + composer + typing indicator.
 *
 * Used inside both the floating ChatBubble panel and the dedicated
 * /chat page. State comes from the surrounding ChatProvider, so
 * the two surfaces share one conversation.
 */

import { useEffect, useRef } from "react";
import { Send, Sparkles, Trash2 } from "lucide-react";
import { useChat } from "@/components/chat/chat-context";

type Props = {
  /** Layout variant — bubble is compact; page is a wider hero. */
  variant?: "bubble" | "page";
};

const SUGGESTED_PROMPTS = [
  "What does Always In The Club Foundation do?",
  "How can I volunteer?",
  "Tell me about the book.",
  "How do I donate?",
];

export function ChatInterface({ variant = "bubble" }: Props) {
  const { messages, isStreaming, sendMessage, clearMessages } = useChat();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom whenever a message lands or streams.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Use requestAnimationFrame so the scroll happens after layout.
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
  }, [messages]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = inputRef.current?.value ?? "";
    if (!text.trim() || isStreaming) return;
    if (inputRef.current) inputRef.current.value = "";
    await sendMessage(text);
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Cmd/Ctrl+Enter or plain Enter (without Shift) submits.
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  }

  const isEmpty = messages.length === 0;

  return (
    <div
      className={
        variant === "page"
          ? "flex h-full min-h-[600px] flex-col"
          : "flex h-full flex-col"
      }
    >
      {/* Message list */}
      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-label="Chat conversation"
        className="flex-1 overflow-y-auto px-4 py-5 sm:px-6"
      >
        {isEmpty ? (
          <EmptyState onPick={(p) => sendMessage(p)} variant={variant} />
        ) : (
          <ul className="space-y-4">
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} isStreaming={isStreaming} />
            ))}
            {isStreaming &&
              messages[messages.length - 1]?.role === "user" && (
                <li>
                  <TypingIndicator />
                </li>
              )}
          </ul>
        )}
      </div>

      {/* Composer */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-border bg-warm-white px-4 py-3 sm:px-6 sm:py-4"
      >
        <div className="flex items-end gap-2">
          <label htmlFor="chat-input" className="sr-only">
            Type a message to the assistant
          </label>
          <textarea
            ref={inputRef}
            id="chat-input"
            rows={1}
            placeholder="Ask anything…"
            onKeyDown={handleKeyDown}
            disabled={isStreaming}
            className="min-h-11 max-h-40 flex-1 resize-none rounded-2xl border border-border bg-cream px-4 py-2.5 text-[15px] leading-snug text-ink placeholder:text-warm-gray focus:border-red focus:outline-none focus:ring-2 focus:ring-red/20 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isStreaming}
            aria-label="Send message"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red text-cream transition-colors hover:bg-red-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red disabled:opacity-60"
          >
            <Send className="h-4 w-4" aria-hidden />
          </button>
        </div>
        {messages.length > 0 && (
          <div className="mt-2 flex items-center justify-between text-[11px] text-warm-gray">
            <span>Press Enter to send · Shift+Enter for a new line</span>
            <button
              type="button"
              onClick={clearMessages}
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-warm-gray transition-colors hover:text-red"
            >
              <Trash2 className="h-3 w-3" aria-hidden />
              Clear
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

function MessageBubble({
  message,
  isStreaming,
}: {
  message: { role: "user" | "assistant"; content: string };
  isStreaming: boolean;
}) {
  const isUser = message.role === "user";
  const showCursor = !isUser && isStreaming && message.content.length > 0;
  return (
    <li
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={
          isUser
            ? "max-w-[85%] rounded-2xl rounded-br-md bg-red px-4 py-2.5 text-[15px] leading-relaxed text-cream"
            : "max-w-[85%] rounded-2xl rounded-bl-md bg-cream px-4 py-2.5 text-[15px] leading-relaxed text-ink ring-1 ring-border"
        }
      >
        <span className="whitespace-pre-wrap break-words">{message.content}</span>
        {showCursor && (
          <span
            aria-hidden
            className="ml-0.5 inline-block h-4 w-[2px] -translate-y-px animate-pulse bg-warm-gray align-middle"
          />
        )}
      </div>
    </li>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start" aria-label="Assistant is typing">
      <div className="rounded-2xl rounded-bl-md bg-cream px-4 py-3 ring-1 ring-border">
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-warm-gray [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-warm-gray [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-warm-gray" />
        </span>
      </div>
    </div>
  );
}

function EmptyState({
  onPick,
  variant,
}: {
  onPick: (prompt: string) => void;
  variant: "bubble" | "page";
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 px-2 py-8 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold">
        <Sparkles className="h-5 w-5" aria-hidden />
      </div>
      <div className="space-y-2">
        <p
          className={
            variant === "page"
              ? "font-display text-2xl text-ink"
              : "font-display text-xl text-ink"
          }
        >
          How can I help?
        </p>
        <p className="max-w-xs text-[14px] leading-relaxed text-warm-gray">
          Ask about the Foundation, programs, the book, or how to get involved.
        </p>
      </div>
      <ul className="flex w-full max-w-md flex-col gap-2 pt-2">
        {SUGGESTED_PROMPTS.map((prompt) => (
          <li key={prompt}>
            <button
              type="button"
              onClick={() => onPick(prompt)}
              className="w-full rounded-xl border border-border bg-cream px-4 py-2.5 text-left text-[14px] text-ink transition-colors hover:border-red hover:text-red focus-visible:border-red focus-visible:outline-none"
            >
              {prompt}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

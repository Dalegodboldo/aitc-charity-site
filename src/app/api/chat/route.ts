/**
 * POST /api/chat — site chatbot backend.
 *
 * Accepts a JSON body with the conversation so far, calls Claude
 * (claude-haiku-4-5-20251001) with the foundation's system prompt,
 * and streams the response back to the client as plain text token
 * deltas. The browser reads it via fetch + ReadableStream.
 *
 * The Anthropic API key is held server-side via ANTHROPIC_API_KEY
 * (set in Vercel project env). It is never exposed in the client
 * bundle — this route is the only place that sees it.
 */

import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "@/lib/chat/system-prompt";
import type { ChatRequest } from "@/lib/chat/types";

// Force the Node runtime — the Anthropic SDK relies on Node APIs.
export const runtime = "nodejs";
// No caching: every chat turn is unique.
export const dynamic = "force-dynamic";

const MODEL = "claude-haiku-4-5-20251001";
const MAX_TOKENS = 1024;
const MAX_MESSAGES = 30; // recent-N window — keeps the request bounded
const MAX_CHARS_PER_MESSAGE = 8000;

const client = new Anthropic();

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({ error: "ANTHROPIC_API_KEY is not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  let body: ChatRequest;
  try {
    body = (await req.json()) as ChatRequest;
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  if (!body.messages || !Array.isArray(body.messages)) {
    return new Response(
      JSON.stringify({ error: "messages array required" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  // Sanity-filter the incoming messages: drop anything that isn't a
  // properly-shaped user/assistant text turn, keep only the most
  // recent N, and cap each one's length.
  const cleaned = body.messages
    .filter(
      (m): m is { role: "user" | "assistant"; content: string } =>
        m != null &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0,
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, MAX_CHARS_PER_MESSAGE),
    }));

  if (cleaned.length === 0 || cleaned[0].role !== "user") {
    return new Response(
      JSON.stringify({ error: "first message must be from a user" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  // Stream Claude's response back as a plain text stream of token
  // deltas. The browser reads chunks via fetch's ReadableStream.
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const claudeStream = client.messages.stream({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          // System prompt is marked cacheable. Today the prompt is
          // smaller than Haiku 4.5's ~4096-token cache minimum so the
          // marker is a no-op, but as the foundation context grows it
          // will start to cache automatically — saving ~90% on the
          // input cost for the system prompt.
          system: [
            {
              type: "text",
              text: SYSTEM_PROMPT,
              cache_control: { type: "ephemeral" },
            },
          ],
          messages: cleaned,
        });

        for await (const event of claudeStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        // Surface a short error string to the user. The full error
        // is server-side only.
        console.error("[/api/chat] stream error:", err);
        const message =
          err instanceof Anthropic.APIError
            ? `Sorry, the assistant ran into an error (${err.status ?? "API"}). Please try again.`
            : "Sorry, the assistant ran into an error. Please try again.";
        try {
          controller.enqueue(encoder.encode(`\n\n${message}`));
        } catch {
          // Stream may already be closed if abort happened mid-flight
        }
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      // Hint to Vercel/Nginx that this stream should not be buffered
      "X-Accel-Buffering": "no",
    },
  });
}

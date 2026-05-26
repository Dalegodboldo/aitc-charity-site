/**
 * Shared types for the site chatbot.
 *
 * `ChatMessage` is the wire format used by both the client and the
 * /api/chat route. It maps 1:1 to Anthropic's MessageParam shape so
 * the server can hand it straight to the SDK without translation.
 */

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  /** Stable per-message ID — used as the React key. */
  id: string;
  role: ChatRole;
  /** Plain text content. We don't model multi-modal blocks here
   *  because the bot is text-only. */
  content: string;
  /** ISO timestamp the message was added on the client. Used to
   *  drive the "X minutes ago" display, not sent to the model. */
  createdAt: string;
};

/** Request body for POST /api/chat. */
export type ChatRequest = {
  messages: Array<Pick<ChatMessage, "role" | "content">>;
};

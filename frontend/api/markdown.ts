import type { VercelRequest, VercelResponse } from "@vercel/node";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: true,
  xhtmlOut: false,
  breaks: true,
  langPrefix: "language-",
  linkify: true,
  typographer: true,
  quotes: ['""', "''"],
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const { text } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Missing or invalid text" });
    }
    if (text.trim().length === 0) {
      return res.status(400).json({ error: "Text cannot be empty" });
    }
    const html = md.render(text);
    res.json({ html });
  } catch (error) {
    res.status(500).json({
      error: "Markdown parsing failed",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

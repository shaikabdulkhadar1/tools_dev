import { Router, Request, Response } from "express";
import MarkdownIt from "markdown-it";

const router = Router();

// Initialize markdown-it with options
const md = new MarkdownIt({
  html: true, // Enable HTML tags in source
  xhtmlOut: false, // Use '/' to close single tags (<br />)
  breaks: true, // Convert '\n' in paragraphs into <br>
  langPrefix: "language-", // CSS language prefix for fenced blocks
  linkify: true, // Autoconvert URL-like text to links
  typographer: true, // Enable some language-neutral replacement + quotes beautification
  quotes: ['""', "''"], // Double + single quotes replacement pairs
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Missing or invalid text" });
    }

    if (text.trim().length === 0) {
      return res.status(400).json({ error: "Text cannot be empty" });
    }

    // Parse markdown to HTML
    const html = md.render(text);

    res.json({ html });
  } catch (error) {
    console.error("Markdown parsing error:", error);
    res.status(500).json({
      error: "Markdown parsing failed",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;

import { Router, Request, Response } from "express";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Missing text" });
  try {
    const { marked } = await import("marked");
    const html = marked.parse(text);
    res.json({ html });
  } catch {
    res.status(500).json({ error: "Markdown parsing failed" });
  }
});

export default router;

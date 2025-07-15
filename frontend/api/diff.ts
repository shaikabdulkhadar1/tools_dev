import type { VercelRequest, VercelResponse } from "@vercel/node";
import { diffLines, diffWords, diffChars } from "diff";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { a, b, mode } = req.body;
  if (typeof a !== "string" || typeof b !== "string") {
    return res.status(400).json({ error: "Missing or invalid input" });
  }
  let diffResult;
  try {
    if (mode === "words") {
      diffResult = diffWords(a, b);
    } else if (mode === "chars") {
      diffResult = diffChars(a, b);
    } else {
      diffResult = diffLines(a, b);
    }
    res.json({ diff: diffResult });
  } catch (err) {
    res.status(500).json({ error: "Diff failed" });
  }
}

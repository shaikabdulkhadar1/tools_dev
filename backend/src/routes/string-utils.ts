import { Router, Request, Response } from "express";

const router = Router();

type StringUtilsResult = string | number | { chars: number; words: number };

router.post("/", (req: Request, res: Response) => {
  const { text, action } = req.body;
  if (!text || !action)
    return res.status(400).json({ error: "Missing text or action" });
  let result: StringUtilsResult = "";
  switch (action) {
    case "count":
      result = { chars: text.length, words: text.trim().split(/\s+/).length };
      break;
    case "trim":
      result = text.trim();
      break;
    case "reverse":
      result = text.split("").reverse().join("");
      break;
    case "remove-duplicates":
      result = Array.from(new Set(text.split(/\s+/))).join(" ");
      break;
    default:
      return res.status(400).json({ error: "Invalid action" });
  }
  res.json({ result });
});

export default router;

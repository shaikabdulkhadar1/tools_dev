import { Router, Request, Response } from "express";
import { diffLines } from "diff";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  const { text1, text2 } = req.body;
  if (typeof text1 !== "string" || typeof text2 !== "string") {
    return res.status(400).json({ error: "Missing or invalid text1/text2" });
  }
  const diff = diffLines(text1, text2);
  res.json({ diff });
});

export default router;

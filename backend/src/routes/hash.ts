import { Router, Request, Response } from "express";
import crypto from "crypto";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  const { text, algorithm } = req.body;
  if (!text || !algorithm) {
    return res.status(400).json({ error: "Missing text or algorithm" });
  }
  if (!["md5", "sha1", "sha256", "sha512"].includes(algorithm)) {
    return res.status(400).json({ error: "Invalid algorithm" });
  }
  try {
    const hash = crypto.createHash(algorithm).update(text).digest("hex");
    res.json({ hash });
  } catch (err) {
    res.status(500).json({ error: "Hashing failed" });
  }
});

export default router;

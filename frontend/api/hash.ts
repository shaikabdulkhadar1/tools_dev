import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
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
}

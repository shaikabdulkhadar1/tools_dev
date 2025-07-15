import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { type, length = 12, min = 0, max = 100 } = req.query;
  if (!type) return res.status(400).json({ error: "Missing type" });

  if (type === "string" || type === "password") {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let result = "";
    for (let i = 0; i < Number(length); i++) {
      const idx = crypto.randomInt(0, chars.length);
      result += chars[idx];
    }
    return res.json({ result });
  } else if (type === "number") {
    const n = crypto.randomInt(Number(min), Number(max));
    return res.json({ result: n });
  } else {
    return res.status(400).json({ error: "Invalid type" });
  }
}

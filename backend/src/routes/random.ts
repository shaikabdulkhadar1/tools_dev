import { Router, Request, Response } from "express";
import crypto from "crypto";

const router = Router();

router.get("/", (req: Request, res: Response) => {
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
});

export default router;

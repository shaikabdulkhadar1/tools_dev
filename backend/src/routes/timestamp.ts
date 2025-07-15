import { Router, Request, Response } from "express";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  const { value, type } = req.body;
  if (!value || !type)
    return res.status(400).json({ error: "Missing value or type" });
  let result = "";
  let formats: any = {};
  try {
    if (type === "to-unix") {
      const date = new Date(value);
      const unix = Math.floor(date.getTime() / 1000);
      result = unix.toString();
      formats = {
        "UNIX Timestamp": unix,
        "ISO (UTC)": date.toISOString(),
        Local: date.toLocaleString(),
        UTC: date.toUTCString(),
      };
    } else if (type === "from-unix") {
      const date = new Date(Number(value) * 1000);
      result = date.toLocaleString();
      formats = {
        Local: date.toLocaleString(),
        "ISO (UTC)": date.toISOString(),
        UTC: date.toUTCString(),
        "UNIX Timestamp": value,
      };
    } else {
      return res.status(400).json({ error: "Invalid type" });
    }
  } catch {
    return res.status(400).json({ error: "Invalid value" });
  }
  res.json({ result, formats });
});

export default router;

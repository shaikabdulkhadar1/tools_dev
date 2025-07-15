import type { VercelRequest, VercelResponse } from "@vercel/node";

const bases: Record<string, number> = { bin: 2, oct: 8, dec: 10, hex: 16 };

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { value, from, to } = req.body;
  if (!value || !from || !to)
    return res.status(400).json({ error: "Missing value, from, or to" });
  if (!bases[from] || !bases[to])
    return res.status(400).json({ error: "Invalid base" });
  let num: number;
  try {
    num = parseInt(value, bases[from]);
    if (isNaN(num)) throw new Error("Invalid number");
  } catch {
    return res.status(400).json({ error: "Invalid number" });
  }
  let result = num.toString(bases[to]);
  if (to === "hex") result = result.toUpperCase();
  res.json({ result });
}

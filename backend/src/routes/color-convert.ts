import { Router, Request, Response } from "express";

const router = Router();

function hexToRgb(hex: string) {
  let c = hex.replace("#", "");
  if (c.length === 3)
    c = c
      .split("")
      .map((x) => x + x)
      .join("");
  const num = parseInt(c, 16);
  return `rgb(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255})`;
}
function rgbToHex(rgb: string) {
  const m = rgb.match(/\d+/g);
  if (!m) return "";
  return "#" + m.map((x) => (+x).toString(16).padStart(2, "0")).join("");
}
// HSL conversion omitted for brevity

router.post("/", (req: Request, res: Response) => {
  const { value, from, to } = req.body;
  if (!value || !from || !to)
    return res.status(400).json({ error: "Missing value, from, or to" });
  let result = "";
  if (from === "hex" && to === "rgb") result = hexToRgb(value);
  else if (from === "rgb" && to === "hex") result = rgbToHex(value);
  else result = value; // passthrough or not implemented
  res.json({ result });
});

export default router;

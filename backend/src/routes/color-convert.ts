import { Router, Request, Response } from "express";

const router = Router();

// Helper functions for color conversion
function hexToRgb(hex: string) {
  let c = hex.replace("#", "");
  if (c.length === 3)
    c = c
      .split("")
      .map((x) => x + x)
      .join("");
  const num = parseInt(c, 16);
  return [Math.floor(num / 65536), Math.floor((num % 65536) / 256), num % 256];
}

function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b].map((x) => Math.round(x).toString(16).padStart(2, "0")).join("")
  );
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [h * 360, s * 100, l * 100];
}

function hslToRgb(h: number, s: number, l: number) {
  h /= 360;
  s /= 100;
  l /= 100;
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return [r * 255, g * 255, b * 255];
}

function rgbToHsv(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const d = max - min;
  let h = 0,
    s = max === 0 ? 0 : d / max,
    v = max;

  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [h * 360, s * 100, v * 100];
}

function hsvToRgb(h: number, s: number, v: number) {
  h /= 360;
  s /= 100;
  v /= 100;
  let r = 0,
    g = 0,
    b = 0;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }
  return [r * 255, g * 255, b * 255];
}

router.post("/", (req: Request, res: Response) => {
  const { value, from, to } = req.body;
  if (!value || !from || !to)
    return res.status(400).json({ error: "Missing value, from, or to" });

  try {
    let rgb: number[];

    // Convert input to RGB first
    switch (from) {
      case "hex":
        rgb = hexToRgb(value);
        break;
      case "rgb":
        const rgbMatch = value.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (!rgbMatch) throw new Error("Invalid RGB format");
        rgb = [
          parseInt(rgbMatch[1]),
          parseInt(rgbMatch[2]),
          parseInt(rgbMatch[3]),
        ];
        break;
      case "hsl":
        const hslMatch = value.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
        if (!hslMatch) throw new Error("Invalid HSL format");
        const [h, s, l] = hslMatch.slice(1).map((x: string) => parseFloat(x));
        rgb = hslToRgb(h, s, l);
        break;
      case "hsv":
        const hsvMatch = value.match(/hsv\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
        if (!hsvMatch) throw new Error("Invalid HSV format");
        const [h2, s2, v] = hsvMatch.slice(1).map((x: string) => parseFloat(x));
        rgb = hsvToRgb(h2, s2, v);
        break;
      default:
        return res.status(400).json({ error: "Invalid from format" });
    }

    // Convert RGB to target format
    let result = "";
    switch (to) {
      case "hex":
        result = rgbToHex(rgb[0], rgb[1], rgb[2]);
        break;
      case "rgb":
        result = `rgb(${Math.round(rgb[0])}, ${Math.round(
          rgb[1]
        )}, ${Math.round(rgb[2])})`;
        break;
      case "hsl":
        const [h, s, l] = rgbToHsl(rgb[0], rgb[1], rgb[2]);
        result = `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
        break;
      case "hsv":
        const [h2, s2, v2] = rgbToHsv(rgb[0], rgb[1], rgb[2]);
        result = `hsv(${Math.round(h2)}, ${Math.round(s2)}%, ${Math.round(
          v2
        )}%)`;
        break;
      default:
        return res.status(400).json({ error: "Invalid to format" });
    }

    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: "Invalid color format" });
  }
});

export default router;

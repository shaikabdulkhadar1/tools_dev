import { Router, Request, Response } from "express";

const router = Router();

function toCamel(str: string) {
  return str
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
    .replace(/^./, (s) => s.toLowerCase());
}
function toSnake(str: string) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[-\s]+/g, "_")
    .toLowerCase();
}
function toKebab(str: string) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .toLowerCase();
}
function toPascal(str: string) {
  return str
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
    .replace(/^./, (s) => s.toUpperCase());
}

router.post("/", (req: Request, res: Response) => {
  const { text, to } = req.body;
  if (!text || !to)
    return res.status(400).json({ error: "Missing text or target case" });
  let result = "";
  switch (to) {
    case "camel":
      result = toCamel(text);
      break;
    case "snake":
      result = toSnake(text);
      break;
    case "kebab":
      result = toKebab(text);
      break;
    case "pascal":
      result = toPascal(text);
      break;
    case "upper":
      result = text.toUpperCase();
      break;
    case "lower":
      result = text.toLowerCase();
      break;
    default:
      return res.status(400).json({ error: "Invalid target case" });
  }
  res.json({ result });
});

export default router;

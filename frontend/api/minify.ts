import type { VercelRequest, VercelResponse } from "@vercel/node";
import { minify as terserMinify } from "terser";
import CleanCSS from "clean-css";
import { minify as htmlMinify } from "html-minifier";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { code, type } = req.body;
  if (!code || !type)
    return res.status(400).json({ error: "Missing code or type" });
  try {
    let minified = "";
    if (type === "js") {
      const result = await terserMinify(code);
      minified = result.code || "";
    } else if (type === "css") {
      minified = new CleanCSS().minify(code).styles;
    } else if (type === "html") {
      minified = htmlMinify(code, {
        collapseWhitespace: true,
        removeComments: true,
      });
    } else {
      return res.status(400).json({ error: "Invalid type" });
    }
    res.json({ minified });
  } catch (err) {
    res.status(500).json({ error: "Minification failed" });
  }
}

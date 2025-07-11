// @ts-ignore
import { Router, Request, Response } from "express";
// @ts-ignore
import { minify as terserMinify } from "terser";
// @ts-ignore
import CleanCSS from "clean-css";
// @ts-ignore
import { minify as htmlMinify } from "html-minifier";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
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
});

export default router;

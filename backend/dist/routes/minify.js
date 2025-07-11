"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const express_1 = require("express");
// @ts-ignore
const terser_1 = require("terser");
// @ts-ignore
const clean_css_1 = __importDefault(require("clean-css"));
// @ts-ignore
const html_minifier_1 = require("html-minifier");
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    const { code, type } = req.body;
    if (!code || !type)
        return res.status(400).json({ error: "Missing code or type" });
    try {
        let minified = "";
        if (type === "js") {
            const result = await (0, terser_1.minify)(code);
            minified = result.code || "";
        }
        else if (type === "css") {
            minified = new clean_css_1.default().minify(code).styles;
        }
        else if (type === "html") {
            minified = (0, html_minifier_1.minify)(code, {
                collapseWhitespace: true,
                removeComments: true,
            });
        }
        else {
            return res.status(400).json({ error: "Invalid type" });
        }
        res.json({ minified });
    }
    catch (err) {
        res.status(500).json({ error: "Minification failed" });
    }
});
exports.default = router;

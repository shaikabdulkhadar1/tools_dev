"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const marked_1 = require("marked");
const router = (0, express_1.Router)();
router.post("/", (req, res) => {
    const { text } = req.body;
    if (!text)
        return res.status(400).json({ error: "Missing text" });
    try {
        const html = marked_1.marked.parse(text);
        res.json({ html });
    }
    catch {
        res.status(500).json({ error: "Markdown parsing failed" });
    }
});
exports.default = router;

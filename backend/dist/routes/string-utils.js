"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/", (req, res) => {
    const { text, action } = req.body;
    if (!text || !action)
        return res.status(400).json({ error: "Missing text or action" });
    let result = "";
    switch (action) {
        case "count":
            result = { chars: text.length, words: text.trim().split(/\s+/).length };
            break;
        case "trim":
            result = text.trim();
            break;
        case "reverse":
            result = text.split("").reverse().join("");
            break;
        case "remove-duplicates":
            result = Array.from(new Set(text.split(/\s+/))).join(" ");
            break;
        default:
            return res.status(400).json({ error: "Invalid action" });
    }
    res.json({ result });
});
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const diff_1 = require("diff");
const router = (0, express_1.Router)();
router.post("/", (req, res) => {
    const { text1, text2 } = req.body;
    if (typeof text1 !== "string" || typeof text2 !== "string") {
        return res.status(400).json({ error: "Missing or invalid text1/text2" });
    }
    const diff = (0, diff_1.diffLines)(text1, text2);
    res.json({ diff });
});
exports.default = router;

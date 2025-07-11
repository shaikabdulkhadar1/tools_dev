"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
function htmlEncode(str) {
    return str.replace(/[&<>'"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[c] || c));
}
function htmlDecode(str) {
    return str.replace(/&amp;|&lt;|&gt;|&#39;|&quot;/g, (c) => ({ "&amp;": "&", "&lt;": "<", "&gt;": ">", "&#39;": "'", "&quot;": '"' }[c] || c));
}
router.post("/", (req, res) => {
    const { text, type } = req.body;
    if (!text || !type)
        return res.status(400).json({ error: "Missing text or type" });
    let result = "";
    try {
        switch (type) {
            case "url-encode":
                result = encodeURIComponent(text);
                break;
            case "url-decode":
                result = decodeURIComponent(text);
                break;
            case "base64-encode":
                result = Buffer.from(text, "utf8").toString("base64");
                break;
            case "base64-decode":
                result = Buffer.from(text, "base64").toString("utf8");
                break;
            case "html-encode":
                result = htmlEncode(text);
                break;
            case "html-decode":
                result = htmlDecode(text);
                break;
            default:
                return res.status(400).json({ error: "Invalid type" });
        }
    }
    catch {
        return res.status(400).json({ error: "Encoding/decoding failed" });
    }
    res.json({ result });
});
exports.default = router;

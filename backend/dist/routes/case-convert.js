"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
function toCamel(str) {
    return str
        .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
        .replace(/^./, (s) => s.toLowerCase());
}
function toSnake(str) {
    return str
        .replace(/([a-z])([A-Z])/g, "$1_$2")
        .replace(/[-\s]+/g, "_")
        .toLowerCase();
}
function toKebab(str) {
    return str
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[_\s]+/g, "-")
        .toLowerCase();
}
function toPascal(str) {
    return str
        .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
        .replace(/^./, (s) => s.toUpperCase());
}
router.post("/", (req, res) => {
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
exports.default = router;

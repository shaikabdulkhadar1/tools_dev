"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crypto_1 = __importDefault(require("crypto"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    const { type, length = 12, min = 0, max = 100 } = req.query;
    if (!type)
        return res.status(400).json({ error: "Missing type" });
    if (type === "string" || type === "password") {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
        let result = "";
        for (let i = 0; i < Number(length); i++) {
            const idx = crypto_1.default.randomInt(0, chars.length);
            result += chars[idx];
        }
        return res.json({ result });
    }
    else if (type === "number") {
        const n = crypto_1.default.randomInt(Number(min), Number(max));
        return res.json({ result: n });
    }
    else {
        return res.status(400).json({ error: "Invalid type" });
    }
});
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crypto_1 = __importDefault(require("crypto"));
const router = (0, express_1.Router)();
router.post("/", (req, res) => {
    const { text, algorithm } = req.body;
    if (!text || !algorithm) {
        return res.status(400).json({ error: "Missing text or algorithm" });
    }
    if (!["md5", "sha1", "sha256", "sha512"].includes(algorithm)) {
        return res.status(400).json({ error: "Invalid algorithm" });
    }
    try {
        const hash = crypto_1.default.createHash(algorithm).update(text).digest("hex");
        res.json({ hash });
    }
    catch (err) {
        res.status(500).json({ error: "Hashing failed" });
    }
});
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/", (req, res) => {
    const { value, type } = req.body;
    if (!value || !type)
        return res.status(400).json({ error: "Missing value or type" });
    let result = "";
    try {
        if (type === "to-unix") {
            result = Math.floor(new Date(value).getTime() / 1000).toString();
        }
        else if (type === "from-unix") {
            result = new Date(Number(value) * 1000).toISOString();
        }
        else {
            return res.status(400).json({ error: "Invalid type" });
        }
    }
    catch {
        return res.status(400).json({ error: "Invalid value" });
    }
    res.json({ result });
});
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const bases = { bin: 2, oct: 8, dec: 10, hex: 16 };
router.post("/", (req, res) => {
    const { value, from, to } = req.body;
    if (!value || !from || !to)
        return res.status(400).json({ error: "Missing value, from, or to" });
    if (!bases[from] || !bases[to])
        return res.status(400).json({ error: "Invalid base" });
    let num;
    try {
        num = parseInt(value, bases[from]);
        if (isNaN(num))
            throw new Error("Invalid number");
    }
    catch {
        return res.status(400).json({ error: "Invalid number" });
    }
    let result = num.toString(bases[to]);
    if (to === "hex")
        result = result.toUpperCase();
    res.json({ result });
});
exports.default = router;

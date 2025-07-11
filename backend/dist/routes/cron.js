"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cron_parser_1 = require("cron-parser");
const cronstrue_1 = __importDefault(require("cronstrue"));
const router = (0, express_1.Router)();
router.post("/", (req, res) => {
    const { expression } = req.body;
    if (!expression)
        return res.status(400).json({ error: "Missing expression" });
    try {
        const cron = cron_parser_1.CronExpressionParser.parse(expression);
        const nextRuns = [];
        let next = cron.next();
        for (let i = 0; i < 5; i++) {
            nextRuns.push(next.toString());
            next = cron.next();
        }
        const description = cronstrue_1.default.toString(expression);
        res.json({ nextRuns, description });
    }
    catch (err) {
        res.status(400).json({ error: "Invalid cron expression" });
    }
});
exports.default = router;

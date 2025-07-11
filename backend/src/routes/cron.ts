import { Router, Request, Response } from "express";
import { CronExpressionParser } from "cron-parser";
import cronstrue from "cronstrue";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  const { expression } = req.body;
  if (!expression) return res.status(400).json({ error: "Missing expression" });
  try {
    const cron = CronExpressionParser.parse(expression);
    const nextRuns: string[] = [];
    let next = cron.next();
    for (let i = 0; i < 5; i++) {
      nextRuns.push(next.toString());
      next = cron.next();
    }
    const description = cronstrue.toString(expression);
    res.json({ nextRuns, description });
  } catch (err) {
    res.status(400).json({ error: "Invalid cron expression" });
  }
});

export default router;

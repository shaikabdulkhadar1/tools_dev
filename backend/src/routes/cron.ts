import { Router, Request, Response } from "express";
import { CronExpressionParser } from "cron-parser";
import cronstrue from "cronstrue";

const router = Router();

interface CronAnalysis {
  expression: string;
  command?: string;
  description: string;
  nextRuns: string[];
  parts: {
    minute: string;
    hour: string;
    dayOfMonth: string;
    month: string;
    dayOfWeek: string;
    year?: string;
  };
  explanation: {
    minute: string;
    hour: string;
    dayOfMonth: string;
    month: string;
    dayOfWeek: string;
    year?: string;
  };
}

const explainCronPart = (part: string, type: string): string => {
  if (part === "*") {
    switch (type) {
      case "minute":
        return "Every minute";
      case "hour":
        return "Every hour";
      case "dayOfMonth":
        return "Every day of the month";
      case "month":
        return "Every month";
      case "dayOfWeek":
        return "Every day of the week";
      case "year":
        return "Every year";
      default:
        return "Every value";
    }
  }

  if (part.includes("/")) {
    const [range, step] = part.split("/");
    const rangeText = range === "*" ? "every" : `every ${range}`;
    return `Every ${step} ${type}${
      step === "1" ? "" : "s"
    } starting from ${rangeText}`;
  }

  if (part.includes("-")) {
    const [start, end] = part.split("-");
    return `From ${start} to ${end} ${type}${end === "1" ? "" : "s"}`;
  }

  if (part.includes(",")) {
    const values = part.split(",");
    return `On ${type}${values.length === 1 ? "" : "s"} ${values.join(", ")}`;
  }

  // Specific value
  switch (type) {
    case "minute":
      return `At minute ${part}`;
    case "hour":
      return `At hour ${part}`;
    case "dayOfMonth":
      return `On day ${part} of the month`;
    case "month":
      return `In month ${part}`;
    case "dayOfWeek":
      return `On day ${part} of the week`;
    case "year":
      return `In year ${part}`;
    default:
      return `At ${part}`;
  }
};

const parseCronExpression = (
  input: string
): { expression: string; command?: string } => {
  const parts = input.trim().split(/\s+/);

  // Check if it's a standard 5-part cron expression
  if (parts.length === 5) {
    return { expression: parts.slice(0, 5).join(" ") };
  }

  // Check if it's a 6-part cron expression (with seconds)
  if (parts.length === 6) {
    return { expression: parts.slice(0, 5).join(" ") };
  }

  // Check if it's a cron expression with command (5 or 6 parts + command)
  if (parts.length >= 6) {
    const cronParts = parts.slice(0, 5);
    const command = parts.slice(5).join(" ");
    return { expression: cronParts.join(" "), command };
  }

  throw new Error("Invalid cron expression format");
};

router.post("/", (req: Request, res: Response) => {
  const { expression: inputExpression } = req.body;

  if (!inputExpression) {
    return res.status(400).json({ error: "Missing expression" });
  }

  try {
    const { expression, command } = parseCronExpression(inputExpression);

    // Parse the cron expression
    const cron = CronExpressionParser.parse(expression);
    const nextRuns: string[] = [];
    let next = cron.next();

    // Get next 5 execution times
    for (let i = 0; i < 5; i++) {
      nextRuns.push(next.toString());
      next = cron.next();
    }

    // Get human-readable description
    const description = cronstrue.toString(expression);

    // Split expression into parts
    const parts = expression.split(" ");
    const cronParts = {
      minute: parts[0],
      hour: parts[1],
      dayOfMonth: parts[2],
      month: parts[3],
      dayOfWeek: parts[4],
      year: parts[5],
    };

    // Generate explanations for each part
    const explanation = {
      minute: explainCronPart(parts[0], "minute"),
      hour: explainCronPart(parts[1], "hour"),
      dayOfMonth: explainCronPart(parts[2], "dayOfMonth"),
      month: explainCronPart(parts[3], "month"),
      dayOfWeek: explainCronPart(parts[4], "dayOfWeek"),
      year: parts[5] ? explainCronPart(parts[5], "year") : undefined,
    };

    const analysis: CronAnalysis = {
      expression,
      command,
      description,
      nextRuns,
      parts: cronParts,
      explanation,
    };

    res.json(analysis);
  } catch (err) {
    console.error("Cron parsing error:", err);
    res.status(400).json({
      error: "Invalid cron expression",
      details: err instanceof Error ? err.message : "Unknown error",
    });
  }
});

export default router;

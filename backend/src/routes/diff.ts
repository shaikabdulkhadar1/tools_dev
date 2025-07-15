import { Router, Request, Response } from "express";
import { diffLines, Change } from "diff";

interface DiffAnalysis {
  diff: Change[];
  statistics: {
    totalLines: number;
    addedLines: number;
    removedLines: number;
    unchangedLines: number;
    similarity: number;
  };
  summary: {
    hasChanges: boolean;
    changeType: "identical" | "minor" | "major" | "completely_different";
    description: string;
  };
  lineAnalysis: {
    addedLines: number[];
    removedLines: number[];
    changedBlocks: Array<{
      type: "added" | "removed" | "modified";
      startLine: number;
      endLine: number;
      content: string[];
    }>;
  };
}

const router = Router();

const analyzeDiff = (
  diff: Change[],
  text1: string,
  text2: string
): DiffAnalysis => {
  const lines1 = text1.split("\n");
  const lines2 = text2.split("\n");

  let addedLines = 0;
  let removedLines = 0;
  let unchangedLines = 0;
  const addedLineNumbers: number[] = [];
  const removedLineNumbers: number[] = [];
  const changedBlocks: DiffAnalysis["lineAnalysis"]["changedBlocks"] = [];

  let currentLine = 0;
  let blockStart = 0;
  let currentBlock: string[] = [];
  let currentBlockType: "added" | "removed" | "modified" | null = null;

  diff.forEach((part, index) => {
    const lines = part.value.split("\n");
    const lineCount = lines.length - 1; // -1 because split creates an extra empty element

    if (part.added) {
      addedLines += lineCount;
      for (let i = 0; i < lineCount; i++) {
        addedLineNumbers.push(currentLine + i);
      }

      if (currentBlockType === "added") {
        currentBlock.push(...lines.slice(0, -1));
      } else {
        if (currentBlockType) {
          changedBlocks.push({
            type: currentBlockType,
            startLine: blockStart,
            endLine: currentLine - 1,
            content: currentBlock,
          });
        }
        currentBlockType = "added";
        blockStart = currentLine;
        currentBlock = lines.slice(0, -1);
      }
    } else if (part.removed) {
      removedLines += lineCount;
      for (let i = 0; i < lineCount; i++) {
        removedLineNumbers.push(currentLine + i);
      }

      if (currentBlockType === "removed") {
        currentBlock.push(...lines.slice(0, -1));
      } else {
        if (currentBlockType) {
          changedBlocks.push({
            type: currentBlockType,
            startLine: blockStart,
            endLine: currentLine - 1,
            content: currentBlock,
          });
        }
        currentBlockType = "removed";
        blockStart = currentLine;
        currentBlock = lines.slice(0, -1);
      }
    } else {
      unchangedLines += lineCount;
      if (currentBlockType) {
        changedBlocks.push({
          type: currentBlockType,
          startLine: blockStart,
          endLine: currentLine - 1,
          content: currentBlock,
        });
        currentBlockType = null;
      }
    }

    currentLine += lineCount;
  });

  // Add final block if exists
  if (currentBlockType) {
    changedBlocks.push({
      type: currentBlockType,
      startLine: blockStart,
      endLine: currentLine - 1,
      content: currentBlock,
    });
  }

  const totalLines = Math.max(lines1.length, lines2.length);
  const similarity = totalLines > 0 ? (unchangedLines / totalLines) * 100 : 100;

  // Determine change type and description
  let changeType: DiffAnalysis["summary"]["changeType"] = "identical";
  let description = "";

  if (similarity === 100) {
    changeType = "identical";
    description = "The texts are identical - no differences found.";
  } else if (similarity >= 80) {
    changeType = "minor";
    description = `Minor changes detected. ${addedLines} line(s) added, ${removedLines} line(s) removed.`;
  } else if (similarity >= 30) {
    changeType = "major";
    description = `Significant changes detected. ${addedLines} line(s) added, ${removedLines} line(s) removed.`;
  } else {
    changeType = "completely_different";
    description = `Major differences detected. ${addedLines} line(s) added, ${removedLines} line(s) removed.`;
  }

  return {
    diff,
    statistics: {
      totalLines,
      addedLines,
      removedLines,
      unchangedLines,
      similarity: Math.round(similarity * 100) / 100,
    },
    summary: {
      hasChanges: similarity < 100,
      changeType,
      description,
    },
    lineAnalysis: {
      addedLines: addedLineNumbers,
      removedLines: removedLineNumbers,
      changedBlocks,
    },
  };
};

router.post("/", (req: Request, res: Response) => {
  try {
    const { text1, text2 } = req.body;

    if (typeof text1 !== "string" || typeof text2 !== "string") {
      return res.status(400).json({ error: "Missing or invalid text1/text2" });
    }

    if (!text1.trim() && !text2.trim()) {
      return res.status(400).json({ error: "Both texts cannot be empty" });
    }

    const diff = diffLines(text1, text2);

    const analysis = analyzeDiff(diff, text1, text2);

    res.json(analysis);
  } catch (error) {
    console.error("Diff analysis error:", error);
    res.status(500).json({
      error: "Error analyzing differences",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;

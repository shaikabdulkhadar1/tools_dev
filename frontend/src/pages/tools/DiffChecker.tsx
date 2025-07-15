import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { apiFetch } from "@/lib/api";

interface DiffAnalysis {
  diff: Array<{
    value: string;
    added?: boolean;
    removed?: boolean;
  }>;
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

const DiffChecker = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [analysis, setAnalysis] = useState<DiffAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkDiff = async () => {
    if (!text1.trim() && !text2.trim()) {
      setError("Please enter at least one text to compare");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const data = await apiFetch<DiffAnalysis>("/diff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text1, text2 }),
      });
      setAnalysis(data);
    } catch (e: any) {
      setError(e.message || "Error checking diff");
    }
    setLoading(false);
  };

  const clearAll = () => {
    setText1("");
    setText2("");
    setAnalysis(null);
    setError("");
  };

  const getChangeTypeColor = (changeType: string) => {
    switch (changeType) {
      case "identical":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "minor":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      case "major":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300";
      case "completely_different":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const getChangeTypeIcon = (changeType: string) => {
    switch (changeType) {
      case "identical":
        return "✅";
      case "minor":
        return "⚠️";
      case "major":
        return "🔄";
      case "completely_different":
        return "❌";
      default:
        return "ℹ️";
    }
  };

  return (
    <ToolLayout
      title="Diff Checker"
      description="Compare two text snippets and get detailed analysis of differences."
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Input Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Original Text
            </label>
            <textarea
              className="w-full border rounded p-3 font-mono text-sm resize-none"
              rows={8}
              placeholder="Enter the original text here..."
              value={text1}
              onChange={(e) => setText1(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Modified Text
            </label>
            <textarea
              className="w-full border rounded p-3 font-mono text-sm resize-none"
              rows={8}
              placeholder="Enter the modified text here..."
              value={text2}
              onChange={(e) => setText2(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 flex-1"
            onClick={checkDiff}
            disabled={loading || (!text1.trim() && !text2.trim())}
          >
            {loading ? "Analyzing..." : "Compare Texts"}
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={clearAll}
          >
            Clear
          </button>
        </div>

        {error && (
          <div className="text-red-600 text-sm p-3 bg-red-50 border border-red-200 rounded">
            {error}
          </div>
        )}

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-6">
            {/* Summary Card */}
            <div className="bg-white dark:bg-slate-800 border rounded-lg shadow-sm">
              <div className="border-b border-slate-200 dark:border-slate-700 p-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Diff Analysis Summary
                </h3>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">
                    {getChangeTypeIcon(analysis.summary.changeType)}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getChangeTypeColor(
                      analysis.summary.changeType
                    )}`}
                  >
                    {analysis.summary.changeType
                      .replace("_", " ")
                      .toUpperCase()}
                  </span>
                </div>

                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  {analysis.summary.description}
                </p>

                {/* Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {analysis.statistics.totalLines}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Total Lines
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      +{analysis.statistics.addedLines}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Added Lines
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      -{analysis.statistics.removedLines}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Removed Lines
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {analysis.statistics.unchangedLines}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Unchanged Lines
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {analysis.statistics.similarity}%
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Similarity
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Diff View */}
            <div className="bg-white dark:bg-slate-800 border rounded-lg shadow-sm">
              <div className="border-b border-slate-200 dark:border-slate-700 p-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Detailed Differences
                </h3>
              </div>

              <div className="p-6">
                <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  {analysis.diff.map((part, i) => (
                    <span
                      key={i}
                      className={`inline-block ${
                        part.added
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                          : part.removed
                          ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 line-through"
                          : ""
                      }`}
                    >
                      {part.value}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Changed Blocks Analysis */}
            {analysis.lineAnalysis.changedBlocks.length > 0 && (
              <div className="bg-white dark:bg-slate-800 border rounded-lg shadow-sm">
                <div className="border-b border-slate-200 dark:border-slate-700 p-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Changed Blocks
                  </h3>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {analysis.lineAnalysis.changedBlocks.map((block, index) => (
                      <div
                        key={index}
                        className="border border-slate-200 dark:border-slate-600 rounded-lg p-4"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              block.type === "added"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                                : block.type === "removed"
                                ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
                            }`}
                          >
                            {block.type.toUpperCase()}
                          </span>
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            Lines {block.startLine + 1}-{block.endLine + 1}
                          </span>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-700 rounded p-2 font-mono text-xs">
                          {block.content.map((line, lineIndex) => (
                            <div key={lineIndex} className="whitespace-pre">
                              {line}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default DiffChecker;

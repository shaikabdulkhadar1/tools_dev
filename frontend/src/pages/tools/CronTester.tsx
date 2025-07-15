import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { apiFetch } from "@/lib/api";

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

const CronTester = () => {
  const [expression, setExpression] = useState("");
  const [analysis, setAnalysis] = useState<CronAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const testCron = async () => {
    if (!expression.trim()) {
      setError("Please enter a cron expression");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const data = await apiFetch<CronAnalysis>("/cron", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expression: expression.trim() }),
      });
      setAnalysis(data);
    } catch (e: any) {
      setError(e.message || "Error testing cron expression");
    }
    setLoading(false);
  };

  const clearAll = () => {
    setExpression("");
    setAnalysis(null);
    setError("");
  };

  return (
    <ToolLayout
      title="Cron Expression Tester"
      description="Build and test cron expressions with detailed explanations and next execution times."
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Cron Expression
            </label>
            <input
              className="w-full border rounded p-3 font-mono text-sm"
              type="text"
              placeholder="0 9 * * * echo 'Good morning!' >> ~/cron_test.log"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Enter a cron expression with optional command. Examples: "0 9 * *
              *" or "0 9 * * * echo 'Hello'"
            </p>
          </div>

          <div className="flex gap-2">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 flex-1"
              onClick={testCron}
              disabled={loading || !expression.trim()}
            >
              {loading ? "Analyzing..." : "Analyze Expression"}
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
        </div>

        {/* Analysis Results */}
        {analysis && (
          <div className="bg-white dark:bg-slate-800 border rounded-lg shadow-sm">
            {/* Header */}
            <div className="border-b border-slate-200 dark:border-slate-700 p-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Cron Expression Analysis
              </h3>
            </div>

            <div className="p-6 space-y-6">
              {/* Expression and Command */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">
                    Cron Expression
                  </h4>
                  <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded font-mono text-sm">
                    {analysis.expression}
                  </div>
                </div>

                {analysis.command && (
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">
                      Command
                    </h4>
                    <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded font-mono text-sm">
                      {analysis.command}
                    </div>
                  </div>
                )}
              </div>

              {/* Human Description */}
              <div>
                <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">
                  Human-Readable Description
                </h4>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded text-blue-800 dark:text-blue-200">
                  {analysis.description}
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div>
                <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-3">
                  Detailed Breakdown
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded">
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      Minute
                    </div>
                    <div className="font-mono text-sm text-slate-900 dark:text-slate-100 mt-1">
                      {analysis.parts.minute}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      {analysis.explanation.minute}
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded">
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      Hour
                    </div>
                    <div className="font-mono text-sm text-slate-900 dark:text-slate-100 mt-1">
                      {analysis.parts.hour}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      {analysis.explanation.hour}
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded">
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      Day of Month
                    </div>
                    <div className="font-mono text-sm text-slate-900 dark:text-slate-100 mt-1">
                      {analysis.parts.dayOfMonth}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      {analysis.explanation.dayOfMonth}
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded">
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      Month
                    </div>
                    <div className="font-mono text-sm text-slate-900 dark:text-slate-100 mt-1">
                      {analysis.parts.month}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      {analysis.explanation.month}
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded">
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      Day of Week
                    </div>
                    <div className="font-mono text-sm text-slate-900 dark:text-slate-100 mt-1">
                      {analysis.parts.dayOfWeek}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      {analysis.explanation.dayOfWeek}
                    </div>
                  </div>

                  {analysis.parts.year && (
                    <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded">
                      <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                        Year
                      </div>
                      <div className="font-mono text-sm text-slate-900 dark:text-slate-100 mt-1">
                        {analysis.parts.year}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                        {analysis.explanation.year}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Next Execution Times */}
              <div>
                <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-3">
                  Next 5 Execution Times
                </h4>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded">
                  <ul className="space-y-1">
                    {analysis.nextRuns.map((run, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                          {index + 1}
                        </span>
                        <span className="font-mono text-slate-900 dark:text-slate-100">
                          {run}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default CronTester;

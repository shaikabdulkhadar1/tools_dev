import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { apiFetch } from "@/lib/api";

const CronTester = () => {
  const [expression, setExpression] = useState("");
  const [nextRuns, setNextRuns] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const testCron = async () => {
    setLoading(true);
    setError("");
    setNextRuns([]);
    setDescription("");
    try {
      const data = await apiFetch<{ nextRuns: string[]; description: string }>(
        "/cron",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ expression }),
        }
      );
      setNextRuns(data.nextRuns);
      setDescription(data.description);
    } catch (e: any) {
      setError(e.message || "Error testing cron expression");
    }
    setLoading(false);
  };

  return (
    <ToolLayout
      title="Cron Expression Tester"
      description="Build and test cron expressions with human-readable descriptions and next execution times."
    >
      <div className="max-w-xl mx-auto space-y-4">
        <input
          className="w-full border rounded p-2"
          type="text"
          placeholder="* * * * * *"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={testCron}
          disabled={loading || !expression}
        >
          {loading ? "Testing..." : "Test Expression"}
        </button>
        {description && (
          <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded">
            <strong>Description:</strong> {description}
          </div>
        )}
        {nextRuns.length > 0 && (
          <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded">
            <strong>Next Runs:</strong>
            <ul className="list-disc ml-6">
              {nextRuns.map((run, i) => (
                <li key={i}>{run}</li>
              ))}
            </ul>
          </div>
        )}
        {error && <div className="text-red-600">{error}</div>}
      </div>
    </ToolLayout>
  );
};

export default CronTester;

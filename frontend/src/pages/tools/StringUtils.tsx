import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { apiFetch } from "@/lib/api";

const StringUtils = () => {
  const [text, setText] = useState("");
  const [action, setAction] = useState("count");
  const [result, setResult] = useState<
    string | number | { chars: number; words: number }
  >("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const run = async () => {
    setLoading(true);
    setError("");
    setResult("");
    try {
      const data = await apiFetch<{
        result: string | number | { chars: number; words: number };
      }>("/string-utils", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, action }),
      });
      setResult(data.result);
    } catch (e: any) {
      setError(e.message || "Error performing string utility");
    }
    setLoading(false);
  };

  return (
    <ToolLayout
      title="String Utilities"
      description="Count words and characters, remove duplicates, trim spaces, reverse text, and more."
    >
      <div className="max-w-xl mx-auto space-y-4">
        <textarea
          className="w-full border rounded p-2"
          rows={3}
          placeholder="Enter text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <select
          className="w-full border rounded p-2"
          value={action}
          onChange={(e) => setAction(e.target.value)}
        >
          <option value="count">Count words & characters</option>
          <option value="trim">Trim spaces</option>
          <option value="reverse">Reverse text</option>
          <option value="remove-duplicates">Remove duplicate words</option>
        </select>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={run}
          disabled={loading || !text}
        >
          {loading ? "Processing..." : "Run"}
        </button>
        {action === "count" && typeof result === "object" && result && (
          <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded">
            <strong>Characters:</strong> {(result as any).chars} <br />
            <strong>Words:</strong> {(result as any).words}
          </div>
        )}
        {action !== "count" && typeof result === "string" && result && (
          <div className="break-all bg-slate-100 dark:bg-slate-800 p-2 rounded">
            <strong>Result:</strong> {result}
          </div>
        )}
        {error && <div className="text-red-600">{error}</div>}
      </div>
    </ToolLayout>
  );
};

export default StringUtils;

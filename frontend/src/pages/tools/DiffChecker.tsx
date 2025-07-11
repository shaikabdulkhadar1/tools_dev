import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { apiFetch } from "@/lib/api";

const DiffChecker = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diff, setDiff] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkDiff = async () => {
    setLoading(true);
    setError("");
    setDiff([]);
    try {
      const data = await apiFetch<{ diff: any[] }>("/diff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text1, text2 }),
      });
      setDiff(data.diff);
    } catch (e: any) {
      setError(e.message || "Error checking diff");
    }
    setLoading(false);
  };

  return (
    <ToolLayout
      title="Diff Checker"
      description="Compare two text snippets and highlight the differences."
    >
      <div className="max-w-xl mx-auto space-y-4">
        <textarea
          className="w-full border rounded p-2"
          rows={4}
          placeholder="First text..."
          value={text1}
          onChange={(e) => setText1(e.target.value)}
        />
        <textarea
          className="w-full border rounded p-2"
          rows={4}
          placeholder="Second text..."
          value={text2}
          onChange={(e) => setText2(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={checkDiff}
          disabled={loading || !text1 || !text2}
        >
          {loading ? "Comparing..." : "Compare"}
        </button>
        {diff.length > 0 && (
          <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded text-sm whitespace-pre-wrap">
            {diff.map((part, i) => (
              <span
                key={i}
                style={{
                  backgroundColor: part.added
                    ? "#bbf7d0"
                    : part.removed
                    ? "#fecaca"
                    : undefined,
                  textDecoration: part.removed ? "line-through" : undefined,
                  color: part.added
                    ? "#166534"
                    : part.removed
                    ? "#991b1b"
                    : undefined,
                }}
              >
                {part.value}
              </span>
            ))}
          </div>
        )}
        {error && <div className="text-red-600">{error}</div>}
      </div>
    </ToolLayout>
  );
};

export default DiffChecker;

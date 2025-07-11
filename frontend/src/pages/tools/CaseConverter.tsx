import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { apiFetch } from "@/lib/api";

const CaseConverter = () => {
  const [text, setText] = useState("");
  const [to, setTo] = useState("camel");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const convert = async () => {
    setLoading(true);
    setError("");
    setResult("");
    try {
      const data = await apiFetch<{ result: string }>("/case-convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, to }),
      });
      setResult(data.result);
    } catch (e: any) {
      setError(e.message || "Error converting case");
    }
    setLoading(false);
  };

  return (
    <ToolLayout
      title="Case Converter"
      description="Convert text between different case formats including camelCase, snake_case, kebab-case, and more."
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
          value={to}
          onChange={(e) => setTo(e.target.value)}
        >
          <option value="camel">camelCase</option>
          <option value="snake">snake_case</option>
          <option value="kebab">kebab-case</option>
          <option value="pascal">PascalCase</option>
          <option value="upper">UPPERCASE</option>
          <option value="lower">lowercase</option>
        </select>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={convert}
          disabled={loading || !text}
        >
          {loading ? "Converting..." : "Convert"}
        </button>
        {result && (
          <div className="break-all bg-slate-100 dark:bg-slate-800 p-2 rounded">
            <strong>Result:</strong> {result}
          </div>
        )}
        {error && <div className="text-red-600">{error}</div>}
      </div>
    </ToolLayout>
  );
};

export default CaseConverter;

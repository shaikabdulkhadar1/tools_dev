import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { apiFetch } from "@/lib/api";

const Minifier = () => {
  const [code, setCode] = useState("");
  const [type, setType] = useState("js");
  const [minified, setMinified] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const minifyCode = async () => {
    setLoading(true);
    setError("");
    setMinified("");
    try {
      const data = await apiFetch<{ minified: string }>("/minify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, type }),
      });
      setMinified(data.minified);
    } catch (e: any) {
      setError(e.message || "Error minifying code");
    }
    setLoading(false);
  };

  return (
    <ToolLayout
      title="Code Minifier & Beautifier"
      description="Minify HTML, CSS, or JavaScript code using the backend."
    >
      <div className="max-w-xl mx-auto space-y-4">
        <select
          className="w-full border rounded p-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="js">JavaScript</option>
          <option value="css">CSS</option>
          <option value="html">HTML</option>
        </select>
        <textarea
          className="w-full border rounded p-2"
          rows={6}
          placeholder="Paste your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={minifyCode}
          disabled={loading || !code}
        >
          {loading ? "Minifying..." : "Minify"}
        </button>
        {minified && (
          <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded text-sm whitespace-pre-wrap">
            <strong>Minified:</strong>
            <pre className="whitespace-pre-wrap break-all">{minified}</pre>
          </div>
        )}
        {error && <div className="text-red-600">{error}</div>}
      </div>
    </ToolLayout>
  );
};

export default Minifier;

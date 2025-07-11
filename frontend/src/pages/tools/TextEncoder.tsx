import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { apiFetch } from "@/lib/api";

const TextEncoder = () => {
  const [text, setText] = useState("");
  const [type, setType] = useState("url-encode");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const encode = async () => {
    setLoading(true);
    setError("");
    setResult("");
    try {
      const data = await apiFetch<{ result: string }>("/text-encode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, type }),
      });
      setResult(data.result);
    } catch (e: any) {
      setError(e.message || "Error encoding/decoding text");
    }
    setLoading(false);
  };

  return (
    <ToolLayout
      title="Text Encoder & Decoder"
      description="Encode and decode text in various formats including URL, HTML entities, Base64, and more."
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
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="url-encode">URL Encode</option>
          <option value="url-decode">URL Decode</option>
          <option value="base64-encode">Base64 Encode</option>
          <option value="base64-decode">Base64 Decode</option>
          <option value="html-encode">HTML Encode</option>
          <option value="html-decode">HTML Decode</option>
        </select>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={encode}
          disabled={loading || !text}
        >
          {loading ? "Processing..." : "Run"}
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

export default TextEncoder;

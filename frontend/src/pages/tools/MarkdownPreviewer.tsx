import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { apiFetch } from "@/lib/api";

const MarkdownPreviewer = () => {
  const [text, setText] = useState("");
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const preview = async () => {
    setLoading(true);
    setError("");
    setHtml("");
    try {
      const data = await apiFetch<{ html: string }>("/markdown", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      setHtml(data.html);
    } catch (e: any) {
      setError(e.message || "Error rendering markdown");
    }
    setLoading(false);
  };

  return (
    <ToolLayout
      title="Markdown Previewer"
      description="Write and preview Markdown with live rendering and syntax highlighting."
    >
      <div className="max-w-xl mx-auto space-y-4">
        <textarea
          className="w-full border rounded p-2 font-mono"
          rows={6}
          placeholder="Enter Markdown text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={preview}
          disabled={loading || !text}
        >
          {loading ? "Rendering..." : "Preview"}
        </button>
        {html && (
          <div
            className="bg-slate-100 dark:bg-slate-800 p-4 rounded prose prose-slate dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
        {error && <div className="text-red-600">{error}</div>}
      </div>
    </ToolLayout>
  );
};

export default MarkdownPreviewer;

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { apiFetch } from "@/lib/api";

const MarkdownPreviewer = () => {
  const [text, setText] = useState("");
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const preview = async () => {
    if (!text.trim()) {
      setError("Please enter some markdown text");
      return;
    }

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
      setShowPreview(true);
    } catch (e: any) {
      setError(e.message || "Error rendering markdown");
    }
    setLoading(false);
  };

  const clearAll = () => {
    setText("");
    setHtml("");
    setShowPreview(false);
    setError("");
  };

  return (
    <ToolLayout
      title="Markdown Previewer"
      description="Write and preview Markdown with live rendering and syntax highlighting."
    >
      <div
        className="flex flex-col lg:flex-row gap-4"
        style={{ height: "calc(100vh - 200px)" }}
      >
        {/* Input Section */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">
              Markdown Input
            </h3>
          </div>

          <textarea
            className="flex-1 w-full border rounded p-4 font-mono text-sm resize-none"
            placeholder="Enter Markdown text here...

# Heading 1
## Heading 2

**Bold text** and *italic text*

- List item 1
- List item 2

[Link text](https://example.com)

```javascript
console.log('Hello World!');
```"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {error && (
            <div className="text-red-600 text-sm p-2 bg-red-50 border border-red-200 rounded mt-2">
              {error}
            </div>
          )}

          <div className="flex gap-2 mt-2">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 flex-1"
              onClick={preview}
              disabled={loading || !text.trim()}
            >
              {loading ? "Rendering..." : "Preview"}
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={clearAll}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Preview Section */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">
              Preview
            </h3>
            {showPreview && (
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                Live Preview
              </span>
            )}
          </div>

          <div className="flex-1 border rounded bg-white dark:bg-slate-900 overflow-hidden">
            {showPreview && html ? (
              <div
                className="h-full overflow-y-auto p-6 markdown-preview"
                style={{
                  fontSize: "14px",
                  lineHeight: "1.6",
                  color: "inherit",
                }}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500 dark:text-slate-400">
                <div className="text-center">
                  <div className="text-4xl mb-2">📝</div>
                  <p>Click "Preview" to see your markdown rendered</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .markdown-preview h1 {
            font-size: 2em !important;
            font-weight: bold !important;
            margin: 1em 0 0.5em 0 !important;
            padding-bottom: 0.3em !important;
            border-bottom: 1px solid #eaecef !important;
            color: #24292e !important;
          }
          
          .markdown-preview h2 {
            font-size: 1.5em !important;
            font-weight: bold !important;
            margin: 1em 0 0.5em 0 !important;
            padding-bottom: 0.3em !important;
            border-bottom: 1px solid #eaecef !important;
            color: #24292e !important;
          }
          
          .markdown-preview h3 {
            font-size: 1.25em !important;
            font-weight: bold !important;
            margin: 1em 0 0.5em 0 !important;
            color: #24292e !important;
          }
          
          .markdown-preview h4 {
            font-size: 1em !important;
            font-weight: bold !important;
            margin: 1em 0 0.5em 0 !important;
            color: #24292e !important;
          }
          
          .markdown-preview h5 {
            font-size: 0.875em !important;
            font-weight: bold !important;
            margin: 1em 0 0.5em 0 !important;
            color: #24292e !important;
          }
          
          .markdown-preview h6 {
            font-size: 0.85em !important;
            font-weight: bold !important;
            margin: 1em 0 0.5em 0 !important;
            color: #24292e !important;
          }
          
          .markdown-preview p {
            margin: 0 0 1em 0 !important;
            line-height: 1.6 !important;
          }
          
          .markdown-preview ul, .markdown-preview ol {
            margin: 0 0 1em 0 !important;
            padding-left: 2em !important;
          }
          
          .markdown-preview li {
            margin: 0.25em 0 !important;
            line-height: 1.6 !important;
          }
          
          .markdown-preview ul li {
            list-style-type: disc !important;
          }
          
          .markdown-preview ol li {
            list-style-type: decimal !important;
          }
          
          .markdown-preview blockquote {
            margin: 0 0 1em 0 !important;
            padding: 0 1em !important;
            color: #6a737d !important;
            border-left: 0.25em solid #dfe2e5 !important;
          }
          
          .markdown-preview code {
            background-color: #f6f8fa !important;
            padding: 0.2em 0.4em !important;
            border-radius: 3px !important;
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace !important;
            font-size: 85% !important;
          }
          
          .markdown-preview pre {
            background-color: #f6f8fa !important;
            padding: 1em !important;
            border-radius: 6px !important;
            overflow-x: auto !important;
            margin: 0 0 1em 0 !important;
          }
          
          .markdown-preview pre code {
            background-color: transparent !important;
            padding: 0 !important;
          }
          
          .markdown-preview strong {
            font-weight: bold !important;
          }
          
          .markdown-preview em {
            font-style: italic !important;
          }
          
          .markdown-preview a {
            color: #0366d6 !important;
            text-decoration: none !important;
          }
          
          .markdown-preview a:hover {
            text-decoration: underline !important;
          }
          
          .markdown-preview table {
            border-collapse: collapse !important;
            width: 100% !important;
            margin: 0 0 1em 0 !important;
          }
          
          .markdown-preview th, .markdown-preview td {
            border: 1px solid #dfe2e5 !important;
            padding: 0.5em !important;
            text-align: left !important;
          }
          
          .markdown-preview th {
            background-color: #f6f8fa !important;
            font-weight: bold !important;
          }
          
          /* Dark mode support */
          .dark .markdown-preview h1,
          .dark .markdown-preview h2,
          .dark .markdown-preview h3,
          .dark .markdown-preview h4,
          .dark .markdown-preview h5,
          .dark .markdown-preview h6 {
            color: #e1e4e8 !important;
            border-bottom-color: #30363d !important;
          }
          
          .dark .markdown-preview blockquote {
            color: #8b949e !important;
            border-left-color: #30363d !important;
          }
          
          .dark .markdown-preview code {
            background-color: #30363d !important;
          }
          
          .dark .markdown-preview pre {
            background-color: #30363d !important;
          }
          
          .dark .markdown-preview a {
            color: #58a6ff !important;
          }
          
          .dark .markdown-preview th,
          .dark .markdown-preview td {
            border-color: #30363d !important;
          }
          
          .dark .markdown-preview th {
            background-color: #21262d !important;
          }
        `,
        }}
      />
    </ToolLayout>
  );
};

export default MarkdownPreviewer;

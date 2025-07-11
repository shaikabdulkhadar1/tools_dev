import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { apiFetch } from "@/lib/api";

const HashGenerator = () => {
  const [text, setText] = useState("");
  const [algorithm, setAlgorithm] = useState("md5");
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateHash = async () => {
    setLoading(true);
    setError("");
    setHash("");
    try {
      const data = await apiFetch<{ hash: string }>("/hash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, algorithm }),
      });
      setHash(data.hash);
    } catch (e: any) {
      setError(e.message || "Error generating hash");
    }
    setLoading(false);
  };

  return (
    <ToolLayout
      title="Hash Generator"
      description="Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text."
    >
      <div className="max-w-xl mx-auto space-y-4">
        <textarea
          className="w-full border rounded p-2"
          rows={3}
          placeholder="Enter text to hash..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <select
          className="w-full border rounded p-2"
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          <option value="md5">MD5</option>
          <option value="sha1">SHA-1</option>
          <option value="sha256">SHA-256</option>
          <option value="sha512">SHA-512</option>
        </select>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={generateHash}
          disabled={loading || !text}
        >
          {loading ? "Generating..." : "Generate Hash"}
        </button>
        {hash && (
          <div className="break-all bg-slate-100 dark:bg-slate-800 p-2 rounded">
            <strong>Hash:</strong> {hash}
          </div>
        )}
        {error && <div className="text-red-600">{error}</div>}
      </div>
    </ToolLayout>
  );
};

export default HashGenerator;

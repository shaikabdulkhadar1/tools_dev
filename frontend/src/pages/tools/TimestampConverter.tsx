import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { apiFetch } from "@/lib/api";

const TimestampConverter = () => {
  const [value, setValue] = useState("");
  const [type, setType] = useState("to-unix");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const convert = async () => {
    setLoading(true);
    setError("");
    setResult("");
    try {
      const data = await apiFetch<{ result: string }>("/timestamp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value, type }),
      });
      setResult(data.result);
    } catch (e: any) {
      setError(e.message || "Error converting timestamp");
    }
    setLoading(false);
  };

  return (
    <ToolLayout
      title="Timestamp Converter"
      description="Convert between UNIX timestamps and human-readable dates with timezone support."
    >
      <div className="max-w-xl mx-auto space-y-4">
        <input
          className="w-full border rounded p-2"
          type="text"
          placeholder={
            type === "to-unix"
              ? "YYYY-MM-DDTHH:mm:ssZ"
              : "UNIX timestamp (seconds)"
          }
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <select
          className="w-full border rounded p-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="to-unix">Date/Time → UNIX Timestamp</option>
          <option value="from-unix">UNIX Timestamp → Date/Time</option>
        </select>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={convert}
          disabled={loading || !value}
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

export default TimestampConverter;

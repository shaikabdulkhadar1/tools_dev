import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { apiFetch } from "@/lib/api";

const formatOptions = [
  { label: "UNIX Timestamp", value: "unix" },
  { label: "Local Date/Time", value: "local" },
  { label: "ISO (UTC)", value: "iso" },
  { label: "UTC String", value: "utc" },
];

const TimestampConverter = () => {
  const [fromFormat, setFromFormat] = useState("unix");
  const [toFormat, setToFormat] = useState("local");
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    setError("");
    setResults(null);
    setLoading(true);
    try {
      let reqType = "from-unix";
      let reqValue = inputValue;
      // Determine backend type and value based on fromFormat
      if (fromFormat === "unix") {
        reqType = "from-unix";
        reqValue = inputValue;
      } else if (
        fromFormat === "local" ||
        fromFormat === "iso" ||
        fromFormat === "utc"
      ) {
        reqType = "to-unix";
        // For local, iso, utc, just pass the string to backend (Date constructor handles all)
        reqValue = inputValue;
      }
      const data = await apiFetch<any>("/timestamp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: reqValue, type: reqType }),
      });
      setResults(data.formats || null);
    } catch (e: any) {
      setError(e.message || "Error converting timestamp");
    }
    setLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ToolLayout
      title="Timestamp Converter"
      description="Convert between UNIX timestamps, local date/time, ISO, and UTC formats."
    >
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Convert from</label>
            <select
              className="border rounded p-2 w-full"
              value={fromFormat}
              onChange={(e) => setFromFormat(e.target.value)}
            >
              {formatOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1">Convert to</label>
            <select
              className="border rounded p-2 w-full"
              value={toFormat}
              onChange={(e) => setToFormat(e.target.value)}
            >
              {formatOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-1 mt-2">
            Value to convert from
          </label>
          {fromFormat === "unix" ? (
            <input
              className="border rounded p-2 w-full"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="UNIX timestamp (seconds)"
            />
          ) : (
            <input
              className="border rounded p-2 w-full"
              type="datetime-local"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Select date and time"
            />
          )}
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 mt-2"
          onClick={handleConvert}
          disabled={loading || !inputValue}
        >
          {loading ? "Converting..." : "Convert"}
        </button>
        {error && <div className="text-red-600 mt-2">{error}</div>}
        {results && (
          <div className="bg-slate-100 dark:bg-slate-800 rounded p-4 flex flex-col gap-2 mt-4">
            <div className="font-semibold mb-2">All Formats:</div>
            {Object.entries(results).map(([label, value]) => (
              <div key={label} className="flex items-center gap-2">
                <span className="w-40 font-mono text-xs text-slate-500">
                  {label}:
                </span>
                <span className="font-mono break-all">{String(value)}</span>
                <button
                  className="ml-2 px-2 py-1 text-xs bg-slate-200 dark:bg-slate-700 rounded hover:bg-slate-300 dark:hover:bg-slate-600"
                  onClick={() => copyToClipboard(String(value))}
                  title="Copy"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default TimestampConverter;

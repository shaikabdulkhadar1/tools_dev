import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { apiFetch } from "@/lib/api";

const NumberConverter = () => {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState("dec");
  const [to, setTo] = useState("bin");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const convert = async () => {
    setLoading(true);
    setError("");
    setResult("");
    try {
      const data = await apiFetch<{ result: string }>("/number-convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value, from, to }),
      });
      setResult(data.result);
    } catch (e: any) {
      setError(e.message || "Error converting number");
    }
    setLoading(false);
  };

  return (
    <ToolLayout
      title="Number System Converter"
      description="Convert numbers between binary, octal, decimal, and hexadecimal number systems."
    >
      <div className="max-w-xl mx-auto space-y-4">
        <input
          className="w-full border rounded p-2"
          type="text"
          placeholder="Enter value..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex gap-2">
          <select
            className="w-full border rounded p-2"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            <option value="bin">Binary</option>
            <option value="oct">Octal</option>
            <option value="dec">Decimal</option>
            <option value="hex">Hexadecimal</option>
          </select>
          <span className="self-center">to</span>
          <select
            className="w-full border rounded p-2"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            <option value="bin">Binary</option>
            <option value="oct">Octal</option>
            <option value="dec">Decimal</option>
            <option value="hex">Hexadecimal</option>
          </select>
        </div>
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

export default NumberConverter;

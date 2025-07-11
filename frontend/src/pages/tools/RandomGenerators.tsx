import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { apiFetch } from "@/lib/api";

const RandomGenerators = () => {
  const [type, setType] = useState("string");
  const [length, setLength] = useState(12);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateRandom = async () => {
    setLoading(true);
    setError("");
    setResult("");
    try {
      let url = `/random?type=${type}`;
      if (type === "string" || type === "password") {
        url += `&length=${length}`;
      } else if (type === "number") {
        url += `&min=${min}&max=${max}`;
      }
      const data = await apiFetch<{ result: string | number }>(url);
      setResult(String(data.result));
    } catch (e: any) {
      setError(e.message || "Error generating random value");
    }
    setLoading(false);
  };

  return (
    <ToolLayout
      title="Random Generators"
      description="Generate secure passwords, random strings, numbers, and other random data."
    >
      <div className="max-w-xl mx-auto space-y-4">
        <select
          className="w-full border rounded p-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="string">Random String</option>
          <option value="password">Password</option>
          <option value="number">Random Number</option>
        </select>
        {(type === "string" || type === "password") && (
          <input
            type="number"
            className="w-full border rounded p-2"
            min={1}
            max={128}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            placeholder="Length"
          />
        )}
        {type === "number" && (
          <div className="flex gap-2">
            <input
              type="number"
              className="w-full border rounded p-2"
              value={min}
              onChange={(e) => setMin(Number(e.target.value))}
              placeholder="Min"
            />
            <input
              type="number"
              className="w-full border rounded p-2"
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
              placeholder="Max"
            />
          </div>
        )}
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={generateRandom}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
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

export default RandomGenerators;

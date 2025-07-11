import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { apiFetch } from "@/lib/api";

const ColorPicker = () => {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState("hex");
  const [to, setTo] = useState("rgb");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const convert = async () => {
    setLoading(true);
    setError("");
    setResult("");
    try {
      const data = await apiFetch<{ result: string }>("/color-convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value, from, to }),
      });
      setResult(data.result);
    } catch (e: any) {
      setError(e.message || "Error converting color");
    }
    setLoading(false);
  };

  return (
    <ToolLayout
      title="Color Picker & Converter"
      description="Pick colors and convert between different color formats (HEX, RGB, HSL, HSV)."
    >
      <div className="max-w-xl mx-auto space-y-4">
        <input
          className="w-full border rounded p-2"
          type="text"
          placeholder={
            from === "hex" ? "#RRGGBB or #RGB" : "rgb(255, 255, 255)"
          }
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex gap-2">
          <select
            className="w-full border rounded p-2"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            <option value="hex">HEX</option>
            <option value="rgb">RGB</option>
          </select>
          <span className="self-center">to</span>
          <select
            className="w-full border rounded p-2"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            <option value="hex">HEX</option>
            <option value="rgb">RGB</option>
          </select>
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={convert}
          disabled={loading || !value || from === to}
        >
          {loading ? "Converting..." : "Convert"}
        </button>
        {result && (
          <div className="break-all bg-slate-100 dark:bg-slate-800 p-2 rounded">
            <strong>Result:</strong> {result}
            {to === "hex" && result && (
              <span
                className="ml-2 inline-block w-6 h-6 align-middle rounded"
                style={{ background: result }}
              />
            )}
            {to === "rgb" && result && (
              <span
                className="ml-2 inline-block w-6 h-6 align-middle rounded"
                style={{ background: result }}
              />
            )}
          </div>
        )}
        {error && <div className="text-red-600">{error}</div>}
      </div>
    </ToolLayout>
  );
};

export default ColorPicker;

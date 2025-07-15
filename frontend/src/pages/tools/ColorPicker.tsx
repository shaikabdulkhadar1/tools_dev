import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { apiFetch } from "@/lib/api";

const ColorPicker = () => {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState("hex");
  const [to, setTo] = useState("rgb");
  const [result, setResult] = useState("");
  const [allResults, setAllResults] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const convert = async () => {
    setLoading(true);
    setError("");
    setResult("");
    setAllResults({});

    try {
      // Convert to all formats
      const formats = ["hex", "rgb", "hsl", "hsv"];
      const results: { [key: string]: string } = {};

      for (const format of formats) {
        if (format !== from) {
          try {
            const data = await apiFetch<{ result: string }>("/color-convert", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ value, from, to: format }),
            });
            results[format] = data.result;
          } catch (e) {
            results[format] = "Conversion failed";
          }
        } else {
          results[format] = getDisplayValue(value, format);
        }
      }

      setAllResults(results);
      setResult(results[to]);
    } catch (e: any) {
      setError(e.message || "Error converting color");
    }
    setLoading(false);
  };

  const getDisplayValue = (colorValue: string, format: string) => {
    if (!colorValue) return "";
    if (format === "hex" && !colorValue.startsWith("#")) {
      return `#${colorValue}`;
    }
    return colorValue;
  };

  const getColorForDisplay = (colorValue: string, format: string) => {
    if (!colorValue || colorValue === "Conversion failed") return "";

    switch (format) {
      case "hex":
        return colorValue.startsWith("#") ? colorValue : `#${colorValue}`;
      case "rgb":
        return colorValue;
      case "hsl":
        // Convert HSL to RGB for display (simplified)
        return colorValue.replace(/hsl\(([^)]+)\)/, (match, values) => {
          const [h, s, l] = values.split(",").map((v) => parseFloat(v));
          // Simple HSL to RGB conversion
          const hue = h / 360;
          const sat = s / 100;
          const light = l / 100;

          const c = (1 - Math.abs(2 * light - 1)) * sat;
          const x = c * (1 - Math.abs(((hue * 6) % 2) - 1));
          const m = light - c / 2;

          let r = 0,
            g = 0,
            b = 0;
          if (hue < 1 / 6) {
            r = c;
            g = x;
            b = 0;
          } else if (hue < 2 / 6) {
            r = x;
            g = c;
            b = 0;
          } else if (hue < 3 / 6) {
            r = 0;
            g = c;
            b = x;
          } else if (hue < 4 / 6) {
            r = 0;
            g = x;
            b = c;
          } else if (hue < 5 / 6) {
            r = x;
            g = 0;
            b = c;
          } else {
            r = c;
            g = 0;
            b = x;
          }

          return `rgb(${Math.round((r + m) * 255)}, ${Math.round(
            (g + m) * 255
          )}, ${Math.round((b + m) * 255)})`;
        });
      case "hsv":
        // Convert HSV to RGB for display (simplified)
        return colorValue.replace(/hsv\(([^)]+)\)/, (match, values) => {
          const [h, s, v] = values.split(",").map((v) => parseFloat(v));
          // Simple HSV to RGB conversion
          const hue = h / 360;
          const sat = s / 100;
          const val = v / 100;

          const c = val * sat;
          const x = c * (1 - Math.abs(((hue * 6) % 2) - 1));
          const m = val - c;

          let r = 0,
            g = 0,
            b = 0;
          if (hue < 1 / 6) {
            r = c;
            g = x;
            b = 0;
          } else if (hue < 2 / 6) {
            r = x;
            g = c;
            b = 0;
          } else if (hue < 3 / 6) {
            r = 0;
            g = c;
            b = x;
          } else if (hue < 4 / 6) {
            r = 0;
            g = x;
            b = c;
          } else if (hue < 5 / 6) {
            r = x;
            g = 0;
            b = c;
          } else {
            r = c;
            g = 0;
            b = x;
          }

          return `rgb(${Math.round((r + m) * 255)}, ${Math.round(
            (g + m) * 255
          )}, ${Math.round((b + m) * 255)})`;
        });
      default:
        return colorValue;
    }
  };

  return (
    <ToolLayout
      title="Color Picker & Converter"
      description="Pick colors and convert between different color formats (HEX, RGB, HSL, HSV)."
    >
      <div className="max-w-4xl mx-auto space-y-4">
        <input
          className="w-full border rounded p-2"
          type="text"
          placeholder={
            from === "hex"
              ? "#RRGGBB or #RGB"
              : from === "rgb"
              ? "rgb(255, 255, 255)"
              : from === "hsl"
              ? "hsl(0, 100%, 50%)"
              : "hsv(0, 100%, 100%)"
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
            <option value="hsl">HSL</option>
            <option value="hsv">HSV</option>
          </select>
          <span className="self-center">to</span>
          <select
            className="w-full border rounded p-2"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            <option value="hex">HEX</option>
            <option value="rgb">RGB</option>
            <option value="hsl">HSL</option>
            <option value="hsv">HSV</option>
          </select>
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={convert}
          disabled={loading || !value || from === to}
        >
          {loading ? "Converting..." : "Convert"}
        </button>

        {/* Original Color */}
        {value && (
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Original Color
            </h3>
            <div className="flex items-center space-x-3">
              <div
                className="w-12 h-12 rounded border-2 border-slate-300 dark:border-slate-600"
                style={{ background: getDisplayValue(value, from) }}
              />
              <div>
                <p className="font-mono text-sm text-slate-700 dark:text-slate-300">
                  {getDisplayValue(value, from)}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                  {from.toUpperCase()} format
                </p>
              </div>
            </div>
          </div>
        )}

        {/* All Color Formats */}
        {Object.keys(allResults).length > 0 && (
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
              All Color Formats
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {["hex", "rgb", "hsl", "hsv"].map((format) => (
                <div
                  key={format}
                  className="bg-white dark:bg-slate-700 p-3 rounded border"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div
                      className="w-8 h-8 rounded border border-slate-300 dark:border-slate-600"
                      style={{
                        background: getColorForDisplay(
                          allResults[format],
                          format
                        ),
                      }}
                    />
                    <span className="font-semibold text-sm text-slate-900 dark:text-slate-100 capitalize">
                      {format.toUpperCase()}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-slate-700 dark:text-slate-300 break-all">
                    {allResults[format] || "N/A"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && <div className="text-red-600">{error}</div>}
      </div>
    </ToolLayout>
  );
};

export default ColorPicker;

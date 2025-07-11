
import ToolLayout from "@/components/ToolLayout";

const ColorPicker = () => {
  return (
    <ToolLayout
      title="Color Picker & Converter"
      description="Pick colors and convert between different color formats (HEX, RGB, HSL, HSV)"
    >
      <div className="text-center py-20">
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Color Picker Tool
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          This tool is coming soon! It will feature a comprehensive color picker with format conversion.
        </p>
      </div>
    </ToolLayout>
  );
};

export default ColorPicker;

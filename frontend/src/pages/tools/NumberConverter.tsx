
import ToolLayout from "@/components/ToolLayout";

const NumberConverter = () => {
  return (
    <ToolLayout
      title="Number System Converter"
      description="Convert numbers between binary, octal, decimal, and hexadecimal number systems"
    >
      <div className="text-center py-20">
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Number System Converter
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          This tool is coming soon! It will convert between different number systems.
        </p>
      </div>
    </ToolLayout>
  );
};

export default NumberConverter;

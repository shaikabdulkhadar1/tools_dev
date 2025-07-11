
import ToolLayout from "@/components/ToolLayout";

const TimestampConverter = () => {
  return (
    <ToolLayout
      title="Timestamp Converter"
      description="Convert between UNIX timestamps and human-readable dates with timezone support"
    >
      <div className="text-center py-20">
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Timestamp Converter
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          This tool is coming soon! It will convert timestamps and dates.
        </p>
      </div>
    </ToolLayout>
  );
};

export default TimestampConverter;

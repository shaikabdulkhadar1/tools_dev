
import ToolLayout from "@/components/ToolLayout";

const DiffChecker = () => {
  return (
    <ToolLayout
      title="Diff Checker"
      description="Compare two text snippets and highlight the differences with detailed analysis"
    >
      <div className="text-center py-20">
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Diff Checker
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          This tool is coming soon! It will compare text and highlight differences.
        </p>
      </div>
    </ToolLayout>
  );
};

export default DiffChecker;


import ToolLayout from "@/components/ToolLayout";

const CaseConverter = () => {
  return (
    <ToolLayout
      title="Case Converter"
      description="Convert text between different case formats including camelCase, snake_case, kebab-case, and more"
    >
      <div className="text-center py-20">
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Case Converter
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          This tool is coming soon! It will convert text between different case formats.
        </p>
      </div>
    </ToolLayout>
  );
};

export default CaseConverter;

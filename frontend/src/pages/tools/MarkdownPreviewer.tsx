
import ToolLayout from "@/components/ToolLayout";

const MarkdownPreviewer = () => {
  return (
    <ToolLayout
      title="Markdown Previewer"
      description="Write and preview Markdown with live rendering and syntax highlighting"
    >
      <div className="text-center py-20">
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Markdown Previewer
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          This tool is coming soon! It will feature live Markdown preview with syntax highlighting.
        </p>
      </div>
    </ToolLayout>
  );
};

export default MarkdownPreviewer;


import ToolLayout from "@/components/ToolLayout";

const HashGenerator = () => {
  return (
    <ToolLayout
      title="Hash Generator"
      description="Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text or files"
    >
      <div className="text-center py-20">
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Hash Generator
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          This tool is coming soon! It will generate various types of hashes.
        </p>
      </div>
    </ToolLayout>
  );
};

export default HashGenerator;

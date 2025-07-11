
import ToolLayout from "@/components/ToolLayout";

const TextEncoder = () => {
  return (
    <ToolLayout
      title="Text Encoder & Decoder"
      description="Encode and decode text in various formats including URL, HTML entities, ASCII, and UTF-8"
    >
      <div className="text-center py-20">
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Text Encoder/Decoder
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          This tool is coming soon! It will support multiple text encoding formats.
        </p>
      </div>
    </ToolLayout>
  );
};

export default TextEncoder;

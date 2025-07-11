
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Copy, Download, Upload, RefreshCw, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ToolLayout from "@/components/ToolLayout";

const JsonFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setIsValid(true);
      toast({
        title: "Success",
        description: "JSON formatted successfully!",
      });
    } catch (error) {
      setIsValid(false);
      setOutput("Invalid JSON: " + (error as Error).message);
      toast({
        title: "Error",
        description: "Invalid JSON format",
        variant: "destructive",
      });
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setIsValid(true);
      toast({
        title: "Success",
        description: "JSON minified successfully!",
      });
    } catch (error) {
      setIsValid(false);
      setOutput("Invalid JSON: " + (error as Error).message);
    }
  };

  const copyToClipboard = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "JSON copied to clipboard",
      });
    }
  };

  const downloadJson = () => {
    if (output && isValid) {
      const blob = new Blob([output], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'formatted.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setInput(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setIsValid(true);
  };

  return (
    <ToolLayout
      title="JSON Formatter & Validator"
      description="Format, validate, and beautify JSON data with syntax highlighting and error detection"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Input JSON</h3>
            <div className="flex items-center space-x-2">
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
                id="json-upload"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('json-upload')?.click()}
                className="hover:scale-105 transition-transform duration-200"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON here..."
            className="min-h-[400px] font-mono text-sm bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500 transition-colors duration-200"
          />
          <div className="flex items-center space-x-2 mt-4">
            <Button 
              onClick={formatJson}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200"
            >
              Format JSON
            </Button>
            <Button 
              onClick={minifyJson}
              variant="outline"
              className="hover:scale-105 transition-transform duration-200"
            >
              Minify
            </Button>
            <Button 
              onClick={clearAll}
              variant="outline"
              className="hover:scale-105 transition-transform duration-200"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </Card>

        {/* Output Section */}
        <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Formatted Output</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                disabled={!output}
                className="hover:scale-105 transition-transform duration-200"
              >
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadJson}
                disabled={!output || !isValid}
                className="hover:scale-105 transition-transform duration-200"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          <Textarea
            value={output}
            readOnly
            className={`min-h-[400px] font-mono text-sm ${
              isValid 
                ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' 
                : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
            } transition-colors duration-200`}
            placeholder="Formatted JSON will appear here..."
          />
          {output && (
            <div className="mt-4 flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isValid ? 'bg-green-500 animate-pulse' : 'bg-red-500 animate-pulse'}`} />
              <span className={`text-sm ${isValid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {isValid ? 'Valid JSON' : 'Invalid JSON'}
              </span>
            </div>
          )}
        </Card>
      </div>
    </ToolLayout>
  );
};

export default JsonFormatter;

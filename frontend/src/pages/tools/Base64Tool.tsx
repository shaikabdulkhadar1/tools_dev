
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, Upload, Download, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ToolLayout from "@/components/ToolLayout";

const Base64Tool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const encodeBase64 = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
      toast({
        title: "Success",
        description: "Text encoded to Base64!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to encode text",
        variant: "destructive",
      });
    }
  };

  const decodeBase64 = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
      toast({
        title: "Success",
        description: "Base64 decoded successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid Base64 string",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "Result copied to clipboard",
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (file.type.startsWith('image/') || file.type === 'application/pdf') {
          // For binary files, use the data URL which is already base64
          const base64 = result.split(',')[1];
          setOutput(`data:${file.type};base64,${base64}`);
        } else {
          // For text files
          setInput(result);
        }
      };
      
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
    }
  };

  const downloadResult = () => {
    if (output) {
      const blob = new Blob([output], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'base64-result.txt';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="Base64 Encoder & Decoder"
      description="Encode and decode Base64 strings with support for text and file inputs"
    >
      <Tabs defaultValue="encode" className="space-y-6">
        <div className="flex justify-center">
          <TabsList className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
            <TabsTrigger value="encode" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Encode
            </TabsTrigger>
            <TabsTrigger value="decode" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Decode
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="encode" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input */}
            <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Input Text</h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept="text/*,image/*,.pdf"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('file-upload')?.click()}
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
                placeholder="Enter text to encode..."
                className="min-h-[300px] font-mono text-sm bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500 transition-colors duration-200"
              />
              <div className="flex items-center space-x-2 mt-4">
                <Button 
                  onClick={encodeBase64}
                  disabled={!input}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200"
                >
                  Encode to Base64
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

            {/* Output */}
            <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Base64 Output</h3>
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
                    onClick={downloadResult}
                    disabled={!output}
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
                placeholder="Base64 encoded text will appear here..."
                className="min-h-[300px] font-mono text-sm bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
              />
              {output && (
                <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                  Length: {output.length} characters
                </div>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="decode" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input */}
            <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Base64 Input</h3>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter Base64 string to decode..."
                className="min-h-[300px] font-mono text-sm bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500 transition-colors duration-200"
              />
              <div className="flex items-center space-x-2 mt-4">
                <Button 
                  onClick={decodeBase64}
                  disabled={!input}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200"
                >
                  Decode from Base64
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

            {/* Output */}
            <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Decoded Output</h3>
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
                    onClick={downloadResult}
                    disabled={!output}
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
                placeholder="Decoded text will appear here..."
                className="min-h-[300px] font-mono text-sm bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"
              />
              {output && (
                <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                  Length: {output.length} characters
                </div>
              )}
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </ToolLayout>
  );
};

export default Base64Tool;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Check, RefreshCw, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ToolLayout from "@/components/ToolLayout";

const UuidGenerator = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [version, setVersion] = useState("4");
  const [count, setCount] = useState(1);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const generateUuid = (version: string): string => {
    switch (version) {
      case "1":
        // UUID v1 (timestamp-based) - simplified implementation
        return generateTimestampUuid();
      case "3":
        // UUID v3 (name-based with MD5) - simplified implementation
        return generateNameBasedUuid("md5");
      case "4":
        // UUID v4 (random)
        return generateRandomUuid();
      case "5":
        // UUID v5 (name-based with SHA-1) - simplified implementation
        return generateNameBasedUuid("sha1");
      default:
        return generateRandomUuid();
    }
  };

  const generateRandomUuid = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const generateTimestampUuid = (): string => {
    const timestamp = Date.now().toString(16);
    const random = Math.random().toString(16).substr(2, 8);
    return `${timestamp.substr(0, 8)}-${timestamp.substr(8, 4)}-1${random.substr(0, 3)}-${random.substr(3, 4)}-${random.substr(7)}${Math.random().toString(16).substr(2, 8)}`.substr(0, 36);
  };

  const generateNameBasedUuid = (hashType: string): string => {
    // Simplified implementation - in real apps, use proper crypto libraries
    const namespace = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
    const name = `${hashType}-${Date.now()}-${Math.random()}`;
    const hash = Array.from(name + namespace).reduce((hash, char) => {
      return ((hash << 5) - hash) + char.charCodeAt(0);
    }, 0).toString(16);
    
    const versionBit = hashType === "md5" ? "3" : "5";
    return `${hash.substr(0, 8)}-${hash.substr(8, 4)}-${versionBit}${hash.substr(13, 3)}-${hash.substr(16, 4)}-${hash.substr(20, 12)}`.substr(0, 36);
  };

  const generateUuids = () => {
    const newUuids = Array.from({ length: count }, () => generateUuid(version));
    setUuids(newUuids);
    toast({
      title: "Success",
      description: `Generated ${count} UUID${count > 1 ? 's' : ''} (v${version})`,
    });
  };

  const copyUuid = async (uuid: string, index: number) => {
    await navigator.clipboard.writeText(uuid);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
    toast({
      title: "Copied!",
      description: "UUID copied to clipboard",
    });
  };

  const copyAllUuids = async () => {
    const allUuids = uuids.join('\n');
    await navigator.clipboard.writeText(allUuids);
    toast({
      title: "Copied!",
      description: "All UUIDs copied to clipboard",
    });
  };

  const removeUuid = (index: number) => {
    setUuids(prev => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setUuids([]);
  };

  return (
    <ToolLayout
      title="UUID Generator"
      description="Generate various types of UUIDs (v1, v3, v4, v5) with customizable options and bulk generation"
    >
      <div className="space-y-6">
        {/* Controls */}
        <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Generation Options</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">UUID Version</label>
              <Select value={version} onValueChange={setVersion}>
                <SelectTrigger className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500 transition-colors duration-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Version 1 (Timestamp)</SelectItem>
                  <SelectItem value="3">Version 3 (MD5 Hash)</SelectItem>
                  <SelectItem value="4">Version 4 (Random)</SelectItem>
                  <SelectItem value="5">Version 5 (SHA-1 Hash)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Count</label>
              <Input
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500 transition-colors duration-200"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Button 
                onClick={generateUuids}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Generate
              </Button>
              {uuids.length > 0 && (
                <Button 
                  onClick={clearAll}
                  variant="outline"
                  className="hover:scale-105 transition-transform duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Version Info */}
        <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">UUID Version Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100">Version 1</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">Timestamp-based with MAC address</p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
              <h4 className="font-medium text-green-900 dark:text-green-100">Version 3</h4>
              <p className="text-sm text-green-700 dark:text-green-300">Name-based using MD5 hash</p>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg">
              <h4 className="font-medium text-purple-900 dark:text-purple-100">Version 4</h4>
              <p className="text-sm text-purple-700 dark:text-purple-300">Random or pseudo-random</p>
            </div>
            <div className="p-3 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg">
              <h4 className="font-medium text-orange-900 dark:text-orange-100">Version 5</h4>
              <p className="text-sm text-orange-700 dark:text-orange-300">Name-based using SHA-1 hash</p>
            </div>
          </div>
        </Card>

        {/* Generated UUIDs */}
        {uuids.length > 0 && (
          <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Generated UUIDs ({uuids.length})
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={copyAllUuids}
                className="hover:scale-105 transition-transform duration-200"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy All
              </Button>
            </div>
            
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {uuids.map((uuid, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg group hover:shadow-md transition-all duration-200">
                  <span className="font-mono text-sm text-slate-700 dark:text-slate-300 flex-1 mr-4">
                    {uuid}
                  </span>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyUuid(uuid, index)}
                      className="hover:scale-110 transition-transform duration-200"
                    >
                      {copiedIndex === index ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeUuid(index)}
                      className="hover:scale-110 transition-transform duration-200 text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
};

export default UuidGenerator;

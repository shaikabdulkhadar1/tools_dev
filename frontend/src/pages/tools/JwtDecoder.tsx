
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, Check, AlertTriangle, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ToolLayout from "@/components/ToolLayout";

const JwtDecoder = () => {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [signature, setSignature] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [copied, setCopied] = useState("");
  const { toast } = useToast();

  const decodeJwt = () => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
      }

      const decodedHeader = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      const decodedPayload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      
      setHeader(JSON.stringify(decodedHeader, null, 2));
      setPayload(JSON.stringify(decodedPayload, null, 2));
      setSignature(parts[2]);
      setIsValid(true);

      toast({
        title: "Success",
        description: "JWT decoded successfully!",
      });
    } catch (error) {
      setIsValid(false);
      setHeader("");
      setPayload("");
      setSignature("");
      toast({
        title: "Error",
        description: "Invalid JWT format",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    });
  };

  const isTokenExpired = () => {
    try {
      if (!payload) return null;
      const parsed = JSON.parse(payload);
      if (!parsed.exp) return null;
      return Date.now() >= parsed.exp * 1000;
    } catch {
      return null;
    }
  };

  const getExpirationTime = () => {
    try {
      if (!payload) return null;
      const parsed = JSON.parse(payload);
      if (!parsed.exp) return null;
      return new Date(parsed.exp * 1000).toLocaleString();
    } catch {
      return null;
    }
  };

  const expired = isTokenExpired();
  const expirationTime = getExpirationTime();

  return (
    <ToolLayout
      title="JWT Decoder & Analyzer"
      description="Decode and analyze JSON Web Tokens with detailed payload inspection and validation"
    >
      <div className="space-y-6">
        {/* Input Section */}
        <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">JWT Token</h3>
          <div className="space-y-4">
            <Input
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste your JWT token here..."
              className="font-mono text-sm bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500 transition-colors duration-200"
            />
            <Button 
              onClick={decodeJwt}
              disabled={!token}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200"
            >
              <Shield className="h-4 w-4 mr-2" />
              Decode JWT
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        {isValid && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Header */}
            <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Header</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(header, "Header")}
                  className="hover:scale-105 transition-transform duration-200"
                >
                  {copied === "Header" ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {copied === "Header" ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              <Textarea
                value={header}
                readOnly
                className="min-h-[200px] font-mono text-sm bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"
              />
            </Card>

            {/* Payload */}
            <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Payload</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(payload, "Payload")}
                  className="hover:scale-105 transition-transform duration-200"
                >
                  {copied === "Payload" ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {copied === "Payload" ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              <Textarea
                value={payload}
                readOnly
                className="min-h-[200px] font-mono text-sm bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
              />
              
              {/* Expiration Info */}
              {expirationTime && (
                <div className="mt-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center space-x-2">
                    {expired ? (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    ) : (
                      <Shield className="h-5 w-5 text-green-500" />
                    )}
                    <div>
                      <p className={`font-medium ${expired ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                        {expired ? 'Token Expired' : 'Token Valid'}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Expires: {expirationTime}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Signature */}
            <Card className="p-6 lg:col-span-2 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Signature</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(signature, "Signature")}
                  className="hover:scale-105 transition-transform duration-200"
                >
                  {copied === "Signature" ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {copied === "Signature" ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                <p className="font-mono text-sm break-all text-slate-700 dark:text-slate-300">{signature}</p>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                ⚠️ Signature verification requires the secret key and is not performed in this tool for security reasons.
              </p>
            </Card>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default JwtDecoder;

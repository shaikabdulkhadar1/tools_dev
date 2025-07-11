
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Search, Copy, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ToolLayout from "@/components/ToolLayout";

const RegexTester = () => {
  const [regex, setRegex] = useState("");
  const [testString, setTestString] = useState("");
  const [flags, setFlags] = useState({
    global: true,
    ignoreCase: false,
    multiline: false,
    dotAll: false,
    unicode: false,
    sticky: false
  });
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const testRegex = () => {
    try {
      if (!regex) {
        setError("Please enter a regex pattern");
        return;
      }

      const flagsString = Object.entries(flags)
        .filter(([_, value]) => value)
        .map(([key, _]) => {
          switch (key) {
            case 'global': return 'g';
            case 'ignoreCase': return 'i';
            case 'multiline': return 'm';
            case 'dotAll': return 's';
            case 'unicode': return 'u';
            case 'sticky': return 'y';
            default: return '';
          }
        })
        .join('');

      const regexObj = new RegExp(regex, flagsString);
      const allMatches: RegExpMatchArray[] = [];

      if (flags.global) {
        let match;
        const globalRegex = new RegExp(regex, flagsString);
        while ((match = globalRegex.exec(testString)) !== null) {
          allMatches.push(match);
          if (!flagsString.includes('g')) break;
        }
      } else {
        const match = testString.match(regexObj);
        if (match) allMatches.push(match);
      }

      setMatches(allMatches);
      setError("");
      
      toast({
        title: "Success",
        description: `Found ${allMatches.length} match${allMatches.length !== 1 ? 'es' : ''}`,
      });
    } catch (err) {
      setError((err as Error).message);
      setMatches([]);
      toast({
        title: "Error",
        description: "Invalid regex pattern",
        variant: "destructive",
      });
    }
  };

  const highlightMatches = (text: string) => {
    if (!matches.length) return text;

    let highlightedText = text;
    const matchPositions: { start: number; end: number; match: string }[] = [];

    matches.forEach(match => {
      if (match.index !== undefined) {
        matchPositions.push({
          start: match.index,
          end: match.index + match[0].length,
          match: match[0]
        });
      }
    });

    matchPositions.sort((a, b) => b.start - a.start);

    matchPositions.forEach(({ start, end }) => {
      highlightedText = 
        highlightedText.slice(0, start) +
        `<mark class="bg-yellow-300 dark:bg-yellow-600 px-1 rounded">${highlightedText.slice(start, end)}</mark>` +
        highlightedText.slice(end);
    });

    return highlightedText;
  };

  const copyMatches = async () => {
    const matchText = matches.map(match => match[0]).join('\n');
    await navigator.clipboard.writeText(matchText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied!",
      description: "Matches copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Regex Tester & Debugger"
      description="Test regular expressions with real-time matching, highlighting, and detailed match information"
    >
      <div className="space-y-6">
        {/* Regex Input */}
        <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Regular Expression</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-mono text-slate-600 dark:text-slate-400">/</span>
              <Input
                value={regex}
                onChange={(e) => setRegex(e.target.value)}
                placeholder="Enter your regex pattern here..."
                className="font-mono bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500 transition-colors duration-200"
              />
              <span className="text-lg font-mono text-slate-600 dark:text-slate-400">/</span>
              <span className="text-sm font-mono text-blue-600 dark:text-blue-400">
                {Object.entries(flags)
                  .filter(([_, value]) => value)
                  .map(([key, _]) => {
                    switch (key) {
                      case 'global': return 'g';
                      case 'ignoreCase': return 'i';
                      case 'multiline': return 'm';
                      case 'dotAll': return 's';
                      case 'unicode': return 'u';
                      case 'sticky': return 'y';
                      default: return '';
                    }
                  })
                  .join('')}
              </span>
            </div>

            {/* Flags */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(flags).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Switch
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) => setFlags(prev => ({ ...prev, [key]: checked }))}
                  />
                  <Label htmlFor={key} className="text-sm capitalize cursor-pointer">
                    {key === 'ignoreCase' ? 'Ignore Case' : 
                     key === 'dotAll' ? 'Dot All' : key}
                  </Label>
                </div>
              ))}
            </div>

            <Button 
              onClick={testRegex}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200"
            >
              <Search className="h-4 w-4 mr-2" />
              Test Regex
            </Button>
          </div>
        </Card>

        {/* Test String */}
        <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Test String</h3>
          <Textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter the text you want to test against your regex..."
            className="min-h-[200px] font-mono text-sm bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500 transition-colors duration-200"
          />
        </Card>

        {/* Results */}
        {(matches.length > 0 || error) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Highlighted Text */}
            <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Highlighted Matches</h3>
              {error ? (
                <div className="flex items-center space-x-2 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="text-red-600 dark:text-red-400">{error}</span>
                </div>
              ) : (
                <div 
                  className="p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm whitespace-pre-wrap break-words"
                  dangerouslySetInnerHTML={{ __html: highlightMatches(testString) }}
                />
              )}
            </Card>

            {/* Match Details */}
            <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Matches ({matches.length})
                </h3>
                {matches.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyMatches}
                    className="hover:scale-105 transition-transform duration-200"
                  >
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                )}
              </div>
              
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {matches.map((match, index) => (
                  <div key={index} className="p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">Match {index + 1}</Badge>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Position: {match.index}-{(match.index || 0) + match[0].length}
                      </span>
                    </div>
                    <p className="font-mono text-sm bg-yellow-100 dark:bg-yellow-900/20 px-2 py-1 rounded border border-yellow-200 dark:border-yellow-800">
                      {match[0]}
                    </p>
                    {match.length > 1 && (
                      <div className="mt-2 space-y-1">
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Groups:</p>
                        {match.slice(1).map((group, groupIndex) => (
                          <p key={groupIndex} className="text-xs font-mono pl-4 text-slate-500 dark:text-slate-400">
                            ${groupIndex + 1}: {group || '(no match)'}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default RegexTester;

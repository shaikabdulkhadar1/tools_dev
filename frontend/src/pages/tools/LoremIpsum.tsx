
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Copy, Check, RefreshCw, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ToolLayout from "@/components/ToolLayout";

const LoremIpsum = () => {
  const [output, setOutput] = useState("");
  const [count, setCount] = useState(5);
  const [type, setType] = useState("paragraphs");
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'at', 'vero', 'eos',
    'accusamus', 'accusantium', 'doloremque', 'laudantium', 'totam', 'rem',
    'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo', 'inventore', 'veritatis',
    'et', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta', 'sunt', 'explicabo'
  ];

  const generateWords = (count: number): string => {
    const words = [];
    const startIndex = startWithLorem ? 0 : Math.floor(Math.random() * loremWords.length);
    
    for (let i = 0; i < count; i++) {
      if (i === 0 && startWithLorem) {
        words.push('Lorem');
      } else {
        const randomIndex = (startIndex + i) % loremWords.length;
        words.push(loremWords[randomIndex]);
      }
    }
    
    return words.join(' ') + '.';
  };

  const generateSentences = (count: number): string => {
    const sentences = [];
    
    for (let i = 0; i < count; i++) {
      const wordsInSentence = Math.floor(Math.random() * 10) + 8; // 8-17 words per sentence
      let sentence = generateWords(wordsInSentence);
      
      if (i === 0 && startWithLorem) {
        sentence = sentence.replace(/^lorem/i, 'Lorem');
      } else {
        sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
      }
      
      sentences.push(sentence);
    }
    
    return sentences.join(' ');
  };

  const generateParagraphs = (count: number): string => {
    const paragraphs = [];
    
    for (let i = 0; i < count; i++) {
      const sentencesInParagraph = Math.floor(Math.random() * 5) + 3; // 3-7 sentences per paragraph
      const paragraph = generateSentences(sentencesInParagraph);
      paragraphs.push(paragraph);
    }
    
    return paragraphs.join('\n\n');
  };

  const generateLorem = () => {
    let result = '';
    
    switch (type) {
      case 'words':
        result = generateWords(count);
        break;
      case 'sentences':
        result = generateSentences(count);
        break;
      case 'paragraphs':
        result = generateParagraphs(count);
        break;
      default:
        result = generateParagraphs(count);
    }
    
    setOutput(result);
    toast({
      title: "Generated!",
      description: `Generated ${count} ${type} of Lorem Ipsum text`,
    });
  };

  const copyToClipboard = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "Lorem Ipsum text copied to clipboard",
      });
    }
  };

  const clearOutput = () => {
    setOutput("");
  };

  return (
    <ToolLayout
      title="Lorem Ipsum Generator"
      description="Generate placeholder text in words, sentences, or paragraphs for your designs and mockups"
    >
      <div className="space-y-6">
        {/* Controls */}
        <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Generation Options</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Type</label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500 transition-colors duration-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="words">Words</SelectItem>
                  <SelectItem value="sentences">Sentences</SelectItem>
                  <SelectItem value="paragraphs">Paragraphs</SelectItem>
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

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Options</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="start-with-lorem"
                  checked={startWithLorem}
                  onCheckedChange={setStartWithLorem}
                />
                <Label htmlFor="start-with-lorem" className="text-sm cursor-pointer">
                  Start with "Lorem"
                </Label>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button 
                onClick={generateLorem}
                className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 transform hover:scale-105 transition-all duration-200"
              >
                <FileText className="h-4 w-4 mr-2" />
                Generate
              </Button>
              {output && (
                <Button 
                  onClick={clearOutput}
                  variant="outline"
                  className="hover:scale-105 transition-transform duration-200"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Output */}
        <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Generated Text</h3>
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
          </div>
          
          <Textarea
            value={output}
            readOnly
            placeholder="Generated Lorem Ipsum text will appear here..."
            className="min-h-[400px] text-sm leading-relaxed bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700"
          />
          
          {output && (
            <div className="mt-4 flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center space-x-4">
                <span>Characters: {output.length}</span>
                <span>Words: {output.split(/\s+/).filter(word => word.length > 0).length}</span>
                <span>Sentences: {output.split(/[.!?]+/).filter(s => s.trim().length > 0).length}</span>
                <span>Paragraphs: {output.split(/\n\s*\n/).filter(p => p.trim().length > 0).length}</span>
              </div>
            </div>
          )}
        </Card>

        {/* Info */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">About Lorem Ipsum</h3>
          <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's 
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled 
            it to make a type specimen book. It is used because it has a more-or-less normal distribution of letters, 
            making it look like readable English.
          </p>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default LoremIpsum;

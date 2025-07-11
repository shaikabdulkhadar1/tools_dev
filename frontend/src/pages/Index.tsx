
import ToolCard from "@/components/ToolCard";
import { 
  Code2, 
  Key, 
  Search, 
  Hash, 
  Fingerprint, 
  FileText, 
  Palette, 
  Eye, 
  Clock,
  Type,
  Calculator,
  GitCompare,
  CaseSensitive,
  Minimize2,
  Timer,
  Shield,
  AlignLeft,
  Shuffle
} from "lucide-react";

const Index = () => {
  const coreTools = [
    {
      title: "JSON Formatter",
      description: "Format, validate, and beautify JSON data with syntax highlighting",
      icon: Code2,
      href: "/tools/json-formatter",
      gradient: "bg-gradient-to-br from-green-500 to-emerald-600"
    },
    {
      title: "JWT Decoder",
      description: "Decode and verify JSON Web Tokens with detailed payload inspection",
      icon: Key,
      href: "/tools/jwt-decoder",
      gradient: "bg-gradient-to-br from-orange-500 to-red-600"
    },
    {
      title: "Regex Tester",
      description: "Test regular expressions with real-time matching and explanations",
      icon: Search,
      href: "/tools/regex-tester",
      gradient: "bg-gradient-to-br from-purple-500 to-indigo-600"
    },
    {
      title: "Base64 Encoder/Decoder",
      description: "Encode and decode Base64 strings with file support",
      icon: Hash,
      href: "/tools/base64",
      gradient: "bg-gradient-to-br from-blue-500 to-cyan-600"
    },
    {
      title: "UUID Generator",
      description: "Generate various types of UUIDs with customizable options",
      icon: Fingerprint,
      href: "/tools/uuid-generator",
      gradient: "bg-gradient-to-br from-teal-500 to-green-600"
    },
    {
      title: "Lorem Ipsum",
      description: "Generate placeholder text for your designs and mockups",
      icon: FileText,
      href: "/tools/lorem-ipsum",
      gradient: "bg-gradient-to-br from-yellow-500 to-orange-600"
    },
    {
      title: "Color Picker",
      description: "Pick colors and convert between different color formats",
      icon: Palette,
      href: "/tools/color-picker",
      gradient: "bg-gradient-to-br from-pink-500 to-rose-600"
    },
    {
      title: "Markdown Previewer",
      description: "Write and preview Markdown with live rendering",
      icon: Eye,
      href: "/tools/markdown-previewer",
      gradient: "bg-gradient-to-br from-slate-500 to-gray-600"
    },
    {
      title: "Cron Expression Tester",
      description: "Build and test cron expressions with human-readable descriptions",
      icon: Clock,
      href: "/tools/cron-tester",
      gradient: "bg-gradient-to-br from-indigo-500 to-purple-600"
    }
  ];

  const additionalTools = [
    {
      title: "Text Encoder/Decoder",
      description: "Encode and decode text in various formats (URL, HTML, ASCII, UTF-8)",
      icon: Type,
      href: "/tools/text-encoder",
      gradient: "bg-gradient-to-br from-cyan-500 to-blue-600"
    },
    {
      title: "Number System Converter",
      description: "Convert numbers between binary, octal, decimal, and hexadecimal",
      icon: Calculator,
      href: "/tools/number-converter",
      gradient: "bg-gradient-to-br from-emerald-500 to-teal-600"
    },
    {
      title: "Diff Checker",
      description: "Compare two text snippets and highlight the differences",
      icon: GitCompare,
      href: "/tools/diff-checker",
      gradient: "bg-gradient-to-br from-red-500 to-pink-600"
    },
    {
      title: "Case Converter",
      description: "Convert text between different case formats (camelCase, snake_case, etc.)",
      icon: CaseSensitive,
      href: "/tools/case-converter",
      gradient: "bg-gradient-to-br from-violet-500 to-purple-600"
    },
    {
      title: "Minifier & Beautifier",
      description: "Minify and beautify HTML, CSS, and JavaScript code",
      icon: Minimize2,
      href: "/tools/minifier",
      gradient: "bg-gradient-to-br from-amber-500 to-yellow-600"
    },
    {
      title: "Timestamp Converter", 
      description: "Convert between UNIX timestamps and human-readable dates",
      icon: Timer,
      href: "/tools/timestamp-converter",
      gradient: "bg-gradient-to-br from-lime-500 to-green-600"
    },
    {
      title: "Hash Generator",
      description: "Generate MD5, SHA1, SHA256, and SHA512 hashes from text or files",
      icon: Shield,
      href: "/tools/hash-generator",
      gradient: "bg-gradient-to-br from-rose-500 to-red-600"
    },
    {
      title: "String Utilities",
      description: "Count words/characters, remove duplicates, trim spaces, and more",
      icon: AlignLeft,
      href: "/tools/string-utils",
      gradient: "bg-gradient-to-br from-sky-500 to-blue-600"
    },
    {
      title: "Random Generators",
      description: "Generate secure passwords, random strings, and numbers",
      icon: Shuffle,
      href: "/tools/random-generators",
      gradient: "bg-gradient-to-br from-fuchsia-500 to-pink-600"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="relative inline-block">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
              Developer Tools Hub
            </h1>
            {/* Floating particles */}
            <div className="absolute -top-4 -right-4 w-3 h-3 bg-blue-400 rounded-full animate-bounce" />
            <div className="absolute -bottom-2 -left-6 w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
            <div className="absolute top-1/2 -right-8 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
          </div>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            A comprehensive collection of essential developer tools, beautifully designed and optimized for productivity. 
            Format JSON, decode JWTs, test regex patterns, and much more.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center space-x-8 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>{coreTools.length + additionalTools.length} Tools Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span>Fast & Responsive</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span>Privacy Focused</span>
            </div>
          </div>
        </div>

        {/* Core Tools Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Essential Tools
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              The most commonly used developer utilities for daily tasks
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreTools.map((tool, index) => (
              <ToolCard
                key={tool.href}
                {...tool}
                delay={index * 100}
              />
            ))}
          </div>
        </section>

        {/* Additional Tools Section */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Power Tools
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Advanced utilities for specialized development needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalTools.map((tool, index) => (
              <ToolCard
                key={tool.href}
                {...tool}
                delay={(index + coreTools.length) * 100}
              />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-slate-200/50 dark:border-slate-700/50 text-center">
          <p className="text-slate-500 dark:text-slate-400">
            Built with ❤️ for developers. All processing happens locally in your browser.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

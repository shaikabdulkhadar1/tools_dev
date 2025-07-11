
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";

// Tool Pages
import JsonFormatter from "./pages/tools/JsonFormatter";
import JwtDecoder from "./pages/tools/JwtDecoder";
import RegexTester from "./pages/tools/RegexTester";
import Base64Tool from "./pages/tools/Base64Tool";
import UuidGenerator from "./pages/tools/UuidGenerator";
import LoremIpsum from "./pages/tools/LoremIpsum";
import ColorPicker from "./pages/tools/ColorPicker";
import MarkdownPreviewer from "./pages/tools/MarkdownPreviewer";
import CronTester from "./pages/tools/CronTester";
import TextEncoder from "./pages/tools/TextEncoder";
import NumberConverter from "./pages/tools/NumberConverter";
import DiffChecker from "./pages/tools/DiffChecker";
import CaseConverter from "./pages/tools/CaseConverter";
import Minifier from "./pages/tools/Minifier";
import TimestampConverter from "./pages/tools/TimestampConverter";
import HashGenerator from "./pages/tools/HashGenerator";
import StringUtils from "./pages/tools/StringUtils";
import RandomGenerators from "./pages/tools/RandomGenerators";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tools/json-formatter" element={<JsonFormatter />} />
            <Route path="/tools/jwt-decoder" element={<JwtDecoder />} />
            <Route path="/tools/regex-tester" element={<RegexTester />} />
            <Route path="/tools/base64" element={<Base64Tool />} />
            <Route path="/tools/uuid-generator" element={<UuidGenerator />} />
            <Route path="/tools/lorem-ipsum" element={<LoremIpsum />} />
            <Route path="/tools/color-picker" element={<ColorPicker />} />
            <Route path="/tools/markdown-previewer" element={<MarkdownPreviewer />} />
            <Route path="/tools/cron-tester" element={<CronTester />} />
            <Route path="/tools/text-encoder" element={<TextEncoder />} />
            <Route path="/tools/number-converter" element={<NumberConverter />} />
            <Route path="/tools/diff-checker" element={<DiffChecker />} />
            <Route path="/tools/case-converter" element={<CaseConverter />} />
            <Route path="/tools/minifier" element={<Minifier />} />
            <Route path="/tools/timestamp-converter" element={<TimestampConverter />} />
            <Route path="/tools/hash-generator" element={<HashGenerator />} />
            <Route path="/tools/string-utils" element={<StringUtils />} />
            <Route path="/tools/random-generators" element={<RandomGenerators />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

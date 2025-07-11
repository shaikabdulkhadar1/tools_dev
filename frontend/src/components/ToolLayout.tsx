
import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ToolLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

const ToolLayout = ({ title, description, children }: ToolLayoutProps) => {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mb-6 hover:scale-105 transition-transform duration-200"
          >
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tools
            </Link>
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              {title}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              {description}
            </p>
          </div>
        </div>

        {/* Tool Content */}
        <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ToolLayout;

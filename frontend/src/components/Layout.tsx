
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Github, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/" 
              className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DT</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Dev Tools Hub
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="hover:scale-110 transition-transform duration-200 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="hover:scale-110 transition-transform duration-200 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>

              {location.pathname !== "/" && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="hover:scale-105 transition-transform duration-200 border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50"
                >
                  <Link to="/">
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>
    </div>
  );
};

export default Layout;

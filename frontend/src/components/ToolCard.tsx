
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  gradient: string;
  delay?: number;
}

const ToolCard = ({ title, description, icon: Icon, href, gradient, delay = 0 }: ToolCardProps) => {
  return (
    <Link 
      to={href}
      className={`group block animate-fade-in`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <Card className="relative h-full p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:border-slate-300/70 dark:hover:border-slate-600/70 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2 transform-gpu group-hover:scale-[1.02]">
        {/* Background Gradient */}
        <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg`} />
        
        {/* 3D Icon Container */}
        <div className="relative mb-4">
          <div className={`w-12 h-12 ${gradient} rounded-xl flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          
          {/* Floating particles effect */}
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" />
          <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" style={{ animationDelay: '0.5s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Hover Arrow */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </Card>
    </Link>
  );
};

export default ToolCard;

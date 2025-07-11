
import ToolLayout from "@/components/ToolLayout";

const CronTester = () => {
  return (
    <ToolLayout
      title="Cron Expression Tester"
      description="Build and test cron expressions with human-readable descriptions and next execution times"
    >
      <div className="text-center py-20">
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Cron Expression Tester
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          This tool is coming soon! It will help you build and validate cron expressions.
        </p>
      </div>
    </ToolLayout>
  );
};

export default CronTester;

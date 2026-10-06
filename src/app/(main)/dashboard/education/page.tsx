import { EducationCharts } from "./_components/education-charts";
import { EducationKpis } from "./_components/education-kpis";
import { LevelBreakdown } from "./_components/level-breakdown";

export default function EducationOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Education Platform Overview</h1>
        <p className="text-sm text-muted-foreground">
          St. Mary&apos;s Community Church — Sunday school, catechism levels, enrollment, and grade metrics.
        </p>
      </div>

      <EducationKpis />

      <div className="grid grid-cols-12 gap-4">
        <LevelBreakdown />
        <EducationCharts />
      </div>
    </div>
  );
}

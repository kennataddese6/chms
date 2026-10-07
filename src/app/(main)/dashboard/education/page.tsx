import { ClassesOverviewCard } from "./_components/classes-overview";
import { EducationCharts } from "./_components/education-charts";
import { EducationKpis } from "./_components/education-kpis";
import { LevelBreakdown } from "./_components/level-breakdown";

export default function EducationOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-2xl tracking-tight">Education Platform Overview</h1>
        <p className="text-muted-foreground text-sm">
          St. Mary&apos;s Community Church — Sunday school, grade cohorts (Grade 1–12), teacher assignments, and
          enrollment metrics.
        </p>
      </div>

      <EducationKpis />

      <ClassesOverviewCard />

      <div className="grid grid-cols-12 gap-4">
        <LevelBreakdown />
        <EducationCharts />
      </div>
    </div>
  );
}

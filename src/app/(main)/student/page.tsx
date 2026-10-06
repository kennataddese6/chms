import { ContinueLearning } from "./_components/dashboard/continue-learning";
import { StudentProgressOverview } from "./_components/dashboard/progress-overview";
import { StudentSubjectGrades } from "./_components/dashboard/subject-grades";

export default function StudentDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Student Learning Portal</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back, Daniel Tesfaye — Senior Level Student at St. Mary&apos;s Community Church.
        </p>
      </div>

      <StudentProgressOverview />

      <div className="grid grid-cols-12 gap-4">
        <ContinueLearning />
        <StudentSubjectGrades />
      </div>
    </div>
  );
}

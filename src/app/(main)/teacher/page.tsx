import { MyClassesCard } from "./_components/dashboard/my-classes-card";
import { RecentSubmissions } from "./_components/dashboard/recent-submissions";
import { TeacherKpis } from "./_components/dashboard/teacher-kpis";

export default function TeacherDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Teacher Portal Overview</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back, Fr. James Osei — Senior Catechist & Bible Teacher at St. Mary&apos;s.
        </p>
      </div>

      <TeacherKpis />

      <div className="grid grid-cols-12 gap-4">
        <MyClassesCard />
        <RecentSubmissions />
      </div>
    </div>
  );
}

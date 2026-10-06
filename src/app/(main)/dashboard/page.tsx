import { AdminAttendanceChart } from "./_components/admin-dashboard/attendance-chart";
import { AdminEducationOverview } from "./_components/admin-dashboard/education-overview";
import { AdminKpiRow } from "./_components/admin-dashboard/kpi-row";
import { AdminRecentActivity } from "./_components/admin-dashboard/recent-activity";
import { AdminUpcomingEvents } from "./_components/admin-dashboard/upcoming-events";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Church Overview</h1>
        <p className="text-sm text-muted-foreground">
          St. Mary&apos;s Community Church — Key management metrics, attendance, and education summary.
        </p>
      </div>

      {/* KPI Row */}
      <AdminKpiRow />

      {/* Grid Row 2: Attendance Chart (7 cols) + Recent Activity (5 cols) */}
      <div className="grid grid-cols-12 gap-4">
        <AdminAttendanceChart />
        <AdminRecentActivity />
      </div>

      {/* Grid Row 3: Upcoming Events (5 cols) + Education Overview (7 cols) */}
      <div className="grid grid-cols-12 gap-4">
        <AdminUpcomingEvents />
        <AdminEducationOverview />
      </div>
    </div>
  );
}

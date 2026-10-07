import { AdminAttendanceChart } from "./_components/admin-dashboard/attendance-chart";
import { AdminEducationOverview } from "./_components/admin-dashboard/education-overview";
import { AdminGroupsOverview } from "./_components/admin-dashboard/groups-overview";
import { AdminKpiRow } from "./_components/admin-dashboard/kpi-row";
import { AdminRecentActivity } from "./_components/admin-dashboard/recent-activity";
import { AdminUpcomingEvents } from "./_components/admin-dashboard/upcoming-events";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-2xl tracking-tight">Church Overview</h1>
        <p className="text-muted-foreground text-sm">
          St. Mary&apos;s Community Church — Key management metrics, attendance, education, and groups overview.
        </p>
      </div>

      {/* KPI Row */}
      <AdminKpiRow />

      {/* Grid Row 2: Attendance Chart (7 cols) + Recent Activity (5 cols) */}
      <div className="grid grid-cols-12 gap-4">
        <AdminAttendanceChart />
        <AdminRecentActivity />
      </div>

      {/* Grid Row 3: Upcoming Events (6 cols) + Groups Overview (6 cols) */}
      <div className="grid grid-cols-12 gap-4">
        <AdminUpcomingEvents />
        <AdminGroupsOverview />
      </div>

      {/* Grid Row 4: Education Overview */}
      <div className="grid grid-cols-12 gap-4">
        <AdminEducationOverview />
      </div>
    </div>
  );
}

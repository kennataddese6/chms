import { BarChart3, Calendar, CalendarCheck, Shield, UserCheck, Users } from "lucide-react";

export function ChurchManagementSection() {
  const features = [
    {
      title: "Members & Families",
      description:
        "Keep member information, contact details, and family relationships organized and accessible in one place.",
      icon: Users,
      color: "text-blue-600 bg-blue-500/10",
    },
    {
      title: "Attendance Tracking",
      description:
        "Track attendance across Sunday services, prayer meetings, and church activities with real-time stats.",
      icon: CalendarCheck,
      color: "text-emerald-600 bg-emerald-500/10",
    },
    {
      title: "Groups & Ministry",
      description: "Organize fellowship groups, choir, youth ministry, and pastoral team assignments effortlessly.",
      icon: Shield,
      color: "text-purple-600 bg-purple-500/10",
    },
    {
      title: "Events & Calendar",
      description: "Plan and manage upcoming church events, worship service schedules, and exams from a central place.",
      icon: Calendar,
      color: "text-amber-600 bg-amber-500/10",
    },
    {
      title: "Member Profiles",
      description:
        "Comprehensive profiles showing demographic details, family links, attendance history, and pastoral notes.",
      icon: UserCheck,
      color: "text-cyan-600 bg-cyan-500/10",
    },
    {
      title: "Reports & Insights",
      description: "Visual attendance trends, demographic overviews, and education level distribution charts.",
      icon: BarChart3,
      color: "text-rose-600 bg-rose-500/10",
    },
  ];

  return (
    <section id="management" className="border-b py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <span className="font-semibold text-primary text-xs uppercase tracking-wider">Church Administration</span>
          <h2 className="font-bold text-2xl text-foreground tracking-tight sm:text-4xl">
            Everything your church needs to stay organized.
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Streamline administrative operations, manage parish records, and foster community engagement with intuitive,
            reliable tools.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="flex flex-col justify-between rounded-xl border bg-card p-5 shadow-xs transition-colors hover:border-primary/40"
              >
                <div className="space-y-3">
                  <div className={`flex size-10 items-center justify-center rounded-lg ${feat.color}`}>
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-bold text-foreground text-sm">{feat.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{feat.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

import { ArrowRight, GraduationCap, School, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ThreeExperiencesSection() {
  const experiences = [
    {
      role: "Church Admin",
      headline: "Executive Oversight & Operations",
      description:
        "Manage members, attendance, events, education programs, and overall church operations from a unified dashboard.",
      icon: ShieldCheck,
      color: "border-blue-500/30 bg-blue-500/5",
      iconBg: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
      cta: "Explore Admin Portal",
      href: "/dashboard",
    },
    {
      role: "Teachers",
      headline: "Classroom & Catechism Tools",
      description:
        "Manage classes, course modules, lesson content, multiple-choice quizzes, and student grades effortlessly.",
      icon: School,
      color: "border-emerald-500/30 bg-emerald-500/5",
      iconBg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
      cta: "Explore Teacher Portal",
      href: "/teacher",
    },
    {
      role: "Students",
      headline: "Personalized Learning Path",
      description:
        "Follow their learning path, watch lectures, complete lesson assessments, and track their academic progression.",
      icon: GraduationCap,
      color: "border-purple-500/30 bg-purple-500/5",
      iconBg: "bg-purple-500/15 text-purple-600 dark:text-purple-400",
      cta: "Explore Student Portal",
      href: "/student",
    },
  ];

  return (
    <section id="experiences" className="border-b py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <span className="font-semibold text-primary text-xs uppercase tracking-wider">Connected User Roles</span>
          <h2 className="font-bold text-2xl text-foreground tracking-tight sm:text-4xl">
            Three connected experiences within one platform.
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Role-tailored interfaces built specifically for administrators, catechists, and students — all sharing one
            real-time data store.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {experiences.map((exp) => {
            const Icon = exp.icon;
            return (
              <div
                key={exp.role}
                className={`flex flex-col justify-between rounded-xl border p-6 shadow-xs ${exp.color} transition-all hover:scale-[1.02]`}
              >
                <div className="space-y-4">
                  <div className={`flex size-11 items-center justify-center rounded-xl ${exp.iconBg}`}>
                    <Icon className="size-6" />
                  </div>
                  <div>
                    <span className="font-bold text-muted-foreground text-xs uppercase tracking-wider">{exp.role}</span>
                    <h3 className="mt-0.5 font-extrabold text-base text-foreground">{exp.headline}</h3>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed">{exp.description}</p>
                </div>

                <Button size="sm" variant="outline" asChild className="mt-6 w-full gap-1.5 font-semibold text-xs">
                  <Link href={exp.href}>
                    {exp.cta} <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

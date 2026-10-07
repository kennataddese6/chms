import { Award, BookOpen, CheckCircle2, FileText, GraduationCap, HelpCircle } from "lucide-react";

import { EDUCATION_LEVELS } from "@/data/types";

export function EducationSection() {
  const capabilities = [
    {
      title: "Courses & Subjects",
      desc: "Structured curriculum across Theology, Scripture, History, Ethics, and Pastoral Care.",
      icon: BookOpen,
    },
    {
      title: "Interactive Lessons",
      desc: "Mixed text and video lectures with downloadable study notes and biblical resources.",
      icon: FileText,
    },
    {
      title: "Quizzes & Assessments",
      desc: "Multiple-choice assessments with immediate feedback and explanation review.",
      icon: HelpCircle,
    },
    {
      title: "Level Progression",
      desc: "Automated progression tracking across 6 distinct academic and catechism tiers.",
      icon: GraduationCap,
    },
    {
      title: "Grades & Exams",
      desc: "Standardized letter grades (A–F) and score tracking for mid-terms and finals.",
      icon: Award,
    },
    {
      title: "Official Transcripts",
      desc: "Personalized student grade transcripts and level completion records.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="education" className="border-b bg-accent/10 py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <span className="font-semibold text-purple-600 text-xs uppercase tracking-wider dark:text-purple-400">
            Religious Education & Catechism
          </span>
          <h2 className="font-bold text-2xl text-foreground tracking-tight sm:text-4xl">
            A structured learning journey for every student.
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm">
            More than a collection of online courses — a complete catechism track guiding students from foundational
            scripture to leadership preparation.
          </p>
        </div>

        {/* Visual Level Progression Stepper */}
        <div className="mt-12 rounded-xl border bg-card p-6 shadow-xs">
          <div className="mb-6 text-center font-bold text-muted-foreground text-xs uppercase tracking-wider">
            6-Tier Catechism & Education Roadmap
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {EDUCATION_LEVELS.map((lvl, index) => (
              <div
                key={lvl.value}
                className="flex flex-col items-center space-y-1.5 rounded-lg border bg-accent/20 p-3 text-center transition-colors hover:border-purple-500/40"
              >
                <div className="flex size-7 items-center justify-center rounded-full bg-purple-600 font-bold text-white text-xs shadow-xs">
                  {index + 1}
                </div>
                <span className="font-bold text-xs">{lvl.label}</span>
                <span className="text-[10px] text-muted-foreground">
                  {index === 0 && "Foundational"}
                  {index === 1 && "Scripture Study"}
                  {index === 2 && "Church History"}
                  {index === 3 && "Senior Theology"}
                  {index === 4 && "Advanced Ethics"}
                  {index === 5 && "Leadership"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-start gap-3 rounded-xl border bg-card p-4 shadow-xs">
                <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600">
                  <Icon className="size-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-foreground text-xs">{item.title}</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

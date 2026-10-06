import { Award, BookOpen, CheckCircle2, FileText, GraduationCap, HelpCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
    <section id="education" className="py-16 md:py-24 border-b bg-accent/10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
            Religious Education & Catechism
          </span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl text-foreground">
            A structured learning journey for every student.
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            More than a collection of online courses — a complete catechism track guiding students from foundational
            scripture to leadership preparation.
          </p>
        </div>

        {/* Visual Level Progression Stepper */}
        <div className="mt-12 rounded-xl border bg-card p-6 shadow-xs">
          <div className="text-xs font-bold text-center mb-6 text-muted-foreground uppercase tracking-wider">
            6-Tier Catechism & Education Roadmap
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {EDUCATION_LEVELS.map((lvl, index) => (
              <div
                key={lvl.value}
                className="flex flex-col items-center text-center p-3 rounded-lg border bg-accent/20 hover:border-purple-500/40 transition-colors space-y-1.5"
              >
                <div className="flex size-7 items-center justify-center rounded-full bg-purple-600 text-white text-xs font-bold shadow-xs">
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
                <div className="flex size-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 shrink-0 mt-0.5">
                  <Icon className="size-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-xs text-foreground">{item.title}</h4>
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

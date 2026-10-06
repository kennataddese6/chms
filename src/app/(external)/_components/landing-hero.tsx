import Link from "next/link";

import { ArrowRight, CheckCircle2, Church, GraduationCap, School, ShieldCheck, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 border-b bg-gradient-to-b from-background via-accent/10 to-background">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <Badge
          variant="outline"
          className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-primary/5 text-primary border-primary/20"
        >
          <Church className="size-3.5" /> St. Mary&apos;s Community Church Platform Presentation
        </Badge>

        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground max-w-4xl mx-auto leading-[1.15]">
          One platform for your church, community, and education.
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground leading-relaxed">
          Manage your church community, coordinate ministry and education, and give students a structured path from
          learning to progression — all in one connected platform.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button size="lg" asChild className="h-11 px-6 text-sm font-semibold gap-2 shadow-md">
            <Link href="/dashboard">
              Explore the Platform <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="h-11 px-6 text-sm font-semibold">
            <a href="#management">See How It Works</a>
          </Button>
        </div>

        {/* Highlight Cards Preview */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3 max-w-4xl mx-auto text-left">
          <div className="rounded-xl border bg-card p-4 shadow-xs flex items-start gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 shrink-0">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs">Church Administration</h4>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                427 member directory, attendance tracking & events.
              </p>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-4 shadow-xs flex items-start gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 shrink-0">
              <School className="size-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs">Teacher Portal</h4>
              <p className="text-[11px] text-muted-foreground mt-0.5">Classes, curriculum, quiz builder & gradebook.</p>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-4 shadow-xs flex items-start gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 shrink-0">
              <GraduationCap className="size-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs">Student Progression</h4>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                6 catechism tiers, lessons, quizzes & transcripts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

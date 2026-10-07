import Link from "next/link";

import { ArrowRight, Church, GraduationCap, School, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-background via-accent/10 to-background py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <Badge
          variant="outline"
          className="mb-4 inline-flex items-center gap-1.5 border-primary/20 bg-primary/5 px-3 py-1 font-semibold text-primary text-xs"
        >
          <Church className="size-3.5" /> St. Mary&apos;s Community Church Platform Presentation
        </Badge>

        <h1 className="mx-auto max-w-4xl font-extrabold text-3xl text-foreground leading-[1.15] tracking-tight sm:text-5xl md:text-6xl">
          One platform for your church, community, and education.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-muted-foreground text-sm leading-relaxed sm:text-base">
          Manage your church community, coordinate ministry and education, and give students a structured path from
          learning to progression — all in one connected platform.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" asChild className="h-11 gap-2 px-6 font-semibold text-sm shadow-md">
            <Link href="/dashboard">
              Explore the Platform <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="h-11 px-6 font-semibold text-sm">
            <a href="#management">See How It Works</a>
          </Button>
        </div>

        {/* Highlight Cards Preview */}
        <div className="mx-auto mt-14 grid max-w-4xl gap-4 text-left sm:grid-cols-3">
          <div className="flex items-start gap-3 rounded-xl border bg-card p-4 shadow-xs">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs">Church Administration</h4>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                427 member directory, attendance tracking & events.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border bg-card p-4 shadow-xs">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
              <School className="size-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs">Teacher Portal</h4>
              <p className="mt-0.5 text-[11px] text-muted-foreground">Classes, curriculum, quiz builder & gradebook.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border bg-card p-4 shadow-xs">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600">
              <GraduationCap className="size-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs">Student Progression</h4>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                6 catechism tiers, lessons, quizzes & transcripts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

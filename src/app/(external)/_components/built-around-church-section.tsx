import Link from "next/link";

import { ArrowRight, BookCheck, Building2, ShieldCheck, Sliders } from "lucide-react";

import { Button } from "@/components/ui/button";

export function BuiltAroundChurchSection() {
  const points = [
    {
      title: "Parish Structure",
      desc: "Adaptable to multi-parish, ministry group, or single-church organizational structures.",
    },
    {
      title: "Custom Education Levels",
      desc: "Configurable education tiers, catechism steps, and grade scale thresholds.",
    },
    { title: "Flexible Workflows", desc: "Tailored attendance rules, event approval processes, and report exports." },
    {
      title: "Custom Subjects & Classes",
      desc: "Easily set up scripture, theology, ethics, or custom church ministry courses.",
    },
  ];

  return (
    <section id="adaptable" className="py-16 md:py-24 border-b bg-accent/10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Church Customization</span>
            <h2 className="text-2xl font-bold tracking-tight sm:text-4xl text-foreground">
              Built around the way your church works.
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Every parish has unique traditions and administrative requirements. The platform easily configures around
              your organizational hierarchy, subjects, levels, and workflows.
            </p>

            <div className="grid gap-3 pt-2 sm:grid-cols-2 text-xs">
              {points.map((pt) => (
                <div key={pt.title} className="rounded-lg border bg-card p-3 shadow-xs space-y-1">
                  <h4 className="font-bold text-foreground">{pt.title}</h4>
                  <p className="text-[11px] text-muted-foreground">{pt.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & Prototype Callout Card */}
          <div className="rounded-2xl border bg-gradient-to-br from-card via-background to-accent/20 p-8 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="inline-block rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
                Interactive Demonstration
              </span>
              <h3 className="text-xl font-extrabold text-foreground">See the platform in action.</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Explore the church management, teacher, and student experiences through the interactive prototype.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <p className="text-[11px] text-muted-foreground italic font-medium">
                Flexible pricing designed around church size and education enrollment.
              </p>

              <Button size="lg" asChild className="w-full text-xs font-semibold gap-2 shadow-sm">
                <Link href="/dashboard">
                  Enter the Prototype <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

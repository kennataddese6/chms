import Link from "next/link";

import { ArrowRight } from "lucide-react";

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
    <section id="adaptable" className="border-b bg-accent/10 py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <span className="font-semibold text-primary text-xs uppercase tracking-wider">Church Customization</span>
            <h2 className="font-bold text-2xl text-foreground tracking-tight sm:text-4xl">
              Built around the way your church works.
            </h2>
            <p className="text-muted-foreground text-xs leading-relaxed sm:text-sm">
              Every parish has unique traditions and administrative requirements. The platform easily configures around
              your organizational hierarchy, subjects, levels, and workflows.
            </p>

            <div className="grid gap-3 pt-2 text-xs sm:grid-cols-2">
              {points.map((pt) => (
                <div key={pt.title} className="space-y-1 rounded-lg border bg-card p-3 shadow-xs">
                  <h4 className="font-bold text-foreground">{pt.title}</h4>
                  <p className="text-[11px] text-muted-foreground">{pt.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & Prototype Callout Card */}
          <div className="flex flex-col justify-between space-y-6 rounded-2xl border bg-gradient-to-br from-card via-background to-accent/20 p-8 shadow-sm">
            <div className="space-y-3">
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary text-xs">
                Interactive Demonstration
              </span>
              <h3 className="font-extrabold text-foreground text-xl">See the platform in action.</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Explore the church management, teacher, and student experiences through the interactive prototype.
              </p>
            </div>

            <div className="space-y-4 border-t pt-4">
              <p className="font-medium text-[11px] text-muted-foreground italic">
                Flexible pricing designed around church size and education enrollment.
              </p>

              <Button size="lg" asChild className="w-full gap-2 font-semibold text-xs shadow-sm">
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

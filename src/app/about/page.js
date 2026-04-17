import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Learn about ABC School's mission, student-first teaching philosophy, and campus culture.",
  path: "/about",
  keywords: ["about school", "school mission", "student-first education"],
});

const values = [
  "A balanced academic model that builds conceptual strength and practical confidence.",
  "A faculty culture rooted in mentorship, accountability, and care.",
  "Co-curricular experiences that help students lead, collaborate, and create.",
];

export default function AboutPage() {
  return (
    <section className="section-spacing px-4">
      <div className="section-shell">
        <Reveal>
          <SectionTitle
            eyebrow="About ABC School"
            title="A contemporary school experience grounded in excellence and care."
            description="This page adds meaningful content depth for users and search engines, replacing empty route space with clear institutional messaging."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {values.map((value, index) => (
            <Reveal key={value} delay={index * 0.08}>
              <Card className="h-full bg-white/78">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  Value {index + 1}
                </p>
                <p className="mt-4 text-lg leading-8 text-[var(--color-muted)]">{value}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

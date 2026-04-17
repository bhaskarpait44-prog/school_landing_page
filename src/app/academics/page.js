import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Academics",
  description:
    "Discover the academic approach at ABC School, with inquiry-based learning, STEM exposure, and holistic development.",
  path: "/academics",
  keywords: ["school academics", "STEM learning", "holistic education"],
});

const streams = [
  {
    stage: "01",
    title: "Primary School",
    subtitle: "Grades I – V",
    body: "Foundational years focused on literacy, numeracy, and nurturing curiosity through activity-based learning.",
  },
  {
    stage: "02",
    title: "Middle School",
    subtitle: "Grades VI – VIII",
    body: "Enriched curriculum with laboratories, collaborative projects, research skills, and presentation confidence.",
  },
  {
    stage: "03",
    title: "Senior Secondary",
    subtitle: "Grades IX – XII",
    body: "Board-aligned pathways in Science, Commerce, and Arts, shaped around exam excellence, leadership, and career readiness.",
  },
];

const highlights = [
  { label: "Smart Classrooms", icon: "🖥️" },
  { label: "Science Labs", icon: "🔬" },
  { label: "Digital Library", icon: "📚" },
  { label: "Sports Complex", icon: "🏆" },
  { label: "Arts & Music Studio", icon: "🎨" },
  { label: "Career Counselling", icon: "🎓" },
];

export default function AcademicsPage() {
  return (
    <>
      <section className="section-spacing px-4">
        <div className="section-shell">
          <Reveal>
            <SectionTitle
              eyebrow="Academics"
              title="Rigorous learning that stays human, relevant, and future-ready."
              description="Our academic programme spans three stages, each designed to build on the last — giving students the skills, confidence, and knowledge to thrive in a rapidly evolving world."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {streams.map((item, index) => (
              <Reveal key={item.stage} delay={index * 0.08}>
                <Card className="h-full bg-white/78">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                    Stage {item.stage}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold md:text-2xl">{item.title}</h3>
                  <p className="mt-1 text-sm font-medium text-[var(--color-accent)]/70">{item.subtitle}</p>
                  <p className="mt-4 leading-7 text-[var(--color-muted)]">{item.body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="px-4 pb-16">
        <div className="section-shell">
          <Reveal>
            <SectionTitle
              eyebrow="Facilities"
              title="Infrastructure built to inspire."
              align="center"
            />
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {highlights.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.06}>
                <div className="glass-panel flex flex-col items-center gap-3 rounded-[24px] p-5 text-center transition hover:-translate-y-1">
                  <span className="text-3xl">{item.icon}</span>
                  <p className="text-sm font-semibold text-[var(--color-ink)]">{item.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

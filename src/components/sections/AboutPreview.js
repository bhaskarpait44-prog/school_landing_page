import Reveal from "@/components/ui/Reveal";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";

const pillars = [
  {
    title: "Academic Depth",
    body: "A curriculum that balances conceptual rigor, digital fluency, and joyful discovery.",
  },
  {
    title: "Mentored Growth",
    body: "Teachers coach students through confidence, communication, and character-building.",
  },
  {
    title: "Modern Facilities",
    body: "Purpose-built labs, arts spaces, sports programs, and collaborative learning zones.",
  },
];

export default function AboutPreview() {
  return (
    <section className="section-spacing px-4">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <Reveal>
          <SectionTitle
            eyebrow="About Our School"
            title="Built for ambitious learners, supportive families, and a changing world."
            description="We position every student for success through a culture of excellence, modern infrastructure, and deeply committed educators."
          />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-1">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.08}>
              <Card className="bg-white/75">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  0{index + 1}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-[var(--color-ink)] md:text-2xl">
                  {pillar.title}
                </h3>
                <p className="mt-3 leading-7 text-[var(--color-muted)]">{pillar.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

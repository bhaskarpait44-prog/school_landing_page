import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Academic Overview",
  description:
    "Discover ABC School's comprehensive academic approach with inquiry-based learning, STEM exposure, and holistic development.",
  path: "/academics/overview",
  keywords: ["academic overview", "school curriculum", "learning approach", "holistic education"],
});

const academicPillars = [
  {
    title: "Inquiry-Based Learning",
    description: "Students learn through questioning, exploration, and discovery rather than passive memorization.",
    icon: "🔍",
  },
  {
    title: "STEM Excellence",
    description: "Comprehensive science, technology, engineering, and mathematics programs with hands-on labs.",
    icon: "⚡",
  },
  {
    title: "Arts Integration",
    description: "Visual arts, music, drama, and dance woven into daily learning experiences.",
    icon: "🎨",
  },
  {
    title: "Character Development",
    description: "Building empathy, resilience, and leadership through structured programs.",
    icon: "🌱",
  },
];

const learningStages = [
  {
    stage: "Foundation",
    grades: "Pre-Primary to Grade 2",
    focus: "Literacy, numeracy, and social-emotional development through play-based learning.",
  },
  {
    stage: "Exploration",
    grades: "Grades 3 to 5",
    focus: "Developing curiosity, independent thinking, and foundational academic skills.",
  },
  {
    stage: "Discovery",
    grades: "Grades 6 to 8",
    focus: "Subject specialization, critical thinking, and project-based learning.",
  },
  {
    stage: "Mastery",
    grades: "Grades 9 to 12",
    focus: "Board preparation, career guidance, and advanced research projects.",
  },
];

export default function AcademicOverviewPage() {
  return (
    <section className="section-spacing px-4">
      <div className="section-shell">
        <Reveal>
          <SectionTitle
            eyebrow="Academic Overview"
            title="A comprehensive approach to learning that prepares students for life."
            description="Our curriculum balances academic rigor with creative exploration, ensuring every child develops the skills, confidence, and character to thrive."
          />
        </Reveal>

        {/* Academic Pillars */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {academicPillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.08}>
              <Card className="h-full bg-white/78">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{pillar.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold">{pillar.title}</h3>
                    <p className="mt-2 leading-7 text-[var(--color-muted)]">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* Learning Stages */}
        <Reveal delay={0.32}>
          <div className="mt-16">
            <h2 className="display-title text-3xl font-semibold text-center">
              Learning Journey
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {learningStages.map((stage, index) => (
                <Reveal key={stage.stage} delay={0.4 + index * 0.08}>
                  <div className="glass-panel rounded-[24px] p-6 h-full">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                      {stage.stage}
                    </p>
                    <p className="mt-2 text-sm font-medium text-[var(--color-gold)]">
                      {stage.grades}
                    </p>
                    <p className="mt-4 text-sm leading-6 text-[var(--color-muted)]">
                      {stage.focus}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

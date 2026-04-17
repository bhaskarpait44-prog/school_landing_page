import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Syllabus",
  description:
    "Download curriculum guides and syllabus for all grade levels at ABC School.",
  path: "/academics/syllabus",
  keywords: ["school syllabus", "curriculum download", "subject guide", "academic curriculum"],
});

const syllabusData = [
  {
    level: "Primary School",
    grades: "Grades I – V",
    subjects: ["English", "Mathematics", "Environmental Science", "Hindi/Bengali", "Computer Science", "Art & Craft", "Physical Education"],
    description: "Foundation building with emphasis on literacy, numeracy, and holistic development.",
  },
  {
    level: "Middle School",
    grades: "Grades VI – VIII",
    subjects: ["English", "Mathematics", "Science", "Social Science", "Hindi/Bengali", "Computer Science", "Art Education", "Physical Education"],
    description: "Introduction to specialized subjects with project-based learning approach.",
  },
  {
    level: "Senior Secondary - Science",
    grades: "Grades IX – XII",
    subjects: ["English", "Physics", "Chemistry", "Mathematics/Biology", "Computer Science", "Physical Education"],
    description: "Rigorous preparation for engineering, medical, and research careers.",
  },
  {
    level: "Senior Secondary - Commerce",
    grades: "Grades IX – XII",
    subjects: ["English", "Accountancy", "Business Studies", "Economics", "Mathematics", "Computer Science"],
    description: "Comprehensive commerce education for business and finance careers.",
  },
  {
    level: "Senior Secondary - Arts",
    grades: "Grades IX – XII",
    subjects: ["English", "History", "Political Science", "Geography/Economics", "Psychology", "Computer Science"],
    description: "Liberal arts education fostering critical thinking and creativity.",
  },
];

const coCurricular = [
  { name: "Visual Arts", description: "Drawing, painting, sculpture, and mixed media" },
  { name: "Performing Arts", description: "Dance, drama, and vocal music" },
  { name: "Sports", description: "Athletics, cricket, football, basketball, swimming" },
  { name: "Clubs", description: "Robotics, debate, photography, eco-club, coding" },
];

export default function SyllabusPage() {
  return (
    <section className="section-spacing px-4">
      <div className="section-shell">
        <Reveal>
          <SectionTitle
            eyebrow="Syllabus"
            title="Comprehensive curriculum designed for excellence."
            description="Our syllabus follows CBSE guidelines while incorporating innovative teaching methodologies and real-world applications."
          />
        </Reveal>

        {/* Syllabus Cards */}
        <div className="mt-12 space-y-5">
          {syllabusData.map((item, index) => (
            <Reveal key={item.level} delay={index * 0.08}>
              <Card className="bg-white/78">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-semibold">{item.level}</h3>
                      <span className="rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--color-accent)]">
                        {item.grades}
                      </span>
                    </div>
                    <p className="mt-3 text-[var(--color-muted)]">{item.description}</p>
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)]">
                        Subjects
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {item.subjects.map((subject) => (
                          <span
                            key={subject}
                            className="rounded-full bg-white/60 px-3 py-1 text-xs font-medium text-[var(--color-ink)] border border-[var(--color-ink)]/10"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button href="#" variant="secondary" className="shrink-0">
                    Download PDF
                  </Button>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* Co-Curricular */}
        <Reveal delay={0.4}>
          <div className="mt-16">
            <h2 className="display-title text-3xl font-semibold text-center">
              Co-Curricular Activities
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {coCurricular.map((item, index) => (
                <Reveal key={item.name} delay={0.48 + index * 0.06}>
                  <div className="glass-panel rounded-[24px] p-5 text-center h-full">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="mt-2 text-sm text-[var(--color-muted)]">{item.description}</p>
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

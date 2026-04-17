import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "For Parents & Guardians",
  description:
    "Resources, communication channels, and guidance for parents and guardians of ABC School students.",
  path: "/academics/parents",
  keywords: ["parent resources", "school communication", "parent portal", "family engagement"],
});

const resources = [
  {
    title: "Parent Portal",
    description: "Access grades, attendance, assignments, and progress reports in real-time.",
    action: "Login to Portal",
  },
  {
    title: "Parent-Teacher Meetings",
    description: "Schedule one-on-one sessions with teachers to discuss your child's progress.",
    action: "Schedule Meeting",
  },
  {
    title: "Transport Updates",
    description: "Track school buses and receive notifications about route changes.",
    action: "View Updates",
  },
];

const faqs = [
  {
    question: "How can I track my child's academic progress?",
    answer: "Parents can access the Parent Portal to view grades, attendance, and teacher feedback. Monthly progress reports are also sent via email.",
  },
  {
    question: "When are parent-teacher conferences held?",
    answer: "Formal conferences are scheduled twice per term. However, parents can request additional meetings anytime through the school office or parent portal.",
  },
  {
    question: "How do I communicate with teachers?",
    answer: "Use the messaging feature in the Parent Portal, email teachers directly, or contact the school office to schedule a call.",
  },
  {
    question: "What extracurricular activities are available?",
    answer: "We offer sports, arts, music, debate, robotics, and various clubs. Activity schedules are shared at the beginning of each term.",
  },
];

export default function ParentsPage() {
  return (
    <section className="section-spacing px-4">
      <div className="section-shell">
        <Reveal>
          <SectionTitle
            eyebrow="For Parents & Guardians"
            title="Supporting families throughout the educational journey."
            description="We believe education is a partnership. Stay connected with your child's progress and engaged with our school community."
          />
        </Reveal>

        {/* Resources Grid */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {resources.map((resource, index) => (
            <Reveal key={resource.title} delay={index * 0.08}>
              <Card className="h-full bg-white/78">
                <h3 className="text-xl font-semibold">{resource.title}</h3>
                <p className="mt-3 leading-7 text-[var(--color-muted)]">
                  {resource.description}
                </p>
                <button className="mt-5 inline-flex items-center text-sm font-semibold text-[var(--color-accent)] hover:underline">
                  {resource.action} →
                </button>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* FAQ Section */}
        <Reveal delay={0.24}>
          <div className="mt-16">
            <h2 className="display-title text-3xl font-semibold text-center">
              Frequently Asked Questions
            </h2>
            <div className="mt-8 space-y-4">
              {faqs.map((faq, index) => (
                <Reveal key={faq.question} delay={0.32 + index * 0.06}>
                  <Card className="bg-white/78">
                    <h3 className="text-lg font-semibold text-[var(--color-ink)]">
                      {faq.question}
                    </h3>
                    <p className="mt-2 leading-7 text-[var(--color-muted)]">
                      {faq.answer}
                    </p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

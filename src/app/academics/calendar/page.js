import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Academic Calendar",
  description:
    "View ABC School's academic calendar with term dates, examinations, holidays, and important events.",
  path: "/academics/calendar",
  keywords: ["academic calendar", "school term dates", "examination schedule", "school holidays"],
});

const termDates = [
  {
    term: "Term 1",
    period: "April – June",
    start: "April 2, 2026",
    end: "June 30, 2026",
    keyDates: ["Opening Day: April 2", "Founder's Day: April 15", "Summer Break: July 1"],
  },
  {
    term: "Term 2",
    period: "July – September",
    start: "July 15, 2026",
    end: "September 30, 2026",
    keyDates: ["Reopening: July 15", "Independence Day: August 15", "Mid-Term Exams: Sep 20-25"],
  },
  {
    term: "Term 3",
    period: "October – December",
    start: "October 3, 2026",
    end: "December 22, 2026",
    keyDates: ["Reopening: October 3", "Diwali Break: Oct 30 - Nov 5", "Winter Break: Dec 23"],
  },
  {
    term: "Term 4",
    period: "January – March",
    start: "January 2, 2027",
    end: "March 31, 2027",
    keyDates: ["Reopening: January 2", "Annual Day: February 15", "Final Exams: Mar 15-25"],
  },
];

const upcomingEvents = [
  { date: "May 12, 2026", event: "Parent Orientation Week" },
  { date: "June 15-20, 2026", event: "Annual Sports Meet" },
  { date: "August 5, 2026", event: "Science Exhibition" },
  { date: "September 5, 2026", event: "Teacher's Day Celebration" },
  { date: "November 14, 2026", event: "Children's Day Program" },
  { date: "December 20, 2026", event: "Winter Carnival" },
];

export default function AcademicCalendarPage() {
  return (
    <section className="section-spacing px-4">
      <div className="section-shell">
        <Reveal>
          <SectionTitle
            eyebrow="Academic Calendar"
            title="Plan your year with our complete academic schedule."
            description="Stay informed about term dates, examination schedules, holidays, and school events throughout the academic year."
          />
        </Reveal>

        {/* Term Dates */}
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {termDates.map((term, index) => (
            <Reveal key={term.term} delay={index * 0.08}>
              <Card className="h-full bg-white/78">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{term.term}</h3>
                  <span className="rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--color-accent)]">
                    {term.period}
                  </span>
                </div>
                <div className="mt-4 space-y-1 text-sm text-[var(--color-muted)]">
                  <p>
                    <span className="font-medium text-[var(--color-ink)]">Start:</span> {term.start}
                  </p>
                  <p>
                    <span className="font-medium text-[var(--color-ink)]">End:</span> {term.end}
                  </p>
                </div>
                <div className="mt-4 border-t border-black/5 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)]">
                    Key Dates
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-[var(--color-muted)]">
                    {term.keyDates.map((date) => (
                      <li key={date}>• {date}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* Upcoming Events */}
        <Reveal delay={0.32}>
          <div className="mt-16">
            <h2 className="display-title text-3xl font-semibold text-center">
              Upcoming Events
            </h2>
            <div className="mt-8">
              <Card className="bg-white/78">
                <div className="divide-y divide-black/5">
                  {upcomingEvents.map((item) => (
                    <div key={item.event} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                      <span className="font-semibold text-[var(--color-ink)]">{item.event}</span>
                      <span className="text-sm text-[var(--color-accent)] font-medium">{item.date}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

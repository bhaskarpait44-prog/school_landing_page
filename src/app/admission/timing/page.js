import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "School Timing",
  description:
    "School hours, assembly time, break schedules, and important timings for ABC School students.",
  path: "/admission/timing",
  keywords: ["school timing", "school hours", "class schedule", "school routine"],
});

const timings = [
  { activity: "School Gates Open", time: "7:30 AM", note: "Students may enter" },
  { activity: "Morning Assembly", time: "8:00 AM", note: "All students mandatory" },
  { activity: "First Period", time: "8:30 AM", note: "Classes begin" },
  { activity: "Mid-Morning Break", time: "10:30 - 10:45 AM", note: "15 minutes" },
  { activity: "Lunch Break", time: "12:30 - 1:15 PM", note: "45 minutes" },
  { activity: "Afternoon Classes", time: "1:15 - 3:00 PM", note: "Resume" },
  { activity: "Dispersal", time: "3:00 PM", note: "Classes I - VIII" },
  { activity: "Dispersal", time: "3:30 PM", note: "Classes IX - XII" },
];

const shiftTimings = [
  {
    shift: "Primary Shift",
    grades: "Pre-Primary - Grade V",
    timing: "8:00 AM - 2:00 PM",
    dispersal: "2:00 PM",
  },
  {
    shift: "Secondary Shift",
    grades: "Grade VI - XII",
    timing: "8:00 AM - 3:00 PM / 3:30 PM",
    dispersal: "3:00 PM (VI-VIII), 3:30 PM (IX-XII)",
  },
];

const importantNotes = [
  "Students must arrive at least 10 minutes before assembly",
  "Latecomers (after 8:15 AM) require a late pass from the office",
  "Students are not allowed to leave early without written permission",
  "Parents must collect children within 30 minutes of dispersal time",
  "Saturday schedule ends at 12:00 PM for all grades",
  "School remains closed on Sundays and all gazetted holidays",
];

export default function TimingPage() {
  return (
    <section className="section-spacing px-4">
      <div className="section-shell">
        <Reveal>
          <SectionTitle
            eyebrow="School Timing"
            title="Well-structured schedule for optimal learning."
            description="Our school timings are designed to balance academic rigor with adequate rest and recreational time."
          />
        </Reveal>

        {/* Daily Schedule */}
        <Reveal delay={0.08}>
          <Card className="mt-12 bg-white/78">
            <h2 className="display-title text-2xl font-semibold">Daily Schedule</h2>
            <div className="mt-6 divide-y divide-black/5">
              {timings.map((item, index) => (
                <div key={item.activity} className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-medium text-[var(--color-ink)]">{item.activity}</p>
                    <p className="text-sm text-[var(--color-muted)]">{item.note}</p>
                  </div>
                  <span className="rounded-full bg-[var(--color-accent-soft)] px-4 py-1 text-sm font-semibold text-[var(--color-accent)]">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </Reveal>

        {/* Shift-wise Schedule */}
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {shiftTimings.map((shift, index) => (
            <Reveal key={shift.shift} delay={0.16 + index * 0.08}>
              <Card className="h-full bg-white/78">
                <h3 className="text-xl font-semibold">{shift.shift}</h3>
                <p className="mt-1 text-sm text-[var(--color-muted)]">{shift.grades}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[var(--color-muted)]">Timing:</span>
                    <span className="font-medium">{shift.timing}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-muted)]">Dispersal:</span>
                    <span className="font-medium text-[var(--color-accent)]">{shift.dispersal}</span>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* Important Notes */}
        <Reveal delay={0.32}>
          <div className="mt-12">
            <h2 className="display-title text-2xl font-semibold">Important Guidelines</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {importantNotes.map((note, index) => (
                <Reveal key={index} delay={0.4 + index * 0.04}>
                  <div className="flex gap-3 rounded-[16px] border border-white/70 bg-white/60 p-4">
                    <span className="text-[var(--color-accent)]">•</span>
                    <span className="text-sm text-[var(--color-muted)]">{note}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Office Hours */}
        <Reveal delay={0.64}>
          <Card className="mt-12 bg-[var(--color-panel-strong)] text-white">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-semibold">School Office Hours</h3>
                <p className="mt-4 text-white/70">
                  Monday - Friday: 8:00 AM - 4:00 PM<br />
                  Saturday: 9:00 AM - 1:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Contact for Queries</h3>
                <p className="mt-4 text-white/70">
                  Phone: +91 98765 43210<br />
                  Email: info@abcschool.edu<br />
                  Best time to call: 9:00 AM - 3:00 PM
                </p>
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

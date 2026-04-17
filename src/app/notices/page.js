import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { notices } from "@/data/notices";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Notices",
  description:
    "Read the latest announcements, event updates, admission timelines, and family communication from ABC School.",
  path: "/notices",
  keywords: ["school notices", "school announcements", "admission updates"],
});

export default function NoticesPage() {
  return (
    <section className="section-spacing px-4">
      <div className="section-shell">
        <Reveal>
          <SectionTitle
            eyebrow="School Notices"
            title="A dedicated updates page that supports both usability and indexing."
            description="Publishing notices on a real route gives search engines more topical, fresh content to understand."
          />
        </Reveal>

        <div className="mt-12 grid gap-5">
          {notices.map((notice, index) => (
            <Reveal key={notice.title} delay={index * 0.08}>
              <Card className="bg-white/78">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h3 className="text-2xl font-semibold">{notice.title}</h3>
                  <span className="rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                    {notice.tag}
                  </span>
                </div>
                <p className="mt-4 leading-8 text-[var(--color-muted)]">{notice.detail}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

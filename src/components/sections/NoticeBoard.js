import Reveal from "@/components/ui/Reveal";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { notices } from "@/data/notices";

export default function NoticeBoard() {
  return (
    <section className="section-spacing px-4">
      <div className="section-shell">
        <Reveal>
          <SectionTitle
            eyebrow="Latest Notices"
            title="Timely updates presented with clarity."
            description="Notice content is now structured and crawlable, which helps both families and search engines understand what the school is actively communicating."
            align="center"
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {notices.map((notice, index) => (
            <Reveal key={notice.title} delay={index * 0.08}>
              <Card className="h-full bg-white/78">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                    {notice.tag}
                  </span>
                  <span className="text-sm text-[var(--color-muted)]">Update</span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold leading-tight text-balance">
                  {notice.title}
                </h3>
                <p className="mt-4 leading-7 text-[var(--color-muted)]">{notice.detail}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

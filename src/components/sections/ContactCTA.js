import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function ContactCTA() {
  return (
    <section className="px-4 pb-8 pt-2">
      <div className="section-shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#14213d_0%,#1b4332_100%)] px-6 py-10 text-white shadow-[var(--shadow-soft)] md:rounded-[34px] md:px-10 md:py-12">
            <div className="floating-orb right-[-3rem] top-[-2rem] h-40 w-40 bg-white/15" />
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="eyebrow bg-white/10 text-white">Let&apos;s Connect</p>
                <h2 className="display-title mt-5 text-3xl font-semibold text-balance md:text-4xl">
                  Ready to turn visits into enquiries and enquiries into admissions?
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-white/78 md:text-lg">
                  Families can now find key information faster, trust the school brand sooner,
                  and move smoothly toward contact and admission steps.
                </p>
              </div>

              <div className="shrink-0">
                <Button href="/contact" className="w-full bg-white text-[var(--color-ink)] md:w-auto">
                  Contact Admissions
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

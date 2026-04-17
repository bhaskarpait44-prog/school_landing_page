import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { SCHOOL_INFO } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact ABC School for admissions, campus visits, parent support, and school enquiries.",
  path: "/contact",
  keywords: ["contact school", "school enquiry", "school visit"],
});

export default function ContactPage() {
  return (
    <section className="section-spacing px-4">
      <div className="section-shell">
        <Reveal>
          <SectionTitle
            eyebrow="Contact"
            title="Simple contact details, clearer trust signals, and stronger conversion intent."
            description="This page now gives Google and families a clear place to find the school's location and contact information."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <Reveal>
            <Card className="bg-white/78">
              <h3 className="text-2xl font-semibold">Admissions Desk</h3>
              <p className="mt-4 text-[var(--color-muted)]">{SCHOOL_INFO.phone}</p>
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <Card className="bg-white/78">
              <h3 className="text-2xl font-semibold">Email</h3>
              <p className="mt-4 text-[var(--color-muted)]">{SCHOOL_INFO.email}</p>
            </Card>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="h-full overflow-hidden rounded-[28px] border border-white/70 bg-white/60 shadow-[var(--shadow-soft)]">
              <iframe
                title="School Location"
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.0!2d88.35!3d22.57!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM0JzEyLjAiTiA4OMKwMjEnMDAuMCJF!5e0!3m2!1sen!2sin!4v1600000000000`}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "200px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

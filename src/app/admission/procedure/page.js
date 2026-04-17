import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Admission Procedure",
  description:
    "Step-by-step guide to the admission process at ABC School. Learn about eligibility, documents required, and selection criteria.",
  path: "/admission/procedure",
  keywords: ["admission procedure", "school admission process", "how to apply", "admission steps"],
});

const admissionSteps = [
  {
    step: "01",
    title: "Submit Enquiry",
    description: "Fill out the enquiry form online or visit our campus to collect a prospectus. Our admissions team will contact you within 24 hours.",
    duration: "Day 1",
  },
  {
    step: "02",
    title: "Campus Visit",
    description: "Schedule a guided tour of our campus. Meet faculty, explore facilities, and attend an interactive session with the principal.",
    duration: "Within 1 week",
  },
  {
    step: "03",
    title: "Application Form",
    description: "Complete the formal application form with all required documents including birth certificate, photographs, and previous school records.",
    duration: "Day 7-14",
  },
  {
    step: "04",
    title: "Assessment",
    description: "Students undergo a grade-appropriate aptitude assessment to understand their learning needs and academic readiness.",
    duration: "Day 15-21",
  },
  {
    step: "05",
    title: "Personal Interview",
    description: "A friendly interaction with parents and the child to understand family expectations and discuss the child's interests.",
    duration: "Day 22-28",
  },
  {
    step: "06",
    title: "Admission Confirmation",
    description: "Receive admission offer letter. Complete fee payment and submit medical fitness certificate to confirm enrollment.",
    duration: "Day 29-35",
  },
];

const requiredDocuments = [
  "Birth Certificate (Original + 2 copies)",
  "Previous School Transfer Certificate",
  "Academic Records (Last 2 years)",
  "Passport Size Photographs (8 copies)",
  "Address Proof (Aadhaar/Passport)",
  "Parent's ID Proof",
  "Immunization Record",
  "Medical Fitness Certificate",
];

export default function AdmissionProcedurePage() {
  return (
    <section className="section-spacing px-4">
      <div className="section-shell">
        <Reveal>
          <SectionTitle
            eyebrow="Admission Procedure"
            title="A transparent and student-friendly admission journey."
            description="Our step-by-step process ensures every family receives personalized attention while maintaining fairness and transparency."
          />
        </Reveal>

        {/* Steps Timeline */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {admissionSteps.map((step, index) => (
            <Reveal key={step.step} delay={index * 0.08}>
              <Card className="h-full bg-white/78">
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-panel-strong)] text-lg font-bold text-white">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                      <span className="rounded-full bg-[var(--color-accent-soft)] px-2 py-0.5 text-xs font-medium text-[var(--color-accent)]">
                        {step.duration}
                      </span>
                    </div>
                    <p className="mt-2 leading-7 text-[var(--color-muted)]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* Documents Required */}
        <Reveal delay={0.48}>
          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="display-title text-3xl font-semibold">
                Documents Required
              </h2>
              <ul className="mt-6 space-y-3">
                {requiredDocuments.map((doc, index) => (
                  <Reveal key={doc} delay={0.56 + index * 0.04}>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-xs text-white">✓</span>
                      <span className="text-[var(--color-muted)]">{doc}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>

            <Reveal delay={0.64}>
              <Card className="bg-[var(--color-panel-strong)] text-white">
                <h3 className="text-2xl font-semibold">Ready to Begin?</h3>
                <p className="mt-3 leading-7 text-white/80">
                  Start your child's journey with ABC School. Our admissions team is here to guide you through every step.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Button href="/admission/online" className="bg-white text-[var(--color-ink)]">
                    Apply Online
                  </Button>
                  <Button
                    href="/contact"
                    variant="secondary"
                    className="border-white/25 bg-white/10 text-white hover:bg-white/16"
                  >
                    Contact Admissions
                  </Button>
                </div>
              </Card>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

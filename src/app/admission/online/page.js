import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Online Admission",
  description:
    "Apply online for admission to ABC School. Complete the application process from the comfort of your home.",
  path: "/admission/online",
  keywords: ["online admission", "apply online", "school application form", "digital admission"],
});

const eligibilityCriteria = [
  { grade: "Pre-Primary", age: "3+ years by April 1", seats: "60" },
  { grade: "Grade I", age: "5+ years by April 1", seats: "40" },
  { grade: "Grade VI", age: "10+ years by April 1", seats: "25" },
  { grade: "Grade IX", age: "13+ years by April 1", seats: "20" },
];

const applicationSteps = [
  {
    title: "Register Account",
    description: "Create a parent account with your email and mobile number.",
  },
  {
    title: "Fill Application",
    description: "Complete the online form with student and parent details.",
  },
  {
    title: "Upload Documents",
    description: "Scan and upload all required documents in PDF/JPG format.",
  },
  {
    title: "Pay Application Fee",
    description: "Secure online payment through credit/debit card or UPI.",
  },
  {
    title: "Schedule Assessment",
    description: "Select a convenient date and time for the entrance assessment.",
  },
];

export default function OnlineAdmissionPage() {
  return (
    <section className="section-spacing px-4">
      <div className="section-shell">
        <Reveal>
          <SectionTitle
            eyebrow="Online Admission"
            title="Apply from anywhere, anytime."
            description="Our streamlined online admission process makes applying to ABC School convenient and hassle-free."
          />
        </Reveal>

        {/* Online Form Placeholder */}
        <Reveal delay={0.08}>
          <Card className="mt-12 bg-white/78">
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-accent-soft)]">
                <svg
                  className="h-10 w-10 text-[var(--color-accent)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 className="mt-6 display-title text-2xl font-semibold">
                Online Application Form
              </h2>
              <p className="mt-3 text-[var(--color-muted)]">
                The online application system will be available soon. For now, please download the form or visit our campus.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Download Form (PDF)
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--color-ink)]/10 bg-white px-6 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-gray-50"
                >
                  Contact Admissions
                </a>
              </div>
            </div>
          </Card>
        </Reveal>

        {/* Eligibility & Application Steps */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Eligibility */}
          <Reveal delay={0.16}>
            <div>
              <h2 className="display-title text-2xl font-semibold">Eligibility Criteria</h2>
              <div className="mt-6 space-y-3">
                {eligibilityCriteria.map((item, index) => (
                  <Card key={item.grade} className="bg-white/78 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-[var(--color-ink)]">{item.grade}</h3>
                        <p className="text-sm text-[var(--color-muted)]">Age: {item.age}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[var(--color-accent)]">{item.seats}</p>
                        <p className="text-xs text-[var(--color-muted)]">Seats</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Application Steps */}
          <Reveal delay={0.24}>
            <div>
              <h2 className="display-title text-2xl font-semibold">How to Apply Online</h2>
              <div className="mt-6 space-y-4">
                {applicationSteps.map((step, index) => (
                  <div key={step.title} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--color-ink)]">{step.title}</h3>
                      <p className="mt-1 text-sm text-[var(--color-muted)]">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Important Notes */}
        <Reveal delay={0.32}>
          <div className="mt-12 rounded-[24px] border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 p-6">
            <h3 className="flex items-center gap-2 font-semibold text-[var(--color-ink)]">
              <span>📋</span> Important Notes
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
              <li>• Application fee: ₹1,500 (non-refundable)</li>
              <li>• Incomplete applications will not be processed</li>
              <li>• Original documents must be presented during verification</li>
              <li>• For technical support, call: +91 98765 43210</li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

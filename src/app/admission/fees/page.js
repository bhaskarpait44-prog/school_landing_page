import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Fee Structure",
  description:
    "Transparent fee structure for all grade levels at ABC School. Tuition, transport, and activity fees.",
  path: "/admission/fees",
  keywords: ["school fees", "fee structure", "tuition fees", "admission fees"],
});

const feeStructure = [
  {
    level: "Pre-Primary",
    grades: "Nursery – KG",
    admissionFee: "25,000",
    tuitionFee: "6,500",
    annualCharges: "12,000",
    total: "43,500",
  },
  {
    level: "Primary",
    grades: "Grade I – V",
    admissionFee: "30,000",
    tuitionFee: "7,500",
    annualCharges: "15,000",
    total: "52,500",
  },
  {
    level: "Middle School",
    grades: "Grade VI – VIII",
    admissionFee: "35,000",
    tuitionFee: "8,500",
    annualCharges: "18,000",
    total: "61,500",
  },
  {
    level: "Senior Secondary",
    grades: "Grade IX – XII",
    admissionFee: "40,000",
    tuitionFee: "10,000",
    annualCharges: "22,000",
    total: "72,000",
  },
];

const additionalFees = [
  { item: "Transportation", fee: "2,500 - 4,500/month", note: "Based on distance" },
  { item: "Computer Lab", fee: "1,500/year", note: "All grades" },
  { item: "Science Lab", fee: "2,000/year", note: "Grade VI onwards" },
  { item: "Library", fee: "1,000/year", note: "All grades" },
  { item: "Sports & Games", fee: "2,000/year", note: "All grades" },
  { item: "Examination", fee: "1,500/year", note: "All grades" },
];

const paymentModes = [
  { mode: "Online Payment", details: "Credit/Debit Card, Net Banking, UPI" },
  { mode: "Bank Transfer", details: "NEFT/RTGS to school account" },
  { mode: "Demand Draft", details: "Payable at Kolkata branches" },
  { mode: "Cash", details: "At school fee counter only" },
];

export default function FeesPage() {
  return (
    <section className="section-spacing px-4">
      <div className="section-shell">
        <Reveal>
          <SectionTitle
            eyebrow="Fee Structure"
            title="Transparent pricing for quality education."
            description="Our fee structure is designed to be fair and transparent. All charges are communicated upfront with no hidden costs."
          />
        </Reveal>

        {/* Fee Table */}
        <Reveal delay={0.08}>
          <Card className="mt-12 overflow-hidden bg-white/78">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-black/5 bg-[var(--color-accent-soft)]/30">
                    <th className="px-4 py-4 text-left text-sm font-semibold">Level</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold">Grades</th>
                    <th className="px-4 py-4 text-right text-sm font-semibold">Admission (₹)</th>
                    <th className="px-4 py-4 text-right text-sm font-semibold">Tuition (₹/month)</th>
                    <th className="px-4 py-4 text-right text-sm font-semibold">Annual (₹)</th>
                    <th className="px-4 py-4 text-right text-sm font-semibold">Total (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {feeStructure.map((row, index) => (
                    <tr
                      key={row.level}
                      className={`${
                        index !== feeStructure.length - 1 ? "border-b border-black/5" : ""
                      } hover:bg-white/50 transition`}
                    >
                      <td className="px-4 py-4 font-medium">{row.level}</td>
                      <td className="px-4 py-4 text-sm text-[var(--color-muted)]">{row.grades}</td>
                      <td className="px-4 py-4 text-right">{row.admissionFee}</td>
                      <td className="px-4 py-4 text-right">{row.tuitionFee}</td>
                      <td className="px-4 py-4 text-right">{row.annualCharges}</td>
                      <td className="px-4 py-4 text-right font-semibold text-[var(--color-accent)]">
                        {row.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 px-4 text-xs text-[var(--color-muted)]">
              * All fees are in Indian Rupees (₹). Tuition fee is payable monthly. Annual charges include development fund, maintenance, and activity fees.
            </p>
          </Card>
        </Reveal>

        {/* Additional Fees & Payment */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Additional Fees */}
          <Reveal delay={0.16}>
            <div>
              <h2 className="display-title text-2xl font-semibold">Additional Fees</h2>
              <div className="mt-6 space-y-3">
                {additionalFees.map((item) => (
                  <Card key={item.item} className="bg-white/78 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{item.item}</h3>
                        <p className="text-xs text-[var(--color-muted)]">{item.note}</p>
                      </div>
                      <span className="font-semibold text-[var(--color-accent)]">₹{item.fee}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Payment Modes */}
          <Reveal delay={0.24}>
            <div>
              <h2 className="display-title text-2xl font-semibold">Payment Options</h2>
              <div className="mt-6 space-y-3">
                {paymentModes.map((item) => (
                  <div
                    key={item.mode}
                    className="flex items-start gap-4 rounded-[20px] border border-white/70 bg-white/60 p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                      💳
                    </div>
                    <div>
                      <h3 className="font-medium">{item.mode}</h3>
                      <p className="text-sm text-[var(--color-muted)]">{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Scholarship Notice */}
        <Reveal delay={0.32}>
          <div className="mt-12 rounded-[24px] border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 p-6">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold text-[var(--color-ink)]">Scholarships Available</h3>
                <p className="mt-1 text-sm text-[var(--color-muted)]">
                  Merit-based scholarships up to 50% fee waiver for deserving students.
                </p>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Learn More
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

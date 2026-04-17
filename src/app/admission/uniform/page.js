import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "School Uniform",
  description:
    "School uniform guidelines, dress code, and purchase information for ABC School students.",
  path: "/admission/uniform",
  keywords: ["school uniform", "dress code", "school dress", "uniform guidelines"],
});

const summerUniform = {
  boys: [
    "White shirt with school logo (half sleeves)",
    "Grey shorts (Grades I-V) / Trousers (Grades VI-XII)",
    "Black leather belt with plain buckle",
    "White socks with grey stripes",
    "Black leather shoes",
    "School tie (Monday and special occasions)",
  ],
  girls: [
    "White shirt with school logo (half sleeves)",
    "Grey pinafore (Grades I-V) / Skirt (Grades VI-XII)",
    "Black leather belt with plain buckle",
    "White socks with grey stripes",
    "Black leather shoes (without heels)",
    "School tie (Monday and special occasions)",
  ],
};

const winterUniform = {
  boys: [
    "White shirt with school logo (full sleeves)",
    "Grey trousers",
    "Black blazer with school crest",
    "Grey sweater / pullover",
    "Black leather belt",
    "White socks with grey stripes",
    "Black leather shoes",
    "School tie (daily)",
    "Black woolen cap (optional)",
  ],
  girls: [
    "White shirt with school logo (full sleeves)",
    "Grey skirt",
    "Black blazer with school crest",
    "Grey sweater / pullover",
    "Black leather belt",
    "White socks with grey stripes",
    "Black leather shoes (without heels)",
    "School tie (daily)",
    "Black woolen cap (optional)",
  ],
};

const sportsUniform = [
  "House color T-shirt (Red, Blue, Green, or Yellow)",
  "White shorts / track pants",
  "White canvas shoes",
  "White socks",
  "Sports days: Wednesday and Saturday",
];

const uniformRules = [
  "All students must wear complete uniform daily",
  "Uniform must be clean, ironed, and in good condition",
  "School logo must be clearly visible on the shirt/blazer",
  "No jewelry except small studs for girls",
  "Boys must have neat, short hair (no fancy cuts)",
  "Girls with long hair must tie it neatly with black/white bands",
  "Nails must be clean and trimmed",
  "Students out of uniform require a written note from parents",
];

const purchaseInfo = [
  {
    item: "Authorized Vendor",
    detail: "ABC School Uniform Store (School Campus)",
  },
  {
    item: "Timings",
    detail: "Monday - Saturday, 9:00 AM - 4:00 PM",
  },
  {
    item: "Contact",
    detail: "+91 98765 43211",
  },
  {
    item: "Note",
    detail: "Uniform available year-round. Order 2 weeks before session begins.",
  },
];

export default function UniformPage() {
  return (
    <section className="section-spacing px-4">
      <div className="section-shell">
        <Reveal>
          <SectionTitle
            eyebrow="School Uniform"
            title="Pride in appearance, unity in identity."
            description="Our uniform fosters a sense of belonging and equality among students while instilling discipline and pride."
          />
        </Reveal>

        {/* Summer & Winter Uniform */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Summer */}
          <Reveal delay={0.08}>
            <Card className="h-full bg-white/78">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-gold)]/20 text-xl">☀️</span>
                <h2 className="display-title text-2xl font-semibold">Summer Uniform</h2>
              </div>
              <p className="text-sm text-[var(--color-muted)]">April - September</p>

              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-[var(--color-accent)]">Boys</h3>
                  <ul className="mt-3 space-y-2">
                    {summerUniform.boys.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-[var(--color-muted)]">
                        <span>•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-accent)]">Girls</h3>
                  <ul className="mt-3 space-y-2">
                    {summerUniform.girls.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-[var(--color-muted)]">
                        <span>•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </Reveal>

          {/* Winter */}
          <Reveal delay={0.16}>
            <Card className="h-full bg-white/78">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-xl">❄️</span>
                <h2 className="display-title text-2xl font-semibold">Winter Uniform</h2>
              </div>
              <p className="text-sm text-[var(--color-muted)]">October - March</p>

              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-[var(--color-accent)]">Boys</h3>
                  <ul className="mt-3 space-y-2">
                    {winterUniform.boys.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-[var(--color-muted)]">
                        <span>•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-accent)]">Girls</h3>
                  <ul className="mt-3 space-y-2">
                    {winterUniform.girls.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-[var(--color-muted)]">
                        <span>•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>

        {/* Sports Uniform & Rules */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Sports */}
          <Reveal delay={0.24}>
            <Card className="h-full bg-white/78">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-xl">🏃</span>
                <h2 className="display-title text-xl font-semibold">Sports Uniform</h2>
              </div>
              <ul className="space-y-2">
                {sportsUniform.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-[var(--color-muted)]">
                    <span className="text-[var(--color-accent)]">•</span> {item}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>

          {/* Uniform Rules */}
          <Reveal delay={0.32}>
            <Card className="h-full bg-[var(--color-accent)]/5 border border-[var(--color-accent)]/20">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent)] text-xl text-white">📋</span>
                <h2 className="display-title text-xl font-semibold">Uniform Rules</h2>
              </div>
              <ul className="space-y-2">
                {uniformRules.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-[var(--color-muted)]">
                    <span className="text-[var(--color-accent)]">✓</span> {item}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>

        {/* Purchase Info */}
        <Reveal delay={0.4}>
          <Card className="mt-8 bg-[var(--color-panel-strong)] text-white">
            <h2 className="display-title text-2xl font-semibold">Uniform Purchase Information</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {purchaseInfo.map((info, index) => (
                <div key={index}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/50">{info.item}</p>
                  <p className="mt-1 text-white/90">{info.detail}</p>
                </div>
              ))}
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

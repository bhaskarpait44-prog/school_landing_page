import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import { galleryMoments } from "@/data/gallery";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Gallery",
  description:
    "Preview campus experiences, student life, arts, athletics, and learning spaces at ABC School.",
  path: "/gallery",
  keywords: ["school gallery", "campus life", "student activities"],
});

export default function GalleryPage() {
  return (
    <section className="section-spacing px-4">
      <div className="section-shell">
        <Reveal>
          <SectionTitle
            eyebrow="Gallery"
            title="Moments that help families picture life on campus."
            description="When you add real photos later, this route is already prepared with useful copy, clean layout, and metadata."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {galleryMoments.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <div
                className={`relative min-h-[320px] overflow-hidden rounded-[32px] bg-gradient-to-br ${item.palette} p-7 text-white shadow-[var(--shadow-card)]`}
              >
                <div className="absolute inset-0 bg-black/12" />
                <div className="relative">
                  <p className="text-sm uppercase tracking-[0.22em] text-white/75">Campus Story</p>
                  <h3 className="mt-5 text-4xl font-semibold text-balance">{item.title}</h3>
                  <p className="mt-4 max-w-md text-lg text-white/84">{item.caption}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

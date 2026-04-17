import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { galleryMoments } from "@/data/gallery";

export default function GalleryPreview() {
  return (
    <section className="section-spacing px-4">
      <div className="section-shell">
        <Reveal>
          <SectionTitle
            eyebrow="Campus Highlights"
            title="Life at our school, captured in every corner."
            description="From science fairs to sports day, cultural events to quiet library afternoons — our campus thrives with purpose and energy."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {galleryMoments.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.07}>
              <article
                className={`group relative min-h-[260px] overflow-hidden rounded-[26px] bg-gradient-to-br ${item.palette} p-6 text-white shadow-[var(--shadow-card)] md:min-h-[280px] md:rounded-[30px]`}
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.35)_100%)]" />
                <div className="absolute right-5 top-5 h-14 w-14 rounded-full border border-white/30 bg-white/10 transition duration-500 group-hover:scale-110" />
                <div className="relative flex h-full flex-col justify-end">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/75">Featured</p>
                  <h3 className="mt-2 text-2xl font-semibold leading-tight text-balance md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-white/82">{item.caption}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

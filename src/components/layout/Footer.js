import Link from "next/link";
import { SCHOOL_INFO } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-8 px-4 pb-6 pt-4">
      <div className="section-shell">
        <div className="overflow-hidden rounded-[36px] bg-[var(--color-panel-strong)] text-white shadow-[var(--shadow-soft)]">
          {/* Top section */}
          <div className="px-6 pb-10 pt-12 md:px-10 lg:px-14">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr]">
              {/* Brand */}
              <div className="sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-xs font-bold tracking-[0.2em] text-white">
                    ABC
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">
                      Excellence
                    </p>
                    <p className="display-title text-lg font-semibold">{SCHOOL_INFO.name}</p>
                  </div>
                </div>
                <p className="mt-5 max-w-xs text-sm leading-7 text-white/60">
                  {SCHOOL_INFO.description}
                </p>
                <div className="mt-6 flex gap-3">
                  {SCHOOL_INFO.socialLinks.map((href, i) => {
                    const labels = ["Facebook", "Instagram", "YouTube"];
                    const icons = ["f", "in", "▶"];
                    return (
                      <a
                        key={i}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={labels[i]}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-xs font-bold text-white transition hover:bg-[var(--color-accent)] hover:scale-105"
                      >
                        {icons[i]}
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Navigate */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  Navigate
                </h3>
                <ul className="mt-4 space-y-3">
                  {SCHOOL_INFO.navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/75 transition hover:text-white hover:translate-x-0.5 inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Academics */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  Academics
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-white/75">
                  {["Primary School", "Middle School", "Senior Secondary", "Science Stream", "Commerce Stream", "Arts Stream"].map((item) => (
                    <li key={item}>
                      <Link href="/academics" className="transition hover:text-white inline-block">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  Contact Us
                </h3>
                <ul className="mt-4 space-y-4 text-sm text-white/75">
                  <li className="flex items-start gap-2.5">
                    <span className="mt-0.5 shrink-0 text-[var(--color-accent)]">📍</span>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${SCHOOL_INFO.address.streetAddress}, ${SCHOOL_INFO.address.addressLocality}, ${SCHOOL_INFO.address.addressRegion} ${SCHOOL_INFO.address.postalCode}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="leading-6 transition hover:text-white"
                    >
                      {SCHOOL_INFO.address.streetAddress},{" "}
                      {SCHOOL_INFO.address.addressLocality},{" "}
                      {SCHOOL_INFO.address.addressRegion} –{" "}
                      {SCHOOL_INFO.address.postalCode}
                    </a>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="shrink-0 text-[var(--color-accent)]">📞</span>
                    <a href={`tel:${SCHOOL_INFO.phone}`} className="hover:text-white transition">
                      {SCHOOL_INFO.phone}
                    </a>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="shrink-0 text-[var(--color-accent)]">✉️</span>
                    <a href={`mailto:${SCHOOL_INFO.email}`} className="hover:text-white transition break-all">
                      {SCHOOL_INFO.email}
                    </a>
                  </li>
                </ul>

                <Link
                  href="/admission"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 hover:-translate-y-0.5 shadow-sm"
                >
                  Apply Now →
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 px-6 py-5 text-xs text-white/40 sm:flex-row md:px-10 lg:px-14">
            <p>© {currentYear} {SCHOOL_INFO.name}. All rights reserved.</p>
            <div className="flex gap-5">
              <Link href="/contact" className="hover:text-white/70 transition">Privacy Policy</Link>
              <Link href="/contact" className="hover:text-white/70 transition">Terms of Use</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

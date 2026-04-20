"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { notices } from "@/data/notices";

// Marquee Notice Card
function NoticeCard({ notice }) {
  return (
    <div className="flex-shrink-0 w-[260px] sm:w-[300px] mx-2">
      <div className="h-full bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700 border border-emerald-100">
              {notice.tag}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Update</span>
          </div>
          <h3 className="text-base font-semibold leading-tight text-slate-900 mb-2 line-clamp-2">
            {notice.title}
          </h3>
          <p className="text-xs leading-relaxed text-slate-600 line-clamp-2">
            {notice.detail}
          </p>
        </div>
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100">
          <Link
            href="/notices"
            className="text-xs font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            Read more →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function NoticeBoard() {
  // Duplicate notices for seamless loop
  const duplicatedNotices = [...notices, ...notices, ...notices];

  return (
    <section className="section-spacing bg-slate-50/50 border-y border-slate-200">
      <div className="max-w-[1600px] mx-auto">
        <Reveal>
          <SectionTitle
            eyebrow="Latest Notices"
            title="Stay Updated"
            description="Important announcements and updates from the school administration."
            align="center"
          />
        </Reveal>

        {/* Marquee Container */}
        <div className="mt-10 relative overflow-hidden">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50/50 to-transparent z-10 pointer-events-none" />

          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50/50 to-transparent z-10 pointer-events-none" />

          {/* Scrolling Track - only cards scroll */}
          <div className="flex py-2 animate-marquee">
            {duplicatedNotices.map((notice, index) => (
              <NoticeCard key={`${notice.title}-${index}`} notice={notice} />
            ))}
          </div>
        </div>
      </div>

      {/* Fixed CTA Button - outside scrolling container, stays static */}
      <div className="bg-slate-50/50 border-b border-slate-200 pb-12">
        <div className="max-w-[1600px] mx-auto">
          <Reveal delay={0.2}>
            <div className="flex justify-center">
              <Link
                href="/notices"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-700/20 hover:bg-emerald-800 hover:shadow-xl hover:shadow-emerald-700/30 hover:-translate-y-0.5 transition-all duration-200 border border-emerald-600"
              >
                View All Notices
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

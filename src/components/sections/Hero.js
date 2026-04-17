"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const stats = [
  { value: "98%", label: "Board success rate" },
  { value: "28+", label: "Clubs and studios" },
  { value: "1:16", label: "Teacher-student ratio" },
];

export default function Hero() {
  return (
    <section className="relative px-4 pb-12 pt-6 md:pb-16 md:pt-8">
      <div className="section-shell relative overflow-hidden rounded-[32px] border border-white/70 bg-[linear-gradient(135deg,#112240_0%,#0f766e_55%,#f0b429_140%)] px-5 py-12 text-white shadow-[var(--shadow-soft)] md:rounded-[40px] md:px-10 md:py-20">
        <div className="grid-overlay" />
        <motion.div
          animate={{ y: [0, -14, 0], x: [0, 6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="floating-orb right-[-4rem] top-[-2rem] h-48 w-48 bg-white/20"
        />
        <motion.div
          animate={{ y: [0, 18, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="floating-orb bottom-[-5rem] left-[-3rem] h-56 w-56 bg-[#f5d58d]/35"
        />

        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          {/* Left col */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow bg-white/14 text-white"
            >
              Premium Learning Experience
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="display-title mt-5 text-4xl font-semibold leading-[1.05] text-balance sm:text-5xl md:text-6xl lg:text-7xl"
            >
              A refined digital presence for a school shaping modern leaders.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-5 max-w-2xl text-base leading-8 text-white/82 md:text-lg"
            >
              Academic excellence, future-facing facilities, and a nurturing campus culture
              now presented through a website built to impress families and support better
              search visibility.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-7 flex flex-wrap gap-3"
            >
              <Button href="/admission" className="bg-white text-[var(--color-ink)]">
                Apply for Admission
              </Button>
              <Button
                href="/about"
                variant="secondary"
                className="border-white/25 bg-white/10 text-white hover:bg-white/16"
              >
                Explore the Campus
              </Button>
            </motion.div>
          </div>

          {/* Right col */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="glass-panel rounded-[28px] border border-white/15 bg-white/12 p-5 text-white lg:rounded-[32px] lg:p-6"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-white/65">Why Families Choose Us</p>
            <div className="mt-5 space-y-3">
              {[
                "Project-based academics with expert faculty support",
                "Leadership, arts, and athletics designed for whole-child growth",
                "Clear admission pathways and parent-first communication",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/14 bg-white/10 px-4 py-3.5">
                  <p className="text-sm leading-7 text-white/88 md:text-base">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.4 }}
          className="relative mt-10 grid grid-cols-3 gap-3 md:gap-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[22px] border border-white/14 bg-white/10 px-4 py-4 backdrop-blur-md md:rounded-[26px] md:px-5 md:py-5"
            >
              <p className="display-title text-2xl font-semibold sm:text-3xl md:text-4xl">{stat.value}</p>
              <p className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-white/70 sm:text-xs sm:tracking-[0.22em]">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

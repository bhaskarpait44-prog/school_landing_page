"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { notices } from "@/data/notices";

const slides = [
  {
    id: 1,
    image: "/images/slide-1.jpg",
    gradient: "linear-gradient(135deg, #1e3a5f 0%, #2d5a87 50%, #3d7ab5 100%)",
    title: "Welcome to Baptist School",
    subtitle: "Excellence in Education Since 1995",
    description: "Nurturing young minds to become future leaders through quality education.",
  },
  {
    id: 2,
    image: "/images/slide-2.jpg",
    gradient: "linear-gradient(135deg, #0f4c3a 0%, #1a6b4f 50%, #27a069 100%)",
    title: "Modern Learning Facilities",
    subtitle: "State-of-the-Art Infrastructure",
    description: "Smart classrooms, science labs, and digital libraries.",
  },
  {
    id: 3,
    image: "/images/slide-3.jpg",
    gradient: "linear-gradient(135deg, #5c3d2e 0%, #8b5a3c 50%, #b8784e 100%)",
    title: "All-Round Development",
    subtitle: "Sports, Arts & Culture",
    description: "Encouraging students to excel beyond academics.",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-4 lg:gap-6">
          {/* Left Side - Image Slider with left spacing */}
          <div className="lg:pl-6 xl:pl-8 lg:py-6">
            <div
              className="relative overflow-hidden h-[400px] sm:h-[480px] lg:h-[500px] rounded-2xl shadow-2xl shadow-slate-900/20"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
            {/* Background Slides */}
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <div
                  className="absolute inset-0"
                  style={{ background: slide.gradient }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />
              </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 lg:px-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-xl"
                >
                  <p className="text-white/80 text-xs sm:text-sm uppercase tracking-wider mb-3">
                    {slide.subtitle}
                  </p>
                  <h1 className="display-title text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-white/80 text-sm sm:text-base mb-6 max-w-md">
                    {slide.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/admission"
                      className="inline-flex items-center px-6 py-2.5 bg-white text-slate-900 rounded-full text-sm font-medium hover:bg-white/90 transition-colors"
                    >
                      Apply Now
                    </Link>
                    <Link
                      href="/about"
                      className="inline-flex items-center px-6 py-2.5 border border-white/40 text-white rounded-full text-sm font-medium hover:bg-white/10 transition-colors"
                    >
                      Learn More
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur text-white flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label="Previous slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur text-white flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label="Next slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Slide Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === currentSlide ? "bg-white" : "bg-white/40"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          </div>

          {/* Right Side - Notice Board */}
          <div className="lg:pr-6 xl:pr-8 lg:py-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col h-[400px] sm:h-[480px] lg:h-[500px] shadow-lg shadow-slate-900/5">
            {/* Header */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                  Live Updates
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Notice Board</h2>
            </div>

            {/* Notices */}
            <div className="flex-1 space-y-3 overflow-y-auto">
              {notices.map((notice, index) => (
                <div
                  key={notice.title}
                  className="group p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all"
                >
                  <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-semibold uppercase tracking-wider mb-2">
                    {notice.tag}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900 leading-tight group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {notice.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2">
                    {notice.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-5 pt-4 border-t border-slate-200">
              <Link
                href="/notices"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 transition-colors"
              >
                View All Notices
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

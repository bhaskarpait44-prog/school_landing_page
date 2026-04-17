"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";

// School images/slides data - Replace with actual images later
const slides = [
  {
    id: 1,
    image: "/images/slide-1.jpg",
    gradient: "linear-gradient(135deg, #1e3a5f 0%, #2d5a87 50%, #3d7ab5 100%)",
    title: "Welcome to ABC School",
    subtitle: "Excellence in Education Since 1995",
    description: "Nurturing young minds to become future leaders through quality education and holistic development.",
  },
  {
    id: 2,
    image: "/images/slide-2.jpg",
    gradient: "linear-gradient(135deg, #0f4c3a 0%, #1a6b4f 50%, #27a069 100%)",
    title: "Modern Learning Facilities",
    subtitle: "State-of-the-Art Infrastructure",
    description: "Smart classrooms, science labs, and digital libraries designed for 21st century learning.",
  },
  {
    id: 3,
    image: "/images/slide-3.jpg",
    gradient: "linear-gradient(135deg, #5c3d2e 0%, #8b5a3c 50%, #b8784e 100%)",
    title: "All-Round Development",
    subtitle: "Sports, Arts & Culture",
    description: "Encouraging students to excel beyond academics through diverse extracurricular activities.",
  },
  {
    id: 4,
    image: "/images/slide-4.jpg",
    gradient: "linear-gradient(135deg, #3d2c5e 0%, #5a3d8c 50%, #7a52b3 100%)",
    title: "Dedicated Faculty",
    subtitle: "Experienced & Passionate Teachers",
    description: "Our expert educators are committed to bringing out the best in every student.",
  },
];

const stats = [
  { value: "98%", label: "Board success rate" },
  { value: "28+", label: "Clubs and studios" },
  { value: "1:16", label: "Teacher-student ratio" },
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

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  // Auto-play with RAF-based timing for smoother performance
  useEffect(() => {
    if (isPaused) return;

    let startTime = Date.now();
    let rafId;

    const checkTime = () => {
      const now = Date.now();
      if (now - startTime >= 5000) {
        nextSlide();
        startTime = now;
      }
      rafId = requestAnimationFrame(checkTime);
    };

    rafId = requestAnimationFrame(checkTime);
    return () => cancelAnimationFrame(rafId);
  }, [isPaused, nextSlide]);

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full">
      {/* Main Slider - GPU Accelerated */}
      <div
        className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] w-full overflow-hidden gpu-layer"
      >
        {/* Background Images - Simplified Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 gpu-layer"
          >
            {/* Fallback gradient background */}
            <div
              className="absolute inset-0"
              style={{ background: slide.gradient }}
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
          </motion.div>
        </AnimatePresence>

        {/* Content - Staggered fade in */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <p className="text-white/80 text-sm sm:text-base uppercase tracking-[0.3em] mb-3 sm:mb-4">
                  {slide.subtitle}
                </p>
                <h1 className="display-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
                  {slide.title}
                </h1>
                <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed">
                  {slide.description}
                </p>
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                  <Button
                    href="/admission"
                    className="bg-white text-[var(--color-ink)] hover:bg-white/90 px-6 sm:px-8 py-3 text-sm sm:text-base"
                  >
                    Apply for Admission
                  </Button>
                  <Button
                    href="/about"
                    variant="secondary"
                    className="border-2 border-white/50 bg-transparent text-white hover:bg-white/10 px-6 sm:px-8 py-3 text-sm sm:text-base"
                  >
                    Learn More
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Arrows - Simplified */}
        <button
          onClick={() => {
            prevSlide();
            setIsPaused(true);
            setTimeout(() => setIsPaused(false), 8000);
          }}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors duration-200"
          aria-label="Previous slide"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => {
            nextSlide();
            setIsPaused(true);
            setTimeout(() => setIsPaused(false), 8000);
          }}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors duration-200"
          aria-label="Next slide"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots Navigation - No animation on dots */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                goToSlide(index);
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 8000);
              }}
              className={`h-2 sm:h-3 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? "w-6 sm:w-8 bg-white"
                  : "w-2 sm:w-3 bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-6 sm:bottom-8 right-4 sm:right-6 z-20 text-white/70 text-xs sm:text-sm font-medium">
          <span className="text-white font-semibold">{String(currentSlide + 1).padStart(2, "0")}</span>
          <span className="mx-1">/</span>
          <span>{String(slides.length).padStart(2, "0")}</span>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 -mt-16 sm:-mt-20 mx-4 sm:mx-6 lg:mx-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-5xl mx-auto grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white shadow-xl border border-gray-100"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center"
            >
              <p className="display-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-accent)]">
                {stat.value}
              </p>
              <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs md:text-sm text-[var(--color-muted)] uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Quick Info Bar - Simplified animations */}
      <div className="mt-8 sm:mt-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { icon: "📚", title: "Academic Programs", desc: "CBSE Curriculum" },
            { icon: "🏆", title: "Achievements", desc: "National Level Awards" },
            { icon: "🚌", title: "Transport", desc: "Safe & Secure Bus Service" },
            { icon: "🏫", title: "Campus", desc: "5 Acres of Learning Space" },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[var(--color-accent-soft)] flex items-center justify-center text-xl sm:text-2xl">
                {item.icon}
              </div>
              <div>
                <p className="font-semibold text-[var(--color-ink)] text-sm sm:text-base">{item.title}</p>
                <p className="text-xs sm:text-sm text-[var(--color-muted)]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show on initial page load after delay
    const sessionShown = sessionStorage.getItem("notificationShown");
    if (!sessionShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("notificationShown", "true");
      }, 1500);
      return () => clearTimeout(timer);
    }

    // Listen for custom event from Home link click
    const handleShowNotification = () => {
      setIsOpen(true);
    };

    window.addEventListener("showNotification", handleShowNotification);
    return () => window.removeEventListener("showNotification", handleShowNotification);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 z-[101] w-[90%] max-w-[500px] -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-2xl">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[var(--color-ink)] shadow-md transition hover:bg-white hover:scale-105"
                aria-label="Close notification"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Image Container - Replace this section with your actual image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-panel-strong)]">
                {/*
                  TO USE YOUR OWN IMAGE:
                  1. Add your image to /public folder (e.g., /public/notification.jpg)
                  2. Import Image component: import Image from "next/image";
                  3. Replace the div below with:

                  <Image
                    src="/notification.jpg"
                    alt="Notification"
                    fill
                    className="object-cover"
                    priority
                  />
                */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                    <svg
                      className="h-10 w-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </div>
                  <h3 className="display-title text-2xl font-semibold">
                    Admissions Open 2026-27
                  </h3>
                  <p className="mt-2 text-white/80">
                    Applications now available for Pre-Primary to Grade 11
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h4 className="text-lg font-semibold text-[var(--color-ink)]">
                  Important Announcement
                </h4>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                  Join us for campus tours every Saturday. Limited seats available for the upcoming academic year. Early applicants receive priority consideration.
                </p>
                <div className="mt-5 flex gap-3">
                  <a
                    href="/admission"
                    onClick={closeModal}
                    className="inline-flex flex-1 items-center justify-center rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    Apply Now
                  </a>
                  <button
                    onClick={closeModal}
                    className="inline-flex items-center justify-center rounded-full border border-[var(--color-ink)]/10 bg-white px-5 py-2.5 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-gray-50"
                  >
                    Later
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

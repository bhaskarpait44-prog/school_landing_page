"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function NotificationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const sessionShown = sessionStorage.getItem("notificationShown");
    if (!sessionShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        // Small delay for CSS transition
        setTimeout(() => setIsVisible(true), 10);
        sessionStorage.setItem("notificationShown", "true");
      }, 1500);
      return () => clearTimeout(timer);
    }

    const handleShowNotification = () => {
      setIsOpen(true);
      setTimeout(() => setIsVisible(true), 10);
    };

    window.addEventListener("showNotification", handleShowNotification);
    return () => window.removeEventListener("showNotification", handleShowNotification);
  }, []);

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeModal}
        className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Modal */}
      <div
        className={`fixed left-1/2 top-1/2 z-[101] w-[90%] max-w-[500px] -translate-x-1/2 -translate-y-1/2
          transition-all duration-300 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white shadow-2xl">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[var(--color-ink)] shadow-md transition hover:bg-white"
            aria-label="Close notification"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image Container */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-panel-strong)]">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              Join us for campus tours every Saturday. Limited seats available for the upcoming academic year.
            </p>
            <div className="mt-5 flex gap-3">
              <Link
                href="/admission"
                onClick={closeModal}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Apply Now
              </Link>
              <button
                onClick={closeModal}
                className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-gray-50"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

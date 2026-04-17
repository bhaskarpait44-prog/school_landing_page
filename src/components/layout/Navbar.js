"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { SCHOOL_INFO } from "@/lib/constants";

// Dropdown menu data
const dropdownMenus = {
  academics: [
    { href: "/academics/overview", label: "Academic Overview", icon: "📚" },
    { href: "/academics/parents", label: "For Parents & Guardians", icon: "👨‍👩‍👧" },
    { href: "/academics/calendar", label: "Academic Calendar", icon: "📅" },
    { href: "/academics/syllabus", label: "Syllabus", icon: "📖" },
  ],
  admission: [
    { href: "/admission", label: "Online Admission", icon: "📝" },
    { href: "/admission/procedure", label: "Admission Procedure", icon: "📋" },
    { href: "/admission/fees", label: "Fee Structure", icon: "💰" },
    { href: "/admission/timing", label: "School Timing", icon: "⏰" },
    { href: "/admission/uniform", label: "Uniform", icon: "👔" },
  ],
};

// Desktop Dropdown Component
function DesktopDropdown({ label, href, items, pathname }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);
  const isActive = pathname === href || items.some((item) => pathname === item.href);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={href}
        className={`group relative flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
          isActive
            ? "text-[var(--color-accent)]"
            : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
        }`}
      >
        <span className="relative z-10">{label}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-4 h-4 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
        {isActive && (
          <motion.div
            layoutId="navbar-active"
            className="absolute inset-0 rounded-full bg-[var(--color-accent-soft)]"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50"
          >
            <div className="relative">
              {/* Arrow */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/90 rotate-45 border-t border-l border-white/50" />

              <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-2 min-w-[260px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/50 overflow-hidden">
                {items.map((item, index) => {
                  const isItemActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                    >
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 group ${
                          isItemActive
                            ? "bg-[var(--color-accent)] text-white"
                            : "text-[var(--color-ink)] hover:bg-[var(--color-accent-soft)]/50 hover:text-[var(--color-accent)]"
                        }`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.label}</span>
                        {!isItemActive && (
                          <motion.svg
                            className="ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </motion.svg>
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Simple Nav Link with animated underline
function NavLink({ href, label, pathname }) {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`group relative px-4 py-2.5 text-sm font-medium transition-colors duration-300 ${
        isActive
          ? "text-[var(--color-accent)]"
          : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
      }`}
    >
      <span className="relative z-10">{label}</span>
      {isActive ? (
        <motion.div
          layoutId="navbar-active"
          className="absolute inset-0 rounded-full bg-[var(--color-accent-soft)]"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      ) : (
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[var(--color-accent)] rounded-full group-hover:w-1/2 transition-all duration-300" />
      )}
    </Link>
  );
}

// Mobile Menu Item
function MobileMenuItem({ item, pathname, onClose }) {
  const isActive = pathname === item.href;
  const hasDropdown = item.dropdownItems && item.dropdownItems.length > 0;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="overflow-hidden">
      <Link
        href={item.href}
        onClick={() => {
          if (!hasDropdown) onClose();
        }}
        className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium transition-all duration-200 ${
          isActive
            ? "bg-[var(--color-accent)] text-white"
            : "text-[var(--color-ink)] hover:bg-[var(--color-accent-soft)]/50"
        }`}
      >
        <span className="flex items-center gap-3">
          {item.icon && <span className="text-xl">{item.icon}</span>}
          {item.label}
        </span>
        {hasDropdown && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsExpanded(!isExpanded);
            }}
            className="p-1 rounded-lg hover:bg-black/5"
          >
            <motion.svg
              animate={{ rotate: isExpanded ? 180 : 0 }}
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </button>
        )}
      </Link>

      <AnimatePresence>
        {hasDropdown && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="ml-4"
          >
            <div className="border-l-2 border-[var(--color-accent-soft)] pl-4 py-2 space-y-1">
              {item.dropdownItems.map((subItem) => {
                const isSubActive = pathname === subItem.href;
                return (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-all duration-200 ${
                      isSubActive
                        ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)] font-medium"
                        : "text-[var(--color-muted)] hover:text-[var(--color-accent)]"
                    }`}
                  >
                    <span>{subItem.icon}</span>
                    {subItem.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Main Navbar Component
export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinks = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/about", label: "About", icon: "ℹ️" },
    {
      href: "/academics",
      label: "Academics",
      icon: "🎓",
      dropdownItems: dropdownMenus.academics,
    },
    { href: "/gallery", label: "Gallery", icon: "🖼️" },
    { href: "/notices", label: "Notices", icon: "📢" },
    {
      href: "/admission",
      label: "Admission",
      icon: "📝",
      dropdownItems: dropdownMenus.admission,
    },
    { href: "/contact", label: "Contact", icon: "📞" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "pt-2" : "pt-4"
        }`}
      >
        <div className="section-shell px-4">
          <motion.nav
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`relative flex items-center justify-between rounded-[28px] px-5 py-3 transition-all duration-500 ${
              scrolled
                ? "bg-white/90 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-white/60"
                : "bg-white/70 backdrop-blur-md border border-white/40"
            }`}
          >
            {/* Logo */}
            <Link href="/" className="flex shrink-0 items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 3 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-panel-strong)] to-slate-800 text-xs font-bold tracking-[0.2em] text-white shadow-lg shadow-slate-500/20"
              >
                ABC
              </motion.div>
              <div className="hidden sm:block">
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-accent)]"
                >
                  Excellence
                </motion.p>
                <p className="display-title text-lg font-semibold leading-tight text-[var(--color-ink)]">
                  {SCHOOL_INFO.name}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Home Link */}
              <NavLink href="/" label="Home" pathname={pathname} />

              {/* About Link */}
              <NavLink href="/about" label="About" pathname={pathname} />

              {/* Academics Dropdown */}
              <DesktopDropdown
                label="Academics"
                href="/academics"
                items={dropdownMenus.academics}
                pathname={pathname}
              />

              {/* Gallery Link */}
              <NavLink href="/gallery" label="Gallery" pathname={pathname} />

              {/* Notices Link */}
              <NavLink href="/notices" label="Notices" pathname={pathname} />

              {/* Admission Dropdown */}
              <DesktopDropdown
                label="Admission"
                href="/admission"
                items={dropdownMenus.admission}
                pathname={pathname}
              />

              {/* Contact Link */}
              <NavLink href="/contact" label="Contact" pathname={pathname} />
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/admission"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[var(--color-accent)] to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Apply Now
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.95 }}
              className="flex lg:hidden h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)]/50 text-[var(--color-accent)] transition-all duration-300 hover:bg-[var(--color-accent-soft)]"
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.svg
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    className="w-6 h-6"
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
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 lg:hidden shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-panel-strong)] to-slate-800 text-xs font-bold tracking-[0.2em] text-white">
                    ABC
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-accent)]">
                      Excellence
                    </p>
                    <p className="display-title text-base font-semibold text-[var(--color-ink)]">
                      {SCHOOL_INFO.name}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition hover:bg-gray-200"
                >
                  <svg
                    className="w-6 h-6"
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
              </div>

              {/* Navigation Links */}
              <div className="p-5 space-y-2 overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
                {navLinks.map((link) => (
                  <MobileMenuItem
                    key={link.href}
                    item={link}
                    pathname={pathname}
                    onClose={() => setMenuOpen(false)}
                  />
                ))}
              </div>

              {/* Footer CTA */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-100">
                <Link
                  href="/admission"
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[var(--color-accent)] to-emerald-600 px-4 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:shadow-xl"
                >
                  <span>Apply Now</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

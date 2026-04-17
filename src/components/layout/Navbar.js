"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { SCHOOL_INFO } from "@/lib/constants";

// Dropdown menu data
const dropdownMenus = {
  about: [
    { href: "/about", label: "About Us", icon: "🏫" },
    { href: "/about/faculty-staff", label: "Faculty & Staff", icon: "👨‍🏫" },
  ],
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

  const handleMouseEnter = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  }, []);

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
        className={`group relative flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
          isActive
            ? "text-[var(--color-accent)]"
            : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
        }`}
      >
        <span className="relative z-10">{label}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        {isActive && (
          <span className="absolute inset-0 rounded-full bg-[var(--color-accent-soft)]" />
        )}
      </Link>

      {isOpen && (
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 animate-fadeIn"
        >
          <div className="bg-white rounded-xl p-2 min-w-[220px] shadow-lg border border-gray-100">
            {items.map((item) => {
              const isItemActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                      isItemActive
                        ? "bg-[var(--color-accent)] text-white"
                        : "text-[var(--color-ink)] hover:bg-gray-50"
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// Simple Nav Link
function NavLink({ href, label, pathname }) {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-full whitespace-nowrap ${
        isActive
          ? "text-[var(--color-accent)] bg-[var(--color-accent-soft)]"
          : "text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-gray-50"
      }`}
    >
      {label}
    </Link>
  );
}

// Mobile Menu Item
function MobileMenuItem({ item, pathname, onClose }) {
  const isActive = pathname === item.href;
  const hasDropdown = item.dropdownItems && item.dropdownItems.length > 0;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <Link
        href={item.href}
        onClick={() => {
          if (!hasDropdown) onClose();
        }}
        className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors duration-150 ${
          isActive
            ? "bg-[var(--color-accent)] text-white"
            : "text-[var(--color-ink)] hover:bg-gray-50"
        }`}
      >
        <span className="flex items-center gap-3">
          <span>{item.icon}</span>
          {item.label}
        </span>
        {hasDropdown && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-1 rounded-lg hover:bg-black/5"
          >
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </Link>

      {hasDropdown && isExpanded && (
        <div className="ml-4 mt-1 border-l-2 border-[var(--color-accent-soft)] pl-3 py-1 space-y-1">
          {item.dropdownItems.map((subItem) => {
            const isSubActive = pathname === subItem.href;
            return (
              <Link
                key={subItem.href}
                href={subItem.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition-colors duration-150 ${
                  isSubActive
                    ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)] font-medium"
                    : "text-gray-600 hover:text-[var(--color-accent)]"
                }`}
              >
                <span>{subItem.icon}</span>
                {subItem.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Main Navbar Component
export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Debounced scroll handler
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const timeoutId = setTimeout(() => setMenuOpen(false), 0);
      return () => clearTimeout(timeoutId);
    }
  }, [pathname, menuOpen]);

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
    {
      href: "/about",
      label: "About Us",
      icon: "ℹ️",
      dropdownItems: dropdownMenus.about,
    },
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
      <header className="fixed top-0 left-0 right-0 z-50 w-full">
        <div className={`transition-all duration-300 ${scrolled ? "pt-0" : "pt-0"}`}>
          <div className="w-full">
            <nav
              className={`flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 transition-all duration-300 w-full ${
                scrolled
                  ? "bg-white/95 shadow-lg border-b border-gray-100"
                  : "bg-white/80 border-b border-white/50"
              }`}
              style={{ backdropFilter: "blur(12px)" }}
            >
              {/* Logo - Left aligned */}
              <Link href="/" className="flex shrink-0 items-center gap-2.5">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[var(--color-panel-strong)] text-xs font-bold tracking-[0.15em] text-white">
                  ABC
                </div>
                <div className="hidden sm:block">
                  <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)] leading-tight">
                    Excellence
                  </p>
                  <p className="display-title text-sm sm:text-base font-semibold text-[var(--color-ink)] leading-tight">
                    {SCHOOL_INFO.name}
                  </p>
                </div>
              </Link>

              {/* Desktop Navigation - Center aligned */}
              <div className="hidden lg:flex items-center justify-center gap-1 flex-1 mx-4">
                <NavLink href="/" label="Home" pathname={pathname} />
                <DesktopDropdown
                  label="About Us"
                  href="/about"
                  items={dropdownMenus.about}
                  pathname={pathname}
                />
                <DesktopDropdown
                  label="Academics"
                  href="/academics"
                  items={dropdownMenus.academics}
                  pathname={pathname}
                />
                <NavLink href="/gallery" label="Gallery" pathname={pathname} />
                <NavLink href="/notices" label="Notices" pathname={pathname} />
                <DesktopDropdown
                  label="Admission"
                  href="/admission"
                  items={dropdownMenus.admission}
                  pathname={pathname}
                />
                <NavLink href="/contact" label="Contact" pathname={pathname} />
              </div>

              {/* Desktop CTA - Right aligned */}
              <div className="hidden lg:flex items-center shrink-0">
                <Link
                  href="/admission"
                  className="rounded-full bg-[var(--color-accent)] px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-emerald-700 whitespace-nowrap"
                >
                  Apply Now
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                className="flex lg:hidden h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700"
              >
                {menuOpen ? (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <>
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden animate-fadeIn"
          />
          <div
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 lg:hidden shadow-xl animate-slideIn"
          >
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-panel-strong)] text-xs font-bold text-white">
                  ABC
                </div>
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                    Excellence
                  </p>
                  <p className="display-title text-sm font-semibold">{SCHOOL_INFO.name}</p>
                </div>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 space-y-1 overflow-y-auto" style={{ maxHeight: "calc(100vh - 180px)" }}>
              {navLinks.map((link) => (
                <MobileMenuItem
                  key={link.href}
                  item={link}
                  pathname={pathname}
                  onClose={() => setMenuOpen(false)}
                />
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 bg-white border-t border-gray-100">
              <Link
                href="/admission"
                onClick={() => setMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-4 py-3 text-base font-semibold text-white"
              >
                Apply Now
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

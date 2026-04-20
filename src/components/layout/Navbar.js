"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";

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

const navLinks = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/about", label: "About Us", icon: "ℹ️", dropdownItems: dropdownMenus.about },
  { href: "/academics", label: "Academics", icon: "🎓", dropdownItems: dropdownMenus.academics },
  { href: "/gallery", label: "Gallery", icon: "🖼️" },
  { href: "/notices", label: "Notices", icon: "📢" },
  { href: "/admission", label: "Admission", icon: "📝", dropdownItems: dropdownMenus.admission },
  { href: "/contact", label: "Contact", icon: "📞" },
];

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

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link
        href={href}
        className={`group relative flex items-center gap-1 px-4 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap ${
          isActive ? "text-emerald-700" : "text-slate-600 hover:text-slate-900"
        }`}
      >
        <span className="relative">{label}</span>
        <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Link>

      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
          <div className="bg-white rounded-xl p-2 min-w-[220px] shadow-xl shadow-slate-900/10 border border-slate-100 overflow-hidden">
            {items.map((item) => {
              const isItemActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-150 ${
                    isItemActive
                      ? "text-emerald-700 bg-slate-50 font-medium"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function NavLink({ href, label, pathname }) {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap ${
        isActive ? "text-emerald-700" : "text-slate-600 hover:text-slate-900"
      }`}
    >
      {isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-700" />}
      <span className="relative">{label}</span>
    </Link>
  );
}

function MobileMenuItem({ item, pathname, onClose }) {
  const isActive = pathname === item.href;
  const hasDropdown = item.dropdownItems && item.dropdownItems.length > 0;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <div
        className={`flex items-center rounded-xl transition-colors duration-150 ${
          isActive ? "bg-emerald-700 text-white" : "text-slate-900 hover:bg-slate-50"
        }`}
      >
        <Link
          href={item.href}
          onClick={() => { if (!hasDropdown) onClose(); }}
          className="flex flex-1 items-center gap-3 px-4 py-3 text-base font-medium"
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </Link>

        {hasDropdown && (
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-label={isExpanded ? "Collapse submenu" : "Expand submenu"}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl mr-1 transition-colors ${
              isActive ? "hover:bg-white/20" : "hover:bg-black/5"
            }`}
          >
            <svg className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>

      {hasDropdown && isExpanded && (
        <div className="ml-4 mt-1 border-l-2 border-emerald-100 pl-3 py-1 space-y-1">
          {item.dropdownItems.map((subItem) => {
            const isSubActive = pathname === subItem.href;
            return (
              <Link
                key={subItem.href}
                href={subItem.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition-colors duration-150 ${
                  isSubActive
                    ? "bg-emerald-50 text-emerald-700 font-medium"
                    : "text-slate-600 hover:text-emerald-700 hover:bg-slate-50"
                }`}
              >
                <span>{subItem.icon}</span>
                <span>{subItem.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Navbar({ showLogo = false }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Scroll detection - hide/show header on scroll
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          // Hide header when scrolled down more than 100px
          if (currentScrollY > 100) {
            setHeaderVisible(false);
          } else {
            setHeaderVisible(true);
          }
          // Also track scrolled state for navbar styling
          setScrolled(currentScrollY > 20);
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      {/* Top Header Bar with Logo - hides on scroll */}
      <div
        className={`fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border-b border-white/10 transition-transform duration-300 ${
          headerVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-start gap-3 px-4 sm:px-6 lg:px-8 h-14 sm:h-16">
          {/* Logo */}
          <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shadow-lg shadow-white/5">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>

          {/* School Name */}
          <div className="text-left">
            <p className="text-[9px] sm:text-[10px] text-emerald-400 font-medium tracking-[0.15em] uppercase">
              Est. 1995
            </p>
            <h1 className="text-xs sm:text-sm font-bold tracking-wide leading-tight">
              Baptist Scr. Secondary High School
            </h1>
            <p className="text-[9px] sm:text-[10px] text-white/60">Kulajan, Assam</p>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`fixed left-0 right-0 z-[55] w-full transition-all duration-300 ${
          headerVisible ? "top-14 sm:top-16" : "top-0"
        }`}
      >
        <nav
          className={`w-full transition-all duration-300 border-b ${
            scrolled
              ? "bg-white shadow-md shadow-slate-900/5 border-slate-200"
              : "bg-white/95 border-slate-200/60"
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-12 sm:h-14">
              {/* Desktop nav - centered */}
              <div className="hidden lg:flex items-center justify-center flex-1 gap-0.5">
                <NavLink href="/" label="Home" pathname={pathname} />
                <DesktopDropdown label="About Us" href="/about" items={dropdownMenus.about} pathname={pathname} />
                <DesktopDropdown label="Academics" href="/academics" items={dropdownMenus.academics} pathname={pathname} />
                <NavLink href="/gallery" label="Gallery" pathname={pathname} />
                <NavLink href="/notices" label="Notices" pathname={pathname} />
                <DesktopDropdown label="Admission" href="/admission" items={dropdownMenus.admission} pathname={pathname} />
                <NavLink href="/contact" label="Contact" pathname={pathname} />
              </div>

              {/* CTA Button + Mobile Hamburger - always on right */}
              <div className="flex items-center gap-3 ml-auto">
                <Link
                  href="/admission"
                  className="hidden sm:inline-flex items-center rounded-full bg-emerald-700 px-4 sm:px-5 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-emerald-800 hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5"
                >
                  Apply Now
                  <svg className="ml-1.5 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>

                {/* Mobile hamburger */}
                <button
                  type="button"
                  onClick={() => setMenuOpen((prev) => !prev)}
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={menuOpen}
                  className="flex lg:hidden h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
                >
                  {menuOpen ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <>
          <div
            role="presentation"
            onClick={closeMenu}
            className={`fixed inset-x-0 bottom-0 bg-slate-900/40 backdrop-blur-sm z-[54] lg:hidden nav-fade-in ${
              headerVisible ? "top-[104px] sm:top-[112px]" : "top-12 sm:top-14"
            }`}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className={`fixed right-0 bottom-0 w-full max-w-[320px] bg-white z-[56] lg:hidden shadow-2xl shadow-slate-900/20 flex flex-col nav-slide-in ${
              headerVisible ? "top-[104px] sm:top-[112px]" : "top-12 sm:top-14"
            }`}
          >
            <div className="flex-1 overflow-y-auto p-3 space-y-1 pt-4">
              {navLinks.map((link) => (
                <MobileMenuItem key={link.href} item={link} pathname={pathname} onClose={closeMenu} />
              ))}
            </div>
            <div className="shrink-0 p-4 border-t border-slate-100 bg-white">
              <Link
                href="/admission"
                onClick={closeMenu}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-emerald-800"
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

      {/* Spacer for fixed header */}
      <div className={`${headerVisible ? "h-[104px] sm:h-[112px]" : "h-12 sm:h-14"}`} />
    </>
  );
}

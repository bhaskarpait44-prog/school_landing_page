import Link from "next/link";

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}) {
  const styles =
    variant === "secondary"
      ? "border border-[var(--color-ink)]/10 bg-white/60 text-[var(--color-ink)] hover:bg-white"
      : "bg-[var(--color-panel-strong)] text-white hover:-translate-y-0.5";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition duration-300 ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}

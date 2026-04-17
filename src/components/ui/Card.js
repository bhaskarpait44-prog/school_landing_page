export default function Card({ children, className = "" }) {
  return (
    <div
      className={`glass-panel rounded-[28px] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] ${className}`}
    >
      {children}
    </div>
  );
}

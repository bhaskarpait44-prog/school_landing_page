export default function SectionTitle({ eyebrow, title, description, align = "left" }) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="display-title mt-5 text-4xl font-semibold leading-tight text-balance md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg leading-8 text-[var(--color-muted)] text-balance">
          {description}
        </p>
      ) : null}
    </div>
  );
}

import Reveal from "./Reveal";
import { useInView } from "../hooks";

export default function SectionTitle({ label, title, children, dark = false }) {
  const [ref, inView] = useInView(0.35);
  return (
    <div className="mb-10 sm:mb-14">
      <Reveal>
        <div className={`flex items-center justify-between border-t pt-4 ${dark ? "border-cream/25" : "border-ink/20"}`}>
          <p className="label">{label}</p>
        </div>
      </Reveal>
      <div className="grid lg:grid-cols-12 gap-5 mt-7 sm:mt-10 items-end">
        <h2 ref={ref} aria-label={title} className={`split ${inView ? "in" : ""} display text-[clamp(1.9rem,4.2vw,3.2rem)] lg:col-span-8`}>
          {title.split(" ").map((w, i) => (
            <span key={i} className="word" aria-hidden="true">
              <span className="word-in" style={{ "--d": `${i * 70}ms` }}>{w}</span>
            </span>
          ))}
        </h2>
        {children && (
          <Reveal delay={250} className={`lg:col-span-4 text-[0.95rem] sm:text-base leading-relaxed ${dark ? "text-cream/75" : "text-graphite"}`}>
            <p>{children}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}

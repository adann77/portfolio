import { useEffect, useRef } from "react";

const items = ["Flutter", "Dart", "Next.js", "React", "Tailwind", "Node.js", "Express", "PostgreSQL", "Knex.js", "JWT", "Laravel", "Kotlin", "Python", "MikroTik"];

// A strip of stack names. It drifts on its own and speeds up (and reverses) with your scroll.
export default function TechMarquee() {
  const track = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let x = 0, last = window.scrollY, vel = 0, dir = 1, raf;
    const tick = () => {
      const y = window.scrollY;
      const dy = y - last;
      last = y;
      vel += (Math.min(Math.abs(dy), 60) - vel) * 0.12;
      if (dy !== 0) dir = dy > 0 ? 1 : -1;
      x -= (0.6 + vel * 0.35) * dir;
      const half = track.current.scrollWidth / 2;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      track.current.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const row = items.map((t) => (
    <span key={t} className="flex items-center shrink-0">
      <span className="display text-[clamp(1.3rem,2.6vw,2rem)] font-semibold px-6 text-ink/85">{t}</span>
      <span className="text-amber text-xl" aria-hidden="true">●</span>
    </span>
  ));

  return (
    <div className="marquee-mask overflow-hidden border-y border-ink/15 py-5" role="img" aria-label={`Teknologi yang saya pakai: ${items.join(", ")}`}>
      <div ref={track} className="flex w-max" aria-hidden="true">
        {row}{row}
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";

// Boot screen shown before the portfolio opens. Click, Enter, Esc or "Lewati" skips it.
const DURATION = 2400;
const log = [
  { at: 8, text: "menyiapkan database", end: "ok" },
  { at: 28, text: "GET /api/projects", end: "200" },
  { at: 48, text: "ping lenteracpns.id", end: "live" },
  { at: 66, text: "ping pelangiaccessories.store", end: "live" },
  { at: 86, text: "merender antarmuka", end: "ok" },
];
const PANELS = 5;

export default function Splash() {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState("load"); // load -> out -> gone
  const done = useRef(false);

  const finish = () => {
    if (done.current) return;
    done.current = true;
    setPct(100);
    setPhase("out");
    document.documentElement.classList.remove("booting");
    setTimeout(() => setPhase("gone"), 1300);
  };

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduce ? 400 : DURATION;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / total, 1);
      setPct(Math.round(100 * (1 - Math.pow(1 - p, 2.2))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(finish, reduce ? 0 : 250);
    };
    raf = requestAnimationFrame(tick);
    // rAF pauses in background tabs; never leave the visitor stuck behind the splash
    const fallback = setTimeout(finish, total + 900);
    const onKey = (e) => { if (["Enter", "Escape", " "].includes(e.key)) finish(); };
    window.addEventListener("keydown", onKey);
    return () => { cancelAnimationFrame(raf); clearTimeout(fallback); window.removeEventListener("keydown", onKey); };
  }, []);

  if (phase === "gone") return null;

  return (
    <div className={`splash ${phase === "out" ? "out" : ""}`} onClick={finish} role="status" aria-live="polite" aria-label={`Memuat portfolio ${pct} persen`}>
      {Array.from({ length: PANELS }, (_, i) => (
        <span key={i} className="splash-panel" style={{ "--i": i, left: `${(i * 100) / PANELS}%`, width: `${100 / PANELS + 0.2}%` }} aria-hidden="true" />
      ))}

      <div className="splash-content">
        <div className="flex items-start justify-between gap-4">
          <p className="label text-amber">SA · Portfolio 2026</p>
          <button
            onClick={(e) => { e.stopPropagation(); finish(); }}
            className="label text-cream/70 hover:text-amber transition-colors cursor-pointer"
          >
            Lewati ↵
          </button>
        </div>

        <div className="mt-auto">
          <ul className="font-mono text-[0.78rem] sm:text-sm text-cream/75 space-y-1.5 mb-8 sm:mb-10 min-h-[8.5rem]" aria-hidden="true">
            {log.filter((l) => pct >= l.at).map((l) => (
              <li key={l.text} className="splash-line flex gap-3 max-w-md">
                <span className="text-amber">›</span>
                <span className="truncate">{l.text}</span>
                <span className="flex-1 border-b border-dotted border-cream/25 mb-1.5" />
                <span className={l.end === "live" ? "text-[#3ddc84]" : "text-cream"}>{l.end}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="display text-3xl sm:text-5xl">Syahdan Aqilla</p>
              <p className="label text-cream/60 mt-3">Software Engineer · Pekanbaru</p>
            </div>
            <p className="display tabular-nums leading-none text-[clamp(5rem,17vw,12rem)] text-amber" aria-hidden="true">
              {String(pct).padStart(3, "0")}
            </p>
          </div>

          <div className="mt-6 h-[3px] bg-cream/15 overflow-hidden rounded-full" aria-hidden="true">
            <div className="h-full bg-amber" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

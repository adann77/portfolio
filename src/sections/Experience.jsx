import { useCallback, useEffect, useRef, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import Reveal from "../components/Reveal";
import Lightbox from "../components/Lightbox";
import { profile } from "../data/profile";
import { experiences, internPhotos } from "../data/experience";

// Urutan kronologis terbaru ke terlama: urutan memang bagian dari informasinya.
const entries = [
  ...experiences.map((e) => ({
    key: e.company,
    when: "Sep 2026 – Jan 2027",
    kind: "Magang",
    title: e.position,
    place: e.company,
    text: e.description,
    points: e.highlights,
    tech: e.tech,
  })),
  {
    key: "pcr",
    when: "2022 – 2027",
    kind: "Pendidikan",
    title: profile.degree,
    place: profile.university,
    text: `${profile.semester}, IPK ${profile.gpa}.`,
  },
];

// Drifts a child vertically a little as it crosses the viewport.
function Drift({ speed = 0.08, className = "", children }) {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--dy", `${-(r.top + r.height / 2 - innerHeight / 2) * speed}px`);
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); };
  }, [speed]);
  return <div ref={ref} className={className} style={{ transform: "translateY(var(--dy, 0px))" }}>{children}</div>;
}

export default function Experience() {
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <section id="experience" className="py-20 sm:py-28">
      <div className="wrap">
        <SectionTitle label="Pengalaman" title="Magang dan kuliah.">
          Diurutkan dari yang terbaru.
        </SectionTitle>

        <ol>
          {entries.map((e, i) => (
            <Reveal as="li" key={e.key} delay={i * 60} className="group grid lg:grid-cols-12 gap-x-8 gap-y-3 py-8 sm:py-9 px-2 -mx-2 hover:bg-paper-2/70 transition-colors border-t border-ink/20 first:border-t-2 first:border-ink">
              <div className="lg:col-span-3">
                <p className="font-mono text-sm"><span className="bg-[linear-gradient(var(--color-amber),var(--color-amber))] bg-no-repeat bg-[length:0%_100%] group-hover:bg-[length:100%_100%] group-hover:text-night transition-[background-size] duration-500">{e.when}</span></p>
                <p className="label text-graphite mt-1">{e.kind}</p>
              </div>
              <div className="lg:col-span-9">
                <h3 className="display text-2xl sm:text-3xl transition-transform duration-300 group-hover:translate-x-2">{e.title}</h3>
                <p className="mt-1.5 font-semibold text-accent">{e.place}</p>
                <p className="mt-3 text-graphite max-w-3xl leading-relaxed">{e.text}</p>
                {e.points && (
                  <ul className="mt-4 space-y-2 max-w-3xl text-[0.95rem]">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-3 leading-relaxed">
                        <span className="mt-[0.7em] h-px w-4 bg-ink shrink-0" aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
                {e.tech && (
                  <div className="flex flex-wrap gap-2 mt-5 text-accent">
                    {e.tech.map((t) => <span key={t} className="chip">{t}</span>)}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal id="dokumentasi" className="mt-16 sm:mt-24">
          <div className="flex items-baseline justify-between border-t border-ink/20 pt-4">
            <h3 className="label">Dokumentasi magang</h3>
            <p className="label text-graphite hidden sm:block">Klik foto untuk memperbesar</p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-8 sm:gap-10 mt-10 pb-6">
          {internPhotos.map((p, i) => (
            <Drift key={p.src} speed={i ? 0.07 : -0.05} className={i ? "sm:mt-16" : ""}>
              <Reveal delay={i * 120}>
                <button
                  onClick={() => setOpen(i)}
                  aria-label={`Perbesar foto: ${p.caption}`}
                  className="print block w-full text-left bg-card p-3 pb-4 rounded-sm shadow-[0_18px_40px_-22px_rgba(0,0,0,.55)] border border-ink/10 cursor-zoom-in"
                  style={{ transform: `rotate(${p.rotate}deg)` }}
                >
                  <img src={p.src} alt={p.alt} width="1100" height="825" loading="lazy" className="w-full h-auto rounded-[2px]" />
                  <span className="block mt-3 text-sm text-graphite font-medium">{p.caption}</span>
                </button>
              </Reveal>
            </Drift>
          ))}
        </div>
      </div>
      <Lightbox items={internPhotos} index={open} onClose={close} onIndex={setOpen} />
    </section>
  );
}

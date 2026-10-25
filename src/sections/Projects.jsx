import { useEffect, useRef, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import Reveal from "../components/Reveal";
import { projects } from "../data/projects";
import { useInView } from "../hooks";

const liveProjects = projects.filter((p) => p.live);
const otherProjects = projects.filter((p) => !p.live);

function BrowserFrame({ host, href, children }) {
  return (
    <div className="rounded-xl overflow-hidden border border-cream/25 bg-cream text-night shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-3 px-4 py-2.5 bg-cream-2 border-b border-night/10">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="w-2.5 h-2.5 rounded-full bg-night/20" /><i className="w-2.5 h-2.5 rounded-full bg-night/20" /><i className="w-2.5 h-2.5 rounded-full bg-night/20" />
        </span>
        <span className="font-mono text-xs text-night/60 truncate">{host}</span>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Buka ${host}`}
        className="frame-link relative block aspect-[16/10] overflow-hidden"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
        }}
      >
        {children}
        <span className="frame-pill bg-amber text-night text-sm font-bold px-4 py-2 rounded-full shadow-lg whitespace-nowrap">
          Buka situs ↗
        </span>
      </a>
    </div>
  );
}

function LenteraPoster() {
  return (
    <div className="absolute inset-0 bg-[#f6faf1] p-6 sm:p-10 flex flex-col justify-between">
      <p className="font-mono text-xs text-[#3d6b4f] uppercase tracking-[0.16em]">SKD CPNS · TWK TIU TKP</p>
      <div>
        <p className="display text-4xl sm:text-6xl text-[#1d4d2f]">Lentera</p>
        <p className="mt-3 text-[#1d4d2f]/80 text-base sm:text-lg">Lolos SKD CPNS, langkah demi langkah.</p>
      </div>
      <dl className="grid grid-cols-3 gap-3 border-t border-[#1d4d2f]/25 pt-4">
        {[["110", "soal tryout"], ["90", "menit"], ["30", "soal latihan per tema"]].map(([n, l]) => (
          <div key={l}>
            <dt className="display text-2xl sm:text-3xl text-[#1d4d2f]">{n}</dt>
            <dd className="text-[11px] sm:text-xs text-[#1d4d2f]/75 leading-tight">{l}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function PelangiPreview({ url }) {
  const [ref, seen] = useInView(0.2);
  return (
    <div ref={ref} className="absolute inset-0 bg-white">
      {seen && (
        <iframe
          title="Pratinjau Pelangi Accessories"
          src={url}
          loading="lazy"
          tabIndex={-1}
          sandbox="allow-scripts allow-same-origin"
          className="absolute top-0 left-0 border-0 pointer-events-none origin-top-left"
          style={{ width: "250%", height: "250%", transform: "scale(0.4)" }}
        />
      )}
    </div>
  );
}

// On wide screens each live project pins to the top and the next one slides over it.
function StackCard({ index, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const el = ref.current;
    let raf = 0;
    const update = () => {
      const next = el.nextElementSibling;
      if (!mq.matches || !next) { el.style.transform = ""; el.style.filter = ""; return; }
      const stick = parseFloat(getComputedStyle(el).top) || 0;
      const p = Math.min(Math.max(1 - (next.getBoundingClientRect().top - stick) / (window.innerHeight * 0.75), 0), 1);
      el.style.transform = `scale(${1 - p * 0.06})`;
      el.style.filter = `brightness(${1 - p * 0.4})`;
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  return (
    <div ref={ref} className={`stack-card lg:sticky ${index ? "mt-10 lg:mt-[28vh]" : ""}`} style={{ top: `${5.5 + index * 0.75}rem` }}>
      {children}
    </div>
  );
}

function LiveProject({ project, index }) {
  return (
    <Reveal as="article" className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center rounded-3xl border border-cream/15 bg-forest-2 p-5 sm:p-8 lg:p-10 shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.7)]">
      <div className={`lg:col-span-7 ${index % 2 ? "lg:order-2" : ""}`}>
        <BrowserFrame host={project.host} href={project.liveDemo}>
          {project.preview ? <PelangiPreview url={project.liveDemo} /> : <LenteraPoster />}
        </BrowserFrame>
      </div>

      <div className={`lg:col-span-5 ${index % 2 ? "lg:order-1" : ""}`}>
        <p className="label text-amber">{project.category} · {project.year}</p>
        <h3 className="display text-3xl sm:text-4xl mt-3">{project.title}</h3>
        <p className="mt-4 text-base sm:text-[1.05rem] leading-relaxed text-cream/85">{project.description}</p>
        <p className="mt-4 text-cream/70 leading-relaxed"><strong className="text-cream font-semibold">Peran saya.</strong> {project.contribution}</p>
        <div className="flex flex-wrap gap-2 mt-6 text-cream">
          {project.tech.map((t) => <span key={t} className="chip">{t}</span>)}
        </div>
        <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="btn btn-amber mt-8">
          Buka {project.host} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </Reveal>
  );
}

function ProjectRow({ project, open, onToggle }) {
  const id = `proj-${project.id}`;
  const details = [
    ["Gambaran", project.overview],
    ["Masalah", project.problem],
    ["Solusi", project.solution],
    ["Kontribusi", project.contribution],
  ];
  return (
    <li className="border-b border-cream/25">
      <h4>
        <button
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={id}
          className="w-full grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_12rem_6rem_2rem] gap-x-6 items-center py-6 text-left cursor-pointer group"
        >
          <span className="display text-xl sm:text-2xl group-hover:text-amber transition-colors">{project.title}</span>
          <span className="hidden sm:block text-sm text-cream/70">{project.category}</span>
          <span className="hidden sm:block font-mono text-sm text-cream/70">{project.year}</span>
          <span className={`text-2xl leading-none transition-transform duration-300 ${open ? "rotate-45 text-amber" : ""}`} aria-hidden="true">+</span>
        </button>
      </h4>
      <div id={id} role="region" aria-label={project.title} className={`acc ${open ? "open" : ""}`}>
        <div>
          <div className="grid lg:grid-cols-12 gap-8 pb-8">
            <dl className="lg:col-span-8 space-y-5">
              {details.map(([k, v]) => (
                <div key={k} className="grid sm:grid-cols-[8rem_1fr] gap-1 sm:gap-6">
                  <dt className="label text-cream/60 pt-1">{k}</dt>
                  <dd className="text-cream/90 leading-relaxed">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="lg:col-span-4">
              <p className="label text-cream/60 mb-3">Fitur</p>
              <ul className="text-sm space-y-1.5 text-cream/90">
                {project.features.map((f) => <li key={f} className="flex gap-2"><span aria-hidden="true">–</span>{f}</li>)}
              </ul>
              <div className="flex flex-wrap gap-2 mt-5 text-amber">
                {project.tech.map((t) => <span key={t} className="chip">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function Projects() {
  const [openId, setOpenId] = useState(null);

  return (
    <section id="projects" className="on-dark py-20 sm:py-28 bg-forest text-cream">
      <div className="wrap">
        <SectionTitle dark label="Karya" title="Dua situs yang bisa Anda buka sekarang.">
          Keduanya sudah di-hosting dan dipakai pengguna. Klik jendelanya untuk membuka situs aslinya.
        </SectionTitle>

        <div>
          {liveProjects.map((p, i) => (
            <StackCard key={p.id} index={i}><LiveProject project={p} index={i} /></StackCard>
          ))}
        </div>

        <Reveal className="mt-28 sm:mt-36">
          <div className="flex items-baseline justify-between border-t border-cream/25 pt-4 mb-2">
            <h3 className="label">Project lainnya</h3>
            <p className="label text-cream/60 hidden sm:block">Klik baris untuk detail</p>
          </div>
        </Reveal>
        <ul className="border-t border-cream/25">
          {otherProjects.map((p) => (
            <ProjectRow key={p.id} project={p} open={openId === p.id} onToggle={() => setOpenId(openId === p.id ? null : p.id)} />
          ))}
        </ul>
      </div>
    </section>
  );
}

import { useState } from "react";
import { useInView, usePing } from "../hooks";
import { profile } from "../data/profile";
import { liveSites } from "../data/social";
import Badge from "../components/Badge";
import Magnetic from "../components/Magnetic";

const headline = "Membangun software dari database sampai antarmuka.";

function LiveRow({ site, delay }) {
  const { status, ms } = usePing(site.url);
  const label = status === "checking" ? "mengecek…" : status === "online" ? `${ms} ms` : "tak merespons";
  return (
    <li className="fade-up" style={{ "--d": `${delay}ms` }}>
      <a
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        className="live-row grid grid-cols-[1fr_auto] sm:grid-cols-[1.4fr_1fr_auto_auto] items-center gap-x-5 gap-y-0.5 px-3 sm:px-4 py-3.5 border-b border-ink/20"
      >
        <span className="flex items-center gap-3 font-display font-semibold text-base sm:text-lg tracking-tight">
          <span className={`dot ${status === "online" ? "on" : status === "offline" ? "off" : "wait"}`} aria-hidden="true" />
          {site.host}
        </span>
        <span className="text-sm opacity-70 row-start-2 col-start-1 sm:row-start-auto sm:col-start-auto pl-[1.3rem] sm:pl-0">{site.tagline}</span>
        <span className="font-mono text-sm tabular-nums col-start-2 row-start-1 sm:col-start-auto sm:row-start-auto text-right" aria-live="polite">{label}</span>
        <span className="go hidden sm:block text-lg" aria-hidden="true">↗</span>
      </a>
    </li>
  );
}

export default function Hero() {
  const [ref, inView] = useInView(0.1);
  const [touched, setTouched] = useState(false);

  // pointer position lights up the dot grid behind the hero
  const onMove = (e) => {
    if (!touched) setTouched(true);
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="home" onPointerMove={onMove} onPointerDown={onMove} className="relative overflow-hidden pt-24 sm:pt-28 pb-14 sm:pb-20">
      <div className={`dotgrid ${touched ? "" : "idle"}`} aria-hidden="true" />
      <div className="wrap relative grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        <div className="lg:col-span-7 lg:pt-10">
          <p className="label text-graphite fade-up">Software Engineer · {profile.location}</p>

          <h1 ref={ref} aria-label={headline} className={`split ${inView ? "in" : ""} display text-[clamp(2.1rem,4.7vw,3.9rem)] mt-5`}>
            {headline.split(" ").map((w, i) => (
              <span key={i} className="word" aria-hidden="true">
                <span className="word-in" style={{ "--d": `${120 + i * 80}ms` }}>{w}</span>
              </span>
            ))}
          </h1>

          <p className="mt-6 text-base sm:text-lg leading-relaxed text-graphite max-w-xl fade-up" style={{ "--d": "650ms" }}>
            Saya Syahdan Aqilla, Full Stack Developer Intern di PT Royal General Indonesia dan mahasiswa D4 Teknik Informatika di Politeknik Caltex Riau. Saya mengerjakan backend, frontend, dan database untuk produk yang sudah live.
          </p>

          <div className="flex flex-wrap gap-3 mt-7 fade-up" style={{ "--d": "760ms" }}>
            <Magnetic><a href="#projects" className="btn btn-ink">Lihat karya <span aria-hidden="true">↓</span></a></Magnetic>
            <Magnetic><a href="#contact" className="btn btn-line">Hubungi saya</a></Magnetic>
          </div>

          <div className="mt-12 max-w-xl">
            <div className="flex items-baseline justify-between border-b-2 border-ink pb-2 px-3 sm:px-4 fade-up" style={{ "--d": "860ms" }}>
              <h2 className="label">Live sekarang</h2>
              <p className="label text-graphite">Respons</p>
            </div>
            <ul>
              {liveSites.map((s, i) => <LiveRow key={s.url} site={s} delay={950 + i * 110} />)}
            </ul>
            <p className="text-xs text-graphite mt-3 px-3 sm:px-4 fade-up" style={{ "--d": "1200ms" }}>
              Waktu respons diukur dari browser Anda, jadi angkanya berbeda di tiap koneksi.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 lg:-mt-12 flex justify-center lg:justify-end lg:pr-6">
          <Badge />
        </div>
      </div>
    </section>
  );
}

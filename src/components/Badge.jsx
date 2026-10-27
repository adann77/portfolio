import { useEffect, useRef, useState } from "react";
import { profile } from "../data/profile";
import { social } from "../data/social";

// A name badge on a lanyard. It is a damped pendulum: drag it, push it with the pointer, click to flip.
export default function Badge() {
  const stage = useRef(null);
  const swing = useRef(null);
  const card = useRef(null);
  const [flipped, setFlipped] = useState(false);
  const [touched, setTouched] = useState(false);
  const s = useRef({ a: 0.4, v: 0, drag: false, moved: 0, lastA: 0, lastT: 0, px: 0, py: 0, visible: true, tilt: 0 });

  useEffect(() => {
    const st = s.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([e]) => { st.visible = e.isIntersecting; });
    io.observe(stage.current);
    let raf, last = performance.now(), t = 0;

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now; t += dt;
      if (st.visible) {
        if (!st.drag) {
          // tilting the phone moves the resting point, like a real badge on a lanyard
          st.v += (-16 * Math.sin(st.a - st.tilt) - 1.15 * st.v) * dt;
          // a light breeze keeps it swaying instead of hanging dead still
          if (!reduce) st.v += (Math.sin(t * 0.9) * 1.1 + Math.sin(t * 2.3) * 0.35) * dt;
          st.v = Math.max(-4, Math.min(4, st.v));
          st.a += st.v * dt;
        }
        const tilt = Math.max(-16, Math.min(16, st.v * 7));
        swing.current.style.transform = `rotate(${-st.a}rad)`;
        card.current.style.transform = `rotate(${st.a * 0.7}rad) rotateY(${tilt}deg)`;
        stage.current.style.setProperty("--sheen", `${50 + st.a * 90 + tilt * 2}%`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onOrient = (e) => {
      if (e.gamma == null) return;
      st.tilt = Math.max(-0.6, Math.min(0.6, (e.gamma * Math.PI) / 180 * 0.8));
    };
    const onMotion = (e) => {
      const ax = e.acceleration?.x;
      if (ax != null && Math.abs(ax) > 4) st.v += Math.max(-3, Math.min(3, -ax * 0.12));
    };
    // scrolling the page (finger or wheel) jolts the lanyard
    let lastY = window.scrollY;
    const onScroll = () => {
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      if (!st.drag && st.visible) st.v += Math.max(-0.3, Math.min(0.3, dy * 0.004));
    };
    // moving the mouse near the badge pushes it like a draught of air
    const onWind = (e) => {
      if (e.pointerType !== "mouse" || st.drag || !st.visible) return;
      const r = stage.current.getBoundingClientRect();
      const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height * 0.65));
      const k = Math.max(0, 1 - d / 650);
      st.v += Math.max(-30, Math.min(30, e.movementX)) * 0.007 * k;
    };
    window.addEventListener("deviceorientation", onOrient);
    window.addEventListener("devicemotion", onMotion);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onWind, { passive: true });
    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      window.removeEventListener("deviceorientation", onOrient);
      window.removeEventListener("devicemotion", onMotion);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onWind);
    };
  }, []);

  // iOS only reports motion after the user grants it from a tap
  const askMotion = () => {
    const D = window.DeviceOrientationEvent;
    if (D && typeof D.requestPermission === "function") D.requestPermission().catch(() => {});
  };

  const onDown = (e) => {
    if (e.target.closest("a")) return;
    askMotion();
    const st = s.current;
    const r = stage.current.getBoundingClientRect();
    st.drag = true; st.moved = 0; st.px = r.left + r.width / 2; st.py = r.top;
    st.lastA = st.a; st.lastT = performance.now();
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* pointer already released */ }
    setTouched(true);
  };

  const onMove = (e) => {
    const st = s.current;
    if (st.drag) {
      const a = Math.max(-1.1, Math.min(1.1, Math.atan2(e.clientX - st.px, Math.max(e.clientY - st.py, 60))));
      const now = performance.now();
      const dt = (now - st.lastT) / 1000;
      if (dt > 0) st.v = st.v * 0.6 + ((a - st.lastA) / dt) * 0.4;
      st.lastA = a; st.lastT = now; st.a = a;
      st.moved += Math.abs(e.movementX) + Math.abs(e.movementY);
    } else if (e.pointerType === "mouse" || e.pointerType === "pen") {
      st.v += Math.max(-40, Math.min(40, e.movementX)) * 0.012;
    }
  };

  const onUp = () => {
    const st = s.current;
    if (!st.drag) return;
    st.drag = false;
    if (performance.now() - st.lastT > 90) st.v *= 0.2;
    st.v = Math.max(-9, Math.min(9, st.v));
    if (st.moved < 6) setFlipped((f) => !f);
  };

  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFlipped((f) => !f); setTouched(true); }
    if (e.key === "ArrowLeft") s.current.v -= 2.2;
    if (e.key === "ArrowRight") s.current.v += 2.2;
  };

  const links = [
    ["Email", profile.email, social.email.url],
    ["WhatsApp", profile.whatsappDisplay, social.whatsapp.url],
    ["LinkedIn", "Syahdan Aqilla", social.linkedin.url],
    ["GitHub", "github.com/adann77", social.github.url],
  ];

  return (
    <div className="flex flex-col items-center">
      <div ref={stage} className="badge-stage">
        <div ref={swing} className="badge-swing flex flex-col items-center">
          <div className="strap" aria-hidden="true" />
          <div className="clip" aria-hidden="true" />
          <div
            ref={card}
            role="button"
            tabIndex={0}
            aria-label={`Kartu nama ${profile.name}, ${profile.role}. Tarik untuk mengayun, tekan Enter untuk membalik.`}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            onKeyDown={onKey}
            className="badge-card relative w-[16.5rem] sm:w-[18rem] h-[25rem] sm:h-[27rem] select-none"
          >
            <div className={`flipper ${flipped ? "flipped" : ""}`}>
              {/* front */}
              <div className="face bg-card text-ink">
                <div className="flex justify-center pt-3">
                  <span className="w-14 h-2 rounded-full bg-paper-2 shadow-[inset_0_1px_2px_rgba(0,0,0,.35)]" />
                </div>
                <div className="relative mx-4 mt-3 h-[50%] rounded-2xl overflow-hidden bg-gradient-to-br from-amber to-[#ff8a3d]">
                  <div className="absolute -right-6 -top-8 w-32 h-32 rounded-full bg-white/25" />
                  <img
                    src="/syahdan.webp"
                    width="820"
                    height="954"
                    alt="Foto Syahdan Aqilla"
                    draggable="false"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[108%] w-auto max-w-none pointer-events-none"
                  />
                </div>
                <div className="px-5 pt-4">
                  <p className="label text-graphite">{profile.university}</p>
                  <h3 className="display text-[1.65rem] mt-1.5">{profile.name}</h3>
                  <p className="text-sm font-semibold text-accent mt-0.5">Software Engineer</p>
                </div>
                <div className="absolute bottom-4 inset-x-5 flex items-end justify-between">
                  <div className="barcode" aria-hidden="true" />
                  <p className="label text-graphite text-right leading-tight">Pekanbaru<br />Riau, ID</p>
                </div>
                <span className="sheen" />
              </div>

              {/* back */}
              <div className="face back bg-night text-cream p-5 flex flex-col">
                <div className="flex justify-center -mt-3 mb-4">
                  <span className="w-14 h-2 rounded-full bg-white/15" />
                </div>
                <p className="label text-amber">Hubungi saya</p>
                <h3 className="display text-2xl mt-2">{profile.name}</h3>
                <p className="text-xs text-cream/70 mt-1">Terbuka untuk kerja dan kolaborasi.</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {links.map(([k, v, href]) => (
                    <li key={k}>
                      <a
                        href={href}
                        target={k === "Email" ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        className="block rounded-xl border border-white/15 px-3.5 py-2 hover:border-amber hover:bg-white/5 transition-colors"
                      >
                        <span className="label text-cream/60 block">{k}</span>
                        <span className="font-medium break-all">{v}</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="label text-cream/50 mt-auto text-center">Klik kartu untuk membalik</p>
                <span className="sheen" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className={`label text-graphite mt-5 transition-opacity duration-500 ${touched ? "opacity-0" : "opacity-100"}`} aria-hidden={touched}>
        Tarik, ayun, klik, atau miringkan HP-mu
      </p>
    </div>
  );
}

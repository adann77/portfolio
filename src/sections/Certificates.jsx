import { useCallback, useRef, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import Reveal from "../components/Reveal";
import Lightbox from "../components/Lightbox";
import { certificates } from "../data/certificates";

const withImage = certificates.filter((c) => c.image);
const lightboxItems = withImage.map((c) => ({ src: c.image, alt: c.alt, caption: `${c.title} · ${c.date}${c.credentialId ? ` · ID ${c.credentialId}` : ""}` }));

// Image card that leans toward the pointer.
function TiltImage({ cert, onOpen }) {
  const ref = useRef(null);
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(1000px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) scale(1.01)`;
  };
  const leave = () => { ref.current.style.transform = ""; };
  return (
    <button
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      onClick={onOpen}
      aria-label={`Perbesar sertifikat: ${cert.title}`}
      className={`tilt3d block w-full rounded-xl ${cert.width < cert.height ? "max-w-sm mx-auto lg:max-w-none" : ""} overflow-hidden border border-ink/15 shadow-[0_24px_50px_-28px_rgba(0,0,0,.5)] cursor-zoom-in`}
    >
      <img src={cert.image} alt={cert.alt} width={cert.width} height={cert.height} loading="lazy" className="w-full h-auto" />
    </button>
  );
}

export default function Certificates() {
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <section id="certificates" className="py-20 sm:py-28 bg-paper-2">
      <div className="wrap">
        <SectionTitle label="Sertifikat" title="Bukti yang bisa dilihat langsung.">
          Klik sertifikat untuk memperbesar.
        </SectionTitle>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {certificates.map((c, i) => (
            <Reveal key={c.id} delay={i * 120} className={c.image && c.width < c.height ? "lg:col-span-4" : c.image ? "lg:col-span-8" : "lg:col-span-5"}>
              {c.image ? (
                <TiltImage cert={c} onOpen={() => setOpen(withImage.indexOf(c))} />
              ) : (
                <div className="rounded-xl border border-ink/15 bg-card p-7 sm:p-9 h-full min-h-[16rem] flex flex-col justify-between">
                  <p className="label text-graphite">{c.issuer}</p>
                  <p className="display text-6xl sm:text-7xl text-accent my-6">MTCNA</p>
                  <dl className="grid grid-cols-[6rem_1fr] gap-y-2 text-sm">
                    <dt className="label text-graphite pt-0.5">ID</dt>
                    <dd className="font-mono">{c.credentialId}</dd>
                    <dt className="label text-graphite pt-0.5">Masa</dt>
                    <dd>{c.date}</dd>
                  </dl>
                </div>
              )}
              <div className="mt-4 px-1">
                <p className="label text-graphite">{c.kind} · {c.date}</p>
                <h3 className="display text-xl sm:text-2xl mt-1.5">{c.title}</h3>
                <p className="text-sm text-graphite mt-1">{c.issuer}{c.credentialId && <> · <span className="font-mono">ID {c.credentialId}</span></>}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <Lightbox items={lightboxItems} index={open} onClose={close} onIndex={setOpen} />
    </section>
  );
}

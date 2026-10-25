import { useEffect, useRef } from "react";
import { HiChevronLeft, HiChevronRight, HiX } from "react-icons/hi";

// Full-screen viewer for photos and certificates. Esc closes, arrow keys move between items.
export default function Lightbox({ items, index, onClose, onIndex }) {
  const closeBtn = useRef(null);
  const open = index !== null && index !== undefined;
  const count = items.length;

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    closeBtn.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && count > 1) onIndex((index + 1) % count);
      if (e.key === "ArrowLeft" && count > 1) onIndex((index - 1 + count) % count);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, [open, index, count, onClose, onIndex]);

  if (!open) return null;
  const item = items[index];

  return (
    <div className="fixed inset-0 z-[70] fade-in bg-night/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8" role="dialog" aria-modal="true" aria-label={item.alt} onClick={onClose}>
      <button ref={closeBtn} onClick={onClose} aria-label="Tutup" className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 text-cream hover:bg-amber hover:text-night transition-colors flex items-center justify-center cursor-pointer">
        <HiX size={22} />
      </button>
      {count > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); onIndex((index - 1 + count) % count); }} aria-label="Sebelumnya" className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 text-cream hover:bg-amber hover:text-night transition-colors flex items-center justify-center cursor-pointer">
            <HiChevronLeft size={24} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onIndex((index + 1) % count); }} aria-label="Berikutnya" className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 text-cream hover:bg-amber hover:text-night transition-colors flex items-center justify-center cursor-pointer">
            <HiChevronRight size={24} />
          </button>
        </>
      )}
      <figure key={index} className="lb-in max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item.alt} className="w-full max-h-[78vh] object-contain rounded-lg shadow-2xl" />
        {item.caption && <figcaption className="text-cream/80 text-sm text-center mt-4">{item.caption}</figcaption>}
      </figure>
    </div>
  );
}

import { HiArrowUp } from "react-icons/hi";
import { useScrollProgress } from "../hooks";

const C = 2 * Math.PI * 21;

// Floating button that fills a ring as you read and jumps back to the top.
export default function BackToTop() {
  const p = useScrollProgress();
  const show = p > 0.06;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Kembali ke atas"
      className={`totop fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-30 w-12 h-12 rounded-full bg-paper/90 backdrop-blur border border-ink/15 flex items-center justify-center cursor-pointer ${show ? "on" : ""}`}
    >
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="21" fill="none" stroke="var(--color-amber)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - p)} />
      </svg>
      <HiArrowUp size={18} />
    </button>
  );
}

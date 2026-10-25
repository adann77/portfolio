import { useState } from "react";
import { flushSync } from "react-dom";
import { HiMoon, HiSun } from "react-icons/hi";

const current = () => document.documentElement.dataset.theme || "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(current);

  const toggle = (e) => {
    const next = theme === "dark" ? "light" : "dark";
    const apply = () => {
      flushSync(() => setTheme(next));
      document.documentElement.dataset.theme = next;
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#0C1210" : "#F1F2EC");
      try { localStorage.setItem("theme", next); } catch { /* storage may be blocked */ }
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) return apply();

    const { clientX: x, clientY: y } = e;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(apply).ready.then(() =>
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(.4,0,.2,1)", pseudoElement: "::view-transition-new(root)" }
      )
    );
  };

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
      title={theme === "dark" ? "Mode terang" : "Mode gelap"}
      className="relative w-9 h-9 rounded-full border border-ink/25 flex items-center justify-center cursor-pointer hover:bg-ink hover:text-paper transition-colors overflow-hidden"
    >
      <HiSun size={18} className={`absolute transition-all duration-500 ${theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`} />
      <HiMoon size={17} className={`absolute transition-all duration-500 ${theme === "dark" ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
    </button>
  );
}

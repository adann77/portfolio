import { useEffect, useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { navLinks } from "../data/nav";
import { useActiveSection, useScrollProgress } from "../hooks";
import ThemeToggle from "./ThemeToggle";

const ids = navLinks.map((l) => l.id);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(ids);
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${scrolled || open ? "bg-paper/90 backdrop-blur-md border-b border-ink/10" : ""}`}>
      <div className="progress" style={{ width: "100%", transform: `scaleX(${progress})` }} aria-hidden="true" />
      <nav className="wrap flex items-center justify-between h-16" aria-label="Utama">
        <a href="#home" className="font-display font-bold text-lg tracking-tight">
          Syahdan Aqilla
        </a>

        <div className="flex items-center gap-3">
          <ul className="hidden lg:flex items-center gap-6 mr-2">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={active === l.id ? "true" : undefined}
                  className={`text-sm font-medium py-1 border-b-2 transition-colors ${
                    active === l.id ? "border-amber text-ink" : "border-transparent text-graphite hover:text-ink"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <a href="#contact" className="btn btn-ink !py-2 !px-4 text-sm hidden sm:inline-flex">Hubungi saya</a>
          <button
            className="lg:hidden p-2 -mr-2 cursor-pointer"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-paper">
          <ul className="wrap pt-6">
            {navLinks.map((l) => (
              <li key={l.id} className="border-b border-ink/10">
                <a href={`#${l.id}`} onClick={() => setOpen(false)} className="display text-3xl py-4 flex justify-between items-center">
                  {l.label}
                  <span className="text-xl text-graphite">↘</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

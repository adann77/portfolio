import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import Reveal from "../components/Reveal";
import { skillCategories } from "../data/skills";

export default function Skills() {
  const [focus, setFocus] = useState(null);
  return (
    <section id="skills" className="py-20 sm:py-28">
      <div className="wrap">
        <SectionTitle label="Skill" title="Yang saya pakai sehari-hari.">
          Full stack: dari API dan database sampai antarmuka. Klik kategori untuk menyorotnya.
        </SectionTitle>

        <div className="flex flex-wrap gap-2 mb-12" role="group" aria-label="Sorot kategori skill">
          {skillCategories.map((c) => (
            <button
              key={c.title}
              aria-pressed={focus === c.title}
              onClick={() => setFocus(focus === c.title ? null : c.title)}
              className={`label px-3.5 py-2 rounded-full border transition-colors cursor-pointer ${
                focus === c.title ? "bg-ink text-paper border-ink" : "border-ink/30 hover:border-ink hover:bg-paper-2"
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>

        <div className={`skill-grid ${focus ? "" : "free"} grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12`}>
          {skillCategories.map((cat, i) => (
            <Reveal key={cat.title} delay={(i % 4) * 70} className={`skill-col ${focus && focus !== cat.title ? "!opacity-25" : ""}`}>
              <h3 className="label border-b-2 border-ink pb-2">{cat.title}</h3>
              <ul>
                {cat.skills.map((s) => {
                  const Icon = s.icon;
                  return (
                    <li key={s.name} className="skill-li flex items-center gap-3 py-2.5 border-b border-ink/15 text-[0.95rem]">
                      <Icon size={16} className="text-accent shrink-0" aria-hidden="true" />
                      {s.name}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

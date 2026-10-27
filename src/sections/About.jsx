import { HiChartBar, HiDeviceMobile, HiGlobeAlt, HiServer, HiWifi } from "react-icons/hi";
import SectionTitle from "../components/SectionTitle";
import Reveal from "../components/Reveal";
import { profile } from "../data/profile";
import { useCountUp, useInView } from "../hooks";

function Gpa() {
  const [ref, inView] = useInView(0.6);
  const n = useCountUp(parseFloat(profile.gpa), inView);
  return <span ref={ref}>{n.toFixed(2)}</span>;
}

const facts = [
  ["Kampus", profile.university],
  ["Program", profile.degree],
  ["Periode", `${profile.period} · ${profile.semester}`],
  ["IPK", profile.gpa],
  ["Lokasi", profile.location],
];

const focus = [
  [HiServer, "Backend & API", "Node.js · Express · PostgreSQL · JWT"],
  [HiGlobeAlt, "Web", "Next.js · React · Laravel · CodeIgniter"],
  [HiDeviceMobile, "Mobile", "Flutter · Kotlin · SQLite"],
  [HiChartBar, "Machine learning", "Python · Scikit-learn · XGBoost"],
  [HiWifi, "Jaringan", "MikroTik (MTCNA) · Cisco"],
];

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-paper-2">
      <div className="wrap">
        <SectionTitle label="Tentang" title="Dari tugas kuliah sampai produk yang live." />

        <div className="grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-7">
            <p className="text-lg sm:text-xl leading-relaxed">{profile.about}</p>
            <ul className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {focus.map(([Icon, title, text], i) => (
                <li key={title} className={`focus-card ${i === 0 ? "col-span-2 sm:col-span-1" : ""}`} tabIndex={0}>
                  <Icon className="focus-icon text-accent" size={22} aria-hidden="true" />
                  <h3 className="font-display font-bold text-[0.95rem] mt-3 leading-tight">{title}</h3>
                  <p className="text-xs text-graphite mt-1 leading-snug">{text}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="aside" delay={120} className="lg:col-span-5">
            <dl className="border-t-2 border-ink">
              {facts.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[6rem_1fr] gap-4 py-3.5 border-b border-ink/15">
                  <dt className="label text-graphite pt-1">{k}</dt>
                  <dd className={k === "IPK" ? "font-display font-bold text-2xl leading-none" : "font-medium"}>{k === "IPK" ? <Gpa /> : v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

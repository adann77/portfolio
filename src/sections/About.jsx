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
  ["Backend & API", "REST API dengan Node.js, Express, dan PostgreSQL: autentikasi, hak akses, dan migrasi database."],
  ["Web application", "Aplikasi web dengan Laravel dan CodeIgniter, dari analisis kebutuhan sampai deployment."],
  ["Mobile", "Aplikasi Android native dengan Kotlin dan database lokal SQLite."],
  ["Machine learning", "Model prediksi dengan Python, Scikit-learn, dan XGBoost."],
  ["Jaringan", "Dasar administrasi jaringan MikroTik dan Cisco, bersertifikat MTCNA."],
];

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-paper-2">
      <div className="wrap">
        <SectionTitle label="Tentang" title="Dari tugas kuliah sampai produk yang live." />

        <div className="grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-7">
            <p className="text-lg sm:text-xl leading-relaxed">{profile.about}</p>
            <ul className="mt-12 divide-y divide-ink/15 border-y border-ink/15">
              {focus.map(([title, text]) => (
                <li key={title} className="grid sm:grid-cols-[11rem_1fr] gap-1 sm:gap-6 py-4">
                  <h3 className="font-display font-bold text-lg">{title}</h3>
                  <p className="text-graphite">{text}</p>
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

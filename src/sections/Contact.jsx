import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import Reveal from "../components/Reveal";
import Magnetic from "../components/Magnetic";
import { profile } from "../data/profile";
import { social } from "../data/social";

const fields = [
  { name: "name", label: "Nama", type: "text", required: true },
  { name: "email", label: "Email Anda", type: "email", required: true },
  { name: "subject", label: "Subjek", type: "text", required: false },
];

const inputCls =
  "w-full bg-transparent border-0 border-b-2 border-ink/30 px-0 py-3 text-base placeholder:text-graphite/60 focus:outline-none focus:border-accent transition-colors";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [toast, setToast] = useState("");

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2400);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const body = `Nama: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject || "Halo Syahdan")}&body=${encodeURIComponent(body)}`;
    notify("Membuka aplikasi email Anda");
  };

  const sendWhatsApp = () => {
    const text = `Halo Syahdan, saya ${form.name || "…"}.${form.subject ? `\n${form.subject}` : ""}\n\n${form.message}`;
    window.open(`${social.whatsapp.url}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      notify("Email disalin");
    } catch {
      notify("Tidak bisa menyalin, salin manual dari teks di atas");
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-paper-2">
      <div className="wrap">
        <SectionTitle label="Kontak" title="Ada proyek atau lowongan? Tulis saja." />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <p className="label text-graphite">Email</p>
            <a href={`mailto:${profile.email}`} className="display block text-[clamp(1.15rem,2.6vw,1.9rem)] mt-2 break-all hover:text-accent transition-colors underline decoration-amber decoration-[3px] underline-offset-8">
              {profile.email}
            </a>
            <button onClick={copyEmail} className="btn btn-line mt-6 !py-2 !px-4 text-sm">Salin email</button>

            <ul className="mt-12 border-t-2 border-ink">
              {[
                ["WhatsApp", profile.whatsappDisplay, social.whatsapp.url],
                ["LinkedIn", "Syahdan Aqilla", social.linkedin.url],
                social.github.url && ["GitHub", "Profil GitHub", social.github.url],
              ].filter(Boolean).map(([k, v, href]) => (
                <li key={k}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-baseline justify-between gap-4 py-4 border-b border-ink/15 hover:text-accent group">
                    <span className="label text-graphite w-24">{k}</span>
                    <span className="font-medium flex-1">{v}</span>
                    <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
              <li className="flex items-baseline gap-4 py-4 border-b border-ink/15">
                <span className="label text-graphite w-24">Lokasi</span>
                <span className="font-medium">{profile.location}</span>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-6">
            <form onSubmit={sendEmail} className="space-y-6">
              {fields.map((f) => (
                <div key={f.name}>
                  <label htmlFor={f.name} className="label text-graphite">{f.label}{f.required ? "" : " (opsional)"}</label>
                  <input
                    id={f.name}
                    type={f.type}
                    required={f.required}
                    value={form[f.name]}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    className={inputCls}
                  />
                </div>
              ))}
              <div>
                <label htmlFor="message" className="label text-graphite">Pesan</label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputCls} resize-none`}
                />
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <Magnetic><button type="submit" className="btn btn-ink">Kirim lewat email</button></Magnetic>
                <Magnetic><button type="button" onClick={sendWhatsApp} className="btn btn-line">Kirim lewat WhatsApp</button></Magnetic>
              </div>
              <p className="text-xs text-graphite">Tombol ini membuka aplikasi email atau WhatsApp Anda dengan pesan yang sudah terisi.</p>
            </form>
          </Reveal>
        </div>
      </div>

      {toast && (
        <div role="status" className="toast fixed bottom-8 left-1/2 z-50 bg-ink text-paper text-sm px-5 py-3 rounded-full shadow-xl">
          {toast}
        </div>
      )}
    </section>
  );
}

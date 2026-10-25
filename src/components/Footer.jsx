import { profile } from "../data/profile";
import { social, liveSites } from "../data/social";

export default function Footer() {
  const links = [
    social.github.url && { label: "GitHub", href: social.github.url },
    { label: "LinkedIn", href: social.linkedin.url },
    { label: "WhatsApp", href: social.whatsapp.url },
    ...liveSites.map((s) => ({ label: s.host, href: s.url })),
  ].filter(Boolean);

  return (
    <footer className="bg-night text-cream">
      <div className="wrap py-10 flex flex-col sm:flex-row gap-6 sm:items-center justify-between">
        <p className="text-sm text-cream/70">
          &copy; {new Date().getFullYear()} {profile.name}. {profile.location}.
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-cream/80 hover:text-amber transition-colors">
                {l.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

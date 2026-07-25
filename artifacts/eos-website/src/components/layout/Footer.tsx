import { Link } from "wouter";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[hsl(222_56%_10%)] pt-14 pb-8 border-t border-white/8 text-white/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="flex flex-col gap-4 lg:col-span-1">
            <Link href="/">
              <img
                src={`${import.meta.env.BASE_URL}images/logo/logoeos_clean.svg`}
                alt="EOS Logo"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed text-white/50">
              CERTH/ITI Remote Sensing Research Team — Earth Observation services and products for
              environmental monitoring and sustainability.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 text-xs uppercase tracking-widest">
              Research
            </h3>
            <ul className="flex flex-col gap-2.5">
              {[
                ["Projects", "/research?tab=projects"],
                ["Publications", "/research?tab=publications"],
                ["Special Issues", "/research?tab=issues"],
                ["Workshops", "/research?tab=workshops"],
                ["Cooperations", "/research?tab=cooperations"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 text-xs uppercase tracking-widest">
              Tools & Data
            </h3>
            <ul className="flex flex-col gap-2.5">
              {[
                ["Vegetation Indices", "/tools"],
                ["Inundation Maps", "/tools"],
                ["Land Cover Maps", "/tools"],
                ["UAV Services", "/tools"],
                ["e-Learning", "/tools?tab=elearning"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 text-xs uppercase tracking-widest">
              Contact
            </h3>
            <ul className="flex flex-col gap-3.5">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[hsl(37_80%_56%)] shrink-0 mt-0.5" />
                <span className="text-sm text-white/50 leading-relaxed">
                  6th km Harilaou–Thermi Rd
                  <br />
                  57001 Thermi, Thessaloniki, GR
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[hsl(37_80%_56%)] shrink-0" />
                <a
                  href="mailto:imanakos@iti.gr"
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  imanakos@iti.gr
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[hsl(37_80%_56%)] shrink-0" />
                <span className="text-sm text-white/50">+30 2311 257760</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} EOS – CERTH/ITI Remote Sensing Research Team. All rights
            reserved.
          </p>
          <div className="flex gap-5">
            <Link
              href="/research"
              className="text-xs text-white/30 hover:text-white transition-colors"
            >
              Research
            </Link>
            <Link
              href="/tools"
              className="text-xs text-white/30 hover:text-white transition-colors"
            >
              Tools & Data
            </Link>
            <Link
              href="/contact"
              className="text-xs text-white/30 hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

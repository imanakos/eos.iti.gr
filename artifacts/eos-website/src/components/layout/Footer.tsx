import { Link } from "wouter";
import { Mail, MapPin, Globe, ExternalLink, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 pt-16 pb-8 border-t border-slate-800 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-1">
                <img
                  src={`${import.meta.env.BASE_URL}images/logo.png`}
                  alt="EOS Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white leading-tight tracking-tight">EOS</span>
                <span className="text-[10px] font-medium tracking-widest uppercase text-slate-400">CERTH / ITI</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              The EOS Remote Sensing team at CERTH/ITI develops Earth Observation services and products for environmental monitoring and sustainability.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Our Work</h3>
            <ul className="flex flex-col gap-2.5">
              <li><Link href="/our-work/projects" className="text-sm text-slate-400 hover:text-white transition-colors">Projects</Link></li>
              <li><Link href="/our-work/cooperations" className="text-sm text-slate-400 hover:text-white transition-colors">Cooperations</Link></li>
              <li><Link href="/our-work/publications" className="text-sm text-slate-400 hover:text-white transition-colors">Publications</Link></li>
              <li><Link href="/our-work/special-issues" className="text-sm text-slate-400 hover:text-white transition-colors">Special Issues</Link></li>
              <li><Link href="/our-work/workshops" className="text-sm text-slate-400 hover:text-white transition-colors">Workshops</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Services & Tools</h3>
            <ul className="flex flex-col gap-2.5">
              <li><Link href="/services/uav" className="text-sm text-slate-400 hover:text-white transition-colors">UAV Services</Link></li>
              <li><Link href="/services/zenodo" className="text-sm text-slate-400 hover:text-white transition-colors">Zenodo Products</Link></li>
              <li><a href="https://portal-wqems.iti.gr/" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">EO-4-WaterUtilities <ExternalLink className="w-3 h-3 opacity-50" /></a></li>
              <li><a href="https://ecosense.biosense.rs/#/home" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">EO-4-ProtectedAreas <ExternalLink className="w-3 h-3 opacity-50" /></a></li>
              <li><a href="http://datacube.iti.gr/" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">Greek Data Cubes <ExternalLink className="w-3 h-3 opacity-50" /></a></li>
              <li><Link href="/services" className="text-sm text-slate-400 hover:text-white transition-colors">View All Services →</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400 leading-relaxed">
                  6th km Harilaou - Thermi Road<br />
                  57001 Thermi, Thessaloniki<br />
                  Greece
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:info@iti.gr" className="text-sm text-slate-400 hover:text-white transition-colors">info@iti.gr</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm text-slate-400">+30 2311 257701</span>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-primary shrink-0" />
                <a href="https://www.iti.gr" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-white transition-colors">www.iti.gr</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} EOS – CERTH/ITI Remote Sensing Research Team. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/about/team" className="text-xs text-slate-500 hover:text-white transition-colors">Team</Link>
            <Link href="/about" className="text-xs text-slate-500 hover:text-white transition-colors">Background</Link>
            <Link href="/contact" className="text-xs text-slate-500 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

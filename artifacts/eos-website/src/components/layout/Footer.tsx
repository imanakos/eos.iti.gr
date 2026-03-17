import { Link } from "wouter";
import { Mail, MapPin, Globe, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 pt-16 pb-8 border-t border-slate-800 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-1">
                 <img 
                    src={`${import.meta.env.BASE_URL}images/logo.png`} 
                    alt="EOS Logo" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl text-white leading-tight tracking-tight">EOS</span>
                <span className="text-[10px] font-medium tracking-widest uppercase text-slate-400">CERTH / ITI</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Earth Observation for peaceful purposes. Rational usage of natural resources, food security and climate change impacts' mitigation.
            </p>
          </div>

          <div>
            <h3 className="font-display font-bold text-white mb-6">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/about" className="text-sm hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/our-work" className="text-sm hover:text-primary transition-colors">Our Work</Link></li>
              <li><Link href="/services" className="text-sm hover:text-primary transition-colors">Services & Products</Link></li>
              <li><Link href="/news" className="text-sm hover:text-primary transition-colors">Latest News</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-white mb-6">Key Tools</h3>
            <ul className="flex flex-col gap-3">
              <li><a href="http://datacube.iti.gr/" target="_blank" rel="noopener noreferrer" className="text-sm flex items-center gap-2 hover:text-primary transition-colors">Greek Data Cubes <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="https://ecosense.biosense.rs/#/home" target="_blank" rel="noopener noreferrer" className="text-sm flex items-center gap-2 hover:text-primary transition-colors">EcoSense <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="http://labecolftp.env.duth.gr/PONTOS/" target="_blank" rel="noopener noreferrer" className="text-sm flex items-center gap-2 hover:text-primary transition-colors">PONTOS Web GIS <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-white mb-6">Contact</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400">Information Technologies Institute (ITI)<br/>Centre for Research and Technology Hellas (CERTH)<br/>Thessaloniki, Greece</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:info@iti.gr" className="text-sm hover:text-white transition-colors">info@iti.gr</a>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-primary shrink-0" />
                <a href="https://www.iti.gr" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors">www.iti.gr</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} EOS - CERTH/ITI Remote Sensing Research Team. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="https://eos.iti.gr/privacy-policy.php" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-500 hover:text-white transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

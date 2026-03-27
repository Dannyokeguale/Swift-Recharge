import { Logo } from "./Logo";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Twitter, Instagram, Facebook, Linkedin } from "lucide-react";

const SOCIAL_PLATFORMS = [
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/swiftrecharge' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/swiftrecharge' },
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/swiftrecharge' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/swiftrecharge' },
];

export function Footer() {
  return (
    <footer className="bg-[#0B1C3D] text-slate-300 py-24 px-6 relative overflow-hidden">
      {/* Spectacular Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
          <div className="space-y-8">
            <Logo className="h-32 lg:h-48" />
            <p className="text-base leading-relaxed text-slate-400 font-medium">
              SwiftRecharge is Nigeria's leading VTU platform, providing fast, secure, and affordable telecom services
              including data, airtime, and bill payments.
            </p>
            <div className="flex items-center gap-4">
              {SOCIAL_PLATFORMS.map((social) => (
                <motion.a 
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="group w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-all"
                >
                  <span className="sr-only">{social.name}</span>
                  <social.icon className="w-5 h-5 text-slate-400 group-hover:text-blue-400" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-10">Services</h4>
            <ul className="space-y-6">
              {[
                { name: "Buy Data", path: "/services" },
                { name: "Buy Airtime", path: "/services" },
                { name: "Cable TV", path: "/services" },
                { name: "Electricity Bills", path: "/services" },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-400 hover:text-blue-400 transition-colors font-bold text-sm uppercase tracking-widest">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-10">Company</h4>
            <ul className="space-y-6">
              {[
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "FAQ", path: "/faq" },
                { name: "Terms & Privacy", path: "/terms" },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-400 hover:text-blue-400 transition-colors font-bold text-sm uppercase tracking-widest">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-10">Business</h4>
            <ul className="space-y-6">
              {[
                { name: "API Integration", path: "/api-integration" },
                { name: "Become an Agent", path: "/become-agent" },
                { name: "Pricing Plans", path: "/pricing" },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-400 hover:text-blue-400 transition-colors font-bold text-sm uppercase tracking-widest">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            © {new Date().getFullYear()} SwiftRecharge. All rights reserved.
          </p>
          <div className="flex items-center gap-10">
            <Link to="/terms" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

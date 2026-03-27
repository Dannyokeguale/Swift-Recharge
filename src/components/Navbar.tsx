import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { cn } from "@/src/lib/utils";
import { Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Pricing", path: "/pricing" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled ? "bg-white/95 backdrop-blur-md py-4 shadow-sm border-slate-100" : "bg-transparent py-8"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
        {/* Logo - Left */}
        <div className="flex-1 flex justify-start">
          <Link to="/" className="flex items-center group">
            <Logo className="h-20 md:h-32 transition-transform duration-300 group-hover:scale-105" />
          </Link>
        </div>

        {/* Desktop Nav - Center */}
        <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-bold transition-all hover:text-blue-600 whitespace-nowrap uppercase tracking-wider",
                location.pathname === link.path ? "text-blue-600" : "text-slate-600"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth Actions - Right */}
        <div className="hidden md:flex flex-1 items-center justify-end gap-6">
          {token ? (
            <Link
              to="/dashboard"
              className="bg-[#0B1C3D] text-white px-6 py-3 rounded-xl text-sm font-extrabold hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-blue-900/20"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-wider">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-[#0B1C3D] text-white px-6 py-3 rounded-xl text-sm font-extrabold hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-blue-900/20"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <button 
            className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-6 right-6 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl p-8 flex flex-col gap-4 md:hidden shadow-2xl border border-slate-100"
          >
            <div className="flex items-center justify-between mb-4">
              <Logo className="h-16" />
              <button onClick={() => setIsOpen(false)} className="text-slate-400">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="h-px bg-slate-100 mb-4" />
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-base font-bold transition-colors",
                  location.pathname === link.path ? "text-blue-600" : "text-slate-600"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-slate-100 my-4" />
            {token ? (
              <Link
                to="/dashboard"
                className="bg-[#0B1C3D] text-white p-4 rounded-xl text-center font-bold text-sm"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  className="text-slate-600 p-4 rounded-xl text-center font-bold text-sm border border-slate-100 bg-slate-50"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-[#0B1C3D] text-white p-4 rounded-xl text-center font-bold text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

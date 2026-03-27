import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "@/src/lib/api";
import { Logo } from "@/src/components/Logo";
import { toast } from "sonner";
import { Mail, Lock, User, ArrowRight, Loader2, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.auth.register({ name, email, password });
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden bg-slate-50">
      {/* Spectacular Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-100/30 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
        <motion.div 
          animate={{ 
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-50/50 rounded-full blur-[80px]" 
        />
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden lg:block"
        >
          <Link to="/" className="inline-block mb-12 hover:scale-105 transition-transform">
            <Logo className="h-32" />
          </Link>
          <h2 className="text-6xl font-black text-slate-900 mb-10 tracking-tighter leading-tight">
            Join the <span className="text-gradient">Future</span> of VTU Services
          </h2>
          <div className="space-y-8">
            {[
              "Instant Airtime & Data Delivery",
              "Secure Wallet & Payment System",
              "24/7 Automated Transactions",
              "Cheapest Rates in Nigeria",
            ].map((text, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="flex items-center gap-4 text-slate-600 font-bold text-lg"
              >
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                </div>
                {text}
              </motion.div>
            ))}
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 p-10 bg-white/50 backdrop-blur-xl rounded-[3rem] border border-white shadow-2xl shadow-slate-200/50 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/20 rounded-full blur-3xl" />
            <p className="text-slate-700 text-xl leading-relaxed font-medium italic relative z-10">
              "SwiftRecharge has completely changed how I handle my data and bill payments. It's fast and reliable!"
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
              <div>
                <p className="text-slate-900 font-black uppercase tracking-widest text-sm">Chidi Okafor</p>
                <p className="text-blue-600 text-xs font-black uppercase tracking-widest">Agent Partner</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md mx-auto"
        >
          <div className="text-center mb-10 lg:hidden">
            <Link to="/" className="inline-block mb-10">
              <Logo className="h-32" />
            </Link>
          </div>
          
          <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] lg:rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-purple-600" />
            
            <div className="mb-10">
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter mb-3">Create Account</h2>
              <p className="text-slate-500 font-medium">Get started with SwiftRecharge today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Full Name</label>
                <div className="relative group/input">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within/input:text-blue-600 transition-colors" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all font-medium"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Email Address</label>
                <div className="relative group/input">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within/input:text-blue-600 transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all font-medium"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Password</label>
                <div className="relative group/input">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within/input:text-blue-600 transition-colors" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all font-medium"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed ml-1">
                By creating an account, you agree to our{" "}
                <Link to="/terms" className="text-blue-600 hover:text-blue-700 transition-colors">
                  Terms
                </Link>{" "}
                &{" "}
                <Link to="/terms" className="text-blue-600 hover:text-blue-700 transition-colors">
                  Privacy
                </Link>.
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/20 flex items-center justify-center gap-3 disabled:opacity-70 active:scale-[0.98] uppercase tracking-[0.1em]"
              >
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    Create Account <ArrowRight className="w-6 h-6" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 pt-10 border-t border-slate-50 text-center">
              <p className="text-slate-500 font-medium">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 font-black hover:text-blue-700 transition-colors uppercase tracking-widest text-xs ml-2">
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex items-center justify-center gap-3 text-slate-400"
          >
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span className="text-xs font-black uppercase tracking-[0.3em]">Join 10,000+ Users</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

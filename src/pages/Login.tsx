import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "@/src/lib/api";
import { Logo } from "@/src/components/Logo";
import { toast } from "sonner";
import { Mail, Lock, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { token, user } = await api.auth.login({ email, password });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Login successful!");
      navigate("/dashboard");
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
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-100/30 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-50/50 rounded-full blur-[80px]" 
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-12">
          <Link to="/" className="inline-block mb-10 hover:scale-105 transition-transform">
            <Logo className="h-32 lg:h-48" />
          </Link>
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tighter mb-3">Welcome Back</h2>
          <p className="text-slate-500 font-medium text-base lg:text-lg">Enter your credentials to access your account</p>
        </div>

        <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] lg:rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-purple-600" />
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-1">Email Address</label>
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
              <div className="flex justify-between items-center mb-4 ml-1">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Password</label>
                <Link to="/forgot-password" title="Forgot Password" className="text-xs font-black text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-widest">
                  Forgot?
                </Link>
              </div>
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/20 flex items-center justify-center gap-3 disabled:opacity-70 active:scale-[0.98] uppercase tracking-[0.1em]"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight className="w-6 h-6" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-slate-50 text-center">
            <p className="text-slate-500 font-medium">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 font-black hover:text-blue-700 transition-colors uppercase tracking-widest text-xs ml-2">
                Create Account
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
          <span className="text-xs font-black uppercase tracking-[0.3em]">Secure & Encrypted</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

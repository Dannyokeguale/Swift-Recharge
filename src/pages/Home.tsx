import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Smartphone, Laptop, Zap, Shield, Clock, Users, ArrowRight, CheckCircle2, Lightbulb, Tv } from "lucide-react";
import { cn } from "@/src/lib/utils";

export function Home() {
  return (
    <div className="overflow-hidden bg-white">
      {/* Spectacular Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 pt-40 pb-20 lg:py-0 overflow-hidden">
        {/* Animated Background Layers */}
        <div className="absolute inset-0 -z-10">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-100/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -5, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-100/50 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" 
          />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center lg:text-left relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest mb-8 border border-blue-100"
            >
              <Zap className="w-4 h-4" /> Nigeria's #1 VTU Platform
            </motion.div>
            <h1 className="text-5xl lg:text-8xl font-black text-[#0B1C3D] leading-[0.9] mb-10 tracking-tighter">
              The Future of <br />
              <span className="text-gradient">Connectivity</span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-500 leading-relaxed mb-12 max-w-xl mx-auto lg:mx-0 font-medium">
              Experience lightning-fast VTU services. Data, airtime, and bills delivered in seconds, with the best rates in the market.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
              <Link
                to="/register"
                className="group relative bg-[#0B1C3D] text-white px-12 py-6 rounded-2xl font-black text-lg hover:bg-slate-800 transition-all shadow-2xl shadow-blue-500/20 flex items-center gap-3 overflow-hidden"
              >
                <span className="relative z-10">Get Started</span>
                <ArrowRight className="w-6 h-6 relative z-10 transition-transform group-hover:translate-x-2" />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                />
              </Link>
              <Link
                to="/services"
                className="bg-white text-[#0B1C3D] border-2 border-slate-200 px-12 py-6 rounded-2xl font-black text-lg hover:border-[#0B1C3D] transition-all flex items-center gap-3"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>

          <div className="relative h-[400px] lg:h-[800px] flex items-center justify-center">
            {/* Spectacular Mockup Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg"
            >
              <div className="absolute inset-0 bg-blue-600/20 rounded-[4rem] blur-[100px] -z-10 animate-pulse" />
              
              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [0, -30, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -left-10 z-30 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase">Success</p>
                  <p className="text-sm font-black text-slate-900">Payment Confirmed</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 30, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -right-10 z-30 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase">Speed</p>
                  <p className="text-sm font-black text-slate-900">Instant Delivery</p>
                </div>
              </motion.div>

              {/* Main Phone Frame */}
              <div className="bg-slate-900 p-4 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-4 border-slate-800 relative overflow-hidden">
                <div className="bg-white rounded-[3rem] h-[650px] overflow-hidden relative">
                  <div className="bg-gradient-to-br from-[#0B1C3D] to-blue-600 p-10 text-white">
                    <div className="flex justify-between items-center mb-10">
                      <div className="w-10 h-10 bg-white/10 rounded-xl backdrop-blur-md border border-white/10" />
                      <div className="w-10 h-10 bg-white/10 rounded-full backdrop-blur-md border border-white/10" />
                    </div>
                    <p className="text-xs font-bold opacity-60 mb-2 uppercase tracking-widest">Available Balance</p>
                    <h3 className="text-4xl font-black tracking-tight">₦125,450.00</h3>
                  </div>
                  <div className="p-8 space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                      {[
                        { icon: Zap, label: "Data", color: "text-blue-600 bg-blue-50" },
                        { icon: Smartphone, label: "Airtime", color: "text-purple-600 bg-purple-50" },
                      ].map((item, i) => (
                        <div key={i} className="aspect-square rounded-[2rem] flex flex-col items-center justify-center gap-3 border border-slate-100 bg-slate-50 shadow-sm">
                          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", item.color)}>
                            <item.icon className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-black uppercase tracking-wider">{item.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recent Activity</p>
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-lg" />
                            <div className="space-y-1">
                              <div className="w-16 h-2 bg-slate-200 rounded-full" />
                              <div className="w-10 h-1.5 bg-slate-100 rounded-full" />
                            </div>
                          </div>
                          <div className="w-12 h-2 bg-slate-200 rounded-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Spectacular Bento Grid Services */}
      <section id="services" className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 lg:mb-24"
          >
            <h2 className="text-4xl lg:text-7xl font-black text-[#0B1C3D] mb-8 tracking-tighter">
              Premium <span className="text-gradient">Services</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-xl font-medium">
              We've built a robust ecosystem to handle all your digital needs with unmatched speed and reliability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {/* Bento Layout */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="md:col-span-3 bento-card group overflow-hidden relative"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src="/data_sub.jpg" 
                  alt="Data" 
                  className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col h-full relative z-10">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-black text-[#0B1C3D] mb-4">Data Subscription</h3>
                <p className="text-slate-500 mb-8 text-lg">High-speed data for all networks. MTN, Glo, Airtel, and 9mobile at wholesale prices.</p>
                <div className="mt-auto">
                  <Link to="/services/data" className="inline-flex items-center gap-2 font-black text-blue-600 group-hover:gap-4 transition-all">
                    Get Started <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="md:col-span-3 bento-card bg-[#0B1C3D] text-white group"
            >
              <div className="flex flex-col h-full">
                <div className="w-16 h-16 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-8">
                  <Laptop className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-black mb-4">API for Developers</h3>
                <p className="text-slate-400 mb-8 text-lg">Integrate our robust VTU API into your own applications and start earning today.</p>
                <div className="mt-auto">
                  <Link to="/api-integration" className="inline-flex items-center gap-2 font-black text-blue-400 group-hover:gap-4 transition-all">
                    View Docs <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="md:col-span-2 bento-card group relative overflow-hidden"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src="/airtime_vtu.jpg" 
                  alt="Airtime" 
                  className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <Smartphone className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-[#0B1C3D] mb-3">Airtime VTU</h3>
                <p className="text-slate-500 text-sm mb-6">Instant airtime top-up for all networks with up to 5% discount.</p>
                <Link to="/services/airtime" className="text-sm font-black text-blue-600">Buy Now</Link>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="md:col-span-2 bento-card group"
            >
              <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <Lightbulb className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-[#0B1C3D] mb-3">Utility Bills</h3>
              <p className="text-slate-500 text-sm mb-6">Pay electricity bills and more without leaving your home.</p>
              <Link to="/services/bills" className="text-sm font-black text-blue-600">Pay Now</Link>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="md:col-span-2 bento-card group"
            >
              <div className="w-14 h-14 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center mb-6">
                <Tv className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-[#0B1C3D] mb-3">Cable TV</h3>
              <p className="text-slate-500 text-sm mb-6">Renew DSTV, GOTV, and Startimes in just a few clicks.</p>
              <Link to="/services/cable" className="text-sm font-black text-blue-600">Renew Now</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Spectacular Stats Section */}
      <section className="py-32 px-6 relative overflow-hidden bg-[#0B1C3D]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
            {[
              { label: "Active Users", value: "50,000+", icon: Users },
              { label: "Daily Transactions", value: "10,000+", icon: Zap },
              { label: "Uptime", value: "99.99%", icon: Clock },
              { label: "Security", value: "Bank-Grade", icon: Shield },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 lg:mb-8 backdrop-blur-xl border border-white/10">
                  <stat.icon className="w-6 h-6 lg:w-8 lg:h-8 text-blue-400" />
                </div>
                <h3 className="text-3xl lg:text-5xl font-black text-white mb-4 tracking-tight">{stat.value}</h3>
                <p className="text-blue-200 text-[10px] lg:text-sm font-bold uppercase tracking-[0.2em]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-[4rem] p-12 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-500/40"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-7xl font-black mb-10 tracking-tighter leading-tight">
                Ready to Experience <br /> the Best VTU Service?
              </h2>
              <p className="text-blue-100 text-xl lg:text-2xl max-w-2xl mx-auto mb-16 font-medium">
                Join thousands of satisfied users and businesses who trust SwiftRecharge for their daily needs.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-12 py-6 rounded-2xl font-black text-xl hover:bg-blue-50 transition-all shadow-xl"
                >
                  Create Free Account
                </Link>
                <Link
                  to="/contact"
                  className="bg-white/10 text-white border border-white/20 px-12 py-6 rounded-2xl font-black text-xl hover:bg-white/20 transition-all backdrop-blur-md"
                >
                  Talk to Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

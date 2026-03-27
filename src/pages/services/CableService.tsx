import { motion } from "motion/react";
import { Smartphone, Zap, Shield, Clock, Tv } from "lucide-react";
import { Link } from "react-router-dom";

export function CableService() {
  const features = [
    { title: "Instant Activation", desc: "Cable TV subscriptions are activated immediately after payment confirmation.", icon: Zap },
    { title: "All Providers", desc: "We support DSTV, GOTV, and Startimes subscriptions.", icon: Tv },
    { title: "Secure Payment", desc: "Your transactions are protected with industry-standard encryption.", icon: Shield },
    { title: "24/7 Availability", desc: "Renew your subscription anytime, anywhere, even in the middle of the night.", icon: Clock },
  ];

  return (
    <div className="pt-24 pb-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-bold text-sm mb-6">
              <Tv className="w-4 h-4" />
              Cable TV Subscriptions
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-[#0B1C3D] mb-8 leading-tight">
              Renew Your <span className="text-[#0076FF]">Cable TV</span> Subscription Instantly
            </h1>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed">
              Never miss your favorite shows! SwiftRecharge makes it easy to renew your DSTV, GOTV, and Startimes subscriptions. Our system is fully automated, ensuring your subscription is activated instantly.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="bg-[#0B1C3D] text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">Get Started Now</Link>
              <Link to="/pricing" className="bg-white text-[#0B1C3D] border border-slate-200 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all">View Cable Rates</Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-[3rem] blur-3xl" />
            <img 
              src="https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=800" 
              alt="Cable TV Services" 
              className="relative rounded-[3rem] shadow-2xl border-8 border-white object-cover w-full h-[500px]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Service Fee</p>
              <p className="text-3xl font-black text-blue-600">₦0.00</p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {features.map((f, i) => (
            <div key={i} className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <f.icon className="w-7 h-7 text-[#0076FF]" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1C3D] mb-3">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#0B1C3D] rounded-[3rem] p-12 lg:p-20 text-white">
          <div className="max-w-3xl">
            <h2 className="text-3xl lg:text-5xl font-black mb-8">How to Renew Subscription</h2>
            <div className="space-y-8">
              {[
                "Create a free account on SwiftRecharge.",
                "Fund your wallet using any of our secure payment methods.",
                "Select 'Cable TV' from your dashboard.",
                "Choose your provider and enter your smartcard number.",
                "Confirm and receive your activation instantly!"
              ].map((step, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold shrink-0">{i + 1}</div>
                  <p className="text-lg text-slate-300">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

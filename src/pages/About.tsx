import { motion } from "motion/react";
import { Target, Users, Shield, Zap, CheckCircle2, Smartphone, Globe, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

export function About() {
  return (
    <div className="py-24 px-6 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-6 border border-blue-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              Our Story
            </div>
            <h1 className="text-3xl lg:text-7xl font-extrabold text-[#0B1C3D] mb-8 tracking-tight leading-[1.1]">
              Empowering Nigeria's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A3FFC] to-[#0076FF]">Digital Economy</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8 font-medium">
              SwiftRecharge was founded with a single mission: to make telecom services accessible, affordable, and instant for every Nigerian. We bridge the gap between service providers and consumers through cutting-edge technology.
            </p>
            <div className="space-y-4 mb-8">
              {[
                "Over 5 years of industry-leading expertise",
                "99.9% Transaction success rate",
                "Trusted by 50,000+ active users nationwide"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-700 font-semibold">
                  <CheckCircle2 className="w-6 h-6 text-blue-600" />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>
          
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <img
                src="about_us.png"
                alt="Our Team"
                className="rounded-[3rem] shadow-2xl border-8 border-white w-full object-cover aspect-[4/3]"
              />
            </motion.div>
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, x: 20 }}
              whileInView={{ scale: 1, opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-10 -left-10 bg-[#0B1C3D] text-white p-10 rounded-[2.5rem] shadow-2xl hidden lg:block border border-white/10 backdrop-blur-xl z-20"
            >
              <p className="text-6xl font-black mb-1 text-blue-400">5+</p>
              <p className="text-xs font-black opacity-60 uppercase tracking-[0.4em]">Years of Excellence</p>
            </motion.div>

            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 group hover:border-blue-200 transition-all"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Target className="w-10 h-10" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">Our Mission</h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              To empower every Nigerian with seamless, instant, and affordable access to essential digital services. We are committed to fostering economic growth by providing a platform where individuals and businesses can thrive through technological innovation and financial inclusion.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 group hover:border-purple-200 transition-all"
          >
            <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Zap className="w-10 h-10" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">Our Vision</h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              To be the most trusted and innovative digital service hub in Africa. We envision a future where digital transactions are as natural as breathing, setting the global standard for reliability, speed, and customer-centricity in the telecom and fintech industry.
            </p>
          </motion.div>
        </div>

        {/* Services Showcase */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold text-[#0B1C3D] mb-6">Our Core Services</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              We provide the backbone for your digital lifestyle and business needs. Click on any service to learn more.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src="airtime_vtu.jpg"
                  alt="Airtime VTU"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-10">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                  <Smartphone className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-4">Airtime VTU</h4>
                <p className="text-slate-600 mb-8 leading-relaxed">Instant top-up for all major networks with up to 5% discount on every purchase.</p>
                <Link to="/services/airtime" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-4 transition-all">
                  Learn More <Zap className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src="data_sub.jpg"
                  alt="Data Subscriptions"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-10">
                <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-6">
                  <Globe className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-4">Data Subscriptions</h4>
                <p className="text-slate-600 mb-8 leading-relaxed">Affordable data bundles for all networks. SME Data and Corporate Data at wholesale prices.</p>
                <Link to="/services/data" className="inline-flex items-center gap-2 text-green-600 font-bold hover:gap-4 transition-all">
                  Learn More <Zap className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="group relative bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800"
                  alt="Bill Payments"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-10">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-6">
                  <CreditCard className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-4">Bill Payments</h4>
                <p className="text-slate-600 mb-8 leading-relaxed">Pay electricity bills and cable TV subscriptions instantly from the comfort of your home.</p>
                <Link to="/services/bills" className="inline-flex items-center gap-2 text-orange-600 font-bold hover:gap-4 transition-all">
                  Learn More <Zap className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Values & Community */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#0B1C3D] p-12 lg:p-16 rounded-[4rem] text-white relative overflow-hidden"
          >
            <div className="relative z-10">
              <Shield className="w-16 h-16 text-blue-400 mb-8" />
              <h3 className="text-3xl lg:text-4xl font-bold mb-8">Our Core Values</h3>
              <div className="space-y-8">
                {[
                  { title: "Integrity", desc: "We operate with absolute transparency. Every kobo is accounted for, and every transaction is secure." },
                  { title: "Innovation", desc: "We don't just follow trends; we set them. Our tech stack is constantly evolving to serve you better." },
                  { title: "Customer Obsession", desc: "Your satisfaction is our primary metric. Our support team is available 24/7 to ensure you're never stranded." }
                ].map((value, i) => (
                  <div key={i} className="border-l-2 border-blue-500/30 pl-6">
                    <h4 className="text-xl font-bold mb-2 text-blue-400">{value.title}</h4>
                    <p className="text-slate-400 leading-relaxed">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-12 lg:p-16 rounded-[4rem] border border-slate-100 shadow-2xl relative overflow-hidden flex flex-col"
          >
            <div className="relative z-10 mb-8">
              <Users className="w-16 h-16 text-purple-600 mb-8" />
              <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8">Our Community</h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-10">
                Our community is the heartbeat of SwiftRecharge. We aren't just a platform; we are a growing ecosystem of over 50,000 digital entrepreneurs, students, and professionals across all 36 states of Nigeria.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                  <p className="text-3xl font-black text-slate-900 mb-1">50k+</p>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Active Users</p>
                </div>
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                  <p className="text-3xl font-black text-slate-900 mb-1">1M+</p>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Transactions</p>
                </div>
              </div>
            </div>
            
            <div className="mt-auto relative rounded-[2.5rem] overflow-hidden">
              <img 
                src="data_sub.jpg" 
                alt="Our Community" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <p className="text-white font-bold italic">
                  "We believe in growing together. When our resellers succeed, we succeed."
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#0B1C3D] to-[#1a365d] rounded-[4rem] p-12 lg:p-24 text-center text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-6xl font-extrabold mb-8 tracking-tight">Ready to start your journey?</h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-12 text-lg lg:text-xl leading-relaxed">
              Join thousands of Nigerians who are already enjoying the best VTU experience. Create an account today and see the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/40 hover:-translate-y-1">
                Get Started Now
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-12 py-5 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all">
                Contact Sales
              </button>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"></div>
        </motion.div>
      </div>
    </div>
  );
}

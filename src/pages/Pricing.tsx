import { motion } from "motion/react";
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

export function Pricing() {
  const pricingData = [
    {
      network: "MTN Gifting",
      icon: Zap,
      color: "bg-yellow-50 text-yellow-600",
      plans: [
        { name: "230MB Daily Plan (Awoof Data)", validity: "1 day", price: "₦196" },
        { name: "1GB Daily Plan + 1.5 minutes (Awoof Data)", validity: "1 day", price: "₦490" },
        { name: "1.5GB 2-Day Plan (Awoof Data)", validity: "2 days", price: "₦588" },
        { name: "2GB 2-Day Plan (Awoof Data)", validity: "2 days", price: "₦735" },
        { name: "2.5GB 2-Day Plan (Awoof Data)", validity: "2 days", price: "₦882" },
        { name: "3.2GB 2-Day Plan (Awoof Data)", validity: "2 days", price: "₦980" },
      ],
      balanceCode: "*323#"
    },
    {
      network: "Glo SME",
      icon: Zap,
      color: "bg-green-50 text-green-600",
      plans: [
        { name: "200MB Glo Data", validity: "14 days", price: "₦98" },
        { name: "500MB Glo Data", validity: "30 days", price: "₦239" },
        { name: "1GB Glo Data", validity: "3 days", price: "₦292" },
        { name: "3GB Glo Data", validity: "3 days", price: "₦876" },
        { name: "5GB Glo Data", validity: "3 days", price: "₦1460" },
        { name: "1GB Glo Data", validity: "7 days", price: "₦339" },
      ],
      balanceCode: "*323#"
    },
    {
      network: "9mobile Gifting",
      icon: Zap,
      color: "bg-green-50 text-green-600",
      plans: [
        { name: "9mobile 500MB", validity: "30 days", price: "₦475" },
        { name: "9mobile 1.536GB", validity: "30 days", price: "₦950" },
        { name: "9mobile 2.048GB", validity: "30 days", price: "₦1140" },
        { name: "9mobile 3.172GB", validity: "30 days", price: "₦1425" },
        { name: "9mobile 4.608GB", validity: "30 days", price: "₦1900" },
        { name: "9mobile 11.264GB", validity: "30 days", price: "₦3800" },
      ],
      balanceCode: "*323#"
    },
    {
      network: "Airtel Gifting",
      icon: Zap,
      color: "bg-red-50 text-red-600",
      plans: [
        { name: "500MB - 7 days (Direct Data)", validity: "7 days", price: "₦487.45" },
        { name: "1.5GB - 7 days (Direct Data)", validity: "7 days", price: "₦974.89" },
        { name: "3.5GB - 7 days (Direct Data)", validity: "7 days", price: "₦1462.34" },
        { name: "6GB - 7 days (Direct Data)", validity: "7 days", price: "₦2437.23" },
        { name: "10GB - 7 days (Direct Data)", validity: "7 days", price: "₦2924.67" },
        { name: "18GB - 7 days (Direct Data)", validity: "7 days", price: "₦4874.45" },
      ],
      balanceCode: "*323#"
    }
  ];

  return (
    <div className="py-24 px-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-black text-[#0B1C3D] mb-6">Our <span className="text-[#0076FF]">Prices</span></h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">Experience you can trust, service you can count on. Get the best deals on data plans.</p>
          <div className="flex justify-center gap-4 mt-8">
            <Link to="/register" className="bg-[#0B1C3D] text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all">Get Started</Link>
            <Link to="/login" className="bg-white text-[#0B1C3D] border border-[#0B1C3D] px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all">Login</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pricingData.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${category.color}`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black text-[#0B1C3D]">{category.network}</h2>
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Balance: {category.balanceCode}
                </div>
              </div>
              <div className="p-0">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/30">
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Plan</th>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Validity</th>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.plans.map((plan, pIdx) => (
                      <tr key={pIdx} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-5 text-sm font-bold text-[#0B1C3D]">{plan.name}</td>
                        <td className="px-8 py-5 text-sm text-slate-500">{plan.validity}</td>
                        <td className="px-8 py-5 text-sm font-black text-[#0076FF] text-right">{plan.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 bg-[#0B1C3D] rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-5xl font-black mb-8">Ready to start?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-12 text-lg">Join thousands of happy customers and retailers who trust MobileNig for their daily connections.</p>
            <Link to="/register" className="bg-[#0076FF] text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">Create Free Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

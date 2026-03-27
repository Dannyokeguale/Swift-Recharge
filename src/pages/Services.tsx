import { motion } from "motion/react";
import { Zap, Smartphone, Tv, Lightbulb, ArrowRight, Laptop, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/src/lib/utils";

export function Services() {
  const services = [
    { 
      id: "data", 
      title: "Data Subscription", 
      desc: "Get cheap data plans for all networks in Nigeria. We offer SME, Gifting, and Corporate Gifting data at the best rates.", 
      icon: Zap, 
      color: "bg-blue-50 text-blue-600", 
      link: "/services/data", 
      img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      id: "airtime", 
      title: "Airtime VTU", 
      desc: "Instant airtime recharge for MTN, Glo, Airtel & 9mobile. Enjoy discounts on every recharge you make on our platform.", 
      icon: Smartphone, 
      color: "bg-purple-50 text-purple-600", 
      link: "/services/airtime", 
      img: "https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      id: "bills", 
      title: "Electricity Bills", 
      desc: "Pay for your IKEDC, EKEDC, AEDC and other DISCOs. Get your token instantly after payment.", 
      icon: Lightbulb, 
      color: "bg-orange-50 text-orange-600", 
      link: "/services/bills", 
      img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      id: "cable", 
      title: "Cable TV", 
      desc: "Renew your DSTV, GOTV, and Startimes subscriptions instantly. No more missing your favorite shows.", 
      icon: Tv, 
      color: "bg-blue-50 text-blue-600", 
      link: "/services/cable", 
      img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      id: "api", 
      title: "API for Developers", 
      desc: "Integrate our services into your own platform seamlessly. Our API is fast, secure, and easy to use.", 
      icon: Laptop, 
      color: "bg-slate-900 text-white", 
      link: "/api-integration", 
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      id: "agent", 
      title: "Become an Agent", 
      desc: "Start your own VTU business and earn commissions. We provide the platform, you provide the service.", 
      icon: Users, 
      color: "bg-pink-50 text-pink-600", 
      link: "/become-agent", 
      img: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800" 
    },
  ];

  return (
    <div className="py-24 px-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl lg:text-7xl font-black text-[#0B1C3D] mb-6 leading-tight">
            Our <span className="text-[#0076FF]">Services</span>
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            We provide a wide range of digital services designed to keep you connected and empowered. Explore our offerings below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -15 }}
              className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 group overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.img} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-10">
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110", service.color)}>
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-[#0B1C3D] mb-4">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-8">{service.desc}</p>
                <Link 
                  to={service.link} 
                  className="inline-flex items-center gap-2 font-bold text-[#0076FF] hover:gap-4 transition-all"
                >
                  Learn More <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 bg-[#0B1C3D] rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-5xl font-black mb-8">Ready to get started?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-12 text-lg">
              Create an account today and start enjoying the best VTU experience in Nigeria.
            </p>
            <Link 
              to="/register" 
              className="bg-[#0076FF] text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

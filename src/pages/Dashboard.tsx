import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Wallet, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Zap, 
  Smartphone, 
  Tv, 
  Lightbulb,
  Plus,
  CreditCard,
  ShieldCheck,
  ZapIcon,
  History,
  ArrowRight,
  Loader2
} from "lucide-react";
import { api } from "@/src/lib/api";
import { formatCurrency, formatDate, cn } from "@/src/lib/utils";
import { toast } from "sonner";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Link } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, txData] = await Promise.all([
          api.user.getProfile(),
          api.user.getTransactions(),
        ]);
        setProfile(profileData);
        setTransactions(txData);
      } catch (error) {
        toast.error("Failed to fetch dashboard data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartData = transactions.slice(0, 7).reverse().map(tx => ({
    name: new Date(tx.created_at).toLocaleDateString('en-NG', { weekday: 'short' }),
    amount: tx.amount
  }));

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-6">
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center shadow-2xl shadow-blue-500/40"
      >
        <Zap className="w-10 h-10 text-white" />
      </motion.div>
      <p className="text-slate-500 font-black tracking-widest uppercase text-xs animate-pulse">Initializing Dashboard...</p>
    </div>
  );

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-10 pb-20"
    >
      {/* Spectacular Welcome Section */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tighter">
            Welcome back, <span className="text-gradient">{profile?.name?.split(' ')[0]}</span>!
          </h2>
          <p className="text-slate-500 font-medium mt-2">Here's what's happening with your account today.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Login</p>
            <p className="text-sm font-bold text-slate-900">{formatDate(new Date().toISOString())}</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
            <ShieldCheck className="w-7 h-7 text-blue-600" />
          </div>
        </div>
      </motion.div>

      {/* Balance & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-2 bg-[#0B1C3D] rounded-[2.5rem] lg:rounded-[3.5rem] p-8 lg:p-12 text-white relative overflow-hidden group shadow-[0_40px_80px_-15px_rgba(11,28,61,0.3)]"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start mb-12 lg:mb-16">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10">
                    <Wallet className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-[0.3em] opacity-60">Wallet Balance</span>
                </div>
                <h2 className="text-4xl lg:text-7xl font-black tracking-tighter mb-4">
                  {formatCurrency(profile?.wallet?.balance || 0)}
                </h2>
                <div className="flex items-center gap-2 text-blue-400 text-sm font-black">
                  <TrendingUp className="w-4 h-4" /> +₦0.00 today
                </div>
              </div>
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-blue-500/40 border border-white/20"
              >
                <CreditCard className="w-10 h-10 text-white" />
              </motion.div>
            </div>
            <div className="flex flex-wrap gap-4 lg:gap-6">
              <Link
                to="/dashboard/wallet"
                className="group relative bg-white text-[#0B1C3D] px-8 lg:px-12 py-4 lg:py-6 rounded-2xl font-black flex items-center gap-3 hover:bg-blue-50 transition-all shadow-2xl shadow-black/20 text-xs lg:text-sm uppercase tracking-[0.2em] overflow-hidden"
              >
                <span className="relative z-10">Fund Wallet</span>
                <Plus className="w-5 h-5 relative z-10 transition-transform group-hover:rotate-90" />
              </Link>
              <Link
                to="/dashboard/transactions"
                className="bg-white/10 text-white border border-white/20 px-8 lg:px-12 py-4 lg:py-6 rounded-2xl font-black flex items-center gap-3 hover:bg-white/20 transition-all text-xs lg:text-sm uppercase tracking-[0.2em] backdrop-blur-md"
              >
                <History className="w-5 h-5" /> History
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-[2.5rem] lg:rounded-[3.5rem] p-8 lg:p-12 border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden group"
        >
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-50 rounded-full blur-[80px] group-hover:scale-125 transition-transform duration-1000" />
          <div className="relative z-10">
            <p className="text-slate-400 text-[10px] font-black mb-8 lg:mb-10 uppercase tracking-[0.3em]">Quick Services</p>
            <div className="grid grid-cols-2 gap-4 lg:gap-8">
              {[
                { name: "Data", icon: Zap, color: "text-blue-600 bg-blue-50", path: "/dashboard/buy-data" },
                { name: "Airtime", icon: Smartphone, color: "text-purple-600 bg-purple-50", path: "/dashboard/buy-airtime" },
                { name: "Cable", icon: Tv, color: "text-slate-900 bg-slate-50", path: "/dashboard/cable" },
                { name: "Bills", icon: Lightbulb, color: "text-orange-600 bg-orange-50", path: "/dashboard/electricity" },
              ].map((action, i) => (
                <motion.div key={i} whileHover={{ y: -10, scale: 1.05 }}>
                  <Link
                    to={action.path}
                    className="flex flex-col items-center gap-3 lg:gap-4 group/item"
                  >
                    <div className={cn("w-16 h-16 lg:w-20 lg:h-20 rounded-2xl lg:rounded-3xl flex items-center justify-center transition-all shadow-sm group-hover/item:shadow-xl group-hover/item:shadow-blue-500/10 group-hover/item:rotate-6", action.color)}>
                      <action.icon className="w-8 h-8 lg:w-10 lg:h-10" />
                    </div>
                    <span className="text-[10px] lg:text-xs font-black text-slate-900 uppercase tracking-widest">{action.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Analytics & Promo */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-2 bg-white rounded-[3.5rem] p-12 border border-slate-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Spending Analytics</h3>
              <p className="text-slate-400 text-base font-medium mt-1">Activity over the last 7 days</p>
            </div>
            <div className="flex items-center gap-2 text-green-500 text-sm font-black bg-green-50 px-6 py-3 rounded-2xl border border-green-100">
              <TrendingUp className="w-5 h-5" /> +12.5%
            </div>
          </div>
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 800 }} 
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 800 }} 
                  dx={-15}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '32px', 
                    border: 'none', 
                    boxShadow: '0 40px 80px -20px rgba(0,0,0,0.15)',
                    padding: '24px'
                  }}
                  itemStyle={{ fontWeight: 900, color: '#0f172a', fontSize: '16px' }}
                  labelStyle={{ fontWeight: 800, color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#2563eb" 
                  strokeWidth={6} 
                  fillOpacity={1} 
                  fill="url(#colorAmount)" 
                  animationDuration={2500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-[3.5rem] p-12 text-white relative overflow-hidden group flex flex-col shadow-2xl shadow-blue-500/30"
        >
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800" 
              alt="Secure Payment" 
              className="w-full h-full object-cover opacity-10 group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-blue-600/60 to-transparent" />
          </div>

          <div className="relative z-10 h-full flex flex-col flex-grow">
            <div className="mb-10">
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="w-24 h-24 bg-white/10 rounded-[2rem] flex items-center justify-center mb-10 backdrop-blur-xl border border-white/10"
              >
                <CreditCard className="w-12 h-12" />
              </motion.div>
              <h3 className="text-4xl font-black mb-8 leading-tight tracking-tight">Fund Your Wallet Instantly</h3>
              <p className="text-blue-100 text-lg leading-relaxed mb-10 font-medium opacity-80">
                Add funds using Bank Transfer, Card, or USSD and enjoy seamless transactions.
              </p>
            </div>
            <div className="mt-auto space-y-10">
              <Link
                to="/dashboard/wallet"
                className="block w-full bg-white text-blue-600 py-7 rounded-2xl font-black text-center hover:bg-blue-50 transition-all shadow-2xl shadow-white/10 active:scale-95 uppercase tracking-[0.2em] text-sm"
              >
                Fund Now
              </Link>
              <div className="flex items-center justify-center gap-10 text-blue-100 text-[10px] font-black uppercase tracking-[0.3em] opacity-60">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Secure
                </div>
                <div className="flex items-center gap-2">
                  <ZapIcon className="w-4 h-4" /> Instant
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Spectacular Recent Activity */}
      <motion.div 
        variants={itemVariants}
        className="bg-white rounded-[2.5rem] lg:rounded-[3.5rem] p-8 lg:p-12 border border-slate-200 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
          <div>
            <h3 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Recent Activity</h3>
            <p className="text-slate-400 text-sm lg:text-base font-medium mt-1">Your latest transactions and history</p>
          </div>
          <Link to="/dashboard/transactions" className="bg-slate-50 text-slate-900 px-6 lg:px-8 py-3 lg:py-4 rounded-2xl text-xs lg:text-sm font-black hover:bg-slate-100 transition-all flex items-center gap-3 uppercase tracking-widest w-fit">
            See All <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {transactions.slice(0, 6).map((tx, i) => (
            <motion.div 
              key={tx.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (i * 0.05) }}
              className="flex items-center justify-between p-6 lg:p-8 rounded-[2rem] lg:rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all group"
            >
              <div className="flex items-center gap-4 lg:gap-6">
                <div className={cn(
                  "w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-6",
                  tx.type === 'funding' ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                )}>
                  {tx.type === 'funding' ? <ArrowUpRight className="w-6 h-6 lg:w-8 lg:h-8" /> : <ArrowDownRight className="w-6 h-6 lg:w-8 lg:h-8" />}
                </div>
                <div>
                  <p className="text-sm lg:text-base font-black text-slate-900 truncate max-w-[120px] lg:max-w-[140px] mb-1">{tx.details}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{formatDate(tx.created_at)}</p>
                </div>
              </div>
              <p className={cn(
                "text-base lg:text-lg font-black",
                tx.type === 'funding' ? "text-green-600" : "text-slate-900"
              )}>
                {tx.type === 'funding' ? "+" : "-"}{formatCurrency(tx.amount)}
              </p>
            </motion.div>
          ))}
          {transactions.length === 0 && (
            <div className="col-span-full text-center py-24">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <History className="w-12 h-12 text-slate-300" />
              </div>
              <p className="text-slate-400 text-sm font-black uppercase tracking-[0.3em]">No recent activity found</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

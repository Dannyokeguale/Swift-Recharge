import React, { useState, useEffect } from "react";
import { api } from "@/src/lib/api";
import { toast } from "sonner";
import { formatCurrency, cn } from "@/src/lib/utils";
import { Loader2, Zap, Smartphone, Tv, Lightbulb, ArrowRight, CheckCircle2, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function BuyService({ category }: { category: string }) {
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, profileData] = await Promise.all([
          api.services.getAll(),
          api.user.getProfile()
        ]);
        setServices(servicesData.filter((s: any) => s.category === category));
        setProfile(profileData);
      } catch (error) {
        toast.error("Failed to fetch data");
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, [category]);

  const handleBuy = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = parseFloat(amount) || selectedService?.price;

    if (!selectedService && category !== 'airtime' && category !== 'electricity') {
      toast.error("Please select a plan");
      return;
    }
    if (!phoneNumber) {
      toast.error("Please enter a phone number or account number");
      return;
    }
    if (!finalAmount || finalAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (profile?.wallet?.balance < finalAmount) {
      toast.error("Insufficient balance. Please fund your wallet.");
      return;
    }

    setIsLoading(true);
    try {
      await api.services.buy({
        serviceId: selectedService?.id,
        phoneNumber,
        amount: finalAmount,
        details: `${selectedService?.provider || category} ${category}`
      });
      toast.success("Transaction successful!");
      setPhoneNumber("");
      setAmount("");
      setSelectedService(null);
      // Refresh profile to update balance
      const newProfile = await api.user.getProfile();
      setProfile(newProfile);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = () => {
    switch (category) {
      case 'airtime': return Smartphone;
      case 'data': return Zap;
      case 'cable': return Tv;
      case 'electricity': return Lightbulb;
      default: return Zap;
    }
  };

  const Icon = getIcon();

  if (isFetching) return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      <p className="text-slate-500 font-bold animate-pulse">Loading services...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 capitalize">Buy {category}</h2>
                <p className="text-slate-500 text-sm">Instant delivery to any network.</p>
              </div>
            </div>
            <div className="bg-slate-900 px-4 py-2 rounded-xl text-white">
              <p className="text-[10px] text-slate-400 font-bold uppercase">Balance</p>
              <p className="font-black text-sm">{formatCurrency(profile?.wallet?.balance || 0)}</p>
            </div>
          </div>

          <form onSubmit={handleBuy} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                {category === 'electricity' ? 'Meter Number' : category === 'cable' ? 'Smart Card Number' : 'Phone Number'}
              </label>
              <input
                type="text"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold"
                placeholder={category === 'electricity' ? "Enter Meter Number" : "08012345678"}
              />
            </div>

            {(category === 'airtime' || category === 'electricity') && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Amount (₦)</label>
                <input
                  type="number"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold"
                  placeholder="0.00"
                />
              </div>
            )}

            {services.length > 0 && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-4">Select Plan</label>
                <div className="grid grid-cols-1 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className={cn(
                        "p-4 rounded-2xl border text-left transition-all flex items-center justify-between group",
                        selectedService?.id === service.id
                          ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20"
                          : "bg-white border-slate-200 text-slate-900 hover:border-blue-200 hover:bg-blue-50/30"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black",
                          selectedService?.id === service.id ? "bg-white/20" : "bg-slate-100"
                        )}>
                          {service.provider.substring(0, 3)}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{service.name}</p>
                          <p className={cn("text-xs", selectedService?.id === service.id ? "text-blue-100" : "text-slate-500")}>
                            {service.provider} • {service.plan_name}
                          </p>
                        </div>
                      </div>
                      <p className="font-bold">{formatCurrency(service.price)}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Purchase Now"}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>
        </motion.div>
      </div>

      <div className="space-y-8">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm"
        >
          <h3 className="text-lg font-extrabold text-slate-900 mb-6">Transaction Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Service</span>
              <span className="font-bold text-slate-900 capitalize">{category}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Recipient</span>
              <span className="font-bold text-slate-900">{phoneNumber || "—"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Plan</span>
              <span className="font-bold text-slate-900">{selectedService?.name || (category === 'airtime' ? 'Airtime VTU' : category === 'electricity' ? 'Electricity Token' : "—")}</span>
            </div>
            <hr className="border-slate-100" />
            <div className="flex justify-between text-lg">
              <span className="font-bold text-slate-900">Total</span>
              <span className="font-extrabold text-blue-600">
                {formatCurrency(parseFloat(amount) || selectedService?.price || 0)}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl" />
          <div className="relative z-10">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-400" />
              Why buy from us?
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>• Instant delivery within seconds</li>
              <li>• 24/7 automated processing</li>
              <li>• Secure encrypted transactions</li>
              <li>• Best rates in the market</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

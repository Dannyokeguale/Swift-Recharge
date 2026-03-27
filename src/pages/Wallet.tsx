import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { api } from "@/src/lib/api";
import { toast } from "sonner";
import { 
  Wallet as WalletIcon, 
  CreditCard, 
  ArrowRight, 
  Loader2, 
  ShieldCheck, 
  Banknote, 
  Smartphone,
  ChevronRight,
  CheckCircle2,
  Copy,
  Building2
} from "lucide-react";
import { cn, formatCurrency } from "@/src/lib/utils";

const NIGERIAN_BANKS = [
  { name: "OPay", code: "999992" },
  { name: "Moniepoint", code: "50515" },
  { name: "Kuda Bank", code: "50211" },
  { name: "Palmpay", code: "999991" },
  { name: "GTBank", code: "058" },
  { name: "Zenith Bank", code: "057" },
  { name: "Access Bank", code: "044" },
  { name: "First Bank", code: "011" },
  { name: "UBA", code: "033" },
];

export function Wallet() {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Amount, 2: Method, 3: Details
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank" | "ussd" | null>(null);
  const [selectedBank, setSelectedBank] = useState<typeof NIGERIAN_BANKS[0] | null>(null);

  const handleFund = async () => {
    setIsLoading(true);
    try {
      await api.wallet.fund({ 
        amount: parseFloat(amount), 
        reference: `PAY-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        method: paymentMethod,
        bank: selectedBank?.name
      });
      toast.success(`Successfully funded wallet with ₦${amount}`);
      setAmount("");
      setStep(1);
      setPaymentMethod(null);
      setSelectedBank(null);
      // Refresh profile to update balance
      window.location.reload();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm min-h-[600px] flex flex-col"
      >
        <div className="flex items-center gap-4 mb-8">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center"
          >
            <WalletIcon className="w-6 h-6" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Fund Your Wallet</h2>
            <p className="text-slate-500 text-sm">Step {step} of 3</p>
          </div>
        </div>

        <div className="flex-grow">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Enter Amount (₦)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">₦</span>
                    <input
                      type="number"
                      required
                      min="100"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-lg"
                      placeholder="0.00"
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Minimum amount: ₦100.00</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[500, 1000, 5000].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setAmount(val.toString())}
                      className="py-3 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all"
                    >
                      +₦{val}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    if (!amount || parseFloat(amount) < 100) {
                      toast.error("Minimum funding amount is ₦100");
                      return;
                    }
                    setStep(2);
                  }}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                  Continue <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-4">Select Payment Method</h3>
                {[
                  { id: "card", name: "Card Payment", desc: "Visa, Mastercard, Verve", icon: CreditCard, color: "text-blue-600 bg-blue-50" },
                  { id: "bank", name: "Bank Transfer", desc: "Nigerian Banks, OPay, Kuda", icon: Building2, color: "text-green-600 bg-green-50" },
                  { id: "ussd", name: "USSD Code", desc: "Fast offline payment", icon: Smartphone, color: "text-purple-600 bg-purple-50" },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => {
                      setPaymentMethod(method.id as any);
                      setStep(3);
                    }}
                    className="w-full p-4 border border-slate-100 rounded-2xl flex items-center justify-between hover:bg-slate-50 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", method.color)}>
                        <method.icon className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-slate-900">{method.name}</p>
                        <p className="text-xs text-slate-500">{method.desc}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                  </button>
                ))}
                <button 
                  onClick={() => setStep(1)}
                  className="w-full text-slate-400 text-sm font-bold py-4 hover:text-slate-600"
                >
                  Go Back
                </button>
              </motion.div>
            )}

            {step === 3 && paymentMethod === "bank" && (
              <motion.div
                key="step3-bank"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-4">Choose Bank</label>
                  <div className="grid grid-cols-3 gap-3">
                    {NIGERIAN_BANKS.map((bank) => (
                      <button
                        key={bank.name}
                        onClick={() => setSelectedBank(bank)}
                        className={cn(
                          "p-3 rounded-xl border text-xs font-bold transition-all",
                          selectedBank?.name === bank.name
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "bg-slate-50 border-slate-100 text-slate-600 hover:bg-blue-50"
                        )}
                      >
                        {bank.name}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedBank && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Account Number</span>
                      <button onClick={() => copyToClipboard("8123456789")} className="text-blue-600 flex items-center gap-1 text-xs font-bold">
                        <Copy className="w-3 h-3" /> Copy
                      </button>
                    </div>
                    <p className="text-2xl font-black text-slate-900 tracking-wider">8123456789</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Bank Name</span>
                      <span className="text-sm font-bold text-slate-900">{selectedBank.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Account Name</span>
                      <span className="text-sm font-bold text-slate-900">SWIFT RECHARGE - {selectedBank.name}</span>
                    </div>
                  </motion.div>
                )}

                <button
                  disabled={!selectedBank || isLoading}
                  onClick={handleFund}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "I have made the transfer"}
                </button>
                <button 
                  onClick={() => setStep(2)}
                  className="w-full text-slate-400 text-sm font-bold hover:text-slate-600"
                >
                  Change Method
                </button>
              </motion.div>
            )}

            {step === 3 && paymentMethod === "card" && (
              <motion.div
                key="step3-card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold"
                      placeholder="0000 0000 0000 0000"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">CVV</label>
                      <input
                        type="password"
                        className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold"
                        placeholder="***"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 opacity-50 grayscale">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                  <img src="https://www.verve.com.ng/assets/images/verve-logo.png" alt="Verve" className="h-6" />
                </div>

                <button
                  disabled={isLoading}
                  onClick={handleFund}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : `Pay ${formatCurrency(parseFloat(amount) || 0)}`}
                </button>
                <button 
                  onClick={() => setStep(2)}
                  className="w-full text-slate-400 text-sm font-bold hover:text-slate-600"
                >
                  Change Method
                </button>
              </motion.div>
            )}

            {step === 3 && paymentMethod === "ussd" && (
              <motion.div
                key="step3-ussd"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-slate-700 mb-4">Dial USSD Code</label>
                  {[
                    { bank: "GTBank", code: "*737*1*Amount*8123456789#" },
                    { bank: "Zenith", code: "*966*Amount*8123456789#" },
                    { bank: "Access", code: "*901*Amount*8123456789#" },
                  ].map((item) => (
                    <div key={item.bank} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                      <div>
                        <p className="text-xs text-slate-500 font-bold">{item.bank}</p>
                        <p className="font-black text-slate-900">{item.code.replace("Amount", amount)}</p>
                      </div>
                      <button onClick={() => copyToClipboard(item.code.replace("Amount", amount))} className="text-blue-600">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  disabled={isLoading}
                  onClick={handleFund}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Payment"}
                </button>
                <button 
                  onClick={() => setStep(2)}
                  className="w-full text-slate-400 text-sm font-bold hover:text-slate-600"
                >
                  Change Method
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-blue-50 p-4 rounded-2xl flex items-start gap-3 mt-8"
        >
          <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5" />
          <p className="text-xs text-blue-800 leading-relaxed">
            Your payment is secured with bank-grade encryption. We support Paystack, Flutterwave, and Monnify for instant processing.
          </p>
        </motion.div>
      </motion.div>

      <div className="space-y-8">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden relative group"
        >
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800" 
              alt="Payment Methods" 
              className="w-full h-full object-cover opacity-5 group-hover:scale-110 transition-transform duration-700"
            />
          </div>
          <div className="relative z-10">
            <h3 className="text-lg font-extrabold text-slate-900 mb-6">Payment Methods</h3>
            <div className="space-y-4">
              {[
                { name: "Card Payment", desc: "Instant activation", icon: CreditCard, color: "bg-blue-50 text-blue-600" },
                { name: "Bank Transfer", desc: "Manual verification", icon: Banknote, color: "bg-green-50 text-green-600" },
                { name: "USSD Code", desc: "Fast & Reliable", icon: Smartphone, color: "bg-purple-50 text-purple-600" },
              ].map((method, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="p-4 border border-slate-100 rounded-2xl flex items-center gap-4 bg-white/50 backdrop-blur-sm"
                >
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", method.color)}>
                    <method.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{method.name}</p>
                    <p className="text-xs text-slate-500">{method.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl" />
          <div className="relative z-10">
            <h4 className="text-xl font-black mb-4">Need Help?</h4>
            <p className="text-slate-400 text-sm mb-6">Our support team is available 24/7 to assist you with any payment issues.</p>
            <button className="text-blue-400 font-bold text-sm hover:underline">Contact Support</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

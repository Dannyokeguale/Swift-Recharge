import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { cn } from "@/src/lib/utils";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "What is SwiftRecharge?", a: "SwiftRecharge is a VTU platform that allows you to buy cheap data, airtime, and pay bills instantly in Nigeria." },
    { q: "How do I fund my wallet?", a: "You can fund your wallet using your ATM card via Paystack or Flutterwave, or by making a direct bank transfer to your unique virtual account." },
    { q: "Is my money safe?", a: "Yes, we use bank-grade security and encryption to ensure that your funds and personal data are always protected." },
    { q: "How long does it take to receive data?", a: "All our transactions are automated and delivered instantly within seconds of successful payment." },
    { q: "Can I become a reseller?", a: "Yes! You can upgrade your account to a Reseller or Agent status to enjoy even lower rates and start your own VTU business." },
    { q: "What if my transaction fails?", a: "If a transaction fails, your wallet is automatically refunded. If you encounter any issues, our 24/7 support team is here to help." },
  ];

  return (
    <div className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <HelpCircle className="w-4 h-4" />
            Support Center
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-[#0B1C3D] mb-6">Frequently Asked <span className="text-[#0076FF]">Questions</span></h1>
          <p className="text-slate-600">Everything you need to know about SwiftRecharge and how it works.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={cn(
                "bg-white rounded-[2rem] border transition-all overflow-hidden",
                openIndex === i ? "border-blue-200 shadow-xl shadow-blue-500/5" : "border-slate-100 shadow-sm"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-8 py-6 flex items-center justify-between text-left"
              >
                <span className={cn("text-lg font-bold transition-colors", openIndex === i ? "text-blue-600" : "text-slate-900")}>
                  {faq.q}
                </span>
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-all", openIndex === i ? "bg-blue-600 text-white rotate-180" : "bg-slate-50 text-slate-400")}>
                  {openIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              {openIndex === i && (
                <div className="px-8 pb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                  <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-20 p-10 bg-slate-900 rounded-[3rem] text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="text-slate-400 mb-8">Can't find the answer you're looking for? Please chat with our friendly team.</p>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}

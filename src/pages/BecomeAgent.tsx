import { Users, TrendingUp, Award, Zap } from "lucide-react";

export function BecomeAgent() {
  return (
    <div className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Award className="w-4 h-4" />
              Partnership Program
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-[#0B1C3D] mb-8">Start Your Own <span className="text-[#0076FF]">VTU Business</span></h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Become a SwiftRecharge Agent and start earning massive commissions on every transaction. We provide the platform, you provide the service.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {[
                { title: "Lowest Rates", desc: "Get the best discounts in the market." },
                { title: "Instant Payouts", desc: "Withdraw your earnings anytime." },
                { title: "Marketing Tools", desc: "We help you grow your brand." },
                { title: "Dedicated Support", desc: "24/7 help for our partners." },
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="w-3 h-3 fill-current" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">
              Apply to Become Agent
            </button>
          </div>
          <div className="relative">
            <img
              src="https://picsum.photos/seed/business/800/600"
              alt="Become an Agent"
              className="rounded-[3rem] shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -top-10 -right-10 bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-100 hidden lg:block">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Monthly Earnings</p>
                  <p className="text-2xl font-extrabold text-slate-900">₦150,000+</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
                  ))}
                </div>
                <p className="text-xs font-bold text-slate-500">+500 Agents Joined</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-[3rem] p-12 lg:p-20 border border-slate-100">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-12 text-center">How it Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Create Account", desc: "Sign up for free and verify your email address." },
              { step: "02", title: "Upgrade Status", desc: "Choose the Reseller or Agent plan and pay the one-time fee." },
              { step: "03", title: "Start Earning", desc: "Fund your wallet and start selling to your customers instantly." },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-6xl font-extrabold text-blue-600/10 mb-6">{item.step}</div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

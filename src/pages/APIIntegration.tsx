import { Code, Terminal, Globe, Shield } from "lucide-react";

export function APIIntegration() {
  return (
    <div className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-4xl lg:text-6xl font-black text-[#0B1C3D] mb-6">Developer <span className="text-[#0076FF]">API</span></h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Integrate Nigeria's most reliable VTU API into your own platform and start scaling your business today.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-lg shadow-slate-200/50">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Why use our API?</h3>
              <div className="space-y-6">
                {[
                  { title: "99.9% Uptime", desc: "Our infrastructure is built for high availability and scale.", icon: Globe },
                  { title: "Instant Response", desc: "Get real-time feedback for every transaction request.", icon: Terminal },
                  { title: "Secure Auth", desc: "Use API keys and IP allowlisting for maximum security.", icon: Shield },
                  { title: "Easy Integration", desc: "Comprehensive documentation and SDKs for all languages.", icon: Code },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[3rem] p-8 border border-slate-800 shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
              <div className="w-3 h-3 bg-red-400 rounded-full" />
              <div className="w-3 h-3 bg-yellow-400 rounded-full" />
              <div className="w-3 h-3 bg-green-400 rounded-full" />
              <span className="text-xs text-slate-500 font-mono ml-4">POST /api/v1/purchase</span>
            </div>
            <pre className="text-blue-400 font-mono text-sm leading-relaxed overflow-x-auto">
{`{
  "api_key": "sk_live_...",
  "service": "mtn_data",
  "plan": "1gb_monthly",
  "phone": "08012345678",
  "ref": "my_unique_ref_001"
}`}
            </pre>
            <div className="mt-12 pt-8 border-t border-slate-800">
              <p className="text-slate-500 text-xs font-mono mb-4">// Response</p>
              <pre className="text-green-400 font-mono text-sm leading-relaxed">
{`{
  "status": "success",
  "msg": "Transaction successful",
  "data": {
    "id": 123456,
    "amount": 300,
    "balance": 24500
  }
}`}
              </pre>
            </div>
          </div>
        </div>

        <div className="bg-blue-600 rounded-[3rem] p-12 lg:p-20 text-center text-white">
          <h2 className="text-3xl lg:text-5xl font-extrabold mb-8">Ready to integrate?</h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-12 leading-relaxed">
            Upgrade your account to Reseller or Agent status to get your API keys and start building.
          </p>
          <button className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all shadow-xl">
            Get API Keys
          </button>
        </div>
      </div>
    </div>
  );
}

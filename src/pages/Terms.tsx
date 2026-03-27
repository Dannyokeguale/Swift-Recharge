export function Terms() {
  return (
    <div className="py-24 px-6 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-12 lg:p-20 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50">
        <h1 className="text-4xl lg:text-6xl font-black text-[#0B1C3D] mb-12 leading-tight">Terms & <span className="text-[#0076FF]">Privacy Policy</span></h1>
        
        <div className="prose prose-slate max-w-none space-y-12">
          <section>
            <h2 className="text-2xl font-black text-[#0B1C3D] mb-6 flex items-center gap-4">
              <span className="w-10 h-10 rounded-xl bg-blue-50 text-[#0076FF] flex items-center justify-center text-lg">01</span>
              Introduction
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              Welcome to SwiftRecharge. By accessing or using our website and services, you agree to be bound by these Terms and Conditions. Please read them carefully before proceeding.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#0B1C3D] mb-6 flex items-center gap-4">
              <span className="w-10 h-10 rounded-xl bg-blue-50 text-[#0076FF] flex items-center justify-center text-lg">02</span>
              User Accounts
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              To use our services, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#0B1C3D] mb-6 flex items-center gap-4">
              <span className="w-10 h-10 rounded-xl bg-blue-50 text-[#0076FF] flex items-center justify-center text-lg">03</span>
              Wallet & Payments
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              Payments are processed through secure third-party gateways. Once a wallet is funded, the balance can be used for any service on our platform. Refunds are only issued for failed transactions where the service was not delivered.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#0B1C3D] mb-6 flex items-center gap-4">
              <span className="w-10 h-10 rounded-xl bg-blue-50 text-[#0076FF] flex items-center justify-center text-lg">04</span>
              Privacy Policy
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              We value your privacy. We collect personal information such as name, email, and phone number solely for the purpose of providing our services. We do not sell or share your data with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#0B1C3D] mb-6 flex items-center gap-4">
              <span className="w-10 h-10 rounded-xl bg-blue-50 text-[#0076FF] flex items-center justify-center text-lg">05</span>
              Limitation of Liability
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              SwiftRecharge shall not be liable for any indirect, incidental, or consequential damages arising out of the use or inability to use our services, including but not limited to network failures or incorrect data provided by the user.
            </p>
          </section>

          <section className="pt-12 border-t border-slate-100">
            <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">
              Last updated: March 26, 2026. SwiftRecharge reserves the right to update these terms at any time.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

import { Mail, Phone, MapPin, MessageCircle, Send, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export function Contact() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setIsLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-[#0B1C3D] mb-6">Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A3FFC] to-[#0076FF]">Touch</span></h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Have questions or need assistance? Our support team is here to help you 24/7.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
              <h3 className="text-xl font-bold text-slate-900 mb-8">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Us</p>
                    <p className="text-slate-900 font-bold">support@swiftrecharge.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Call Us</p>
                    <p className="text-slate-900 font-bold">+234 800 123 4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">WhatsApp</p>
                    <p className="text-slate-900 font-bold">+234 900 987 6543</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Office</p>
                    <p className="text-slate-900 font-bold">Lagos, Nigeria</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white">
              <h4 className="text-xl font-bold mb-4">Support Hours</h4>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">
                Our automated services are available 24/7. Human support is available:
              </p>
              <div className="space-y-2 text-sm font-medium">
                <div className="flex justify-between">
                  <span>Mon - Fri</span>
                  <span>8:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sat - Sun</span>
                  <span>10:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white p-10 lg:p-16 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <h3 className="text-2xl font-extrabold text-slate-900 mb-8">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="name@example.com"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-slate-700">Subject</label>
                <input
                  type="text"
                  required
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="How can we help?"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-slate-700">Message</label>
                <textarea
                  required
                  rows={6}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Message"}
                  {!isLoading && <Send className="w-5 h-5" />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

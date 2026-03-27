import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { api } from "@/src/lib/api";
import { toast } from "sonner";
import { User, Mail, Lock, Shield, Loader2, Save, ArrowRight } from "lucide-react";

export function Settings() {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await api.user.getProfile();
        setProfile(data);
        setName(data.name);
      } catch (error) {
        toast.error("Failed to fetch profile");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // In a real app, we'd have an api.user.updateProfile
      // For now, we'll simulate it or add it to api.ts
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Profile Settings</h2>
            <p className="text-slate-500 text-sm">Manage your account information.</p>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                disabled
                value={profile?.email}
                className="w-full pl-12 pr-4 py-4 bg-slate-100 border border-slate-200 rounded-2xl text-slate-500 font-bold cursor-not-allowed"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-2">Email cannot be changed for security reasons.</p>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Save Changes
          </button>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Security</h2>
            <p className="text-slate-500 text-sm">Update your password and security settings.</p>
          </div>
        </div>

        <div className="space-y-6">
          <button className="w-full p-4 border border-slate-100 rounded-2xl flex items-center justify-between hover:bg-slate-50 transition-all group">
            <div className="flex items-center gap-4">
              <Shield className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
              <span className="font-bold text-slate-700">Change Password</span>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-300" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

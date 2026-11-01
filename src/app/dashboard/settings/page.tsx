"use client";

import React, { useState, useEffect } from "react";
import { getCurrentUser, setCurrentUser, resetToDemoData } from "@/lib/storage";
import { useToast } from "@/context/ToastContext";
import { Owner } from "@/types";
import { User, Mail, Phone, MapPin, Save, RotateCcw, ShieldCheck } from "lucide-react";

export default function SettingsDashboardPage() {
  const { showToast } = useToast();
  const [currentUser, setCurrentUserState] = useState<Owner | null>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUserState(user);
    if (user) {
      setFullName(user.fullName);
      setEmail(user.email);
      setPhone(user.phone);
      setLocation(user.location);
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    if (currentUser) {
      const updated: Owner = {
        ...currentUser,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        location: location.trim(),
      };
      setCurrentUser(updated);
      setCurrentUserState(updated);
      setIsSaving(false);
      showToast("Account settings saved", "Your guardian profile information was updated.", "success");
    }
  };

  const handleResetConfirm = () => {
    resetToDemoData();
    setShowResetModal(false);
    showToast("Reset to Demo Dataset", "All original pets, favorites, and interests have been restored.", "info");
    const refreshed = getCurrentUser();
    setCurrentUserState(refreshed);
    if (refreshed) {
      setFullName(refreshed.fullName);
      setEmail(refreshed.email);
      setPhone(refreshed.phone);
      setLocation(refreshed.location);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white dark:bg-brand-darksurface border border-slate-200/90 dark:border-brand-darkborder rounded-3xl p-6 sm:p-8 shadow-soft">
        <h1 className="font-heading font-extrabold text-2xl text-brand-navy dark:text-white">
          Account Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-brand-darkmuted mt-0.5">
          Manage your guardian contact details and application demo preferences.
        </p>
      </div>

      {/* Main Settings Form */}
      <div className="bg-white dark:bg-brand-darksurface border border-slate-200/90 dark:border-brand-darkborder rounded-3xl p-6 sm:p-8 shadow-soft space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-brand-darkborder">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-brand-deep dark:text-brand-sky" />
            <h2 className="font-heading font-bold text-lg text-brand-navy dark:text-white">
              Guardian Profile Information
            </h2>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Guardian</span>
          </span>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated text-sm text-brand-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated text-sm text-brand-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated text-sm text-brand-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted mb-1.5">
                Primary Location
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated text-sm text-brand-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-brand-darkborder">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-deep hover:bg-brand-navy transition-all shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Portfolio Demo Utility Card */}
      <div className="bg-slate-50/80 dark:bg-brand-darksurface border border-slate-200/90 dark:border-brand-darkborder rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-base text-brand-navy dark:text-white">
              Reset Demo Dataset
            </h3>
            <p className="text-xs text-slate-500 dark:text-brand-darkmuted mt-0.5">
              Restore the initial 24 cats and dogs, demo interests, and sample favorites.
            </p>
          </div>

          <button
            onClick={() => setShowResetModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Data</span>
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-brand-darksurface border border-slate-200 dark:border-brand-darkborder rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="font-heading font-bold text-lg text-brand-navy dark:text-white">
              Reset to Demo Data?
            </h3>
            <p className="text-xs text-slate-500 dark:text-brand-darkmuted leading-relaxed">
              This will re-initialize LocalStorage with the default 24 pet profiles, sample wishlist
              items, and demo account settings.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetConfirm}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CagodLogo } from "@/components/illustrations/CagodLogo";
import { registerNewOwner } from "@/lib/storage";
import { useToast } from "@/context/ToastContext";
import { User, Mail, Lock, Phone, MapPin, UserPlus } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newOwner = registerNewOwner({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || "+1 (555) 000-0000",
        location: location.trim() || "Seattle, WA",
        avatar: "cat-persian-white",
      });

      setIsSubmitting(false);
      showToast(
        `Welcome to Cagod, ${newOwner.fullName}!`,
        "Your pet guardian profile has been registered.",
        "success"
      );
      router.push("/dashboard");
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-brand-darknavy text-slate-800 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-lg w-full bg-white dark:bg-brand-darksurface border border-slate-200 dark:border-brand-darkborder rounded-3xl p-8 sm:p-10 shadow-soft space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-3">
              <CagodLogo size="lg" showTagline={false} />
            </div>
            <h1 className="font-heading font-extrabold text-2xl text-brand-navy dark:text-white">
              Create Guardian Account
            </h1>
            <p className="text-xs text-slate-500 dark:text-brand-darkmuted">
              Join Cagod Matrimony to discover companions and manage your pets.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Alexander Wright"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated text-sm text-brand-navy dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated text-sm text-brand-navy dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted mb-1.5">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  placeholder="Create a secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated text-sm text-brand-navy dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>
            </div>

            {/* Phone & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated text-sm text-brand-navy dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-sky"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted mb-1.5">
                  City, State *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Seattle, WA"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated text-sm text-brand-navy dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-sky"
                  />
                </div>
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                required
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 text-brand-deep rounded-sm border-slate-300 focus:ring-brand-sky mt-0.5"
              />
              <span className="text-xs text-slate-600 dark:text-brand-darkmuted leading-tight">
                I pledge to uphold responsible pet companionship, verify veterinary care, and respect
                fellow pet guardians.
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !fullName || !email || !location}
              className="w-full py-3 rounded-2xl text-xs font-bold text-white bg-brand-deep hover:bg-brand-navy dark:hover:bg-brand-deep/80 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <UserPlus className="w-4 h-4" />
              <span>{isSubmitting ? "Creating Account..." : "Register as Pet Guardian"}</span>
            </button>
          </form>

          <div className="text-center pt-4 border-t border-slate-100 dark:border-brand-darkborder">
            <p className="text-xs text-slate-500 dark:text-brand-darkmuted">
              Already registered on Cagod?{" "}
              <Link
                href="/login"
                className="font-bold text-brand-deep dark:text-brand-sky hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


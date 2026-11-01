"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CagodLogo } from "@/components/illustrations/CagodLogo";
import { setCurrentUser, getStoredUsers } from "@/lib/storage";
import { DEMO_USER } from "@/data/dummyPets";
import { useToast } from "@/context/ToastContext";
import { Mail, Lock, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const users = getStoredUsers();
      const existingUser = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());

      const userToLogin = existingUser || {
        ...DEMO_USER,
        email: email.trim(),
        fullName: email.split("@")[0].replace(".", " ") || "Alexander Wright",
      };

      setCurrentUser(userToLogin);
      setIsLoading(false);
      showToast(
        `Welcome back, ${userToLogin.fullName}!`,
        "You have successfully signed in to Cagod Matrimony.",
        "success"
      );
      router.push("/dashboard");
    }, 400);
  };

  const handleDemoAutofill = () => {
    setEmail(DEMO_USER.email);
    setPassword("cagodCompanion2026!");
    showToast("Demo guardian credentials populated", undefined, "info");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-brand-darknavy text-slate-800 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-md w-full bg-white dark:bg-brand-darksurface border border-slate-200 dark:border-brand-darkborder rounded-3xl p-8 sm:p-10 shadow-soft space-y-6">
          {/* Logo & Headline */}
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-3">
              <CagodLogo size="lg" showTagline={false} />
            </div>
            <h1 className="font-heading font-extrabold text-2xl text-brand-navy dark:text-white">
              Pet Guardian Sign In
            </h1>
            <p className="text-xs text-slate-500 dark:text-brand-darkmuted">
              Enter your credentials to access your pet dashboard and companion interests.
            </p>
          </div>

          {/* Quick Demo Login Autofill */}
          <div className="p-3.5 rounded-2xl bg-brand-ice/70 dark:bg-brand-darkelevated/70 border border-brand-sky/30 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-brand-navy dark:text-brand-sky">
                Portfolio Demo Account
              </p>
              <p className="text-[11px] text-slate-500 dark:text-brand-darkmuted">
                Pre-configured with pets & interests
              </p>
            </div>
            <button
              type="button"
              onClick={handleDemoAutofill}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-brand-deep hover:bg-brand-navy transition-all shadow-2xs"
            >
              Fill Demo
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="alexander.wright@cagod.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated text-sm text-brand-navy dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs font-semibold text-brand-deep dark:text-brand-sky hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated text-sm text-brand-navy dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-brand-deep rounded-sm border-slate-300 focus:ring-brand-sky"
                />
                <span className="text-xs font-medium text-slate-600 dark:text-brand-darkmuted">
                  Remember this device for 30 days
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full py-3 rounded-2xl text-xs font-bold text-white bg-brand-deep hover:bg-brand-navy dark:hover:bg-brand-deep/80 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <LogIn className="w-4 h-4" />
              <span>{isLoading ? "Signing In..." : "Sign In to Cagod"}</span>
            </button>
          </form>

          {/* Registration Redirect */}
          <div className="text-center pt-4 border-t border-slate-100 dark:border-brand-darkborder">
            <p className="text-xs text-slate-500 dark:text-brand-darkmuted">
              Do not have a pet guardian account yet?{" "}
              <Link
                href="/register"
                className="font-bold text-brand-deep dark:text-brand-sky hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Forgot Password Simulated Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-brand-darksurface border border-slate-200 dark:border-brand-darkborder rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-4">
            <h3 className="font-heading font-bold text-lg text-brand-navy dark:text-white">
              Reset Password
            </h3>
            <p className="text-xs text-slate-500 dark:text-brand-darkmuted">
              In this frontend portfolio mode, passwords can be reset or simulated directly. You can log in using any password.
            </p>
            <button
              onClick={() => setShowForgotModal(false)}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-brand-deep hover:bg-brand-navy"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}


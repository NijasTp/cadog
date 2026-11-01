"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { subscribeNewsletter } from "@/lib/storage";
import { useToast } from "@/context/ToastContext";
import { DecorativeFlora } from "@/components/illustrations/DecorativeFlora";

export const NewsletterCTASection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    subscribeNewsletter(email);
    setIsSubscribed(true);
    showToast(
      "Subscribed successfully!",
      "You will receive curated companion stories and community updates.",
      "success"
    );
    setEmail("");
  };

  return (
    <section className="py-20 bg-white dark:bg-brand-darknavy transition-colors relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-brand-ice via-brand-cyan/20 to-white dark:from-brand-darksurface dark:via-brand-darkelevated dark:to-brand-darksurface border border-brand-sky/40 dark:border-brand-darkborder rounded-3xl p-8 sm:p-14 lg:p-16 text-center shadow-card overflow-hidden">
          {/* Subtle floral accents */}
          <div className="absolute -left-6 top-6 opacity-30 pointer-events-none">
            <DecorativeFlora variant="branch" className="w-24 h-24" />
          </div>
          <div className="absolute -right-6 bottom-6 opacity-30 pointer-events-none">
            <DecorativeFlora variant="sparkles" className="w-24 h-24" />
          </div>

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-brand-navy dark:text-white tracking-tight leading-tight">
              Your pet&apos;s next favorite companion might be one click away.
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-brand-darkmuted leading-relaxed">
              Join thousands of devoted pet guardians. Subscribe for weekly companion spotlights,
              responsible pet health guides, and upcoming community meetups.
            </p>

            {isSubscribed ? (
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Thank you for subscribing! Your guardian welcome guide is on its way.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-brand-darkelevated border border-slate-200 dark:border-brand-darkborder shadow-sm">
                  <div className="relative flex-1 w-full flex items-center pl-3">
                    <Mail className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full py-2.5 text-sm bg-transparent text-brand-navy dark:text-white placeholder:text-slate-400 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-deep hover:bg-brand-navy transition-all shadow-xs"
                  >
                    <span>Stay Connected</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-brand-darkmuted mt-3">
                  We respect your privacy. No spam, ever. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};


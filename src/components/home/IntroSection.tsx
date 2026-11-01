import React from "react";
import Link from "next/link";
import { Sparkles, HeartHandshake, CheckCircle2, ArrowRight } from "lucide-react";
import { DecorativeFlora } from "@/components/illustrations/DecorativeFlora";

export const IntroSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-slate-50/60 dark:bg-brand-darksurface/40 transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white dark:bg-brand-darksurface border border-slate-200/90 dark:border-brand-darkborder rounded-3xl p-8 sm:p-12 lg:p-16 shadow-soft overflow-hidden">
          {/* Subtle Corner Botanical Accents */}
          <div className="absolute top-0 right-0 p-6 opacity-30 dark:opacity-15 pointer-events-none">
            <DecorativeFlora variant="branch" className="w-24 h-24" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-ice dark:bg-brand-darkelevated text-xs font-semibold text-brand-deep dark:text-brand-cyan">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Philosophy</span>
              </div>

              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-navy dark:text-white tracking-tight leading-snug">
                Good connections begin with a little curiosity.
              </h2>

              <p className="text-base text-slate-600 dark:text-brand-darkmuted leading-relaxed">
                Pets bring boundless happiness into our homes, yet many cats and dogs spend days
                yearning for compatible playmates or companion partners. Cagod Matrimony was
                crafted for thoughtful, caring pet guardians who prioritize temperament harmony,
                health safety, and lifelong happiness for their furry family members.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-deep dark:text-brand-cyan flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    Verified health and vaccination disclosures
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-deep dark:text-brand-cyan flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    Temperament and personality matching
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-deep dark:text-brand-cyan flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    Ethical companion standards only
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-deep dark:text-brand-cyan flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    Direct, safe communication between owners
                  </span>
                </div>
              </div>
            </div>

            {/* Right Card / Callout */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-brand-ice/70 to-white dark:from-brand-darkelevated dark:to-brand-darksurface border border-brand-sky/30 dark:border-brand-darkborder rounded-2xl p-6 sm:p-8 space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-brand-darksurface shadow-xs flex items-center justify-center text-brand-deep dark:text-brand-cyan">
                  <HeartHandshake className="w-6 h-6" />
                </div>

                <h3 className="font-heading font-bold text-xl text-brand-navy dark:text-white">
                  Join a Community of Caring Guardians
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-brand-darkmuted leading-relaxed">
                  Every pet registered on Cagod has a dedicated profile celebrating their unique
                  habits, favorite toys, personality quirks, and medical milestones.
                </p>

                <div className="pt-2">
                  <Link
                    href="/explore"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-brand-deep hover:bg-brand-navy transition-all shadow-sm"
                  >
                    <span>Browse Compatible Pets</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


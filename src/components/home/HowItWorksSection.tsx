import React from "react";
import Link from "next/link";
import {
  StepProfileIllustration,
  StepDiscoverIllustration,
  StepInterestIllustration,
  StepConnectIllustration,
} from "@/components/illustrations/HowItWorksIllustrations";
import { ArrowRight, Sparkles } from "lucide-react";

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      step: "01",
      title: "Create Your Pet's Profile",
      description:
        "Document your cat or dog's breed, temperament, habits, favorite playtime routines, and verified health disclosures.",
      illustration: <StepProfileIllustration className="w-28 h-28 sm:w-32 sm:h-32" />,
      accentBg: "from-blue-50/50 to-cyan-50/40 dark:from-blue-950/20 dark:to-cyan-950/10",
    },
    {
      step: "02",
      title: "Discover Compatible Companions",
      description:
        "Filter by species, age, disposition, location, and activity level to uncover companions that match your pet's lifestyle.",
      illustration: <StepDiscoverIllustration className="w-28 h-28 sm:w-32 sm:h-32" />,
      accentBg: "from-cyan-50/50 to-sky-50/40 dark:from-cyan-950/20 dark:to-sky-950/10",
    },
    {
      step: "03",
      title: "Express Interest",
      description:
        "Send an introductory proposal with a personalized note to the pet owner. Save favorites and track sent inquiries conveniently.",
      illustration: <StepInterestIllustration className="w-28 h-28 sm:w-32 sm:h-32" />,
      accentBg: "from-sky-50/50 to-indigo-50/40 dark:from-sky-950/20 dark:to-indigo-950/10",
    },
    {
      step: "04",
      title: "Connect With Pet Owners",
      description:
        "Once interest is accepted, exchange messages, coordinate park rendezvous or quiet meetups, and watch new friendships blossom.",
      illustration: <StepConnectIllustration className="w-28 h-28 sm:w-32 sm:h-32" />,
      accentBg: "from-emerald-50/50 to-cyan-50/40 dark:from-emerald-950/20 dark:to-cyan-950/10",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 bg-slate-50/70 dark:bg-brand-darksurface/30 transition-colors relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-ice dark:bg-brand-darksurface text-xs font-semibold text-brand-deep dark:text-brand-sky">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simple, Caring Journey</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-navy dark:text-white tracking-tight">
            How Cagod Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-brand-darkmuted">
            We have designed every step to be respectful, transparent, and centered around animal
            welfare and genuine guardian connection.
          </p>
        </div>

        {/* 4 Steps Grid with Rich Visual Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="relative bg-white dark:bg-brand-darksurface border border-slate-200/90 dark:border-brand-darkborder rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-soft hover:shadow-card transition-all duration-300 card-hover-effect"
            >
              {/* Step Number Tag */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-heading font-black text-2xl text-brand-sky/60 dark:text-brand-cyan/40">
                  {item.step}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-brand-darkelevated text-slate-500 dark:text-brand-darkmuted">
                  Step {index + 1}
                </span>
              </div>

              {/* Illustration Centerpiece */}
              <div className="my-2 flex justify-center py-2">
                <div className="transform transition-transform hover:scale-105 duration-300">
                  {item.illustration}
                </div>
              </div>

              {/* Text Info */}
              <div className="space-y-2 text-center mt-3">
                <h3 className="font-heading font-bold text-lg text-brand-navy dark:text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-brand-darkmuted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 text-center">
          <Link
            href="/create-profile"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-brand-deep dark:text-brand-cyan bg-brand-ice dark:bg-brand-darksurface border border-brand-sky/40 hover:bg-brand-deep hover:text-white dark:hover:bg-brand-deep dark:hover:text-white transition-all shadow-xs"
          >
            <span>Start Step 1: Create a Profile for Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};


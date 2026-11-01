"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Sparkles, ShieldCheck, Heart } from "lucide-react";
import { HeroPetDuoIllustration } from "@/components/illustrations/HeroPetDuoIllustration";
import { DecorativeFlora } from "@/components/illustrations/DecorativeFlora";
import gsap from "gsap";

export const HeroSection: React.FC = () => {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);

  // Search filter state
  const [species, setSpecies] = useState<string>("all");
  const [gender, setGender] = useState<string>("all");
  const [ageRange, setAgeRange] = useState<string>("all");
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    // Tasteful GSAP entrance animation respecting reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(headlineRef.current, {
        opacity: 0,
        y: 25,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(searchBoxRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(illustrationRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.9,
        delay: 0.15,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (species !== "all") params.set("species", species);
    if (gender !== "all") params.set("gender", gender);
    if (ageRange !== "all") params.set("age", ageRange);
    if (location.trim()) params.set("location", location.trim());
    router.push(`/explore?${params.toString()}`);
  };

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden pt-6 pb-16 lg:pt-12 lg:pb-24 bg-gradient-to-b from-brand-ice/40 via-white to-white dark:from-brand-darknavy dark:via-brand-darknavy dark:to-brand-darksurface/40 transition-colors"
    >
      {/* Decorative Organic Elements */}
      <div className="absolute top-10 left-6 opacity-35 dark:opacity-20 pointer-events-none">
        <DecorativeFlora variant="sparkles" className="w-24 h-24" />
      </div>
      <div className="absolute top-24 right-10 opacity-30 dark:opacity-15 pointer-events-none">
        <DecorativeFlora variant="branch" className="w-28 h-28" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Functional Search */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-ice dark:bg-brand-darksurface border border-brand-cyan/40 dark:border-brand-darkborder text-xs font-semibold text-brand-deep dark:text-brand-sky">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dedicated Pet Matrimony & Companionship</span>
            </div>

            {/* Main Headline */}
            <h1
              ref={headlineRef}
              className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-brand-navy dark:text-white tracking-tight leading-[1.12]"
            >
              Find Your Pet&apos;s{" "}
              <span className="text-brand-deep dark:text-brand-sky relative inline-block">
                Perfect Companion
                <svg
                  className="absolute left-0 -bottom-2 w-full h-3 text-brand-cyan/60"
                  viewBox="0 0 250 12"
                  fill="none"
                >
                  <path
                    d="M3 9C60 3 190 3 247 9"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-brand-darkmuted max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Because every little paw deserves a little love. Discover compatible companions
              for your beloved cats and dogs, connect with responsible pet owners, and celebrate
              safe, joyful unions.
            </p>

            {/* Prominent Pet Discovery Search Component */}
            <div
              ref={searchBoxRef}
              className="bg-white dark:bg-brand-darksurface border border-slate-200 dark:border-brand-darkborder rounded-3xl p-4 sm:p-5 shadow-card max-w-2xl mx-auto lg:mx-0"
            >
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {/* Looking For: Cat / Dog */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted mb-1 text-left">
                      Looking For
                    </label>
                    <select
                      value={species}
                      onChange={(e) => setSpecies(e.target.value)}
                      className="w-full px-3 py-2 text-sm font-medium rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated text-brand-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
                    >
                      <option value="all">Any Pet</option>
                      <option value="cat">Cat</option>
                      <option value="dog">Dog</option>
                    </select>
                  </div>

                  {/* Gender: Male / Female */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted mb-1 text-left">
                      Gender
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-3 py-2 text-sm font-medium rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated text-brand-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
                    >
                      <option value="all">Any Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  {/* Age Range */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted mb-1 text-left">
                      Age Range
                    </label>
                    <select
                      value={ageRange}
                      onChange={(e) => setAgeRange(e.target.value)}
                      className="w-full px-3 py-2 text-sm font-medium rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated text-brand-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
                    >
                      <option value="all">Any Age</option>
                      <option value="junior">Junior (Under 2 yrs)</option>
                      <option value="prime">Prime (2 to 4 yrs)</option>
                      <option value="mature">Mature (4+ yrs)</option>
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted mb-1 text-left">
                      Location
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="City or State"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full pl-7 pr-3 py-2 text-sm font-medium rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated text-brand-navy dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-sky"
                      />
                      <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                    </div>
                  </div>
                </div>

                {/* Submit Search Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-brand-darkmuted">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-deep dark:text-brand-cyan" />
                      <span>Verified Guardians</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-rose-500" />
                      <span>Temperament Matches</span>
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white bg-brand-deep hover:bg-brand-navy dark:hover:bg-brand-deep/80 transition-all shadow-md hover:shadow-lg"
                  >
                    <Search className="w-4 h-4" />
                    <span>Discover Matches</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Custom 2D Illustrated Cat & Dog Duo */}
          <div ref={illustrationRef} className="lg:col-span-5 relative flex justify-center">
            {/* Visual Illustration */}
            <div className="relative w-full max-w-md xl:max-w-lg">
              <HeroPetDuoIllustration />

              {/* Floating Stat Badge Left */}
              <div className="absolute -left-3 bottom-12 bg-white/95 dark:bg-brand-darksurface/95 backdrop-blur-xs border border-slate-200 dark:border-brand-darkborder rounded-2xl p-3 shadow-card flex items-center gap-3 animate-float-gentle">
                <div className="w-9 h-9 rounded-xl bg-brand-ice dark:bg-brand-darkelevated flex items-center justify-center text-brand-deep dark:text-brand-cyan font-bold text-sm">
                  98%
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-navy dark:text-white">Compatibility</p>
                  <p className="text-[10px] text-slate-500 dark:text-brand-darkmuted">Verified matches</p>
                </div>
              </div>

              {/* Floating Stat Badge Right */}
              <div
                className="absolute -right-3 top-16 bg-white/95 dark:bg-brand-darksurface/95 backdrop-blur-xs border border-slate-200 dark:border-brand-darkborder rounded-2xl p-3 shadow-card flex items-center gap-3 animate-float-gentle"
                style={{ animationDelay: "1.5s" }}
              >
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold text-sm">
                  1,400+
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-navy dark:text-white">Happy Unions</p>
                  <p className="text-[10px] text-slate-500 dark:text-brand-darkmuted">Cats & dogs joined</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


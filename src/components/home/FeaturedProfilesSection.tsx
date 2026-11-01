"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { PetCard } from "@/components/pet/PetCard";
import { getStoredPets } from "@/lib/storage";
import { Pet } from "@/types";

export const FeaturedProfilesSection: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [filter, setFilter] = useState<"all" | "cat" | "dog">("all");

  useEffect(() => {
    const all = getStoredPets();
    setPets(all);

    const handleStorage = (e: Event) => {
      const ce = e as CustomEvent;
      if (ce.detail?.key === "cagod_pets_v1") {
        setPets(getStoredPets());
      }
    };

    window.addEventListener("cagod_storage_change", handleStorage);
    return () => window.removeEventListener("cagod_storage_change", handleStorage);
  }, []);

  const filteredPets = pets
    .filter((p) => {
      if (filter === "all") return true;
      return p.species === filter;
    })
    .slice(0, 6);

  return (
    <section className="py-20 bg-white dark:bg-brand-darknavy transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-ice dark:bg-brand-darksurface text-xs font-semibold text-brand-deep dark:text-brand-sky">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handpicked Companions</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-navy dark:text-white tracking-tight">
              Featured Pet Profiles
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-brand-darkmuted max-w-xl">
              Meet some of our most charming, verified cats and dogs currently searching for their
              special companion or playmate.
            </p>
          </div>

          {/* Filter Pill Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-brand-darksurface border border-slate-200 dark:border-brand-darkborder self-start md:self-auto">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === "all"
                  ? "bg-white dark:bg-brand-darkelevated text-brand-deep dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-brand-darkmuted hover:text-brand-navy dark:hover:text-white"
              }`}
            >
              All Profiles
            </button>
            <button
              onClick={() => setFilter("cat")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === "cat"
                  ? "bg-white dark:bg-brand-darkelevated text-brand-deep dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-brand-darkmuted hover:text-brand-navy dark:hover:text-white"
              }`}
            >
              Cats Only
            </button>
            <button
              onClick={() => setFilter("dog")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === "dog"
                  ? "bg-white dark:bg-brand-darkelevated text-brand-deep dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-brand-darkmuted hover:text-brand-navy dark:hover:text-white"
              }`}
            >
              Dogs Only
            </button>
          </div>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} viewMode="grid" />
          ))}
        </div>

        {/* See All Profiles Action */}
        <div className="mt-12 text-center">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-brand-deep hover:bg-brand-navy dark:hover:bg-brand-deep/80 transition-all shadow-md hover:shadow-lg"
          >
            <span>See All Pet Profiles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};


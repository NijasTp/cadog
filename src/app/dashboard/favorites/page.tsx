"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PetCard } from "@/components/pet/PetCard";
import { EmptyStateIllustration } from "@/components/illustrations/EmptyStateIllustration";
import { getStoredFavorites, getStoredPets } from "@/lib/storage";
import { Pet } from "@/types";
import { Compass } from "lucide-react";

export default function FavoritesDashboardPage() {
  const [favoritePets, setFavoritePets] = useState<Pet[]>([]);
  const [speciesFilter, setSpeciesFilter] = useState<"all" | "cat" | "dog">("all");

  const loadFavorites = () => {
    const favIds = getStoredFavorites();
    const allPets = getStoredPets();
    const favs = allPets.filter((p) => favIds.includes(p.id));
    setFavoritePets(favs);
  };

  useEffect(() => {
    loadFavorites();

    const handleStorage = () => loadFavorites();
    window.addEventListener("cagod_storage_change", handleStorage);
    return () => window.removeEventListener("cagod_storage_change", handleStorage);
  }, []);

  const handleFavoriteChange = () => {
    loadFavorites();
  };

  const filtered = favoritePets.filter((p) => {
    if (speciesFilter === "all") return true;
    return p.species === speciesFilter;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white dark:bg-brand-darksurface border border-slate-200/90 dark:border-brand-darkborder rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-soft">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-brand-navy dark:text-white">
            Saved Favorites
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-brand-darkmuted mt-0.5">
            Companions you have bookmarked for potential playdates and introductions.
          </p>
        </div>

        {/* Filter Tabs */}
        {favoritePets.length > 0 && (
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-brand-darkelevated border border-slate-200 dark:border-brand-darkborder">
            <button
              onClick={() => setSpeciesFilter("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                speciesFilter === "all"
                  ? "bg-white dark:bg-brand-darksurface text-brand-deep dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-brand-darkmuted"
              }`}
            >
              All ({favoritePets.length})
            </button>
            <button
              onClick={() => setSpeciesFilter("cat")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                speciesFilter === "cat"
                  ? "bg-white dark:bg-brand-darksurface text-brand-deep dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-brand-darkmuted"
              }`}
            >
              Cats
            </button>
            <button
              onClick={() => setSpeciesFilter("dog")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                speciesFilter === "dog"
                  ? "bg-white dark:bg-brand-darksurface text-brand-deep dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-brand-darkmuted"
              }`}
            >
              Dogs
            </button>
          </div>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              viewMode="grid"
              onFavoriteChange={handleFavoriteChange}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white dark:bg-brand-darksurface border border-slate-200 dark:border-brand-darkborder rounded-3xl space-y-4 shadow-soft">
          <div className="flex justify-center">
            <EmptyStateIllustration type="favorites" className="w-36 h-36" />
          </div>
          <h3 className="font-heading font-bold text-lg text-brand-navy dark:text-white">
            No Bookmarked Companions
          </h3>
          <p className="text-xs text-slate-500 dark:text-brand-darkmuted max-w-sm mx-auto">
            You haven&apos;t added any pets to your favorites yet. Explore companion profiles and
            click the heart icon to save matches.
          </p>
          <div className="pt-2">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-deep hover:bg-brand-navy shadow-xs"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Directory</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}


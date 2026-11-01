"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PetCard } from "@/components/pet/PetCard";
import { EmptyStateIllustration } from "@/components/illustrations/EmptyStateIllustration";
import { getStoredPets } from "@/lib/storage";
import { Pet } from "@/types";
import {
  Search,
  Filter,
  SlidersHorizontal,
  LayoutGrid,
  List,
  RotateCcw,
  MapPin,
  Sparkles,
} from "lucide-react";

function ExploreContent() {
  const searchParams = useSearchParams();

  const [allPets, setAllPets] = useState<Pet[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [speciesFilter, setSpeciesFilter] = useState<"all" | "cat" | "dog">("all");
  const [genderFilter, setGenderFilter] = useState<"all" | "Male" | "Female">("all");
  const [breedFilter, setBreedFilter] = useState<string>("all");
  const [ageFilter, setAgeFilter] = useState<string>("all");
  const [locationTerm, setLocationTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<"newest" | "ageAsc" | "ageDesc" | "nameAsc">("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState<number>(9);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Initialize from storage & URL parameters
  useEffect(() => {
    setAllPets(getStoredPets());

    const spSpecies = searchParams.get("species");
    if (spSpecies === "cat" || spSpecies === "dog") {
      setSpeciesFilter(spSpecies);
    }

    const spGender = searchParams.get("gender");
    if (spGender === "Male" || spGender === "Female") {
      setGenderFilter(spGender);
    }

    const spAge = searchParams.get("age");
    if (spAge) setAgeFilter(spAge);

    const spLoc = searchParams.get("location");
    if (spLoc) setLocationTerm(spLoc);

    const handleStorage = (e: Event) => {
      const ce = e as CustomEvent;
      if (ce.detail?.key === "cagod_pets_v1") {
        setAllPets(getStoredPets());
      }
    };

    window.addEventListener("cagod_storage_change", handleStorage);
    return () => window.removeEventListener("cagod_storage_change", handleStorage);
  }, [searchParams]);

  // Extract unique breeds based on currently selected species
  const availableBreeds = useMemo(() => {
    const list = allPets
      .filter((p) => (speciesFilter === "all" ? true : p.species === speciesFilter))
      .map((p) => p.breed);
    return Array.from(new Set(list)).sort();
  }, [allPets, speciesFilter]);

  // Filtered and sorted dataset
  const filteredPets = useMemo(() => {
    return allPets
      .filter((pet) => {
        // Species
        if (speciesFilter !== "all" && pet.species !== speciesFilter) return false;

        // Gender
        if (genderFilter !== "all" && pet.gender !== genderFilter) return false;

        // Breed
        if (breedFilter !== "all" && pet.breed !== breedFilter) return false;

        // Age Filter
        if (ageFilter === "junior" && pet.ageMonths >= 24) return false;
        if (ageFilter === "prime" && (pet.ageMonths < 24 || pet.ageMonths > 48)) return false;
        if (ageFilter === "mature" && pet.ageMonths <= 48) return false;

        // Location Term
        if (
          locationTerm.trim() &&
          !pet.location.toLowerCase().includes(locationTerm.toLowerCase()) &&
          !pet.city.toLowerCase().includes(locationTerm.toLowerCase()) &&
          !pet.state.toLowerCase().includes(locationTerm.toLowerCase())
        ) {
          return false;
        }

        // Search Term (matches Name, Breed, Bio, Location)
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchName = pet.name.toLowerCase().includes(q);
          const matchBreed = pet.breed.toLowerCase().includes(q);
          const matchBio = pet.bio.toLowerCase().includes(q);
          const matchLoc = pet.location.toLowerCase().includes(q);
          const matchTraits = pet.personality.some((t) => t.toLowerCase().includes(q));
          if (!matchName && !matchBreed && !matchBio && !matchLoc && !matchTraits) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "ageAsc") return a.ageMonths - b.ageMonths;
        if (sortBy === "ageDesc") return b.ageMonths - a.ageMonths;
        if (sortBy === "nameAsc") return a.name.localeCompare(b.name);
        // newest default
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [allPets, speciesFilter, genderFilter, breedFilter, ageFilter, locationTerm, searchTerm, sortBy]);

  const displayedPets = filteredPets.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPets.length;

  const resetFilters = () => {
    setSearchTerm("");
    setSpeciesFilter("all");
    setGenderFilter("all");
    setBreedFilter("all");
    setAgeFilter("all");
    setLocationTerm("");
    setSortBy("newest");
    setVisibleCount(9);
  };

  const hasActiveFilters =
    searchTerm !== "" ||
    speciesFilter !== "all" ||
    genderFilter !== "all" ||
    breedFilter !== "all" ||
    ageFilter !== "all" ||
    locationTerm !== "";

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-brand-darknavy text-slate-800 dark:text-slate-100 transition-colors">
      <Navbar />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-brand-ice/60 to-white dark:from-brand-darksurface dark:to-brand-darknavy pt-8 pb-10 border-b border-slate-200/80 dark:border-brand-darkborder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-ice dark:bg-brand-darkelevated text-xs font-semibold text-brand-deep dark:text-brand-sky">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Companion Directory</span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-navy dark:text-white tracking-tight">
              Explore Compatible Pets
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-brand-darkmuted leading-relaxed">
              Browse lovingly maintained profiles of verified cats and dogs seeking friendships,
              playdates, and lifelong companionship.
            </p>
          </div>
        </div>
      </section>

      {/* Main Exploration Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* ================= FILTERS SIDEBAR (Desktop) ================= */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-slate-50/80 dark:bg-brand-darksurface border border-slate-200/90 dark:border-brand-darkborder rounded-3xl p-6 space-y-6 shadow-xs sticky top-24">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-brand-darkborder">
                <div className="flex items-center gap-2 font-heading font-bold text-base text-brand-navy dark:text-white">
                  <Filter className="w-4 h-4 text-brand-deep dark:text-brand-sky" />
                  <span>Refine Results</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-rose-500 hover:text-rose-600 dark:text-rose-400 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Species Filter */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted">
                  Species
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-white dark:bg-brand-darkelevated border border-slate-200 dark:border-brand-darkborder">
                  <button
                    onClick={() => setSpeciesFilter("all")}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      speciesFilter === "all"
                        ? "bg-brand-deep text-white shadow-xs"
                        : "text-slate-600 dark:text-brand-darkmuted hover:text-brand-navy"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSpeciesFilter("cat")}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      speciesFilter === "cat"
                        ? "bg-brand-deep text-white shadow-xs"
                        : "text-slate-600 dark:text-brand-darkmuted hover:text-brand-navy"
                    }`}
                  >
                    Cats
                  </button>
                  <button
                    onClick={() => setSpeciesFilter("dog")}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      speciesFilter === "dog"
                        ? "bg-brand-deep text-white shadow-xs"
                        : "text-slate-600 dark:text-brand-darkmuted hover:text-brand-navy"
                    }`}
                  >
                    Dogs
                  </button>
                </div>
              </div>

              {/* Gender Filter */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted">
                  Gender
                </label>
                <select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value as "all" | "Male" | "Female")}
                  className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 dark:border-brand-darkborder bg-white dark:bg-brand-darkelevated text-brand-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
                >
                  <option value="all">Any Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* Breed Filter */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted">
                  Breed
                </label>
                <select
                  value={breedFilter}
                  onChange={(e) => setBreedFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 dark:border-brand-darkborder bg-white dark:bg-brand-darkelevated text-brand-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
                >
                  <option value="all">All Breeds</option>
                  {availableBreeds.map((breed) => (
                    <option key={breed} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
              </div>

              {/* Age Range Filter */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted">
                  Age Stage
                </label>
                <select
                  value={ageFilter}
                  onChange={(e) => setAgeFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 dark:border-brand-darkborder bg-white dark:bg-brand-darkelevated text-brand-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
                >
                  <option value="all">Any Age</option>
                  <option value="junior">Junior (Under 2 years)</option>
                  <option value="prime">Prime (2 to 4 years)</option>
                  <option value="mature">Mature (4+ years)</option>
                </select>
              </div>

              {/* Location Filter */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted">
                  City or State
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Seattle, WA"
                    value={locationTerm}
                    onChange={(e) => setLocationTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs font-medium rounded-xl border border-slate-200 dark:border-brand-darkborder bg-white dark:bg-brand-darkelevated text-brand-navy dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-sky"
                  />
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
              </div>
            </div>
          </aside>

          {/* ================= RESULTS COLUMN (3 cols) ================= */}
          <main className="lg:col-span-3 space-y-6">
            {/* Top Toolbar: Search keyword, sort, view toggle, mobile filter button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50/70 dark:bg-brand-darksurface p-3 rounded-2xl border border-slate-200 dark:border-brand-darkborder">
              {/* Search Keyword Input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search pet by name, breed, or personality..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-brand-darkborder bg-white dark:bg-brand-darkelevated text-brand-navy dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>

              <div className="flex items-center gap-2 justify-between sm:justify-end">
                {/* Mobile Filter Toggle Button */}
                <button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="lg:hidden inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-brand-darkborder bg-white dark:bg-brand-darkelevated text-slate-700 dark:text-white"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Filters</span>
                </button>

                {/* Sort By Dropdown */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-500 dark:text-brand-darkmuted hidden sm:inline">
                    Sort:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value as "newest" | "ageAsc" | "ageDesc" | "nameAsc")
                    }
                    className="px-2.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-brand-darkborder bg-white dark:bg-brand-darkelevated text-brand-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
                  >
                    <option value="newest">Newest First</option>
                    <option value="ageAsc">Age: Young to Old</option>
                    <option value="ageDesc">Age: Old to Young</option>
                    <option value="nameAsc">Name: A to Z</option>
                  </select>
                </div>

                {/* Grid / List View Toggle */}
                <div className="flex items-center p-1 rounded-xl bg-white dark:bg-brand-darkelevated border border-slate-200 dark:border-brand-darkborder">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === "grid"
                        ? "bg-brand-deep text-white"
                        : "text-slate-400 hover:text-slate-700 dark:hover:text-white"
                    }`}
                    aria-label="Grid view"
                    title="Grid view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === "list"
                        ? "bg-brand-deep text-white"
                        : "text-slate-400 hover:text-slate-700 dark:hover:text-white"
                    }`}
                    aria-label="List view"
                    title="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Filters Dropdown Drawer */}
            {showMobileFilters && (
              <div className="lg:hidden p-5 rounded-2xl bg-slate-50 dark:bg-brand-darksurface border border-slate-200 dark:border-brand-darkborder space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-brand-darkborder">
                  <span className="font-heading font-bold text-sm text-brand-navy dark:text-white">
                    Refine Results
                  </span>
                  <button
                    onClick={resetFilters}
                    className="text-xs text-rose-500 font-semibold"
                  >
                    Reset All
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Species</label>
                    <select
                      value={speciesFilter}
                      onChange={(e) => setSpeciesFilter(e.target.value as "all" | "cat" | "dog")}
                      className="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-brand-darkborder bg-white dark:bg-brand-darkelevated"
                    >
                      <option value="all">All</option>
                      <option value="cat">Cats</option>
                      <option value="dog">Dogs</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Gender</label>
                    <select
                      value={genderFilter}
                      onChange={(e) => setGenderFilter(e.target.value as "all" | "Male" | "Female")}
                      className="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-brand-darkborder bg-white dark:bg-brand-darkelevated"
                    >
                      <option value="all">Any</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Breed</label>
                    <select
                      value={breedFilter}
                      onChange={(e) => setBreedFilter(e.target.value)}
                      className="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-brand-darkborder bg-white dark:bg-brand-darkelevated"
                    >
                      <option value="all">All Breeds</option>
                      {availableBreeds.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Age Stage</label>
                    <select
                      value={ageFilter}
                      onChange={(e) => setAgeFilter(e.target.value)}
                      className="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-brand-darkborder bg-white dark:bg-brand-darkelevated"
                    >
                      <option value="all">Any Age</option>
                      <option value="junior">Junior (&lt; 2 yrs)</option>
                      <option value="prime">Prime (2-4 yrs)</option>
                      <option value="mature">Mature (4+ yrs)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Status Counter & Active Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-brand-darkmuted">
                Showing {filteredPets.length} compatible {filteredPets.length === 1 ? "companion" : "companions"}
              </span>

              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-1.5">
                  {speciesFilter !== "all" && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-brand-ice dark:bg-brand-darkelevated text-brand-deep dark:text-brand-sky">
                      {speciesFilter === "cat" ? "Cats" : "Dogs"}
                    </span>
                  )}
                  {genderFilter !== "all" && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-brand-ice dark:bg-brand-darkelevated text-brand-deep dark:text-brand-sky">
                      {genderFilter}
                    </span>
                  )}
                  {breedFilter !== "all" && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-brand-ice dark:bg-brand-darkelevated text-brand-deep dark:text-brand-sky">
                      {breedFilter}
                    </span>
                  )}
                  {locationTerm && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-brand-ice dark:bg-brand-darkelevated text-brand-deep dark:text-brand-sky">
                      {locationTerm}
                    </span>
                  )}
                  <button
                    onClick={resetFilters}
                    className="text-[11px] text-rose-500 hover:underline font-semibold ml-1"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Results Grid / List */}
            {displayedPets.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "flex flex-col gap-4"
                }
              >
                {displayedPets.map((pet) => (
                  <PetCard key={pet.id} pet={pet} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              /* Beautiful Empty State */
              <div className="text-center py-16 px-6 bg-slate-50/60 dark:bg-brand-darksurface border border-dashed border-slate-300 dark:border-brand-darkborder rounded-3xl space-y-4">
                <div className="flex justify-center">
                  <EmptyStateIllustration type="search" className="w-40 h-40" />
                </div>
                <h3 className="font-heading font-bold text-xl text-brand-navy dark:text-white">
                  No Pet Matches Found
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-brand-darkmuted max-w-md mx-auto">
                  We could not find any pets matching your exact filter combination. Try clearing
                  some filters or searching with a broader location.
                </p>
                <div className="pt-2">
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-brand-deep hover:bg-brand-navy transition-all shadow-sm"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Filters</span>
                  </button>
                </div>
              </div>
            )}

            {/* Load More Pagination */}
            {hasMore && (
              <div className="pt-8 text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-brand-deep dark:text-brand-cyan bg-white dark:bg-brand-darksurface border border-brand-sky/40 hover:bg-brand-ice dark:hover:bg-brand-darkelevated transition-all shadow-xs"
                >
                  <span>Load More Companions</span>
                  <span className="text-[10px] text-slate-400">
                    ({filteredPets.length - visibleCount} remaining)
                  </span>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-brand-darknavy">
          <p className="text-sm font-semibold text-brand-deep dark:text-brand-sky">
            Loading companions directory...
          </p>
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  );
}


"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PetAvatar } from "@/components/illustrations/PetAvatar";
import { PetCard } from "@/components/pet/PetCard";
import { ExpressInterestModal } from "@/components/pet/ExpressInterestModal";
import {
  getStoredPets,
  getStoredPetById,
  isPetFavorite,
  toggleStoredFavorite,
  addRecentlyViewedPet,
} from "@/lib/storage";
import { useToast } from "@/context/ToastContext";
import { Pet } from "@/types";
import {
  Heart,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Weight,
  Layers,
  User,
  ChevronRight,
  ArrowLeft,
  Share2,
} from "lucide-react";

export default function PetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();

  const [pet, setPet] = useState<Pet | null>(null);
  const [similarPets, setSimilarPets] = useState<Pet[]>([]);
  const [favorite, setFavorite] = useState(false);
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);

  const petId = params?.id as string;

  useEffect(() => {
    if (!petId) return;

    const currentPet = getStoredPetById(petId);
    if (!currentPet) {
      return;
    }

    setPet(currentPet);
    setFavorite(isPetFavorite(petId));
    addRecentlyViewedPet(petId);

    // Find similar pets (same species, excluding current pet)
    const all = getStoredPets();
    const similar = all
      .filter((p) => p.species === currentPet.species && p.id !== currentPet.id)
      .slice(0, 3);
    setSimilarPets(similar);

    const handleStorage = (e: Event) => {
      const ce = e as CustomEvent;
      if (ce.detail?.key === "cagod_favorites_v1") {
        setFavorite(isPetFavorite(petId));
      }
      if (ce.detail?.key === "cagod_pets_v1") {
        const refreshed = getStoredPetById(petId);
        if (refreshed) setPet(refreshed);
      }
    };

    window.addEventListener("cagod_storage_change", handleStorage);
    return () => window.removeEventListener("cagod_storage_change", handleStorage);
  }, [petId]);

  const handleFavoriteToggle = () => {
    if (!pet) return;
    const newState = toggleStoredFavorite(pet.id);
    setFavorite(newState);
    if (newState) {
      showToast(`Saved ${pet.name} to favorites`, undefined, "success");
    } else {
      showToast(`Removed ${pet.name} from favorites`, undefined, "info");
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard", "Share this companion profile with fellow guardians", "success");
    }
  };

  if (!pet) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-brand-darknavy text-slate-800 dark:text-slate-100">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
          <h2 className="font-heading font-bold text-2xl text-brand-navy dark:text-white">
            Pet Profile Not Found
          </h2>
          <p className="text-sm text-slate-500 max-w-sm">
            This companion profile may have been updated or removed.
          </p>
          <button
            onClick={() => router.push("/explore")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-brand-deep hover:bg-brand-navy"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Directory</span>
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-brand-darknavy text-slate-800 dark:text-slate-100 transition-colors">
      <Navbar />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-slate-50/70 dark:bg-brand-darksurface/40 border-b border-slate-200/80 dark:border-brand-darkborder py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-slate-500 dark:text-brand-darkmuted">
          <div className="flex items-center gap-1.5 truncate">
            <Link href="/" className="hover:text-brand-navy dark:hover:text-white">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/explore" className="hover:text-brand-navy dark:hover:text-white">
              Explore Pets
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="capitalize">{pet.species}s</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-brand-navy dark:text-white truncate">
              {pet.name}
            </span>
          </div>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-slate-600 dark:text-brand-darkmuted hover:bg-slate-100 dark:hover:bg-brand-darkelevated transition-colors"
            title="Share profile link"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </nav>

      {/* Profile Details Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ================= LEFT COLUMN: AVATAR & VITALS (5 cols) ================= */}
          <div className="lg:col-span-5 space-y-6">
            {/* Visual Portrait Card */}
            <div className="relative bg-gradient-to-b from-brand-ice/70 via-slate-50/50 to-white dark:from-brand-darkelevated dark:to-brand-darksurface border border-slate-200 dark:border-brand-darkborder rounded-3xl p-8 flex flex-col items-center text-center shadow-soft">
              {/* Top status badges */}
              <div className="w-full flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full bg-brand-navy text-white dark:bg-brand-sky dark:text-brand-navy shadow-xs">
                  {pet.species === "cat" ? "Feline" : "Canine"}
                </span>
                {pet.ownerVerified && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Companion</span>
                  </span>
                )}
              </div>

              {/* Large 2D Pet Illustration */}
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-white dark:bg-brand-darksurface p-3 border-2 border-slate-200 dark:border-brand-darkborder shadow-sm my-4">
                <PetAvatar
                  avatarId={pet.avatarId}
                  species={pet.species}
                  className="w-full h-full"
                />
              </div>

              {/* Pet Title */}
              <h1 className="font-heading font-extrabold text-3xl text-brand-navy dark:text-white mt-2">
                {pet.name}
              </h1>
              <p className="text-sm font-semibold text-brand-deep dark:text-brand-sky mt-1">
                {pet.breed}
              </p>
              <p className="text-xs text-slate-500 dark:text-brand-darkmuted flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{pet.location}</span>
              </p>

              {/* Key Vitals Grid */}
              <div className="grid grid-cols-3 gap-2 w-full pt-6 mt-6 border-t border-slate-200/80 dark:border-brand-darkborder">
                <div className="p-3 rounded-2xl bg-white dark:bg-brand-darkelevated border border-slate-100 dark:border-brand-darkborder text-center">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Gender</span>
                  <span className="text-xs font-bold text-brand-navy dark:text-white mt-0.5 block">
                    {pet.gender}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-white dark:bg-brand-darkelevated border border-slate-100 dark:border-brand-darkborder text-center">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Age</span>
                  <span className="text-xs font-bold text-brand-navy dark:text-white mt-0.5 block">
                    {pet.age}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-white dark:bg-brand-darkelevated border border-slate-100 dark:border-brand-darkborder text-center">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Weight</span>
                  <span className="text-xs font-bold text-brand-navy dark:text-white mt-0.5 block">
                    {pet.weight}
                  </span>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full pt-6">
                <button
                  onClick={() => setIsInterestModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl text-xs font-bold text-white bg-brand-deep hover:bg-brand-navy dark:hover:bg-brand-deep/80 transition-all shadow-md hover:shadow-lg"
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>Express Interest</span>
                </button>

                <button
                  onClick={handleFavoriteToggle}
                  className={`inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl text-xs font-bold border transition-all ${
                    favorite
                      ? "bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/40 dark:border-rose-900 shadow-sm"
                      : "bg-white dark:bg-brand-darkelevated border-slate-200 dark:border-brand-darkborder text-slate-700 dark:text-slate-200 hover:text-rose-500 hover:border-rose-200"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${favorite ? "fill-rose-500 text-rose-500" : ""}`} />
                  <span>{favorite ? "Favorited" : "Add to Favorites"}</span>
                </button>
              </div>
            </div>

            {/* Owner Snapshot Card */}
            <div className="bg-slate-50/70 dark:bg-brand-darksurface border border-slate-200 dark:border-brand-darkborder rounded-3xl p-6 space-y-4">
              <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted">
                Guardian Details
              </h3>
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-brand-ice dark:bg-brand-darkelevated flex items-center justify-center text-brand-deep dark:text-brand-cyan">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-brand-navy dark:text-white">
                    {pet.ownerName}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-brand-darkmuted">
                    Resident of {pet.city}, {pet.state}
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-brand-darkmuted leading-relaxed">
                Registered verified guardian on Cagod Matrimony. Active in responsible pet health
                maintenance and companion playdate arrangements.
              </p>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: BIO, HEALTH, TEMPERAMENT (7 cols) ================= */}
          <div className="lg:col-span-7 space-y-8">
            {/* Biography & Story */}
            <div className="bg-white dark:bg-brand-darksurface border border-slate-200 dark:border-brand-darkborder rounded-3xl p-8 space-y-4 shadow-soft">
              <h2 className="font-heading font-bold text-2xl text-brand-navy dark:text-white">
                About {pet.name}
              </h2>
              <p className="text-base text-slate-700 dark:text-slate-200 leading-relaxed">
                {pet.bio}
              </p>

              {/* Physical details tags */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-600 dark:text-brand-darkmuted">
                  <Layers className="w-4 h-4 text-brand-deep dark:text-brand-cyan" />
                  <span>Coat: <strong className="text-brand-navy dark:text-white">{pet.coatColor}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-brand-darkmuted">
                  <Weight className="w-4 h-4 text-brand-deep dark:text-brand-cyan" />
                  <span>Size Category: <strong className="text-brand-navy dark:text-white">{pet.size} ({pet.weight})</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-brand-darkmuted">
                  <Calendar className="w-4 h-4 text-brand-deep dark:text-brand-cyan" />
                  <span>Registered: <strong className="text-brand-navy dark:text-white">{new Date(pet.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-brand-darkmuted">
                  <MapPin className="w-4 h-4 text-brand-deep dark:text-brand-cyan" />
                  <span>Location: <strong className="text-brand-navy dark:text-white">{pet.location}</strong></span>
                </div>
              </div>
            </div>

            {/* Personality & Temperament */}
            <div className="bg-white dark:bg-brand-darksurface border border-slate-200 dark:border-brand-darkborder rounded-3xl p-8 space-y-5 shadow-soft">
              <div>
                <h3 className="font-heading font-bold text-xl text-brand-navy dark:text-white">
                  Personality & Temperament
                </h3>
                <p className="text-xs text-slate-500 dark:text-brand-darkmuted mt-1">
                  Observed behaviors and characteristics submitted by guardian.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {pet.personality.map((trait) => (
                  <span
                    key={trait}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-ice dark:bg-brand-darkelevated text-xs font-semibold text-brand-deep dark:text-brand-cyan border border-brand-sky/20"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{trait}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Health & Medical Verified Disclosure */}
            <div className="bg-white dark:bg-brand-darksurface border border-slate-200 dark:border-brand-darkborder rounded-3xl p-8 space-y-5 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-xl text-brand-navy dark:text-white">
                    Health & Welfare Disclosures
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-brand-darkmuted mt-0.5">
                    Essential wellness milestones verified with veterinary documentation.
                  </p>
                </div>
                <ShieldCheck className="w-7 h-7 text-emerald-500 flex-shrink-0" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-brand-darkelevated border border-slate-200/80 dark:border-brand-darkborder flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-brand-navy dark:text-white">
                      Vaccinations Up to Date
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-brand-darkmuted mt-0.5">
                      Core rabies, DHPP/FVRCP, and booster vaccines verified.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-brand-darkelevated border border-slate-200/80 dark:border-brand-darkborder flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-brand-navy dark:text-white">
                      Spayed / Neutered
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-brand-darkmuted mt-0.5">
                      Responsible breeding & sterilization status confirmed.
                    </p>
                  </div>
                </div>
              </div>

              {pet.medicalNotes && (
                <div className="p-4 rounded-2xl bg-brand-ice/40 dark:bg-brand-darkelevated/40 border border-brand-sky/20">
                  <span className="block text-xs font-bold text-brand-deep dark:text-brand-sky mb-1">
                    Guardian Health Notes
                  </span>
                  <p className="text-xs text-slate-600 dark:text-brand-darkmuted leading-relaxed">
                    {pet.medicalNotes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Companions Section */}
        {similarPets.length > 0 && (
          <section className="pt-8 border-t border-slate-200 dark:border-brand-darkborder space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading font-extrabold text-2xl text-brand-navy dark:text-white">
                  Similar Companions You Might Like
                </h2>
                <p className="text-xs text-slate-500 dark:text-brand-darkmuted mt-1">
                  Other {pet.species === "cat" ? "cats" : "dogs"} with compatible temperament profiles.
                </p>
              </div>
              <Link
                href={`/explore?species=${pet.species}`}
                className="text-xs font-semibold text-brand-deep dark:text-brand-sky hover:underline"
              >
                View all {pet.species}s
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarPets.map((p) => (
                <PetCard key={p.id} pet={p} viewMode="grid" />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Express Interest Modal */}
      <ExpressInterestModal
        targetPet={pet}
        isOpen={isInterestModalOpen}
        onClose={() => setIsInterestModalOpen(false)}
      />

      <Footer />
    </div>
  );
}


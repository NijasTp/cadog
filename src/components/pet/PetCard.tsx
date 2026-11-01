"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, MapPin, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { Pet } from "@/types";
import { PetAvatar } from "@/components/illustrations/PetAvatar";
import { isPetFavorite, toggleStoredFavorite } from "@/lib/storage";
import { useToast } from "@/context/ToastContext";

interface PetCardProps {
  pet: Pet;
  viewMode?: "grid" | "list";
  onFavoriteChange?: (petId: string, isFav: boolean) => void;
}

export const PetCard: React.FC<PetCardProps> = ({
  pet,
  viewMode = "grid",
  onFavoriteChange,
}) => {
  const [favorite, setFavorite] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    setFavorite(isPetFavorite(pet.id));

    const handleStorageChange = (e: Event) => {
      const ce = e as CustomEvent;
      if (ce.detail?.key === "cagod_favorites_v1") {
        setFavorite(isPetFavorite(pet.id));
      }
    };

    window.addEventListener("cagod_storage_change", handleStorageChange);
    return () => window.removeEventListener("cagod_storage_change", handleStorageChange);
  }, [pet.id]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = toggleStoredFavorite(pet.id);
    setFavorite(newState);
    if (onFavoriteChange) {
      onFavoriteChange(pet.id, newState);
    }
    if (newState) {
      showToast(`Added ${pet.name} to favorites`, "Saved to your companion wishlist", "success");
    } else {
      showToast(`Removed ${pet.name} from favorites`, undefined, "info");
    }
  };

  if (viewMode === "list") {
    return (
      <article className="group relative bg-white dark:bg-brand-darksurface border border-slate-200 dark:border-brand-darkborder rounded-2xl p-5 hover:border-brand-sky/60 dark:hover:border-brand-sky/50 transition-all duration-300 shadow-soft hover:shadow-card flex flex-col sm:flex-row items-center gap-6">
        {/* Avatar container */}
        <div className="relative flex-shrink-0">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-50 dark:bg-brand-darkelevated border border-slate-100 dark:border-brand-darkborder flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300">
            <PetAvatar avatarId={pet.avatarId} species={pet.species} className="w-full h-full" />
          </div>
          {pet.ownerVerified && (
            <span
              className="absolute -bottom-2 -right-2 inline-flex items-center gap-1 bg-white dark:bg-brand-darksurface px-2 py-0.5 rounded-full border border-slate-200 dark:border-brand-darkborder text-[11px] font-semibold text-brand-deep dark:text-brand-cyan shadow-sm"
              title="Verified Guardian"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-brand-deep dark:text-brand-cyan" />
              <span>Verified</span>
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 text-center sm:text-left space-y-2">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-brand-ice dark:bg-brand-darkelevated text-brand-deep dark:text-brand-sky">
              {pet.species === "cat" ? "Cat" : "Dog"}
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-brand-darkmuted">
              {pet.gender} &bull; {pet.age}
            </span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <h3 className="font-heading font-bold text-xl text-brand-navy dark:text-white group-hover:text-brand-deep dark:group-hover:text-brand-sky transition-colors">
              <Link href={`/pets/${pet.id}`} className="focus:outline-none">
                {pet.name}
              </Link>
            </h3>
            <span className="text-xs text-slate-400 dark:text-brand-darkmuted">&bull;</span>
            <span className="text-sm font-medium text-slate-600 dark:text-brand-darkmuted truncate">
              {pet.breed}
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-brand-darkmuted flex items-center justify-center sm:justify-start gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{pet.location}</span>
          </p>

          <p className="text-sm text-slate-600 dark:text-brand-darkmuted line-clamp-2">
            {pet.bio}
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1">
            {pet.personality.slice(0, 3).map((trait) => (
              <span
                key={trait}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-brand-darkelevated text-slate-600 dark:text-brand-darkmuted"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex sm:flex-col items-center justify-between gap-3 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-brand-darkborder">
          <button
            onClick={handleFavoriteClick}
            className={`p-2.5 rounded-full border transition-all ${
              favorite
                ? "bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-950/40 dark:border-rose-900"
                : "bg-white dark:bg-brand-darkelevated border-slate-200 dark:border-brand-darkborder text-slate-400 hover:text-rose-500 hover:border-rose-200"
            }`}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            title={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-5 h-5 ${favorite ? "fill-rose-500 text-rose-500" : ""}`} />
          </button>

          <Link
            href={`/pets/${pet.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-brand-deep hover:bg-brand-navy transition-all shadow-sm flex-nowrap"
          >
            <span>View Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </article>
    );
  }

  // Grid view (Default)
  return (
    <article className="group relative bg-white dark:bg-brand-darksurface border border-slate-200 dark:border-brand-darkborder rounded-2xl overflow-hidden hover:border-brand-sky/60 dark:hover:border-brand-sky/50 transition-all duration-300 shadow-soft hover:shadow-card flex flex-col h-full card-hover-effect">
      {/* Top Banner & Avatar Header */}
      <div className="relative bg-gradient-to-b from-brand-ice/70 to-slate-50/50 dark:from-brand-darkelevated dark:to-brand-darksurface p-6 pb-4 flex flex-col items-center text-center border-b border-slate-100 dark:border-brand-darkborder">
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-4 right-4 p-2 rounded-full border transition-all shadow-sm ${
            favorite
              ? "bg-white dark:bg-brand-darkelevated border-rose-200 text-rose-500 shadow-sm"
              : "bg-white/80 dark:bg-brand-darkelevated/80 backdrop-blur-sm border-slate-200 dark:border-brand-darkborder text-slate-400 hover:text-rose-500 hover:bg-white"
          }`}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          title={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`w-4 h-4 ${favorite ? "fill-rose-500 text-rose-500" : ""}`} />
        </button>

        {/* Species & Gender Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5">
          <span className="text-[11px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-navy text-white dark:bg-brand-sky dark:text-brand-navy shadow-xs">
            {pet.species === "cat" ? "Cat" : "Dog"}
          </span>
          {pet.isFeatured && (
            <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              <Sparkles className="w-2.5 h-2.5" />
              <span>Featured</span>
            </span>
          )}
        </div>

        {/* Pet Avatar */}
        <div className="mt-4 mb-2 relative">
          <div className="w-24 h-24 rounded-full bg-white dark:bg-brand-darksurface p-1.5 shadow-sm border border-slate-200 dark:border-brand-darkborder group-hover:scale-105 transition-transform duration-300">
            <PetAvatar avatarId={pet.avatarId} species={pet.species} className="w-full h-full" />
          </div>
          {pet.ownerVerified && (
            <span
              className="absolute bottom-0 right-0 p-1 bg-white dark:bg-brand-darksurface rounded-full border border-slate-200 dark:border-brand-darkborder text-brand-deep dark:text-brand-cyan shadow-sm"
              title="Verified Pet Owner"
            >
              <ShieldCheck className="w-3.5 h-3.5 fill-brand-cyan/20" />
            </span>
          )}
        </div>

        {/* Name and Breed */}
        <h3 className="font-heading font-bold text-lg text-brand-navy dark:text-white group-hover:text-brand-deep dark:group-hover:text-brand-sky transition-colors">
          <Link href={`/pets/${pet.id}`} className="focus:outline-none">
            {pet.name}
          </Link>
        </h3>
        <p className="text-xs font-medium text-slate-500 dark:text-brand-darkmuted mt-0.5">
          {pet.breed}
        </p>

        {/* Vitals row */}
        <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 dark:text-brand-darkmuted">
          <span>{pet.gender}</span>
          <span>&bull;</span>
          <span>{pet.age}</span>
          <span>&bull;</span>
          <span className="flex items-center gap-0.5">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span>{pet.city}, {pet.state}</span>
          </span>
        </div>
      </div>

      {/* Body details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <p className="text-xs text-slate-600 dark:text-brand-darkmuted line-clamp-3 leading-relaxed">
          {pet.bio}
        </p>

        {/* Personality Pills */}
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {pet.personality.slice(0, 3).map((trait) => (
              <span
                key={trait}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-brand-darkelevated text-slate-600 dark:text-brand-darkmuted"
              >
                {trait}
              </span>
            ))}
          </div>

          {/* Action Button */}
          <div className="pt-2 border-t border-slate-100 dark:border-brand-darkborder">
            <Link
              href={`/pets/${pet.id}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-brand-deep dark:text-brand-cyan bg-brand-ice/80 dark:bg-brand-darkelevated hover:bg-brand-deep hover:text-white dark:hover:bg-brand-deep dark:hover:text-white transition-all group-hover:shadow-xs"
            >
              <span>View Profile</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};


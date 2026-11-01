"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PetAvatar } from "@/components/illustrations/PetAvatar";
import { PetCard } from "@/components/pet/PetCard";
import {
  getCurrentUser,
  getStoredPets,
  getStoredFavorites,
  getStoredInterests,
  getRecentlyViewedPetIds,
  getStoredPetById,
} from "@/lib/storage";
import { Pet, Owner, Interest } from "@/types";
import {
  PawPrint,
  Heart,
  HeartHandshake,
  PlusCircle,
  Eye,
  MapPin,
  Sparkles,
} from "lucide-react";

export default function DashboardOverviewPage() {
  const [user, setUser] = useState<Owner | null>(null);
  const [myPets, setMyPets] = useState<Pet[]>([]);
  const [favoritesCount, setFavoritesCount] = useState<number>(0);
  const [interestsSent, setInterestsSent] = useState<Interest[]>([]);
  const [interestsReceived, setInterestsReceived] = useState<Interest[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Pet[]>([]);

  const loadData = () => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    const allPets = getStoredPets();
    // User's own pets
    const userPets = allPets.filter(
      (p) =>
        p.ownerEmail === currentUser?.email ||
        p.ownerId === currentUser?.id ||
        p.ownerId === "owner-01"
    );
    setMyPets(userPets);

    // Favorites
    const favs = getStoredFavorites();
    setFavoritesCount(favs.length);

    // Interests
    const allInterests = getStoredInterests();
    const sent = allInterests.filter(
      (i) => i.senderOwnerEmail === currentUser?.email || i.senderOwnerName === currentUser?.fullName
    );
    const received = allInterests.filter(
      (i) => i.receiverOwnerEmail === currentUser?.email
    );
    setInterestsSent(sent);
    setInterestsReceived(received);

    // Recently viewed pets
    const recentIds = getRecentlyViewedPetIds();
    const recentPets: Pet[] = [];
    recentIds.forEach((id) => {
      const p = getStoredPetById(id);
      if (p) recentPets.push(p);
    });
    setRecentlyViewed(recentPets.slice(0, 3));
  };

  useEffect(() => {
    loadData();

    const handleStorage = () => loadData();
    window.addEventListener("cagod_storage_change", handleStorage);
    return () => window.removeEventListener("cagod_storage_change", handleStorage);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Hero Banner */}
      <div className="relative bg-gradient-to-r from-brand-ice via-white to-brand-ice/40 dark:from-brand-darksurface dark:via-brand-darkelevated dark:to-brand-darksurface border border-brand-sky/30 dark:border-brand-darkborder rounded-3xl p-6 sm:p-8 overflow-hidden shadow-soft">
        <div className="max-w-xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-brand-darksurface text-xs font-semibold text-brand-deep dark:text-brand-sky shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guardian Dashboard</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-navy dark:text-white tracking-tight">
            Welcome back, {user?.fullName || "Pet Guardian"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-brand-darkmuted leading-relaxed">
            Manage your registered companion profiles, review incoming inquiries, and explore verified
            matches across the Cagod network.
          </p>
        </div>
      </div>

      {/* Metrics Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* My Pets */}
        <Link
          href="/dashboard/my-pets"
          className="p-5 rounded-3xl bg-white dark:bg-brand-darksurface border border-slate-200/90 dark:border-brand-darkborder shadow-soft hover:shadow-card transition-all group card-hover-effect"
        >
          <div className="w-10 h-10 rounded-2xl bg-brand-ice dark:bg-brand-darkelevated flex items-center justify-center text-brand-deep dark:text-brand-cyan mb-3 group-hover:scale-110 transition-transform">
            <PawPrint className="w-5 h-5" />
          </div>
          <span className="font-heading font-extrabold text-2xl text-brand-navy dark:text-white block">
            {myPets.length}
          </span>
          <span className="text-xs font-semibold text-slate-500 dark:text-brand-darkmuted mt-0.5 block">
            My Pet Profiles
          </span>
        </Link>

        {/* Favorites */}
        <Link
          href="/dashboard/favorites"
          className="p-5 rounded-3xl bg-white dark:bg-brand-darksurface border border-slate-200/90 dark:border-brand-darkborder shadow-soft hover:shadow-card transition-all group card-hover-effect"
        >
          <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-rose-500 mb-3 group-hover:scale-110 transition-transform">
            <Heart className="w-5 h-5" />
          </div>
          <span className="font-heading font-extrabold text-2xl text-brand-navy dark:text-white block">
            {favoritesCount}
          </span>
          <span className="text-xs font-semibold text-slate-500 dark:text-brand-darkmuted mt-0.5 block">
            Saved Favorites
          </span>
        </Link>

        {/* Interests Sent */}
        <Link
          href="/dashboard/interests"
          className="p-5 rounded-3xl bg-white dark:bg-brand-darksurface border border-slate-200/90 dark:border-brand-darkborder shadow-soft hover:shadow-card transition-all group card-hover-effect"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-3 group-hover:scale-110 transition-transform">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <span className="font-heading font-extrabold text-2xl text-brand-navy dark:text-white block">
            {interestsSent.length}
          </span>
          <span className="text-xs font-semibold text-slate-500 dark:text-brand-darkmuted mt-0.5 block">
            Interests Sent
          </span>
        </Link>

        {/* Interests Received */}
        <Link
          href="/dashboard/interests"
          className="p-5 rounded-3xl bg-white dark:bg-brand-darksurface border border-slate-200/90 dark:border-brand-darkborder shadow-soft hover:shadow-card transition-all group card-hover-effect"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <span className="font-heading font-extrabold text-2xl text-brand-navy dark:text-white block">
            {interestsReceived.length}
          </span>
          <span className="text-xs font-semibold text-slate-500 dark:text-brand-darkmuted mt-0.5 block">
            Interests Received
          </span>
        </Link>
      </div>

      {/* ================= SECTION 1: MY PET PROFILES ================= */}
      <section className="bg-white dark:bg-brand-darksurface border border-slate-200/90 dark:border-brand-darkborder rounded-3xl p-6 sm:p-8 space-y-6 shadow-soft">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-brand-darkborder">
          <div>
            <h2 className="font-heading font-bold text-xl text-brand-navy dark:text-white">
              My Registered Pets
            </h2>
            <p className="text-xs text-slate-500 dark:text-brand-darkmuted mt-0.5">
              Active companions listed under your guardian account.
            </p>
          </div>

          <Link
            href="/create-profile"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-deep hover:bg-brand-navy transition-all shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Pet</span>
          </Link>
        </div>

        {myPets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {myPets.map((pet) => (
              <div
                key={pet.id}
                className="p-4 rounded-2xl bg-slate-50/70 dark:bg-brand-darkelevated/60 border border-slate-200/80 dark:border-brand-darkborder flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-16 h-16 rounded-full bg-white dark:bg-brand-darksurface p-1 border border-slate-200 dark:border-brand-darkborder shadow-2xs flex-shrink-0">
                    <PetAvatar avatarId={pet.avatarId} species={pet.species} className="w-full h-full" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-brand-navy dark:text-white">
                      {pet.name}
                    </h3>
                    <p className="text-xs text-brand-deep dark:text-brand-sky font-medium">
                      {pet.breed} &bull; {pet.age}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-brand-darkmuted flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{pet.location}</span>
                    </p>
                  </div>
                </div>

                <Link
                  href={`/pets/${pet.id}`}
                  className="p-2 rounded-xl bg-white dark:bg-brand-darksurface border border-slate-200 dark:border-brand-darkborder text-brand-deep dark:text-brand-cyan hover:bg-brand-ice transition-colors"
                  title="View Public Profile"
                >
                  <Eye className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 space-y-3">
            <p className="text-xs text-slate-500 dark:text-brand-darkmuted">
              You haven&apos;t registered any pets yet.
            </p>
            <Link
              href="/create-profile"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-deep hover:bg-brand-navy"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Pet Profile</span>
            </Link>
          </div>
        )}
      </section>

      {/* ================= SECTION 2: RECENTLY VIEWED PETS ================= */}
      {recentlyViewed.length > 0 && (
        <section className="bg-white dark:bg-brand-darksurface border border-slate-200/90 dark:border-brand-darkborder rounded-3xl p-6 sm:p-8 space-y-6 shadow-soft">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-brand-darkborder">
            <div>
              <h2 className="font-heading font-bold text-xl text-brand-navy dark:text-white">
                Recently Viewed Companions
              </h2>
              <p className="text-xs text-slate-500 dark:text-brand-darkmuted mt-0.5">
                Profiles you inspected during your latest session.
              </p>
            </div>

            <Link
              href="/explore"
              className="text-xs font-semibold text-brand-deep dark:text-brand-sky hover:underline"
            >
              Explore more
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recentlyViewed.map((pet) => (
              <PetCard key={pet.id} pet={pet} viewMode="grid" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}


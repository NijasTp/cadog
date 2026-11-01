"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PetAvatar } from "@/components/illustrations/PetAvatar";
import {
  getCurrentUser,
  getStoredPets,
  deleteStoredPet,
  updateStoredPet,
} from "@/lib/storage";
import { useToast } from "@/context/ToastContext";
import { Pet } from "@/types";
import {
  PlusCircle,
  Pencil,
  Trash2,
  Eye,
  MapPin,
  ShieldCheck,
  X,
} from "lucide-react";

export default function MyPetsPage() {
  const { showToast } = useToast();
  const [pets, setPets] = useState<Pet[]>([]);

  // Modals state
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [deletingPetId, setDeletingPetId] = useState<string | null>(null);

  const loadPets = () => {
    const user = getCurrentUser();
    const all = getStoredPets();
    const userPets = all.filter(
      (p) => p.ownerEmail === user?.email || p.ownerId === user?.id || p.ownerId === "owner-01"
    );
    setPets(userPets);
  };

  useEffect(() => {
    loadPets();

    const handleStorage = () => loadPets();
    window.addEventListener("cagod_storage_change", handleStorage);
    return () => window.removeEventListener("cagod_storage_change", handleStorage);
  }, []);

  const handleDeleteConfirm = () => {
    if (!deletingPetId) return;
    deleteStoredPet(deletingPetId);
    setDeletingPetId(null);
    showToast("Pet profile removed", undefined, "info");
    loadPets();
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPet) return;
    updateStoredPet(editingPet);
    setEditingPet(null);
    showToast(`${editingPet.name}'s profile updated`, undefined, "success");
    loadPets();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white dark:bg-brand-darksurface border border-slate-200/90 dark:border-brand-darkborder rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-soft">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-brand-navy dark:text-white">
            Manage Pet Profiles
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-brand-darkmuted mt-0.5">
            Update, refine, or add companion listings under your guardianship.
          </p>
        </div>

        <Link
          href="/create-profile"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-deep hover:bg-brand-navy transition-all shadow-xs"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Register New Pet</span>
        </Link>
      </div>

      {/* Pet Profiles List */}
      {pets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white dark:bg-brand-darksurface border border-slate-200 dark:border-brand-darkborder rounded-3xl p-6 shadow-soft flex flex-col justify-between space-y-5"
            >
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-full bg-slate-50 dark:bg-brand-darkelevated p-1.5 border border-slate-200 dark:border-brand-darkborder shadow-xs flex-shrink-0">
                  <PetAvatar avatarId={pet.avatarId} species={pet.species} className="w-full h-full" />
                </div>

                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-brand-ice dark:bg-brand-darkelevated text-brand-deep dark:text-brand-sky">
                      {pet.species === "cat" ? "Cat" : "Dog"}
                    </span>
                    {pet.ownerVerified && (
                      <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-0.5">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-bold text-lg text-brand-navy dark:text-white truncate">
                    {pet.name}
                  </h3>

                  <p className="text-xs text-brand-deep dark:text-brand-sky font-medium truncate">
                    {pet.breed} &bull; {pet.age} ({pet.gender})
                  </p>

                  <p className="text-[11px] text-slate-500 dark:text-brand-darkmuted flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{pet.location}</span>
                  </p>
                </div>
              </div>

              {/* Bio summary */}
              <p className="text-xs text-slate-600 dark:text-brand-darkmuted line-clamp-2 leading-relaxed">
                {pet.bio}
              </p>

              {/* Personality Pills */}
              <div className="flex flex-wrap gap-1">
                {pet.personality.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-brand-darkelevated text-slate-600 dark:text-brand-darkmuted"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Actions Toolbar */}
              <div className="pt-4 border-t border-slate-100 dark:border-brand-darkborder flex items-center justify-between">
                <Link
                  href={`/pets/${pet.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-deep dark:text-brand-sky hover:underline"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Public View</span>
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingPet(pet)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-brand-darkborder text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-brand-darkelevated"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => setDeletingPetId(pet.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-brand-darksurface border border-slate-200 dark:border-brand-darkborder rounded-3xl space-y-4">
          <p className="text-sm font-semibold text-slate-600 dark:text-brand-darkmuted">
            You do not currently have any pets registered.
          </p>
          <Link
            href="/create-profile"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-deep hover:bg-brand-navy"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Your First Pet Profile</span>
          </Link>
        </div>
      )}

      {/* ================= EDIT MODAL ================= */}
      {editingPet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative bg-white dark:bg-brand-darksurface border border-slate-200 dark:border-brand-darkborder rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setEditingPet(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading font-bold text-xl text-brand-navy dark:text-white">
              Edit {editingPet.name}&apos;s Profile
            </h3>

            <form onSubmit={handleEditSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-500 mb-1">Pet Name</label>
                <input
                  type="text"
                  required
                  value={editingPet.name}
                  onChange={(e) => setEditingPet({ ...editingPet, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Breed</label>
                  <input
                    type="text"
                    required
                    value={editingPet.breed}
                    onChange={(e) => setEditingPet({ ...editingPet, breed: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-1">Age</label>
                  <input
                    type="text"
                    required
                    value={editingPet.age}
                    onChange={(e) => setEditingPet({ ...editingPet, age: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-500 mb-1">Location</label>
                <input
                  type="text"
                  required
                  value={editingPet.location}
                  onChange={(e) => setEditingPet({ ...editingPet, location: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-500 mb-1">About & Daily Habits</label>
                <textarea
                  rows={3}
                  required
                  value={editingPet.bio}
                  onChange={(e) => setEditingPet({ ...editingPet, bio: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingPet(null)}
                  className="px-4 py-2 rounded-xl font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-white bg-brand-deep hover:bg-brand-navy"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= DELETE CONFIRMATION MODAL ================= */}
      {deletingPetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-brand-darksurface border border-slate-200 dark:border-brand-darkborder rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="font-heading font-bold text-lg text-brand-navy dark:text-white">
              Delete Pet Profile?
            </h3>
            <p className="text-xs text-slate-500 dark:text-brand-darkmuted leading-relaxed">
              Are you sure you want to remove this companion listing? This action will remove the
              profile from the public exploration directory.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingPetId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Keep Profile
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


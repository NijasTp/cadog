"use client";

import React, { useState, useEffect } from "react";
import { X, Send, HeartHandshake, ShieldCheck } from "lucide-react";
import { Pet, Owner } from "@/types";
import { PetAvatar } from "@/components/illustrations/PetAvatar";
import { getCurrentUser, getStoredPets, sendNewInterest } from "@/lib/storage";
import { useToast } from "@/context/ToastContext";

interface ExpressInterestModalProps {
  targetPet: Pet;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const ExpressInterestModal: React.FC<ExpressInterestModalProps> = ({
  targetPet,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [currentUser, setCurrentUser] = useState<Owner | null>(null);
  const [myPets, setMyPets] = useState<Pet[]>([]);
  const [selectedPetId, setSelectedPetId] = useState<string>("");
  const [customMessage, setCustomMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      const user = getCurrentUser();
      setCurrentUser(user);
      const allPets = getStoredPets();
      // Find pets belonging to the current user or demo user
      const userPets = allPets.filter(
        (p) => p.ownerEmail === user?.email || p.ownerId === user?.id || p.ownerId === "owner-01"
      );
      setMyPets(userPets);
      if (userPets.length > 0) {
        setSelectedPetId(userPets[0].id);
        setCustomMessage(
          `Hello ${targetPet.ownerName}! Our ${userPets[0].species === "cat" ? "cat" : "dog"} ${userPets[0].name} would love to connect with ${targetPet.name}. Their temperaments seem like a wonderful match for companionship!`
        );
      } else {
        setCustomMessage(
          `Hello ${targetPet.ownerName}! I am interested in connecting regarding ${targetPet.name} for companion playdates.`
        );
      }
    }
  }, [isOpen, targetPet]);

  const handlePetSelect = (id: string) => {
    setSelectedPetId(id);
    const chosen = myPets.find((p) => p.id === id);
    if (chosen) {
      setCustomMessage(
        `Hello ${targetPet.ownerName}! Our ${chosen.species === "cat" ? "cat" : "dog"} ${chosen.name} would love to connect with ${targetPet.name}. Their temperaments seem like a wonderful match for companionship!`
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMessage.trim()) return;

    setIsSubmitting(true);
    const chosenPet = myPets.find((p) => p.id === selectedPetId);

    const senderPetName = chosenPet ? chosenPet.name : (currentUser?.fullName || "Pet Parent");
    const senderPetAvatarId = chosenPet ? chosenPet.avatarId : "cat-persian-white";
    const senderOwnerName = currentUser?.fullName || "Alexander Wright";
    const senderOwnerEmail = currentUser?.email || "alexander.wright@cagod.com";

    sendNewInterest({
      senderPetId: selectedPetId || "pet-custom",
      senderPetName,
      senderPetAvatarId,
      senderOwnerName,
      senderOwnerEmail,
      receiverPetId: targetPet.id,
      receiverPetName: targetPet.name,
      receiverPetAvatarId: targetPet.avatarId,
      receiverOwnerEmail: targetPet.ownerEmail,
      message: customMessage,
    });

    setIsSubmitting(false);
    showToast(
      `Interest sent to ${targetPet.name}!`,
      `${targetPet.ownerName} has been notified of your proposal.`,
      "success"
    );

    if (onSuccess) onSuccess();
    onClose();
  };

  if (!isOpen) return null;

  const chosenPet = myPets.find((p) => p.id === selectedPetId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative bg-white dark:bg-brand-darksurface border border-slate-200 dark:border-brand-darkborder rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-brand-darkelevated transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-brand-ice dark:bg-brand-darkelevated flex items-center justify-center text-brand-deep dark:text-brand-cyan flex-shrink-0">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-xl text-brand-navy dark:text-white">
              Express Interest
            </h3>
            <p className="text-xs text-slate-500 dark:text-brand-darkmuted">
              Connect with {targetPet.ownerName} regarding {targetPet.name}
            </p>
          </div>
        </div>

        {/* Companion Match Visual Bridge */}
        <div className="bg-slate-50 dark:bg-brand-darkelevated/70 border border-slate-200/80 dark:border-brand-darkborder rounded-2xl p-4 mb-6 flex items-center justify-around">
          {/* Sender Pet */}
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-white dark:bg-brand-darksurface p-1 border border-slate-200 dark:border-brand-darkborder shadow-xs">
              <PetAvatar
                avatarId={chosenPet?.avatarId || "cat-persian-white"}
                species={chosenPet?.species || "cat"}
                className="w-full h-full"
              />
            </div>
            <span className="text-xs font-semibold text-brand-navy dark:text-white mt-1.5 truncate max-w-[100px]">
              {chosenPet?.name || "Your Pet"}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-brand-darkmuted">
              {chosenPet?.breed || "Companion"}
            </span>
          </div>

          {/* Connection Bridge */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-brand-deep dark:text-brand-sky uppercase tracking-wider">
              Pairing
            </span>
            <div className="w-16 h-0.5 bg-gradient-to-r from-brand-sky via-brand-deep to-brand-cyan my-1" />
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
              Compatible
            </span>
          </div>

          {/* Receiver Pet */}
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-white dark:bg-brand-darksurface p-1 border border-slate-200 dark:border-brand-darkborder shadow-xs">
              <PetAvatar
                avatarId={targetPet.avatarId}
                species={targetPet.species}
                className="w-full h-full"
              />
            </div>
            <span className="text-xs font-semibold text-brand-navy dark:text-white mt-1.5 truncate max-w-[100px]">
              {targetPet.name}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-brand-darkmuted">
              {targetPet.breed}
            </span>
          </div>
        </div>

        {/* Interest Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Select which pet is sending interest */}
          {myPets.length > 0 && (
            <div>
              <label className="block text-xs font-semibold text-brand-navy dark:text-slate-200 mb-1.5">
                Select Your Registered Pet
              </label>
              <select
                value={selectedPetId}
                onChange={(e) => handlePetSelect(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-brand-darkborder bg-white dark:bg-brand-darkelevated text-sm text-brand-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
              >
                {myPets.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.breed}, {p.age})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Personalized Message */}
          <div>
            <label className="block text-xs font-semibold text-brand-navy dark:text-slate-200 mb-1.5">
              Personal Note to {targetPet.ownerName}
            </label>
            <textarea
              rows={4}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-brand-darkborder bg-white dark:bg-brand-darkelevated text-sm text-brand-navy dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-sky resize-none"
              placeholder="Introduce your pet, share routines, or suggest a park walk..."
            />
          </div>

          {/* Privacy Note */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-brand-ice/60 dark:bg-brand-darkelevated/40 text-xs text-brand-deep dark:text-brand-sky">
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            <p className="text-[11px] leading-tight">
              Personal contact details remain private until {targetPet.ownerName} accepts your interest.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-brand-darkmuted hover:bg-slate-100 dark:hover:bg-brand-darkelevated transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting || !customMessage.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-brand-deep hover:bg-brand-navy dark:hover:bg-brand-deep/80 transition-all shadow-sm disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? "Sending Proposal..." : "Send Interest"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


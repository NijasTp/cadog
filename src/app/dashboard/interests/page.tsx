"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PetAvatar } from "@/components/illustrations/PetAvatar";
import { EmptyStateIllustration } from "@/components/illustrations/EmptyStateIllustration";
import {
  getCurrentUser,
  getStoredInterests,
  updateInterestStatus,
} from "@/lib/storage";
import { useToast } from "@/context/ToastContext";
import { Interest, Owner } from "@/types";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Mail,
  Send,
  Inbox,
} from "lucide-react";

export default function InterestsDashboardPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<"received" | "sent">("received");
  const [currentUser, setCurrentUser] = useState<Owner | null>(null);
  const [interests, setInterests] = useState<Interest[]>([]);

  const loadInterests = () => {
    const user = getCurrentUser();
    setCurrentUser(user);
    const all = getStoredInterests();
    setInterests(all);
  };

  useEffect(() => {
    loadInterests();

    const handleStorage = () => loadInterests();
    window.addEventListener("cagod_storage_change", handleStorage);
    return () => window.removeEventListener("cagod_storage_change", handleStorage);
  }, []);

  // Filter received and sent
  const receivedInterests = interests.filter(
    (i) => i.receiverOwnerEmail === currentUser?.email
  );

  const sentInterests = interests.filter(
    (i) => i.senderOwnerEmail === currentUser?.email || i.senderOwnerName === currentUser?.fullName
  );

  const handleStatusChange = (interestId: string, newStatus: "accepted" | "declined") => {
    updateInterestStatus(interestId, newStatus);
    showToast(
      newStatus === "accepted" ? "Interest Proposal Accepted!" : "Proposal Declined",
      newStatus === "accepted"
        ? "Contact details are now visible to coordinate a companion playdate."
        : "The interest status has been updated.",
      newStatus === "accepted" ? "success" : "info"
    );
    loadInterests();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white dark:bg-brand-darksurface border border-slate-200/90 dark:border-brand-darkborder rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-soft">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-brand-navy dark:text-white">
            Companion Interests
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-brand-darkmuted mt-0.5">
            Manage introduction proposals sent and received from other pet guardians.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-brand-darkelevated border border-slate-200 dark:border-brand-darkborder">
          <button
            onClick={() => setActiveTab("received")}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "received"
                ? "bg-white dark:bg-brand-darksurface text-brand-deep dark:text-white shadow-xs"
                : "text-slate-600 dark:text-brand-darkmuted hover:text-brand-navy"
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Received ({receivedInterests.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("sent")}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "sent"
                ? "bg-white dark:bg-brand-darksurface text-brand-deep dark:text-white shadow-xs"
                : "text-slate-600 dark:text-brand-darkmuted hover:text-brand-navy"
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Sent ({sentInterests.length})</span>
          </button>
        </div>
      </div>

      {/* Main List Body */}
      {activeTab === "received" ? (
        receivedInterests.length > 0 ? (
          <div className="space-y-4">
            {receivedInterests.map((interest) => (
              <div
                key={interest.id}
                className="bg-white dark:bg-brand-darksurface border border-slate-200 dark:border-brand-darkborder rounded-3xl p-6 sm:p-7 shadow-soft space-y-5"
              >
                {/* Pairing Visual Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-brand-darkborder">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-slate-50 dark:bg-brand-darkelevated p-1 border border-slate-200 dark:border-brand-darkborder shadow-2xs">
                      <PetAvatar avatarId={interest.senderPetAvatarId} className="w-full h-full" />
                    </div>

                    <div>
                      <h3 className="font-heading font-bold text-base text-brand-navy dark:text-white">
                        {interest.senderPetName}{" "}
                        <span className="text-xs font-normal text-slate-500">
                          (Guardian: {interest.senderOwnerName})
                        </span>
                      </h3>
                      <p className="text-xs text-brand-deep dark:text-brand-sky">
                        Expressed interest in your pet{" "}
                        <strong className="font-semibold text-brand-navy dark:text-white">
                          {interest.receiverPetName}
                        </strong>
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {interest.status === "pending" && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Pending Decision</span>
                      </span>
                    )}
                    {interest.status === "accepted" && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Accepted</span>
                      </span>
                    )}
                    {interest.status === "declined" && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 dark:bg-brand-darkelevated dark:text-brand-darkmuted border border-slate-200">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Declined</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Proposal Message */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-brand-darkelevated/60 border border-slate-200/80 dark:border-brand-darkborder text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  &ldquo;{interest.message}&rdquo;
                </div>

                {/* If Accepted: Show Guardian Contact details */}
                {interest.status === "accepted" && (
                  <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span>
                        Guardian contact: <strong>{interest.senderOwnerEmail}</strong>
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                      Ready for playdate coordinate
                    </span>
                  </div>
                )}

                {/* Action Buttons if Pending */}
                {interest.status === "pending" && (
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      onClick={() => handleStatusChange(interest.id, "declined")}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-brand-darkelevated transition-colors"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => handleStatusChange(interest.id, "accepted")}
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-xs"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Accept Proposal</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 bg-white dark:bg-brand-darksurface border border-slate-200 dark:border-brand-darkborder rounded-3xl space-y-4 shadow-soft">
            <div className="flex justify-center">
              <EmptyStateIllustration type="interests" className="w-36 h-36" />
            </div>
            <h3 className="font-heading font-bold text-lg text-brand-navy dark:text-white">
              No Inquiries Received Yet
            </h3>
            <p className="text-xs text-slate-500 dark:text-brand-darkmuted max-w-sm mx-auto">
              When other pet guardians express interest in your registered pets, their introductory
              messages will appear here.
            </p>
          </div>
        )
      ) : sentInterests.length > 0 ? (
        <div className="space-y-4">
          {sentInterests.map((interest) => (
            <div
              key={interest.id}
              className="bg-white dark:bg-brand-darksurface border border-slate-200 dark:border-brand-darkborder rounded-3xl p-6 sm:p-7 shadow-soft space-y-4"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-brand-darkborder">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-slate-50 dark:bg-brand-darkelevated p-1 border border-slate-200 dark:border-brand-darkborder shadow-2xs">
                    <PetAvatar avatarId={interest.receiverPetAvatarId} className="w-full h-full" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-brand-navy dark:text-white">
                      Proposal to {interest.receiverPetName}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-brand-darkmuted">
                      Sent on behalf of {interest.senderPetName} &bull;{" "}
                      {new Date(interest.sentAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div>
                  {interest.status === "pending" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Pending Guardian Review</span>
                    </span>
                  )}
                  {interest.status === "accepted" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Proposal Accepted!</span>
                    </span>
                  )}
                  {interest.status === "declined" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 dark:bg-brand-darkelevated dark:text-brand-darkmuted border border-slate-200">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Declined</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-brand-darkelevated/60 border border-slate-200/80 dark:border-brand-darkborder text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                &ldquo;{interest.message}&rdquo;
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>Receiver: {interest.receiverOwnerEmail}</span>
                <Link
                  href={`/pets/${interest.receiverPetId}`}
                  className="font-semibold text-brand-deep dark:text-brand-sky hover:underline"
                >
                  View Companion Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white dark:bg-brand-darksurface border border-slate-200 dark:border-brand-darkborder rounded-3xl space-y-4 shadow-soft">
          <div className="flex justify-center">
            <EmptyStateIllustration type="interests" className="w-36 h-36" />
          </div>
          <h3 className="font-heading font-bold text-lg text-brand-navy dark:text-white">
            No Sent Inquiries
          </h3>
          <p className="text-xs text-slate-500 dark:text-brand-darkmuted max-w-sm mx-auto">
            You haven&apos;t sent any companion proposals yet. Explore pet profiles and click &quot;Express
            Interest&quot; to reach out.
          </p>
          <div className="pt-2">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-deep hover:bg-brand-navy shadow-xs"
            >
              <span>Explore Directory</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}


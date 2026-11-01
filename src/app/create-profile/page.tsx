"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PetAvatar, AVAILABLE_AVATARS } from "@/components/illustrations/PetAvatar";
import { saveNewPet, getCurrentUser } from "@/lib/storage";
import { useToast } from "@/context/ToastContext";
import { PetSpecies, PetGender, PetSize } from "@/types";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  MapPin,
} from "lucide-react";

export default function CreateProfilePage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form State
  // Step 1: Basic Information
  const [name, setName] = useState("");
  const [species, setSpecies] = useState<PetSpecies>("cat");
  const [gender, setGender] = useState<PetGender>("Male");
  const [age, setAge] = useState("2 years");
  const [breed, setBreed] = useState("");

  // Step 2: Appearance
  const [coatColor, setCoatColor] = useState("");
  const [size, setSize] = useState<PetSize>("Medium");
  const [weight, setWeight] = useState("10 lbs");
  const [avatarId, setAvatarId] = useState("cat-persian-white");

  // Step 3: Personality
  const personalityOptions = [
    "Friendly",
    "Playful",
    "Calm",
    "Energetic",
    "Social",
    "Independent",
    "Gentle",
    "Affectionate",
    "Curious",
    "Lap-lover",
    "Intelligent",
    "Vocal",
  ];
  const [selectedPersonality, setSelectedPersonality] = useState<string[]>([
    "Friendly",
    "Playful",
  ]);

  // Step 4: Additional Details
  const [vaccinated, setVaccinated] = useState(true);
  const [spayedNeutered, setSpayedNeutered] = useState(true);
  const [medicalNotes, setMedicalNotes] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("Seattle");
  const [state, setState] = useState("WA");

  // Handle personality toggle
  const togglePersonalityTrait = (trait: string) => {
    if (selectedPersonality.includes(trait)) {
      if (selectedPersonality.length > 1) {
        setSelectedPersonality(selectedPersonality.filter((t) => t !== trait));
      }
    } else {
      setSelectedPersonality([...selectedPersonality, trait]);
    }
  };

  // Switch species automatically updates recommended default avatar
  const handleSpeciesChange = (newSpecies: PetSpecies) => {
    setSpecies(newSpecies);
    if (newSpecies === "cat" && !avatarId.startsWith("cat")) {
      setAvatarId("cat-persian-white");
    } else if (newSpecies === "dog" && !avatarId.startsWith("dog")) {
      setAvatarId("dog-golden-retriever");
    }
  };

  // Step Validation
  const canGoNext = () => {
    if (currentStep === 1) {
      return name.trim().length > 0 && breed.trim().length > 0;
    }
    if (currentStep === 2) {
      return coatColor.trim().length > 0 && weight.trim().length > 0;
    }
    if (currentStep === 3) {
      return selectedPersonality.length > 0;
    }
    if (currentStep === 4) {
      return bio.trim().length > 15 && city.trim().length > 0 && state.trim().length > 0;
    }
    return true;
  };

  const handleNext = () => {
    if (canGoNext()) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePublish = () => {
    setIsSubmitting(true);
    const currentUser = getCurrentUser();

    // Calculate approximate age in months
    const ageNum = parseFloat(age) || 2;
    const ageMonths = Math.round(ageNum * 12);

    const newPet = saveNewPet({
      name: name.trim(),
      species,
      breed: breed.trim(),
      gender,
      age,
      ageMonths,
      location: `${city.trim()}, ${state.trim()}`,
      city: city.trim(),
      state: state.trim(),
      coatColor: coatColor.trim(),
      size,
      weight: weight.trim(),
      avatarId,
      personality: selectedPersonality,
      vaccinated,
      spayedNeutered,
      medicalNotes: medicalNotes.trim() || "Fully vaccinated with veterinary health record on file.",
      bio: bio.trim(),
      ownerId: currentUser?.id || "current-demo-user",
      ownerName: currentUser?.fullName || "Alexander Wright",
      ownerEmail: currentUser?.email || "alexander.wright@cagod.com",
      ownerVerified: true,
      isFeatured: false,
    });

    setIsSubmitting(false);
    showToast(
      "Profile Published!",
      `${newPet.name}'s profile is now visible in the companion directory.`,
      "success"
    );
    router.push(`/pets/${newPet.id}`);
  };

  // Available avatars matching species
  const relevantAvatars = AVAILABLE_AVATARS.filter((a) => a.species === species);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-brand-darknavy text-slate-800 dark:text-slate-100 transition-colors">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-b from-brand-ice/60 to-white dark:from-brand-darksurface dark:to-brand-darknavy pt-8 pb-10 border-b border-slate-200/80 dark:border-brand-darkborder">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-ice dark:bg-brand-darkelevated text-xs font-semibold text-brand-deep dark:text-brand-sky">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pet Registration Wizard</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-navy dark:text-white tracking-tight">
            Create Your Pet&apos;s Profile
          </h1>
          <p className="text-sm text-slate-600 dark:text-brand-darkmuted max-w-lg mx-auto">
            Build an elegant, detailed profile to help other caring guardians discover your pet&apos;s
            unique personality and compatible traits.
          </p>

          {/* Stepper Progress Bar */}
          <div className="pt-6 max-w-xl mx-auto">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-brand-darkborder -z-0" />
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-deep dark:bg-brand-sky transition-all duration-300 -z-0"
                style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
              />

              {[1, 2, 3, 4, 5].map((stepNum) => {
                const isPassed = stepNum < currentStep;
                const isCurrent = stepNum === currentStep;
                return (
                  <button
                    key={stepNum}
                    type="button"
                    onClick={() => {
                      if (stepNum < currentStep) setCurrentStep(stepNum);
                    }}
                    className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isPassed
                        ? "bg-brand-deep text-white"
                        : isCurrent
                        ? "bg-brand-deep dark:bg-brand-sky text-white dark:text-brand-navy ring-4 ring-brand-ice dark:ring-brand-darkelevated"
                        : "bg-slate-200 dark:bg-brand-darkelevated text-slate-500 dark:text-brand-darkmuted"
                    }`}
                  >
                    {isPassed ? <Check className="w-4 h-4" /> : stepNum}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-brand-darkmuted mt-2">
              <span>Basic Info</span>
              <span>Appearance</span>
              <span>Personality</span>
              <span>Health & Details</span>
              <span>Preview</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Wizard Form Body */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <div className="bg-white dark:bg-brand-darksurface border border-slate-200 dark:border-brand-darkborder rounded-3xl p-6 sm:p-10 shadow-soft">
          {/* STEP 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 dark:border-brand-darkborder pb-4">
                <h2 className="font-heading font-bold text-xl text-brand-navy dark:text-white">
                  Step 1: Basic Information
                </h2>
                <p className="text-xs text-slate-500 dark:text-brand-darkmuted mt-0.5">
                  Introduce your pet&apos;s name, species, gender, and breed line.
                </p>
              </div>

              {/* Species Toggle */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted">
                  Pet Species *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSpeciesChange("cat")}
                    className={`p-4 rounded-2xl border text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                      species === "cat"
                        ? "border-brand-deep bg-brand-ice dark:bg-brand-darkelevated text-brand-deep dark:text-brand-cyan shadow-xs ring-2 ring-brand-deep"
                        : "border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated text-slate-600 dark:text-brand-darkmuted"
                    }`}
                  >
                    <span>Feline (Cat)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSpeciesChange("dog")}
                    className={`p-4 rounded-2xl border text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                      species === "dog"
                        ? "border-brand-deep bg-brand-ice dark:bg-brand-darkelevated text-brand-deep dark:text-brand-cyan shadow-xs ring-2 ring-brand-deep"
                        : "border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated text-slate-600 dark:text-brand-darkmuted"
                    }`}
                  >
                    <span>Canine (Dog)</span>
                  </button>
                </div>
              </div>

              {/* Pet Name */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted">
                  Pet Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jasper, Cleo, Oliver..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated text-sm text-brand-navy dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>

              {/* Gender and Age */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted">
                    Gender *
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as PetGender)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated text-sm text-brand-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted">
                    Age *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2 years, 1.5 years..."
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated text-sm text-brand-navy dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-sky"
                  />
                </div>
              </div>

              {/* Breed */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted">
                  Breed *
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    species === "cat"
                      ? "e.g. Persian Classic, British Shorthair, Siamese..."
                      : "e.g. Golden Retriever, Pembroke Welsh Corgi, Samoyed..."
                  }
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated text-sm text-brand-navy dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Appearance & Illustrated Avatar */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 dark:border-brand-darkborder pb-4">
                <h2 className="font-heading font-bold text-xl text-brand-navy dark:text-white">
                  Step 2: Appearance & Illustrated Avatar
                </h2>
                <p className="text-xs text-slate-500 dark:text-brand-darkmuted mt-0.5">
                  Select a bespoke 2D vector illustrated avatar that captures your pet&apos;s likeness.
                </p>
              </div>

              {/* Avatar Selection Grid */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted">
                  Choose 2D Illustrated Avatar *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {relevantAvatars.map((item) => {
                    const isSelected = avatarId === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setAvatarId(item.id)}
                        className={`p-3 rounded-2xl border flex flex-col items-center text-center transition-all ${
                          isSelected
                            ? "border-brand-deep bg-brand-ice dark:bg-brand-darkelevated ring-2 ring-brand-deep shadow-xs"
                            : "border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated hover:border-brand-sky/50"
                        }`}
                      >
                        <div className="w-16 h-16 rounded-full bg-white dark:bg-brand-darksurface p-1 shadow-2xs mb-2">
                          <PetAvatar
                            avatarId={item.id}
                            species={item.species}
                            className="w-full h-full"
                          />
                        </div>
                        <span className="text-xs font-semibold text-brand-navy dark:text-white">
                          {item.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Coat Color */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted">
                  Coat Color & Markings *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cream White, Warm Honey Gold, Silver Tabby..."
                  value={coatColor}
                  onChange={(e) => setCoatColor(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated text-sm text-brand-navy dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>

              {/* Size & Weight */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted">
                    Size Category *
                  </label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value as PetSize)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated text-sm text-brand-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
                  >
                    <option value="Small">Small (under 15 lbs)</option>
                    <option value="Medium">Medium (15 to 45 lbs)</option>
                    <option value="Large">Large (45+ lbs)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted">
                    Approximate Weight *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 10.5 lbs, 55 lbs..."
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated text-sm text-brand-navy dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-sky"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Personality Traits */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 dark:border-brand-darkborder pb-4">
                <h2 className="font-heading font-bold text-xl text-brand-navy dark:text-white">
                  Step 3: Personality & Habits
                </h2>
                <p className="text-xs text-slate-500 dark:text-brand-darkmuted mt-0.5">
                  Select all traits that best describe your pet&apos;s daily mood and play style.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {personalityOptions.map((trait) => {
                  const isChecked = selectedPersonality.includes(trait);
                  return (
                    <button
                      key={trait}
                      type="button"
                      onClick={() => togglePersonalityTrait(trait)}
                      className={`p-3.5 rounded-2xl border text-xs font-semibold flex items-center justify-between transition-all ${
                        isChecked
                          ? "border-brand-deep bg-brand-ice dark:bg-brand-darkelevated text-brand-deep dark:text-brand-cyan shadow-xs ring-1 ring-brand-deep"
                          : "border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated text-slate-600 dark:text-brand-darkmuted hover:border-brand-sky/40"
                      }`}
                    >
                      <span>{trait}</span>
                      {isChecked && <Check className="w-4 h-4 text-brand-deep dark:text-brand-cyan" />}
                    </button>
                  );
                })}
              </div>

              <p className="text-xs text-slate-500 dark:text-brand-darkmuted">
                Selected ({selectedPersonality.length}): {selectedPersonality.join(", ")}
              </p>
            </div>
          )}

          {/* STEP 4: Additional Details & Bio */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 dark:border-brand-darkborder pb-4">
                <h2 className="font-heading font-bold text-xl text-brand-navy dark:text-white">
                  Step 4: Health & Guardian Story
                </h2>
                <p className="text-xs text-slate-500 dark:text-brand-darkmuted mt-0.5">
                  Provide verified health declarations, location, and your pet&apos;s biography.
                </p>
              </div>

              {/* Health Checkboxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated cursor-pointer">
                  <input
                    type="checkbox"
                    checked={vaccinated}
                    onChange={(e) => setVaccinated(e.target.checked)}
                    className="w-4 h-4 text-brand-deep rounded-sm border-slate-300 focus:ring-brand-sky"
                  />
                  <span className="text-xs font-semibold text-brand-navy dark:text-white">
                    Core Vaccinations Up to Date
                  </span>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated cursor-pointer">
                  <input
                    type="checkbox"
                    checked={spayedNeutered}
                    onChange={(e) => setSpayedNeutered(e.target.checked)}
                    className="w-4 h-4 text-brand-deep rounded-sm border-slate-300 focus:ring-brand-sky"
                  />
                  <span className="text-xs font-semibold text-brand-navy dark:text-white">
                    Spayed / Neutered
                  </span>
                </label>
              </div>

              {/* Location: City and State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Seattle, Austin, Chicago"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated text-sm text-brand-navy dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-sky"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted">
                    State or Province *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. WA, TX, IL, CA"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated text-sm text-brand-navy dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-sky"
                  />
                </div>
              </div>

              {/* Medical Information Notes */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted">
                  Veterinary Disclosures (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dental cleaning passed in March, heartworm prevention current..."
                  value={medicalNotes}
                  onChange={(e) => setMedicalNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated text-sm text-brand-navy dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>

              {/* About Pet Bio */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-darkmuted">
                  Biography & Daily Habits *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share what makes your pet special, their favorite toys, park habits, and what companion temperament would suit them best..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-brand-darkborder bg-slate-50 dark:bg-brand-darkelevated text-sm text-brand-navy dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-sky resize-none"
                />
              </div>
            </div>
          )}

          {/* STEP 5: Live Preview & Confirmation */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 dark:border-brand-darkborder pb-4">
                <h2 className="font-heading font-bold text-xl text-brand-navy dark:text-white">
                  Step 5: Profile Preview
                </h2>
                <p className="text-xs text-slate-500 dark:text-brand-darkmuted mt-0.5">
                  Review your completed profile before publishing to the live companion network.
                </p>
              </div>

              {/* Preview Card */}
              <div className="bg-slate-50 dark:bg-brand-darkelevated border border-slate-200 dark:border-brand-darkborder rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="w-28 h-28 rounded-full bg-white dark:bg-brand-darksurface p-2 border border-slate-200 dark:border-brand-darkborder shadow-xs flex-shrink-0">
                    <PetAvatar
                      avatarId={avatarId}
                      species={species}
                      className="w-full h-full"
                    />
                  </div>

                  <div className="space-y-2 text-center sm:text-left flex-1">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <span className="text-xs uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-brand-navy text-white dark:bg-brand-sky dark:text-brand-navy">
                        {species === "cat" ? "Cat" : "Dog"}
                      </span>
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verified</span>
                      </span>
                    </div>

                    <h3 className="font-heading font-extrabold text-2xl text-brand-navy dark:text-white">
                      {name || "Your Pet"}
                    </h3>

                    <p className="text-sm font-semibold text-brand-deep dark:text-brand-sky">
                      {breed} &bull; {gender} &bull; {age}
                    </p>

                    <p className="text-xs text-slate-500 dark:text-brand-darkmuted flex items-center justify-center sm:justify-start gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{city}, {state}</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200/80 dark:border-brand-darkborder">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Story & Character
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                    {bio}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Personality Traits
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPersonality.map((trait) => (
                      <span
                        key={trait}
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white dark:bg-brand-darksurface border border-slate-200 dark:border-brand-darkborder text-brand-deep dark:text-brand-cyan"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-white dark:bg-brand-darksurface border border-slate-200 dark:border-brand-darkborder flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Vaccinated: {vaccinated ? "Yes" : "Pending"}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-brand-darksurface border border-slate-200 dark:border-brand-darkborder flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Sterilized: {spayedNeutered ? "Yes" : "No"}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-100 dark:border-brand-darkborder">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-brand-darkmuted hover:bg-slate-100 dark:hover:bg-brand-darkelevated transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canGoNext()}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-deep hover:bg-brand-navy transition-all shadow-sm disabled:opacity-50"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePublish}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl text-xs font-bold text-white bg-brand-deep hover:bg-brand-navy transition-all shadow-md disabled:opacity-50"
              >
                <Check className="w-4 h-4" />
                <span>{isSubmitting ? "Publishing Profile..." : "Publish Companion Profile"}</span>
              </button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


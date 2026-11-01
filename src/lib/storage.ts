import { Pet, Owner, Interest, InterestStatus } from "@/types";
import { INITIAL_PETS, DEMO_USER, INITIAL_INTERESTS } from "@/data/dummyPets";

const KEYS = {
  PETS: "cagod_pets_v1",
  FAVORITES: "cagod_favorites_v1",
  INTERESTS: "cagod_interests_v1",
  RECENTLY_VIEWED: "cagod_recently_viewed_v1",
  USER: "cagod_current_user_v1",
  USERS_LIST: "cagod_users_v1",
  THEME: "cagod_theme_v1",
  NEWSLETTER: "cagod_newsletter_v1",
};

// Dispatch event for reactive updates in client components
const notifyStorageChange = (key: string) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("cagod_storage_change", { detail: { key } }));
  }
};

// ================= PETS =================
export const getStoredPets = (): Pet[] => {
  if (typeof window === "undefined") return INITIAL_PETS;
  try {
    const raw = localStorage.getItem(KEYS.PETS);
    if (!raw) {
      localStorage.setItem(KEYS.PETS, JSON.stringify(INITIAL_PETS));
      return INITIAL_PETS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_PETS;
  } catch {
    return INITIAL_PETS;
  }
};

export const getStoredPetById = (id: string): Pet | undefined => {
  const pets = getStoredPets();
  return pets.find((p) => p.id === id);
};

export const saveNewPet = (pet: Omit<Pet, "id" | "createdAt">): Pet => {
  const pets = getStoredPets();
  const newPet: Pet = {
    ...pet,
    id: `pet-custom-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  const updated = [newPet, ...pets];
  if (typeof window !== "undefined") {
    localStorage.setItem(KEYS.PETS, JSON.stringify(updated));
    notifyStorageChange(KEYS.PETS);
  }
  return newPet;
};

export const updateStoredPet = (updatedPet: Pet): void => {
  const pets = getStoredPets();
  const index = pets.findIndex((p) => p.id === updatedPet.id);
  if (index !== -1) {
    pets[index] = updatedPet;
    if (typeof window !== "undefined") {
      localStorage.setItem(KEYS.PETS, JSON.stringify(pets));
      notifyStorageChange(KEYS.PETS);
    }
  }
};

export const deleteStoredPet = (petId: string): void => {
  const pets = getStoredPets();
  const filtered = pets.filter((p) => p.id !== petId);
  if (typeof window !== "undefined") {
    localStorage.setItem(KEYS.PETS, JSON.stringify(filtered));
    notifyStorageChange(KEYS.PETS);
  }
};

// Reset to original demo dataset
export const resetToDemoData = (): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(KEYS.PETS, JSON.stringify(INITIAL_PETS));
    localStorage.setItem(KEYS.INTERESTS, JSON.stringify(INITIAL_INTERESTS));
    localStorage.setItem(KEYS.FAVORITES, JSON.stringify(["pet-cat-02", "pet-dog-01"]));
    localStorage.setItem(KEYS.USER, JSON.stringify(DEMO_USER));
    notifyStorageChange(KEYS.PETS);
  }
};

// ================= FAVORITES =================
export const getStoredFavorites = (): string[] => {
  if (typeof window === "undefined") return ["pet-cat-02", "pet-dog-01"];
  try {
    const raw = localStorage.getItem(KEYS.FAVORITES);
    if (!raw) {
      const initial = ["pet-cat-02", "pet-dog-01"];
      localStorage.setItem(KEYS.FAVORITES, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const isPetFavorite = (petId: string): boolean => {
  const favs = getStoredFavorites();
  return favs.includes(petId);
};

export const toggleStoredFavorite = (petId: string): boolean => {
  const favs = getStoredFavorites();
  const exists = favs.includes(petId);
  const updated = exists ? favs.filter((id) => id !== petId) : [...favs, petId];
  if (typeof window !== "undefined") {
    localStorage.setItem(KEYS.FAVORITES, JSON.stringify(updated));
    notifyStorageChange(KEYS.FAVORITES);
  }
  return !exists;
};

// ================= INTERESTS =================
export const getStoredInterests = (): Interest[] => {
  if (typeof window === "undefined") return INITIAL_INTERESTS;
  try {
    const raw = localStorage.getItem(KEYS.INTERESTS);
    if (!raw) {
      localStorage.setItem(KEYS.INTERESTS, JSON.stringify(INITIAL_INTERESTS));
      return INITIAL_INTERESTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_INTERESTS;
  }
};

export const sendNewInterest = (interestData: Omit<Interest, "id" | "status" | "sentAt">): Interest => {
  const current = getStoredInterests();
  const newInterest: Interest = {
    ...interestData,
    id: `interest-${Date.now()}`,
    status: "pending",
    sentAt: new Date().toISOString(),
  };
  const updated = [newInterest, ...current];
  if (typeof window !== "undefined") {
    localStorage.setItem(KEYS.INTERESTS, JSON.stringify(updated));
    notifyStorageChange(KEYS.INTERESTS);
  }
  return newInterest;
};

export const updateInterestStatus = (interestId: string, status: InterestStatus): void => {
  const list = getStoredInterests();
  const index = list.findIndex((i) => i.id === interestId);
  if (index !== -1) {
    list[index].status = status;
    if (typeof window !== "undefined") {
      localStorage.setItem(KEYS.INTERESTS, JSON.stringify(list));
      notifyStorageChange(KEYS.INTERESTS);
    }
  }
};

// ================= RECENTLY VIEWED =================
export const getRecentlyViewedPetIds = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEYS.RECENTLY_VIEWED);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const addRecentlyViewedPet = (petId: string): void => {
  if (typeof window === "undefined") return;
  const list = getRecentlyViewedPetIds();
  const filtered = list.filter((id) => id !== petId);
  const updated = [petId, ...filtered].slice(0, 10);
  localStorage.setItem(KEYS.RECENTLY_VIEWED, JSON.stringify(updated));
  notifyStorageChange(KEYS.RECENTLY_VIEWED);
};

// ================= AUTH / USER =================
export const getCurrentUser = (): Owner | null => {
  if (typeof window === "undefined") return DEMO_USER;
  try {
    const raw = localStorage.getItem(KEYS.USER);
    if (!raw) {
      localStorage.setItem(KEYS.USER, JSON.stringify(DEMO_USER));
      return DEMO_USER;
    }
    return JSON.parse(raw);
  } catch {
    return DEMO_USER;
  }
};

export const setCurrentUser = (user: Owner | null): void => {
  if (typeof window === "undefined") return;
  if (user) {
    localStorage.setItem(KEYS.USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(KEYS.USER);
  }
  notifyStorageChange(KEYS.USER);
};

export const getStoredUsers = (): Owner[] => {
  if (typeof window === "undefined") return [DEMO_USER];
  try {
    const raw = localStorage.getItem(KEYS.USERS_LIST);
    if (!raw) {
      localStorage.setItem(KEYS.USERS_LIST, JSON.stringify([DEMO_USER]));
      return [DEMO_USER];
    }
    return JSON.parse(raw);
  } catch {
    return [DEMO_USER];
  }
};

export const registerNewOwner = (ownerData: Omit<Owner, "id" | "joinedDate">): Owner => {
  const users = getStoredUsers();
  const newOwner: Owner = {
    ...ownerData,
    id: `owner-${Date.now()}`,
    joinedDate: "November 2026",
  };
  users.push(newOwner);
  if (typeof window !== "undefined") {
    localStorage.setItem(KEYS.USERS_LIST, JSON.stringify(users));
    setCurrentUser(newOwner);
  }
  return newOwner;
};

// ================= THEME =================
export const getStoredTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "dark";
  return (localStorage.getItem(KEYS.THEME) as "light" | "dark") || "dark";
};

export const setStoredTheme = (theme: "light" | "dark"): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEYS.THEME, theme);
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  notifyStorageChange(KEYS.THEME);
};

// ================= NEWSLETTER =================
export const subscribeNewsletter = (email: string): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(KEYS.NEWSLETTER);
    const list: string[] = raw ? JSON.parse(raw) : [];
    if (!list.includes(email)) {
      list.push(email);
      localStorage.setItem(KEYS.NEWSLETTER, JSON.stringify(list));
      notifyStorageChange(KEYS.NEWSLETTER);
    }
    return true;
  } catch {
    return false;
  }
};


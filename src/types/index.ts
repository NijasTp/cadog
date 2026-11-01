export type PetSpecies = "cat" | "dog";
export type PetGender = "Male" | "Female";
export type PetSize = "Small" | "Medium" | "Large";

export interface Pet {
  id: string;
  name: string;
  species: PetSpecies;
  breed: string;
  gender: PetGender;
  age: string; // e.g. "2 years", "1.5 years", "3 years"
  ageMonths: number;
  location: string;
  city: string;
  state: string;
  coatColor: string;
  size: PetSize;
  weight: string;
  avatarId: string;
  personality: string[];
  vaccinated: boolean;
  spayedNeutered: boolean;
  medicalNotes: string;
  bio: string;
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  ownerVerified: boolean;
  isFeatured?: boolean;
  createdAt: string;
}

export interface Owner {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  joinedDate: string;
}

export type InterestStatus = "pending" | "accepted" | "declined";

export interface Interest {
  id: string;
  senderPetId: string;
  senderPetName: string;
  senderPetAvatarId: string;
  senderOwnerName: string;
  senderOwnerEmail: string;
  receiverPetId: string;
  receiverPetName: string;
  receiverPetAvatarId: string;
  receiverOwnerEmail: string;
  message: string;
  status: InterestStatus;
  sentAt: string;
}

export interface FilterState {
  search: string;
  species: "all" | "cat" | "dog";
  gender: "all" | "Male" | "Female";
  breed: string;
  minAgeMonths: number;
  maxAgeMonths: number;
  location: string;
  personality: string[];
  sortBy: "newest" | "ageAsc" | "ageDesc" | "nameAsc";
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: "success" | "info" | "warning";
}


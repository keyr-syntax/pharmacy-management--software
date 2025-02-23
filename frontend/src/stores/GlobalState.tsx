import { create } from "zustand";
import { PharmacyUser } from "../types/types";

interface PharmacyUserApiResponse {
  usersList: PharmacyUser[] | null;
}

export const PharmacyUserGlobalState = create<PharmacyUserApiResponse>(() => ({
  usersList: null,
}));

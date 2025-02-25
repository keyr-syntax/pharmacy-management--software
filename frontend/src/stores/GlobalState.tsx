import { create } from "zustand";

import {
  PharmacyUser,
  EditPharmacyUser,
  RegisterUserformInput,
} from "../types/types";

interface PharmacyUserApiResponse {
  usersList: PharmacyUser[] | null;
}

interface RegisterPharmacyUserApiResponse {
  registerUserFormData: RegisterUserformInput | null;
  loading: boolean;
}

interface EditPharmacyUserApiResponse {
  userDataForEdit: EditPharmacyUser | null;
  userEditID: number | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phoneNumber: string | null;
  role: string | null;
  isBlocked: string | null;
}

interface DeletedItemsApiResponse {
  deltedUsersList: PharmacyUser[] | null;
}
export const PharmacyUserGlobalState = create<PharmacyUserApiResponse>(() => ({
  usersList: null,
}));

export const EditPharmacyUserGlobalState = create<EditPharmacyUserApiResponse>(
  () => ({
    userDataForEdit: null,
    userEditID: null,
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null,
    role: null,
    isBlocked: null,
  })
);

export const DeletedItemsGlobalState = create<DeletedItemsApiResponse>(() => ({
  deltedUsersList: null,
}));

export const RegisterPharmacyUserGlobalState =
  create<RegisterPharmacyUserApiResponse>(() => ({
    registerUserFormData: null,
    loading: false,
  }));

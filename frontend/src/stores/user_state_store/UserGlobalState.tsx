import { create } from "zustand";

import {
  PharmacyUser,
  EditPharmacyUser,
  RegisterUserformInput,
  UpdateUserProfileformInput,
} from "../../types/userTypes";

interface PharmacyUserApiResponse {
  usersList: PharmacyUser[] | null;
  loading: boolean;
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
  loading: boolean;
}

interface DeletedItemsApiResponse {
  deltedUsersList: PharmacyUser[] | null;
  loading: boolean;
}

interface UpdateUserProfileApiResponse {
  UpdateUserProfile: UpdateUserProfileformInput | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phoneNumber: string | null;
  loading: boolean;
}

export const PharmacyUserGlobalState = create<PharmacyUserApiResponse>(() => ({
  usersList: null,
  loading: false,
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
    loading: false,
  })
);

export const DeletedItemsGlobalState = create<DeletedItemsApiResponse>(() => ({
  deltedUsersList: null,
  loading: false,
}));

export const RegisterPharmacyUserGlobalState =
  create<RegisterPharmacyUserApiResponse>(() => ({
    registerUserFormData: null,
    loading: false,
  }));

export const UpdatePharmacyUserProfileGlobalState =
  create<UpdateUserProfileApiResponse>(() => ({
    UpdateUserProfile: null,
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null,
    loading: false,
  }));

import { create } from "zustand";
import { PharmacyUser, EditPharmacyUser } from "../types/types";
import { baseURL } from "@/lib/utils";
import toast from "react-hot-toast";

interface PharmacyUserApiResponse {
  usersList: PharmacyUser[] | null;
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
  updatePharmacyUser: (
    userID: number,
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    phoneNumber: string | null,
    role: string | null,
    isBlocked: string | null
  ) => Promise<void>;
}

interface DeletedItemsApiResponse {
  deltedUsersList: PharmacyUser[] | null;
}
export const PharmacyUserGlobalState = create<PharmacyUserApiResponse>(() => ({
  usersList: null,
}));

export const EditPharmacyUserGlobalState = create<EditPharmacyUserApiResponse>(
  (set) => ({
    userDataForEdit: null,
    userEditID: null,
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null,
    role: null,
    isBlocked: null,
    updatePharmacyUser: async (
      userID: number,
      firstName: string | null,
      lastName: string | null,
      email: string | null,
      phoneNumber: string | null,
      role: string | null,
      isBlocked: string | null
    ) => {
      try {
        const data = await fetch(
          `${baseURL}/pharmacy_user/admin/update_user_profile/${userID}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              email: email,
              phoneNumber: phoneNumber,
              role: role,
              isBlocked: isBlocked,
            }),
          }
        );

        const response = await data.json();
        if (response.success) {
          toast.success(response.message);
          set({
            userEditID: null,
            firstName: null,
            lastName: null,
            email: null,
            phoneNumber: null,
            role: null,
            isBlocked: null,
          });
          PharmacyUserGlobalState.setState({ usersList: response.users });
        } else {
          toast.error(response.message);
          set({
            userEditID: null,

            firstName: null,
            lastName: null,
            email: null,
            phoneNumber: null,
            role: null,
            isBlocked: null,
          });
          // PharmacyUserGlobalState.setState({ usersList: null });
        }
      } catch (error) {
        console.log("Error while fetching pharmacy users", error);
        set({
          userEditID: null,
          firstName: null,
          lastName: null,
          email: null,
          phoneNumber: null,
          role: null,
          isBlocked: null,
        });
        // PharmacyUserGlobalState.setState({ usersList: null });
      }
    },
  })
);

export const DeletedItemsGlobalState = create<DeletedItemsApiResponse>(() => ({
  deltedUsersList: null,
}));

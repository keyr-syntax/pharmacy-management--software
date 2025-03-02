import { baseURL } from "@/lib/utils";
import toast from "react-hot-toast";

import {
  PharmacyUserGlobalState,
  EditPharmacyUserGlobalState,
  DeletedItemsGlobalState,
  RegisterPharmacyUserGlobalState,
  UpdatePharmacyUserProfileGlobalState,
} from "@/stores/user_state_store/UserGlobalState";
import { RegisterUserformInput } from "@/types/userTypes";

export const HandleRegisterPharmacyUser = async (
  formData: RegisterUserformInput
): Promise<boolean> => {
  RegisterPharmacyUserGlobalState.setState({ loading: true });
  console.log("firstName", formData.firstName);
  try {
    const data = await fetch(`${baseURL}/pharmacy_user/create_user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        role: formData.role,
        isBlocked: formData.isBlocked,
      }),
    });
    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }

    const response = await data.json();

    if (response.success) {
      toast.success(response.message);

      RegisterPharmacyUserGlobalState.setState({ loading: false });
      localStorage.setItem(
        "name",
        `${response.user.firstName} ${response.user.lastName}`
      );
      console.log("formData", formData);
      return true;
    } else {
      toast.error(response.message);
      RegisterPharmacyUserGlobalState.setState({ loading: false });
      return false;
    }
  } catch (error) {
    console.log("Error while submitting form data", error);
    RegisterPharmacyUserGlobalState.setState({ loading: false });
    return false;
  }
};
export const getAllPharmacyUsers = async () => {
  try {
    const data = await fetch(`${baseURL}/pharmacy_user/admin/fetch_all_users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const response = await data.json();

    if (response.success) {
      PharmacyUserGlobalState.setState({ usersList: response.users });
    } else {
      toast.error(response.message);
      PharmacyUserGlobalState.setState({ usersList: null });
    }
  } catch (error) {
    console.log("Error while fetching pharmacy users", error);
    PharmacyUserGlobalState.setState({ usersList: null });
  }
};
export const findPharmacyUserByID = async (userID: number): Promise<void> => {
  try {
    const data = await fetch(
      `${baseURL}/pharmacy_user/admin/fetch_user_byid/${userID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const response = await data.json();
    if (response.success) {
      EditPharmacyUserGlobalState.setState({
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        email: response.user.email,
        phoneNumber: response.user.phoneNumber,
        role: response.user.role,
        isBlocked: response.user.isBlocked,
      });
    } else {
      toast.error(response.message);
      EditPharmacyUserGlobalState.setState({
        firstName: null,
        lastName: null,
        email: null,
        phoneNumber: null,
        role: null,
        isBlocked: null,
      });
    }
  } catch (error) {
    console.log("Error while fetching pharmacy users", error);
    EditPharmacyUserGlobalState.setState({
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: null,
      role: null,
      isBlocked: null,
    });
  }
};
export const DeletePharmacyUserByAdmin = async (
  userID: number
): Promise<void> => {
  if (window.confirm("Are you sure?")) {
    try {
      const data = await fetch(
        `${baseURL}/pharmacy_user/admin/delete_user/${userID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const response = await data.json();
      if (response.success) {
        toast.success(response.message);
        PharmacyUserGlobalState.setState({ usersList: response.users });
      } else {
        toast.error(response.message);
        // PharmacyUserGlobalState.setState({ usersList: null });
      }
    } catch (error) {
      toast.error("Failed to delete user");
      console.log("Error while updating pharmacy users", error);
      // PharmacyUserGlobalState.setState({ usersList: null });
    }
  } else {
    return;
  }
};
export const getAllDeletedUsers = async () => {
  try {
    const data = await fetch(`${baseURL}/pharmacy_user/admin/deleted_items`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const response = await data.json();

    if (response.success) {
      DeletedItemsGlobalState.setState({ deltedUsersList: response.users });
    } else {
      toast.error(response.message);
      DeletedItemsGlobalState.setState({ deltedUsersList: null });
    }
  } catch (error) {
    console.log("Error while fetching pharmacy users", error);
    DeletedItemsGlobalState.setState({ deltedUsersList: null });
  }
};
export const undoDeletedPharmacyUser = async (
  userID: number
): Promise<void> => {
  if (window.confirm("Are you sure you want to undo deleted user?")) {
    try {
      const data = await fetch(
        `${baseURL}/pharmacy_user/admin/undo_deleted_user/${userID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const response = await data.json();
      if (response.success) {
        toast.success(response.message);
        DeletedItemsGlobalState.setState({ deltedUsersList: response.users });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to delete user");
      console.log("Error while updating pharmacy users", error);
    }
  } else {
    return;
  }
};
export const updatePharmacyUserByAdmin = async (
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
      EditPharmacyUserGlobalState.setState({
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
    }
  } catch (error) {
    console.log("Error while fetching pharmacy users", error);
    EditPharmacyUserGlobalState.setState({
      userEditID: null,
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: null,
      role: null,
      isBlocked: null,
    });
  }
};
export const findPharmacyUserByIDForProfileUpdate = async (): Promise<void> => {
  try {
    UpdatePharmacyUserProfileGlobalState.setState({
      loading: true,
    });
    const data = await fetch(
      `${baseURL}/pharmacy_user/fetch_user_byid_for_profile_update`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const response = await data.json();
    if (response.success) {
      UpdatePharmacyUserProfileGlobalState.setState({
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        email: response.user.email,
        phoneNumber: response.user.phoneNumber,
        loading: false,
      });
    } else {
      toast.error(response.message);
      UpdatePharmacyUserProfileGlobalState.setState({
        firstName: null,
        lastName: null,
        email: null,
        phoneNumber: null,
        loading: false,
      });
    }
  } catch (error) {
    console.log("Error while fetching pharmacy users", error);
    UpdatePharmacyUserProfileGlobalState.setState({
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: null,
      loading: false,
    });
  }
};

export const updatePharmacyUserProfile = async (
  firstName: string | null,
  lastName: string | null,
  email: string | null,
  phoneNumber: string | null
): Promise<void> => {
  UpdatePharmacyUserProfileGlobalState.setState({ loading: true });

  try {
    const data = await fetch(`${baseURL}/pharmacy_user/update_user_profile`, {
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
      }),
    });
    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }

    const response = await data.json();

    if (response.success) {
      toast.success(response.message);
      UpdatePharmacyUserProfileGlobalState.setState({
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        email: response.user.email,
        phoneNumber: response.user.phoneNumber,
        loading: false,
      });
      localStorage.setItem(
        "name",
        `${response.user.firstName} ${response.user.lastName}`
      );
    } else {
      toast.error(response.message);
      UpdatePharmacyUserProfileGlobalState.setState({ loading: false });
    }
  } catch (error) {
    console.log("Error while submitting form data", error);
    UpdatePharmacyUserProfileGlobalState.setState({ loading: false });
  }
};

export const logoutPharmacyUser = async (): Promise<boolean> => {
  try {
    const data = await fetch(`${baseURL}/pharmacy_user/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const response = await data.json();

    if (response.success) {
      toast.success(response.message);
      localStorage.removeItem("name");
      return true;
    } else {
      toast.error(response.message);
      return false;
    }
  } catch (error) {
    console.log("Error while logging-out user", error);
    toast.error("Failed to Logout user");
    return false;
  }
};

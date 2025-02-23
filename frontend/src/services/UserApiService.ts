import { baseURL } from "@/lib/utils";
import toast from "react-hot-toast";
import { PharmacyUserGlobalState } from "@/stores/GlobalState";

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

export const ApprovePharmacyUsers = async (userID: number): Promise<void> => {
  try {
    const data = await fetch(
      `${baseURL}/pharmacy_user/admin/approve_user/${userID}`,
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

export const BlockPharmacyUsers = async (userID: number): Promise<void> => {
  try {
    const data = await fetch(
      `${baseURL}/pharmacy_user/admin/block_user/${userID}`,
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

export const PromotePharmacyUserToAdmin = async (
  userID: number
): Promise<void> => {
  try {
    const data = await fetch(
      `${baseURL}/pharmacy_user/admin/promote_user_to_admin/${userID}`,
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
      PharmacyUserGlobalState.setState({ usersList: response.users });
    } else {
      toast.error(response.message);
      PharmacyUserGlobalState.setState({ usersList: null });
    }
  } catch (error) {
    console.log("Error while updating pharmacy users", error);
    PharmacyUserGlobalState.setState({ usersList: null });
  }
};

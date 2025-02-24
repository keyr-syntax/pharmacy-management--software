import { baseURL } from "@/lib/utils";
import toast from "react-hot-toast";
import {
  PharmacyUserGlobalState,
  EditPharmacyUserGlobalState,
} from "@/stores/GlobalState";

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

// export const updatePharmacyUser = async (
//   userID: number,
//   firstName: string | null,
//   lastName: string | null,
//   email: string | null,
//   phoneNumber: string | null,
//   role: string | null,
//   isBlocked: string | null
// ): Promise<void> => {
//   try {
//     const data = await fetch(
//       `${baseURL}/pharmacy_user/admin/update_user_profile/${userID}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({
//           firstName: firstName,
//           lastName: lastName,
//           email: email,
//           phoneNumber: phoneNumber,
//           role: role,
//           isBlocked: isBlocked,
//         }),
//       }
//     );

//     const response = await data.json();
//     if (response.success) {
//       toast.success(response.message);
//       PharmacyUserGlobalState.setState({ usersList: response.users });
//     } else {
//       toast.error(response.message);
//       PharmacyUserGlobalState.setState({ usersList: null });
//     }
//   } catch (error) {
//     console.log("Error while fetching pharmacy users", error);
//     PharmacyUserGlobalState.setState({ usersList: null });
//   }
// };

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
        PharmacyUserGlobalState.setState({ usersList: null });
      }
    } catch (error) {
      console.log("Error while updating pharmacy users", error);
      PharmacyUserGlobalState.setState({ usersList: null });
    }
  } else {
    return;
  }
};

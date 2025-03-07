// import { baseURL } from "@/lib/utils";
// import { DosageFormGlobalState } from "@/stores/product_state_store/ProductConstantsGlobalState";
// import toast from "react-hot-toast";

// export const createNewDosageForm = async (newDosageForm: string) => {
//   DosageFormGlobalState.setState({ loading: true });

//   try {
//     const data = await fetch(`${baseURL}/dosage_form/admin/new_dosage_form`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify({
//         dosageForm: newDosageForm,
//       }),
//     });

//     const response = await data.json();

//     if (response.success) {
//       toast.success(response.message);
//       DosageFormGlobalState.setState({
//         dosageFormList: response.allDosageForms,
//         loading: false,
//         dosageForm: null,
//         newDosageForm: null,
//       });
//     } else {
//       toast.error(response.message);
//       DosageFormGlobalState.setState({ loading: false });
//     }
//   } catch (error) {
//     console.log("Error while adding new dosage form", error);
//     DosageFormGlobalState.setState({ loading: false });
//   }
// };
// export const getAllDosageForms = async () => {
//   try {
//     const data = await fetch(`${baseURL}/dosage_form/find_all_dosage_forms`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//     });

//     const response = await data.json();

//     if (response.success) {
//       DosageFormGlobalState.setState({
//         dosageFormList: response.allDosageForms,
//       });
//     } else {
//       toast.error(response.message);
//     }
//   } catch (error) {
//     console.log("Error while fetching dosage forms", error);
//   }
// };
// export const findDosageFormByID = async (
//   dosageFormID: string
// ): Promise<void> => {
//   try {
//     const data = await fetch(
//       `${baseURL}/dosage_form/admin/find_dosage_form/${dosageFormID}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//       }
//     );

//     const response = await data.json();
//     if (response.success) {
//       console.log("response.dosageForm", response);
//       DosageFormGlobalState.setState({
//         dosageForm: response.dosageForm.dosageForm,
//       });
//     } else {
//       toast.error(response.message);
//       DosageFormGlobalState.setState({
//         dosageForm: null,
//         dosageFormIDForEdit: null,
//       });
//     }
//   } catch (error) {
//     console.log("Error while fetching dosage forms", error);
//     DosageFormGlobalState.setState({
//       dosageForm: null,
//       dosageFormIDForEdit: null,
//     });
//   }
// };
// export const DeleteDosageFormByAdmin = async (
//   dosageFormID: string
// ): Promise<void> => {
//   if (window.confirm("Are you sure you want to delete dosage form?")) {
//     try {
//       const data = await fetch(
//         `${baseURL}/dosage_form/admin/delete_dosage_form/${dosageFormID}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//         }
//       );

//       const response = await data.json();
//       if (response.success) {
//         toast.success(response.message);
//         DosageFormGlobalState.setState({
//           dosageFormList: response.allDosageForms,
//         });
//       } else {
//         toast.error(response.message);
//       }
//     } catch (error) {
//       toast.error("Failed to delete dosage form");
//       console.log("Error while deleting dosage form", error);
//     }
//   } else {
//     return;
//   }
// };
// export const getAllDeletedDosageForms = async () => {
//   try {
//     const data = await fetch(
//       `${baseURL}/dosage_form/admin/deleted_dosage_forms`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//       }
//     );

//     const response = await data.json();
//     if (response.success) {
//       DosageFormGlobalState.setState({
//         deletedDosageFormList: response.allDeletedDosageForms,
//       });
//     } else {
//       toast.error(response.message);
//     }
//   } catch (error) {
//     console.log("Error while fetching dosage forms", error);
//   }
// };
// export const undoDeletedDosageForms = async (
//   dosageFormID: string
// ): Promise<void> => {
//   if (window.confirm("Are you sure you want to undo dosage form?")) {
//     try {
//       const data = await fetch(
//         `${baseURL}/dosage_form/admin/restore_deleted_dosage_form/${dosageFormID}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//         }
//       );

//       const response = await data.json();
//       if (response.success) {
//         toast.success(response.message);
//         DosageFormGlobalState.setState({
//           deletedDosageFormList: response.allDosageForm,
//         });
//       } else {
//         toast.error(response.message);
//       }
//     } catch (error) {
//       toast.error("Failed to restore dosage form");
//       console.log("Error while updating dosage forms", error);
//     }
//   } else {
//     return;
//   }
// };
// export const updateDosageFormByAdmin = async (
//   dosageFormID: string,
//   dosageForm: string | null
// ) => {
//   try {
//     const data = await fetch(
//       `${baseURL}/dosage_form/admin/update_dosage_form/${dosageFormID}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({ dosageForm: dosageForm }),
//       }
//     );

//     const response = await data.json();
//     if (response.success) {
//       toast.success(response.message);
//       console.log(" response.allDosageForms", response);
//       DosageFormGlobalState.setState({
//         dosageForm: null,
//         dosageFormList: response.allDosageForms,
//         dosageFormIDForEdit: null,
//       });
//     } else {
//       toast.error(response.message);
//     }
//   } catch (error) {
//     console.log("Error while updating dosage form", error);
//   }
// };

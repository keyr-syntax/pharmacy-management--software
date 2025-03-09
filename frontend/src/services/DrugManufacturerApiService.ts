// import { baseURL } from "@/lib/utils";
// import { DrugManufacturerGlobalState } from "@/stores/product_state_store/DrugManufacturerGlobalState";
// import { DrugManufacturerFormData } from "@/types/productTypes";
// import toast from "react-hot-toast";

// export const createNewDrugManufacturer = async (
//   formData: DrugManufacturerFormData
// ): Promise<boolean> => {
//   DrugManufacturerGlobalState.setState({ loading: true });
//   try {
//     const data = await fetch(
//       `${baseURL}/drug_manufacturer/admin/new_drug_manufacturer`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({
//           manufacturerName: formData.manufacturerName,
//           contactName: formData.contactName,
//           phoneNumber: formData.phoneNumber,
//           licenseNumber: formData.licenseNumber,
//         }),
//       }
//     );
//     const response = await data.json();
//     if (response.success) {
//       toast.success(response.message);
//       DrugManufacturerGlobalState.setState({
//         drugManufacturerList: response.allDrugManufacturers,
//         loading: false,
//         manufacturerName: null,
//         contactName: null,
//         phoneNumber: null,
//         licenseNumber: null,
//       });
//       return true;
//     } else {
//       toast.error(response.message);
//       DrugManufacturerGlobalState.setState({ loading: false });
//       return false;
//     }
//   } catch (error) {
//     console.log("Error while adding new drug manufacturer", error);
//     DrugManufacturerGlobalState.setState({ loading: false });
//     return false;
//   }
// };
// export const getAllDrugManufacturers = async () => {
//   try {
//     const data = await fetch(
//       `${baseURL}/drug_manufacturer/find_all_drug_manufacturers`,
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
//       DrugManufacturerGlobalState.setState({
//         drugManufacturerList: response.allDrugManufacturers,
//       });
//     } else {
//       toast.error(response.message);
//     }
//   } catch (error) {
//     console.log("Error while fetching dosage forms", error);
//   }
// };
// export const findDrugManufacturerByID = async (
//   manufacturerID: string
// ): Promise<void> => {
//   try {
//     const data = await fetch(
//       `${baseURL}/drug_manufacturer/admin/find_drug_manufacturer/${manufacturerID}`,
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
//       DrugManufacturerGlobalState.setState({
//         manufacturerName: response.drugManufacturer.manufacturerName,
//         contactName: response.drugManufacturer.contactName,
//         phoneNumber: response.drugManufacturer.phoneNumber,
//         licenseNumber: response.drugManufacturer.licenseNumber,
//       });
//     } else {
//       toast.error(response.message);
//       DrugManufacturerGlobalState.setState({
//         drugManufacturerIDForEdit: null,
//         manufacturerName: null,
//         contactName: null,
//         phoneNumber: null,
//         licenseNumber: null,
//       });
//     }
//   } catch (error) {
//     console.log("Error while fetching drug manufacturers", error);
//     DrugManufacturerGlobalState.setState({
//       drugManufacturerIDForEdit: null,
//       manufacturerName: null,
//       contactName: null,
//       phoneNumber: null,
//       licenseNumber: null,
//     });
//   }
// };
// export const updateDrugManufacturerByAdmin = async (
//   manufacturerID: string,
//   formData: DrugManufacturerFormData
// ) => {
//   try {
//     const data = await fetch(
//       `${baseURL}/drug_manufacturer/admin/update_drug_manufacturer/${manufacturerID}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({
//           manufacturerName: formData.manufacturerName,
//           contactName: formData.contactName,
//           phoneNumber: formData.phoneNumber,
//           licenseNumber: formData.licenseNumber,
//         }),
//       }
//     );

//     const response = await data.json();
//     if (response.success) {
//       toast.success(response.message);
//       DrugManufacturerGlobalState.setState({
//         drugManufacturerList: response.allDrugManufacturers,
//         drugManufacturerIDForEdit: null,
//         manufacturerName: null,
//         contactName: null,
//         phoneNumber: null,
//         licenseNumber: null,
//       });
//     } else {
//       toast.error(response.message);
//     }
//   } catch (error) {
//     console.log("Error while updating drug manufacturer", error);
//   }
// };
// export const DeleteDrugManufacturer = async (
//   drugManufacturerID: string
// ): Promise<void> => {
//   if (window.confirm("Are you sure you want to delete dosage form?")) {
//     try {
//       const data = await fetch(
//         `${baseURL}/drug_manufacturer/admin/delete_drug_manufacturer/${drugManufacturerID}`,
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
//         DrugManufacturerGlobalState.setState({
//           drugManufacturerList: response.allDrugManufacturers,
//         });
//       } else {
//         toast.error(response.message);
//       }
//     } catch (error) {
//       toast.error("Failed to delete drug manufacturer");
//       console.log("Error while deleting drug manufacturer", error);
//     }
//   } else {
//     return;
//   }
// };
// export const getAllDeletedDrugManufacturers = async () => {
//   try {
//     const data = await fetch(
//       `${baseURL}/drug_manufacturer/admin/deleted_drug_manufacturers`,
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
//       DrugManufacturerGlobalState.setState({
//         deletedDrugManufacturerList: response.allDeletedDrugManufacturers,
//       });
//     } else {
//       toast.error(response.message);
//     }
//   } catch (error) {
//     console.log("Error while fetching drug manufacturers", error);
//   }
// };
// export const undoDeletedDrugManufacturer = async (
//   manufacturerID: string
// ): Promise<void> => {
//   if (window.confirm("Are you sure you want to undo drug manufacturer?")) {
//     try {
//       const data = await fetch(
//         `${baseURL}/drug_manufacturer/admin/restore_deleted_drug_manufacturer/${manufacturerID}`,
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
//         DrugManufacturerGlobalState.setState({
//           deletedDrugManufacturerList: response.allDrugManufacturers,
//         });
//       } else {
//         toast.error(response.message);
//       }
//     } catch (error) {
//       toast.error("Failed to restore drug manufacturer");
//       console.log("Error while updating drug manufacturer", error);
//     }
//   } else {
//     return;
//   }
// };

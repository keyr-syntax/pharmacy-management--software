import { baseURL } from "@/lib/utils";
import { ProductConstantsGlobalState } from "@/stores/product_state_store/ProductConstantsGlobalState";
import toast from "react-hot-toast";

export const getAllDosageForms = async () => {
  try {
    const data = await fetch(`${baseURL}/product_constants/dosage_forms`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const response = await data.json();

    if (response.success) {
      ProductConstantsGlobalState.setState({
        dosageFormList: response.allDosageForms,
      });
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    console.log("Error while fetching dosage forms", error);
  }
};

export const getAllDrugClasses = async () => {
  try {
    const data = await fetch(`${baseURL}/product_constants/drug_classes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const response = await data.json();

    if (response.success) {
      ProductConstantsGlobalState.setState({
        drugClassList: response.allDrugClasses,
      });
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    console.log("Error while fetching drug class", error);
  }
};

export const getAllRoutesOfDrugAdministration = async () => {
  try {
    const data = await fetch(
      `${baseURL}/product_constants/routes_of_drug_administration`,
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
      ProductConstantsGlobalState.setState({
        routesOfDrugAdministrationList: response.allRoutesOfDrugAdministration,
      });
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    console.log("Error while fetching drug class", error);
  }
};
export const getAllStorageConditions = async () => {
  try {
    const data = await fetch(
      `${baseURL}/product_constants/storage_conditions`,
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
      ProductConstantsGlobalState.setState({
        storageConditionsList: response.storageConditions,
      });
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    console.log("Error while fetching storage conditions", error);
  }
};

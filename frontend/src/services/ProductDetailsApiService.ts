import { baseURL } from "@/lib/utils";
import { AddandEditProductDetailsGlobalState } from "@/stores/product_state_store/ProductDetailsGlobalState";

import toast from "react-hot-toast";
import { ProductDetailsTypes } from "../types/productTypes";

export const createNewProduct = async (
  formData: ProductDetailsTypes
): Promise<boolean> => {
  AddandEditProductDetailsGlobalState.setState({ loading: true });
  try {
    const data = await fetch(`${baseURL}/drugs/admin/new_drug`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        genericName: formData.genericName,
        brandName: formData.brandName,
        dosageForm: formData.dosageForm,
        drugType: formData.drugType,
        dosageStrength: formData.dosageStrength,
        routeOfDrugAdministration: formData.routeOfDrugAdministration,
        unitsPerPack: formData.unitsPerPack,
        drugClass: formData.drugClass,
        status: formData.status,
      }),
    });
    const response = await data.json();
    if (response.success) {
      toast.success(response.message);
      AddandEditProductDetailsGlobalState.setState({
        productsList: response.allDrugs,
        genericName: null,
        brandName: null,
        dosageForm: null,
        drugType: null,
        dosageStrength: null,
        routeOfDrugAdministration: null,
        unitsPerPack: null,
        drugClass: null,
        status: null,
        loading: false,
      });
      return true;
    } else {
      toast.error(response.message);
      AddandEditProductDetailsGlobalState.setState({ loading: false });
      return false;
    }
  } catch (error) {
    console.log("Error while adding new product", error);
    AddandEditProductDetailsGlobalState.setState({ loading: false });
    return false;
  }
};
export const getAllProducts = async () => {
  try {
    AddandEditProductDetailsGlobalState.setState({
      loading: true,
    });
    const data = await fetch(`${baseURL}/drugs/find_all_drugs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const response = await data.json();

    if (response.success) {
      AddandEditProductDetailsGlobalState.setState({
        productsList: response.allDrugs,
        loading: false,
      });
    } else {
      toast.error(response.message);
      AddandEditProductDetailsGlobalState.setState({
        loading: false,
      });
    }
  } catch (error) {
    console.log("Error while fetching products", error);
    AddandEditProductDetailsGlobalState.setState({
      loading: false,
    });
  }
};
export const findProductByID = async (drugID: string): Promise<void> => {
  try {
    AddandEditProductDetailsGlobalState.setState({
      loading: true,
    });
    const data = await fetch(`${baseURL}/drugs/find_drug_by_ID/${drugID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const response = await data.json();
    if (response.success) {
      AddandEditProductDetailsGlobalState.setState({
        loading: false,
        genericName: response.drug.genericName,
        brandName: response.drug.brandName,
        dosageForm: response.drug.dosageForm,
        drugType: response.drug.drugType,
        dosageStrength: response.drug.dosageStrength,
        routeOfDrugAdministration: response.drug.routeOfDrugAdministration,
        unitsPerPack: response.drug.unitsPerPack,
        drugClass: response.drug.drugClass,
        status: response.drug.status,
      });
      console.log("response", response);
    } else {
      toast.error(response.message);
      AddandEditProductDetailsGlobalState.setState({
        loading: false,
        genericName: null,
        brandName: null,
        dosageForm: null,
        drugType: null,
        dosageStrength: null,
        routeOfDrugAdministration: null,
        unitsPerPack: null,
        drugClass: null,
        status: null,
      });
    }
  } catch (error) {
    console.log("Error while fetching drug manufacturers", error);
    AddandEditProductDetailsGlobalState.setState({
      loading: false,
      genericName: null,
      brandName: null,
      dosageForm: null,
      drugType: null,
      dosageStrength: null,
      routeOfDrugAdministration: null,
      unitsPerPack: null,
      drugClass: null,
      status: null,
    });
  }
};
export const updateProductByAdmin = async (
  drugID: string,
  formData: ProductDetailsTypes
): Promise<boolean> => {
  try {
    const data = await fetch(
      `${baseURL}/drugs/admin/update_drug_details/${drugID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          genericName: formData.genericName,
          brandName: formData.brandName,
          dosageForm: formData.dosageForm,
          drugType: formData.drugType,
          dosageStrength: formData.dosageStrength,
          routeOfDrugAdministration: formData.routeOfDrugAdministration,
          unitsPerPack: formData.unitsPerPack,
          drugClass: formData.drugClass,
          status: formData.status,
        }),
      }
    );

    const response = await data.json();
    if (response.success) {
      toast.success(response.message);
      AddandEditProductDetailsGlobalState.setState({
        productsList: response.allDrugs,
        genericName: null,
        brandName: null,
        dosageForm: null,
        drugType: null,
        dosageStrength: null,
        routeOfDrugAdministration: null,
        unitsPerPack: null,
        drugClass: null,
        status: null,
      });
      return true;
    } else {
      toast.error(response.message);
      AddandEditProductDetailsGlobalState.setState({
        loading: false,
      });
      return false;
    }
  } catch (error) {
    console.log("Error while updating drug manufacturer", error);
    AddandEditProductDetailsGlobalState.setState({
      loading: false,
    });
    return false;
  }
};
export const DeleteProduct = async (drugID: string): Promise<void> => {
  if (window.confirm("Are you sure you want to delete this product?")) {
    try {
      AddandEditProductDetailsGlobalState.setState({
        loading: true,
      });
      const data = await fetch(`${baseURL}/drugs/admin/delete_drug/${drugID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const response = await data.json();
      if (response.success) {
        toast.success(response.message);
        AddandEditProductDetailsGlobalState.setState({
          productsList: response.allDrugs,
          loading: false,
        });
      } else {
        toast.error(response.message);
        AddandEditProductDetailsGlobalState.setState({
          loading: false,
        });
      }
    } catch (error) {
      toast.error("Failed to delete product");
      console.log("Error while deleting product", error);
      AddandEditProductDetailsGlobalState.setState({
        loading: false,
      });
    }
  } else {
    return;
  }
};
export const getAllDeletedProducts = async () => {
  try {
    AddandEditProductDetailsGlobalState.setState({
      loading: true,
    });
    const data = await fetch(`${baseURL}/drugs/admin/find_all_deleted_drugs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const response = await data.json();
    if (response.success) {
      AddandEditProductDetailsGlobalState.setState({
        deletedProductsList: response.allDrugs,
        loading: false,
      });
    } else {
      toast.error(response.message);
      AddandEditProductDetailsGlobalState.setState({
        loading: false,
      });
    }
  } catch (error) {
    console.log("Error while fetching drug manufacturers", error);
    AddandEditProductDetailsGlobalState.setState({
      loading: false,
    });
  }
};
export const undoDeletedProducts = async (drugID: string): Promise<void> => {
  if (window.confirm("Are you sure you want to undo this product?")) {
    try {
      AddandEditProductDetailsGlobalState.setState({
        loading: true,
      });
      const data = await fetch(
        `${baseURL}/drugs/admin/restore_deleted_drug/${drugID}`,
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
        AddandEditProductDetailsGlobalState.setState({
          deletedProductsList: response.allDrugs,
          loading: false,
        });
      } else {
        toast.error(response.message);
        AddandEditProductDetailsGlobalState.setState({
          loading: false,
        });
      }
    } catch (error) {
      toast.error("Failed to restore product");
      console.log("Error restoring product", error);
      AddandEditProductDetailsGlobalState.setState({
        loading: false,
      });
    }
  } else {
    return;
  }
};

export const resetProductDetailsGlobalState = () => {
  AddandEditProductDetailsGlobalState.setState({
    loading: false,
    genericName: null,
    brandName: null,
    dosageForm: null,
    drugType: null,
    dosageStrength: null,
    routeOfDrugAdministration: null,
    unitsPerPack: null,
    drugClass: null,
    status: null,
  });
};

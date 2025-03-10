import { baseURL } from "@/lib/utils";
import { ProductPricingGlobalState } from "@/stores/product_state_store/ProductPricingGlobalState";

import toast from "react-hot-toast";
import { ProductPricingTypes } from "../types/productTypes";

export const createNewProductPricing = async (
  formData: ProductPricingTypes
): Promise<boolean> => {
  ProductPricingGlobalState.setState({
    loading: true,
  });

  try {
    const data = await fetch(`${baseURL}/drug_pricing/admin/new_drug_pricing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        drugID: formData.drugID,
        purchasePrice: formData.purchasePrice,
        sellingPrice: formData.sellingPrice,
        taxRate: formData.taxRate,
        margin: formData.margin,
        insuranceCoverage: formData.insuranceCoverage,
      }),
    });
    const response = await data.json();
    if (response.success) {
      toast.success(response.message);
      ProductPricingGlobalState.setState({
        drugID: null,
        purchasePrice: null,
        sellingPrice: null,
        taxRate: null,
        margin: null,
        insuranceCoverage: false,
        loading: false,
        pricingList: response.allPricings,
      });
      return true;
    } else {
      toast.error(response.message);
      ProductPricingGlobalState.setState({ loading: false });
      return false;
    }
  } catch (error) {
    console.log("Error while adding new product pricing", error);
    ProductPricingGlobalState.setState({ loading: false });
    return false;
  }
};

export const getAllProductPricings = async () => {
  try {
    ProductPricingGlobalState.setState({
      loading: true,
    });
    const data = await fetch(`${baseURL}/drug_pricing/find_all_pricings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const response = await data.json();

    if (response.success) {
      console.log("Product Pricing", response);
      ProductPricingGlobalState.setState({
        pricingList: response.allDrugPricing,
        loading: false,
      });
    } else {
      toast.error(response.message);
      ProductPricingGlobalState.setState({
        loading: false,
      });
    }
  } catch (error) {
    console.log("Error while fetching product pricings", error);
    ProductPricingGlobalState.setState({
      loading: false,
    });
  }
};

export const findProductPricingByID = async (
  pricingID: string
): Promise<void> => {
  try {
    ProductPricingGlobalState.setState({
      loading: true,
    });
    const data = await fetch(
      `${baseURL}/drug_pricing/admin/find_pricing/${pricingID}`,
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
      console.log("Product Pricing By ID", response);
      ProductPricingGlobalState.setState({
        loading: false,
        drugID: response.pricing.drugID,
        purchasePrice: response.pricing.purchasePrice,
        sellingPrice: response.pricing.sellingPrice,
        taxRate: response.pricing.taxRate,
        margin: response.pricing.margin,
        insuranceCoverage: response.pricing.insuranceCoverage,
      });
      console.log("response", response);
    } else {
      toast.error(response.message);
      ProductPricingGlobalState.setState({
        loading: false,
        drugID: null,
        purchasePrice: null,
        sellingPrice: null,
        taxRate: null,
        margin: null,
        insuranceCoverage: false,
      });
    }
  } catch (error) {
    console.log("Error while fetching product pricing", error);
    ProductPricingGlobalState.setState({
      loading: false,
      drugID: null,
      purchasePrice: null,
      sellingPrice: null,
      taxRate: null,
      margin: null,
      insuranceCoverage: false,
    });
  }
};

export const updateProductPricingByAdmin = async (
  pricingID: string,
  formData: ProductPricingTypes
): Promise<boolean> => {
  try {
    const data = await fetch(
      `${baseURL}/drug_pricing/admin/update_drug_pricing/${pricingID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          drugID: formData.drugID,
          purchasePrice: formData.purchasePrice,
          sellingPrice: formData.sellingPrice,
          taxRate: formData.taxRate,
          margin: formData.margin,
          insuranceCoverage: formData.insuranceCoverage,
        }),
      }
    );

    const response = await data.json();
    if (response.success) {
      toast.success(response.message);
      ProductPricingGlobalState.setState({
        drugID: null,
        purchasePrice: null,
        sellingPrice: null,
        taxRate: null,
        margin: null,
        insuranceCoverage: false,
        loading: false,
      });
      return true;
    } else {
      toast.error(response.message);
      ProductPricingGlobalState.setState({
        loading: false,
      });
      return false;
    }
  } catch (error) {
    console.log("Error while updating product pricing", error);
    ProductPricingGlobalState.setState({
      loading: false,
    });
    return false;
  }
};

export const deleteProductPricing = async (
  pricingID: string
): Promise<void> => {
  if (window.confirm("Are you sure you want to delete this Product Pricing?")) {
    try {
      const data = await fetch(
        `${baseURL}/drug_pricing/admin/delete_drug_pricing/${pricingID}`,
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
        ProductPricingGlobalState.setState({
          pricingList: response.allPricing,
        });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to delete Product Pricing");
      console.log("Error while deleting Product Pricing", error);
    }
  } else {
    return;
  }
};

export const getAllDeletedProductPricings = async () => {
  try {
    ProductPricingGlobalState.setState({
      loading: true,
    });
    const data = await fetch(
      `${baseURL}/drug_pricing/admin/deleted_drug_pricing`,
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
      ProductPricingGlobalState.setState({
        deletedPricingList: response.allPricing,
        loading: false,
      });
    } else {
      toast.error(response.message);
      ProductPricingGlobalState.setState({
        loading: false,
      });
    }
  } catch (error) {
    console.log("Error while fetching product pricings", error);
    ProductPricingGlobalState.setState({
      loading: false,
    });
  }
};

export const undoDeletedProductPricing = async (
  pricingID: string
): Promise<void> => {
  if (
    window.confirm("Are you sure you want to restore this Product Pricing?")
  ) {
    try {
      const data = await fetch(
        `${baseURL}/drug_pricing/admin/restore_deleted_pricing/${pricingID}`,
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
        ProductPricingGlobalState.setState({
          deletedPricingList: response.allPricing,
          loading: false,
        });
      } else {
        toast.error(response.message);
        ProductPricingGlobalState.setState({
          loading: false,
        });
      }
    } catch (error) {
      toast.error("Failed to restore product pricing");
      console.log("Error restoring product pricing", error);
      ProductPricingGlobalState.setState({
        loading: false,
      });
    }
  } else {
    return;
  }
};

export const resetPricingGlobalState = async () => {
  ProductPricingGlobalState.setState({
    drugID: null,
    purchasePrice: null,
    sellingPrice: null,
    taxRate: null,
    margin: null,
    insuranceCoverage: false,
    loading: false,
  });
};

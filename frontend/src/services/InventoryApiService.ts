import { baseURL } from "@/lib/utils";
import { InventoryGlobalState } from "@/stores/product_state_store/InventoryGlobalState";

import toast from "react-hot-toast";
import { InventoryTypes } from "../types/productTypes";

export const createNewInventory = async (
  formData: InventoryTypes
): Promise<boolean> => {
  InventoryGlobalState.setState({
    loading: true,
  });

  try {
    const data = await fetch(
      `${baseURL}/drug_inventory/admin/new_drug_inventory`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          drugID: formData.drugID,
          batchNumber: formData.batchNumber,
          barCode: formData.barCode,
          storageConditions: formData.storageConditions,
          location: formData.location,
          expiryDate: formData.expiryDate,
          quantityInStock: formData.quantityInStock,
          minimumQuantityInStock: formData.minimumQuantityInStock,
          reorderStockLevel: formData.reorderStockLevel,
        }),
      }
    );
    const response = await data.json();
    if (response.success) {
      toast.success(response.message);
      InventoryGlobalState.setState({
        drugID: null,
        batchNumber: null,
        barCode: null,
        storageConditions: null,
        location: null,
        expiryDate: null,
        quantityInStock: null,
        minimumQuantityInStock: null,
        reorderStockLevel: null,
        loading: false,
        inventoryList: response.allInventories,
      });
      return true;
    } else {
      toast.error(response.message);
      InventoryGlobalState.setState({ loading: false });
      return false;
    }
  } catch (error) {
    console.log("Error while adding new product", error);
    InventoryGlobalState.setState({ loading: false });
    return false;
  }
};

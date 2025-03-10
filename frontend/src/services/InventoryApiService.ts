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
export const getAllInventories = async () => {
  try {
    InventoryGlobalState.setState({
      loading: true,
    });
    const data = await fetch(`${baseURL}/drug_inventory/find_all_inventories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const response = await data.json();

    if (response.success) {
      console.log("Inventory", response);
      InventoryGlobalState.setState({
        inventoryList: response.allDrugInventories,
        loading: false,
      });
    } else {
      toast.error(response.message);
      InventoryGlobalState.setState({
        loading: false,
      });
    }
  } catch (error) {
    console.log("Error while fetching inventories", error);
    InventoryGlobalState.setState({
      loading: false,
    });
  }
};
export const findInventoryByID = async (
  drugInventoryID: string
): Promise<void> => {
  try {
    InventoryGlobalState.setState({
      loading: true,
    });
    const data = await fetch(
      `${baseURL}/drug_inventory//admin/find_inventory/${drugInventoryID}`,
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
      console.log("Inventory By ID", response);
      InventoryGlobalState.setState({
        loading: false,
        drugID: response.inventory.drugID,
        batchNumber: response.inventory.batchNumber,
        barCode: response.inventory.barCode,
        storageConditions: response.inventory.storageConditions,
        location: response.inventory.location,
        expiryDate: response.inventory.expiryDate,
        quantityInStock: response.inventory.quantityInStock,
        minimumQuantityInStock: response.inventory.minimumQuantityInStock,
        reorderStockLevel: response.inventory.reorderStockLevel,
      });
      console.log("response", response);
    } else {
      toast.error(response.message);
      InventoryGlobalState.setState({
        loading: false,
        drugID: null,
        batchNumber: null,
        barCode: null,
        storageConditions: null,
        location: null,
        expiryDate: null,
        quantityInStock: null,
        minimumQuantityInStock: null,
        reorderStockLevel: null,
      });
    }
  } catch (error) {
    console.log("Error while fetching drug manufacturers", error);
    InventoryGlobalState.setState({
      loading: false,
      drugID: null,
      batchNumber: null,
      barCode: null,
      storageConditions: null,
      location: null,
      expiryDate: null,
      quantityInStock: null,
      minimumQuantityInStock: null,
      reorderStockLevel: null,
    });
  }
};
export const updateInventoryByAdmin = async (
  drugInventoryID: string,
  formData: InventoryTypes
): Promise<boolean> => {
  try {
    const data = await fetch(
      `${baseURL}/drug_inventory/admin/update_drug_inventory/${drugInventoryID}`,
      {
        method: "PUT",
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
        inventoryList: response.allInventories,
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
      });
      return true;
    } else {
      toast.error(response.message);
      InventoryGlobalState.setState({
        loading: false,
      });
      return false;
    }
  } catch (error) {
    console.log("Error while updating Inventory", error);
    InventoryGlobalState.setState({
      loading: false,
    });
    return false;
  }
};
export const DeleteInventory = async (
  drugInventoryID: string
): Promise<void> => {
  if (window.confirm("Are you sure you want to delete this Inventory?")) {
    try {
      const data = await fetch(
        `${baseURL}/drug_inventory/admin/delete_drug_inventory/${drugInventoryID}`,
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
        InventoryGlobalState.setState({
          inventoryList: response.allInventories,
        });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to delete Inventory");
      console.log("Error while deleting Inventory", error);
    }
  } else {
    return;
  }
};
export const getAllDeletedInventories = async () => {
  try {
    InventoryGlobalState.setState({
      loading: true,
    });
    const data = await fetch(
      `${baseURL}/drug_inventory/admin/deleted_drug_inventories`,
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
      InventoryGlobalState.setState({
        deletedInventoryList: response.allInventories,
        loading: false,
      });
    } else {
      toast.error(response.message);
      InventoryGlobalState.setState({
        loading: false,
      });
    }
  } catch (error) {
    console.log("Error while fetching inventories", error);
    InventoryGlobalState.setState({
      loading: false,
    });
  }
};
export const undoDeletedInventory = async (
  drugInventoryID: string
): Promise<void> => {
  if (window.confirm("Are you sure you want to restore this Inventory?")) {
    try {
      const data = await fetch(
        `${baseURL}/drug_inventory//admin/restore_deleted_inventory/${drugInventoryID}`,
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
        InventoryGlobalState.setState({
          deletedInventoryList: response.allInventories,
          loading: false,
        });
      } else {
        toast.error(response.message);
        InventoryGlobalState.setState({
          loading: false,
        });
      }
    } catch (error) {
      toast.error("Failed to restore inventory");
      console.log("Error restoring inventory", error);
      InventoryGlobalState.setState({
        loading: false,
      });
    }
  } else {
    return;
  }
};

export const resetInventoryGlobalState = () => {
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
  });
};

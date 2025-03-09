import { InventoryTypes, ProductDetailsTypes } from "@/types/productTypes";
import { create } from "zustand";

interface InventoryApiResponse {
  drugID: string | null;
  batchNumber: string | null;
  barCode: string | null;
  storageConditions: string | null;
  location: string | null;
  expiryDate: Date | null;
  quantityInStock: number | null;
  minimumQuantityInStock: number | null;
  reorderStockLevel: number | null;
  loading: boolean;
  inventoryList: InventoryTypes[] | null;
  deletedInventoryList: InventoryTypes[] | null;
  drug?: ProductDetailsTypes;
}

export const InventoryGlobalState = create<InventoryApiResponse>(() => ({
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
  inventoryList: null,
  deletedInventoryList: null,
}));

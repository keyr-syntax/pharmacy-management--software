import { ProductDetailsTypes } from "@/types/productTypes";
import { create } from "zustand";

interface ProductDetailsApiResponse {
  genericName: string | null;
  brandName: string | null;
  dosageForm: string | null;
  drugType: string | null;
  dosageStrength: string | null;
  routeOfDrugAdministration: string | null;
  unitsPerPack: number | null;
  drugClass: string | null;
  status: string | null;
  loading: boolean;
  productsList: ProductDetailsTypes[] | null;
  deletedProductsList: ProductDetailsTypes[] | null;
}

export const AddandEditProductDetailsGlobalState =
  create<ProductDetailsApiResponse>(() => ({
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
    productsList: null,
    deletedProductsList: null,
  }));

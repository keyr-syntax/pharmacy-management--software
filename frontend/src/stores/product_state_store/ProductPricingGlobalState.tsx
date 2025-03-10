import { create } from "zustand";
import { ProductPricingTypes } from "../../types/productTypes";

interface ProductPricingApiResponse {
  pricingID?: string | null;
  drugID: string | null;
  purchasePrice: number | null;
  sellingPrice: number | null;
  taxRate: number | null;
  margin?: number | null;
  insuranceCoverage?: boolean;
  loading: boolean;
  pricingList: ProductPricingTypes[] | null;
  deletedPricingList: ProductPricingTypes[] | null;
}

export const ProductPricingGlobalState = create<ProductPricingApiResponse>(
  () => ({
    pricingID: null,
    drugID: null,
    purchasePrice: null,
    sellingPrice: null,
    taxRate: null,
    margin: null,
    insuranceCoverage: false,
    loading: false,
    pricingList: null,
    deletedPricingList: null,
  })
);

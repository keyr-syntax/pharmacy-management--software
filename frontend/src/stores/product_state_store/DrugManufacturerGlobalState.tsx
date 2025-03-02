import { create } from "zustand";
import { DrugManufacturer } from "../../types/productTypes";

interface DrugManufacturerApiResponse {
  drugManufacturerList: DrugManufacturer[] | null;
  deletedDrugManufacturerList: DrugManufacturer[] | null;
  drugManufacturer: string | null;
  newDrugManufacturer: string | null;
  loading: boolean;
  drugManufacturerIDForEdit: string | null;
}

export const DrugManufacturerGlobalState = create<DrugManufacturerApiResponse>(
  () => ({
    drugManufacturerList: null,
    deletedDrugManufacturerList: null,
    drugManufacturer: null,
    newDrugManufacturer: null,
    loading: false,
    drugManufacturerIDForEdit: null,
  })
);

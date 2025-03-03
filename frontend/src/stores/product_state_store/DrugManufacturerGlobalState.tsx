import { create } from "zustand";
import { DrugManufacturer } from "../../types/productTypes";

interface DrugManufacturerApiResponse {
  drugManufacturerList: DrugManufacturer[] | null;
  deletedDrugManufacturerList: DrugManufacturer[] | null;
  drugManufacturer: string | null;
  loading: boolean;
  drugManufacturerIDForEdit: string | null;
  manufacturerName: string | null;
  contactName: string | null;
  phoneNumber: string | null;
  licenseNumber: string | null;
}

export const DrugManufacturerGlobalState = create<DrugManufacturerApiResponse>(
  () => ({
    drugManufacturerList: null,
    deletedDrugManufacturerList: null,
    drugManufacturer: null,
    loading: false,
    drugManufacturerIDForEdit: null,
    manufacturerName: null,
    contactName: null,
    phoneNumber: null,
    licenseNumber: null,
  })
);

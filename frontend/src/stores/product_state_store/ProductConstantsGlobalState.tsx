import {
  DosageFormType,
  DrugClassType,
  RoutesOfDrugAdministrationType,
} from "@/types/productTypes";
import { create } from "zustand";

interface ProductConstantsApiResponse {
  dosageFormList: DosageFormType[] | null;
  drugClassList: DrugClassType[] | null;
  routesOfDrugAdministrationList: RoutesOfDrugAdministrationType[] | null;
}

export const ProductConstantsGlobalState = create<ProductConstantsApiResponse>(
  () => ({
    dosageFormList: null,
    drugClassList: null,
    routesOfDrugAdministrationList: null,
  })
);

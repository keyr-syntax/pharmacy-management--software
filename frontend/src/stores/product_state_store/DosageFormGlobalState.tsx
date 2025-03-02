import { DosageFormType } from "@/types/productTypes";
import { create } from "zustand";

interface DosageFormApiResponse {
  dosageFormList: DosageFormType[] | null;
  deletedDosageFormList: DosageFormType[] | null;
  dosageForm: string | null;
  newDosageForm: string | null;
  loading: boolean;
  dosageFormIDForEdit: string | null;
}

export const DosageFormGlobalState = create<DosageFormApiResponse>(() => ({
  dosageFormList: null,
  dosageForm: null,
  loading: false,
  dosageFormIDForEdit: null,
  deletedDosageFormList: null,
  newDosageForm: null,
}));

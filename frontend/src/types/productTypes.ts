export type DosageFormType = {
  id: number;
  dosageForm: string;
};

export type DrugClassType = {
  id: number;
  class: string;
};
export type RoutesOfDrugAdministrationType = {
  id: number;
  route: string;
};

export type ProductDetailsTypes = {
  genericName: string | null;
  brandName: string | null;
  dosageForm: string | null;
  drugType: string | null;
  dosageStrength: string | null;
  routeOfDrugAdministration: string | null;
  unitsPerPack: number | null;
  drugClass: string | null;
  status: string | null;
  drugID?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type DrugManufacturer = {
  manufacturerID?: string;
  manufacturerName: string;
  contactName: string;
  phoneNumber: string;
  licenseNumber: string;
  updatedAt?: string;
};
export type DrugManufacturerFormData = {
  manufacturerID?: string;
  manufacturerName: string;
  contactName: string;
  phoneNumber: string;
  licenseNumber: string;
};

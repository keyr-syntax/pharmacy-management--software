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

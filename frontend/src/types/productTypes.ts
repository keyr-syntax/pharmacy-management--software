export type DosageFormType = {
  dosageForm: string;
  dosageFormID: string;
  updatedAt: string;
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

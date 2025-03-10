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
export type storageConditionsType = {
  id: number;
  condition: string;
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

export type InventoryTypes = {
  drugInventoryID?: string | null;
  drugID: string | null;
  batchNumber: string | null;
  barCode: string | null;
  storageConditions: string | null;
  location: string | null;
  expiryDate: Date | null;
  quantityInStock: number | null;
  minimumQuantityInStock: number | null;
  reorderStockLevel: number | null;
  createdAt?: string;
  updatedAt?: string;
  drug?: ProductDetailsTypes;
};

export type ProductPricingTypes = {
  pricingID?: string | null;
  drugID: string | null;
  purchasePrice: number | null;
  sellingPrice: number | null;
  taxRate: number | null;
  margin?: number | null;
  insuranceCoverage?: boolean;
  drug?: ProductDetailsTypes;
};

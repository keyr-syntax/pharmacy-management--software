import { Model } from "sequelize";
export interface drugInventoryInterface {
    drugInventoryID?: string;
    drugID: string;
    batchNumber: string;
    barCode: string;
    storageConditions: string;
    location: string;
    expiryDate: Date;
    quantityInStock: number;
    minimumQuantityInStock: number;
    reorderStockLevel: number;
    softDeleted: boolean;
}
declare class DRUG_INVENTORY extends Model<drugInventoryInterface> implements drugInventoryInterface {
    drugInventoryID: string;
    drugID: string;
    batchNumber: string;
    barCode: string;
    storageConditions: string;
    location: string;
    expiryDate: Date;
    quantityInStock: number;
    minimumQuantityInStock: number;
    reorderStockLevel: number;
    softDeleted: boolean;
}
export default DRUG_INVENTORY;

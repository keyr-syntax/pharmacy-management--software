import { Model } from "sequelize";
export interface drugPricingInterface {
    pricingID?: string;
    drugID: string;
    purchasePrice: number;
    sellingPrice: number;
    taxRate: number;
    margin?: number;
    insuranceCoverage?: boolean;
    softDeleted: boolean;
}
declare class DRUG_PRICING extends Model<drugPricingInterface> implements drugPricingInterface {
    pricingID: string;
    drugID: string;
    purchasePrice: number;
    sellingPrice: number;
    taxRate: number;
    margin?: number;
    insuranceCoverage?: boolean;
    softDeleted: boolean;
}
export default DRUG_PRICING;

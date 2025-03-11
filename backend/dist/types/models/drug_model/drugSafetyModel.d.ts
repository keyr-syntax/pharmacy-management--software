import { Model } from "sequelize";
export interface drugSafetyInterface {
    drugSafetyID?: string;
    drugID: string;
    contraindications?: string;
    drugInteractions?: string;
    pregnancyCategory: string;
    maxDailyDose?: string;
    softDeleted: boolean;
}
declare class DRUG_SAFETY extends Model<drugSafetyInterface> implements drugSafetyInterface {
    drugSafetyID: string;
    drugID: string;
    contraindications?: string;
    drugInteractions?: string;
    pregnancyCategory: string;
    maxDailyDose?: string;
    softDeleted: boolean;
}
export default DRUG_SAFETY;

import { Model } from "sequelize";
export interface drugsInterface {
    drugID?: string;
    genericName: string;
    brandName: string;
    dosageForm: string;
    drugType: string;
    dosageStrength: string;
    routeOfDrugAdministration: string;
    unitsPerPack: number;
    drugClass: string;
    status: string;
    softDeleted: boolean;
}
declare class DRUGS extends Model<drugsInterface> implements drugsInterface {
    drugID: string;
    genericName: string;
    brandName: string;
    dosageForm: string;
    drugType: string;
    dosageStrength: string;
    routeOfDrugAdministration: string;
    unitsPerPack: number;
    drugClass: string;
    status: string;
    softDeleted: boolean;
}
export default DRUGS;

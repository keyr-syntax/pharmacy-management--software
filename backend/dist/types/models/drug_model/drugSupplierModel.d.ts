import { Model } from "sequelize";
export interface drugSupplierInterface {
    supplierID?: string;
    drugID: string;
    supplierName: string;
    contactPersonName: string;
    supplierEmail: string;
    supplierPhoneNumber: string;
    supplierAddress: string;
    licenseNumber: string;
    softDeleted: boolean;
}
declare class DRUG_SUPPLIER extends Model<drugSupplierInterface> implements drugSupplierInterface {
    supplierID: string;
    drugID: string;
    supplierName: string;
    contactPersonName: string;
    supplierEmail: string;
    supplierPhoneNumber: string;
    supplierAddress: string;
    licenseNumber: string;
    softDeleted: boolean;
}
export default DRUG_SUPPLIER;

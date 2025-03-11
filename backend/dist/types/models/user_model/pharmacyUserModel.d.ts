import { Model } from "sequelize";
export interface pharmacyUserInterface {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: number;
    role: string;
    isBlocked: string;
    SoftDeleted: boolean;
}
declare class pharmacyUser extends Model<pharmacyUserInterface> implements pharmacyUserInterface {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: number;
    role: string;
    isBlocked: string;
    SoftDeleted: boolean;
}
export default pharmacyUser;

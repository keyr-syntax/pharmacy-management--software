export type RegisterUserformInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: number;
  role: string;
};

export type LoginformInput = {
  email: string;
  password: string;
};

export interface PharmacyUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: number;
  role: string;
  isBlocked: boolean;
}

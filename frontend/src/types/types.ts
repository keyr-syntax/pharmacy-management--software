export type RegisterUserformInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: number;
  role: string;
  isBlocked: string;
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
  isBlocked: string;
}

export interface EditPharmacyUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;

  phoneNumber: string;
  role: string;
  isBlocked: string;
}

export type RegisterUserformInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: number;
  role: string;
  isBlocked: string;
};
export type UpdateUserProfileformInput = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
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
  updatedAt: Date;
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

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const baseURL = "http://localhost:5000";
export const baseURL =
  "https://backend-pharmacy-management-software.keyrunasir.com";

export const getFirstLetterOfName = (username: string) =>
  username.charAt(0).toUpperCase();

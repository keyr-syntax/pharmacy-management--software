import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const baseURL = "http://localhost:8000";

export const getFirstLetterOfName = (username: string) =>
  username.charAt(0).toUpperCase();

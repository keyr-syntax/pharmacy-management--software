import { createContext } from "react";

type PharmacyAppContextTypes = {
  BASE_URL: string;
};

export const PharmacyAppContext = createContext<PharmacyAppContextTypes | null>(
  null
);

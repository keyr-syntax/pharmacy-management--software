import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";
import { PharmacyAppContext } from "./PharmacyAppContext";

function ContextProvider({ children }: { children: ReactNode }) {
  const BASE_URL = "http://localhost:8000";
  return (
    <PharmacyAppContext.Provider value={{ BASE_URL }}>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            style: {
              background: "white",
              color: "green",
            },
            iconTheme: {
              primary: "white",
              secondary: "green",
            },
          },
          error: {
            duration: 4000,
            position: "top-right",
            style: {
              background: "white",
            },
            iconTheme: {
              primary: "white",
              secondary: "red",
            },
          },
        }}
      />
    </PharmacyAppContext.Provider>
  );
}

export default ContextProvider;

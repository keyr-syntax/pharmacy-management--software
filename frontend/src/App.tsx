// import ThemeToggle from "./ThemeToggle";

import { Outlet, Route, Routes } from "react-router-dom";
import { AppSidebar } from "./components/pages/dashboard/Dashboard";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import RegisterPharmacyUser from "./components/pages/auth/RegisterUser";
import LoginPharmacyUser from "./components/pages/auth/LoginUser";
import PharmacyUsersList from "./components/pages/users/PharmacyUsersList";
import UpdateUserProfile from "./components/pages/users/UpdateUserProfile";
import TableForDosageForm from "./components/pages/products/dosage_form/TableForDosageForm";
import DeletedUsersList from "./components/pages/recycleBin/RecycleBinForDeletedUsers";
import DeletedDosageForms from "./components/pages/recycleBin/RecycleBinForDeletedDosageForms";
import { NewDrugManufacturer } from "./components/pages/products/drug_manufacturer/NewDrugManufacturer";
import TableForDrugManufacturer from "./components/pages/products/drug_manufacturer/TableForDrugManufacturer";
import RecycleBinForDeletedDrugManufacturers from "./components/pages/recycleBin/RecycleBinForDeletedDrugManufacturers";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPharmacyUser />} />
        <Route path="/login" element={<LoginPharmacyUser />} />
        <Route path="/register" element={<RegisterPharmacyUser />} />
        <Route
          path="/dashboard"
          element={
            <>
              <SidebarProvider>
                <AppSidebar />
                <SidebarTrigger />
                <Outlet />
              </SidebarProvider>
            </>
          }
        >
          <Route path="/dashboard/login" element={<LoginPharmacyUser />} />
          <Route
            path="/dashboard/register"
            element={<RegisterPharmacyUser />}
          />
          <Route path="/dashboard/users" element={<PharmacyUsersList />} />
          <Route
            path="/dashboard/users_recycle_bin"
            element={<DeletedUsersList />}
          />
          <Route
            path="/dashboard/dosage_form_recycle_bin"
            element={<DeletedDosageForms />}
          />
          <Route
            path="/dashboard/edit_my_account"
            element={<UpdateUserProfile />}
          />
          <Route
            path="/dashboard/dosage_form"
            element={<TableForDosageForm />}
          />
          <Route
            path="/dashboard/drug_manufacturer"
            element={<NewDrugManufacturer />}
          />
          <Route
            path="/dashboard/drug_manufacturer_list"
            element={<TableForDrugManufacturer />}
          />
          <Route
            path="/dashboard/drug_manufacturer_recycle_bin"
            element={<RecycleBinForDeletedDrugManufacturers />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;

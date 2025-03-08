// import ThemeToggle from "./ThemeToggle";

import { Outlet, Route, Routes } from "react-router-dom";
import { AppSidebar } from "./components/pages/dashboard/Dashboard";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import RegisterPharmacyUser from "./components/pages/auth/RegisterUser";
import LoginPharmacyUser from "./components/pages/auth/HomeLoginUser";
import PharmacyUsersList from "./components/pages/users/PharmacyUsersList";
import UpdateUserProfile from "./components/pages/users/UpdateUserProfile";
import DeletedUsersList from "./components/pages/recycleBin/RecycleBinForDeletedUsers";
// import DeletedDosageForms from "./components/pages/recycleBin/RecycleBinForDeletedDosageForms";
import { NewDrugManufacturer } from "./components/pages/products/drug_manufacturer/NewDrugManufacturer";
import TableForDrugManufacturer from "./components/pages/products/drug_manufacturer/TableForDrugManufacturer";

import NewDrugPage from "./components/pages/products/drugs/NewDrugPage";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPharmacyUser />} />

        <Route path="/workspace" element={<NavigationBar />}>
          <Route
            path="/workspace/register"
            element={<RegisterPharmacyUser />}
          />{" "}
          <Route
            path="/workspace/employees_list"
            element={<PharmacyUsersList />}
          />
          <Route
            path="/workspace/employees_recycle_bin"
            element={<DeletedUsersList />}
          />
          <Route
            path="/workspace/edit_my_account"
            element={<UpdateUserProfile />}
          />
        </Route>
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

          <Route
            path="/dashboard/users_recycle_bin"
            element={<DeletedUsersList />}
          />

          <Route
            path="/dashboard/drug_manufacturer"
            element={<NewDrugManufacturer />}
          />
          <Route
            path="/dashboard/drug_manufacturer_list"
            element={<TableForDrugManufacturer />}
          />
          {/* <Route
            path="/dashboard/drug_manufacturer_recycle_bin"
            element={<RecycleBinForDeletedDrugManufacturers />}
          /> */}
          <Route path="/dashboard/drugs" element={<NewDrugPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

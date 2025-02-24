// import ThemeToggle from "./ThemeToggle";

import { Outlet, Route, Routes } from "react-router-dom";
import { AppSidebar } from "./components/pages/Dashboard";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import RegisterPharmacyUser from "./components/pages/auth/RegisterUser";
import LoginPharmacyUser from "./components/pages/auth/LoginUser";
import PharmacyUsersList from "./components/pages/users/PharmacyUsersList";

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
          <Route path="/dashboard/users" element={<PharmacyUsersList />} />
          <Route path="/dashboard/login" element={<LoginPharmacyUser />} />
          <Route
            path="/dashboard/register"
            element={<RegisterPharmacyUser />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;

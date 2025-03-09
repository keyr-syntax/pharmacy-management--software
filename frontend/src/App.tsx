// import ThemeToggle from "./ThemeToggle";
import { Route, Routes } from "react-router-dom";
import RegisterPharmacyUser from "./components/pages/auth/RegisterUser";
import LoginPharmacyUser from "./components/pages/auth/HomeLoginUser";
import PharmacyUsersList from "./components/pages/users/PharmacyUsersList";
import UpdateUserProfile from "./components/pages/users/UpdateUserProfile";
import DeletedUsersList from "./components/pages/recycleBin/RecycleBinForDeletedUsers";
import NewDrugPage from "./components/pages/products/drugs/NewProduct";
import NavigationBar from "./components/NavigationBar";
import AllProductsList from "./components/pages/products/drugs/AllProductsList";
import EditProduct from "./components/pages/products/drugs/EditProduct";
import RecycleBinForDeletedProducts from "./components/pages/recycleBin/RecycleBinForDeletedProducts";
import NewInventoryPage from "./components/pages/products/inventory/NewInventory";
import AllInventoryList from "./components/pages/products/inventory/AllInventoryList";
import EditInventory from "./components/pages/products/inventory/EditInventory";
import RecycleBinForDeletedInventories from "./components/pages/recycleBin/RecycleBinForDeletedInventories";
import AllRecycleBin from "./components/pages/recycleBin/AllRecycleBin";

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
          <Route path="/workspace/products" element={<NewDrugPage />} />
          <Route path="/workspace/all_products" element={<AllProductsList />} />
          <Route
            path="/workspace/edit_product/:drugID"
            element={<EditProduct />}
          />
          <Route
            path="/workspace/products_recycle_bin"
            element={<RecycleBinForDeletedProducts />}
          />
          <Route
            path="/workspace/new_inventory"
            element={<NewInventoryPage />}
          />
          <Route
            path="/workspace/all_inventories"
            element={<AllInventoryList />}
          />
          <Route
            path="/workspace/edit_inventory/:drugInventoryID"
            element={<EditInventory />}
          />{" "}
          <Route
            path="/workspace/inventories_recycle_bin"
            element={<RecycleBinForDeletedInventories />}
          />
          <Route
            path="/workspace/all_recycle_bin"
            element={<AllRecycleBin />}
          />
        </Route>
        {/* <Route
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

          <Route path="/dashboard/drugs" element={<NewDrugPage />} />
        </Route> */}
      </Routes>
    </>
  );
}

export default App;

import { getFirstLetterOfName } from "@/lib/utils";
import { logoutPharmacyUser } from "@/services/UserApiService";
import * as Menubar from "@radix-ui/react-menubar";
import { MenuIcon, User2, X } from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ui/ThemeToggle";

export default function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [employeesOpen, setEmployeesOpen] = useState<boolean>(false);
  const [productsOpen, setProductsOpen] = useState<boolean>(false);
  const [inventoryOpen, setInventoryOpen] = useState<boolean>(false);
  const [pricingOpen, setPricingOpen] = useState<boolean>(false);

  const name: string | null = localStorage.getItem("name");
  const navigate = useNavigate();

  const resetNavigationState = () => {
    setMenuOpen(false);
    setProductsOpen(false);
    setEmployeesOpen(false);
    setInventoryOpen(false);
    setPricingOpen(false);
  };

  const handlePharmacyUserLogout = async () => {
    const success = await logoutPharmacyUser();

    if (success) {
      navigate("/");
    } else {
      return;
    }
  };
  return (
    <>
      <Menubar.Root className="flex flex-row items-center md:justify-start p-3 bg-[#09090b] dark:bg-white border border-[rgb(255,255,255,0.1)] dark:border-[rgba(14,13,13,0.36)]  rounded-none  z-50 fixed top-0 left-0 right-0 gap-5">
        <Menubar.Menu>
          <Link className="text-2xl  ml-3" to="/workspace">
            Pharma
          </Link>
          <ThemeToggle />
        </Menubar.Menu>

        <Menubar.Menu>
          <Menubar.Trigger className="lg:flex hidden select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[20px]  leading-none text-violet11 outline-none data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4">
            Employees
          </Menubar.Trigger>
          <Menubar.Portal>
            <Menubar.Content
              className="min-w-[180px] bg-[#09090b] dark:bg-white  p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
              align="start"
              sideOffset={15}
              alignOffset={-3}
            >
              <Link to={`/workspace/register`}>
                <Menubar.Item className="group  relative flex  h-[35px] select-none items-center rounded px-2.5  text-[18px] leading-none outline-none data-[disabled]:pointer-events-none">
                  Add new employee
                </Menubar.Item>
              </Link>
              <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
              <Link to={`/workspace/employees_list`}>
                <Menubar.Item className="group  relative flex  h-[35px] select-none items-center rounded px-2.5  text-[18px] leading-none outline-none data-[disabled]:pointer-events-none">
                  Employees list
                </Menubar.Item>
              </Link>
              <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
              <Link to={`/workspace/employees_recycle_bin`}>
                <Menubar.Item className="group  relative flex  h-[35px] select-none items-center rounded px-2.5  text-[18px] leading-none outline-none data-[disabled]:pointer-events-none">
                  Employees recycle bin
                </Menubar.Item>
              </Link>

              <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
            </Menubar.Content>
          </Menubar.Portal>
        </Menubar.Menu>
        <Menubar.Menu>
          <Menubar.Trigger className="lg:flex  hidden select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[20px]  leading-none text-violet11 outline-none data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4">
            Products
          </Menubar.Trigger>
          <Menubar.Portal>
            <Menubar.Content
              className="min-w-[180px] bg-[#09090b] dark:bg-white  p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
              align="start"
              sideOffset={15}
              alignOffset={-3}
            >
              <Link to={`/workspace/products`}>
                <Menubar.Item className="group  relative flex  h-[35px] select-none items-center rounded px-2.5  text-[18px] leading-none outline-none data-[disabled]:pointer-events-none">
                  Add new product
                </Menubar.Item>
              </Link>
              <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
              <Link to={`/workspace/all_products`}>
                <Menubar.Item className="group  relative flex  h-[35px] select-none items-center rounded px-2.5  text-[18px] leading-none outline-none data-[disabled]:pointer-events-none">
                  Products list
                </Menubar.Item>
              </Link>
              <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
              <Link to={`/workspace/products_recycle_bin`}>
                <Menubar.Item className="group  relative flex  h-[35px] select-none items-center rounded px-2.5  text-[18px] leading-none outline-none data-[disabled]:pointer-events-none">
                  Products recycle bin
                </Menubar.Item>
              </Link>

              <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
            </Menubar.Content>
          </Menubar.Portal>
        </Menubar.Menu>
        <Menubar.Menu>
          <Menubar.Trigger className="lg:flex hidden select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[20px]  leading-none text-violet11 outline-none data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4">
            Inventory
          </Menubar.Trigger>
          <Menubar.Portal>
            <Menubar.Content
              className="min-w-[180px] bg-[#09090b] dark:bg-white   p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
              align="start"
              sideOffset={15}
              alignOffset={-3}
            >
              <Link to={`/workspace/new_inventory`}>
                <Menubar.Item className="group  relative flex  h-[35px] select-none items-center rounded px-2.5  text-[18px] leading-none outline-none data-[disabled]:pointer-events-none">
                  Add new Inventory
                </Menubar.Item>
              </Link>
              <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
              <Link to={`/workspace/all_inventories`}>
                <Menubar.Item className="group  relative flex  h-[35px] select-none items-center rounded px-2.5  text-[18px] leading-none outline-none data-[disabled]:pointer-events-none">
                  Inventory list
                </Menubar.Item>
              </Link>
              <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
              <Link to={`/workspace/inventories_recycle_bin`}>
                <Menubar.Item className="group  relative flex  h-[35px] select-none items-center rounded px-2.5  text-[18px] leading-none outline-none data-[disabled]:pointer-events-none">
                  Inventory recycle bin
                </Menubar.Item>
              </Link>

              <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
            </Menubar.Content>
          </Menubar.Portal>
        </Menubar.Menu>
        <Menubar.Menu>
          <Menubar.Trigger className="lg:flex hidden  select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[20px]  leading-none text-violet11 outline-none data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4">
            Pricing
          </Menubar.Trigger>
          <Menubar.Portal>
            <Menubar.Content
              className="min-w-[180px] bg-[#09090b] dark:bg-white  p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
              align="start"
              sideOffset={15}
              alignOffset={-3}
            >
              <Link to={`/workspace/new_product_pricing`}>
                <Menubar.Item className="group  relative flex  h-[35px] select-none items-center rounded px-2.5  text-[18px] leading-none outline-none data-[disabled]:pointer-events-none">
                  Add new Pricing
                </Menubar.Item>
              </Link>
              <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
              <Link to={`/workspace/all_pricing`}>
                <Menubar.Item className="group  relative flex  h-[35px] select-none items-center rounded px-2.5  text-[18px] leading-none outline-none data-[disabled]:pointer-events-none">
                  Pricing list
                </Menubar.Item>
              </Link>
              <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
              <Link to={`/workspace/pricing_recycle_bin`}>
                <Menubar.Item className="group  relative flex  h-[35px] select-none items-center rounded px-2.5  text-[18px] leading-none outline-none data-[disabled]:pointer-events-none">
                  Pricing recycle bin
                </Menubar.Item>
              </Link>

              <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
            </Menubar.Content>
          </Menubar.Portal>
        </Menubar.Menu>
        <Menubar.Menu>
          <Menubar.Trigger className="lg:flex hidden select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[20px]  leading-none text-violet11 outline-none data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4">
            <Link to="/workspace/all_recycle_bin">Recycle Bin</Link>
          </Menubar.Trigger>
        </Menubar.Menu>

        <div className="ml-auto">
          {!menuOpen && (
            <MenuIcon
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
              size={35}
              className="lg:hidden cursor-pointer"
            />
          )}
          {menuOpen && (
            <X
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
              size={35}
              className="lg:hidden cursor-pointer"
            />
          )}
          <Menubar.Menu>
            <Menubar.Trigger className="lg:flex hidden  select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[20px]  leading-none text-violet11 outline-none data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4">
              {name ? (
                <>
                  <span className=" border border-solid   border-r w-8 h-8 rounded-full text-center py-1 bg-green-500 mx-1 text-black">
                    {getFirstLetterOfName(name)}
                  </span>
                  <span className="text-xl">{name}</span>
                </>
              ) : (
                <>
                  <User2 /> <span className="text-xl">Username</span>{" "}
                </>
              )}
            </Menubar.Trigger>
            <Menubar.Portal>
              <Menubar.Content
                className="min-w-[180px] bg-[#09090b] dark:bg-white border-[rgb(255,255,255,0.1)] dark:border-[rgba(14,13,13,0.36)]   p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
                align="start"
                sideOffset={15}
                alignOffset={-3}
              >
                <Link to={`/workspace/edit_my_account`}>
                  <Menubar.Item className="group  relative flex  h-[35px] select-none items-center rounded px-2.5  text-[18px] leading-none outline-none data-[disabled]:pointer-events-none">
                    Edit My Account
                  </Menubar.Item>
                </Link>
                <Menubar.Separator className="m-[5px] h-px dark:bg-[rgb(255,255,255,0.2)] bg-black" />
                <Menubar.Item
                  onClick={() => {
                    handlePharmacyUserLogout();
                  }}
                  className="group  relative flex  h-[35px] select-none items-center rounded px-2.5  text-[18px] leading-none outline-none data-[disabled]:pointer-events-none"
                >
                  Logout
                </Menubar.Item>

                <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
              </Menubar.Content>
            </Menubar.Portal>
          </Menubar.Menu>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "100%", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col lg:hidden bg-[#09090b] dark:bg-white  items-start justify-start   w-[200px] h-full p-3 border border-[rgb(255,255,255,0.1)] dark:border-[rgba(14,13,13,0.36)]  rounded-none z-50 fixed top-16 left-0 gap-2"
            >
              <div
                onClick={() => {
                  setEmployeesOpen(!employeesOpen);
                  setProductsOpen(false);
                  setInventoryOpen(false);
                  setPricingOpen(false);
                }}
                className="text-[18px] cursor-pointer ml-3"
              >
                Employees
              </div>
              {employeesOpen && (
                <>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="flex flex-col gap-3 ml-7"
                  >
                    <Link
                      onClick={() => {
                        resetNavigationState();
                      }}
                      className=" text-[14px]"
                      to={`/workspace/register`}
                    >
                      Add new employee
                    </Link>
                    <Link
                      onClick={() => {
                        resetNavigationState();
                      }}
                      className="text-[14px]"
                      to={`/workspace/employees_list`}
                    >
                      Employees list
                    </Link>
                    <Link
                      onClick={() => {
                        resetNavigationState();
                      }}
                      className="text-[14px]"
                      to={`/workspace/employees_recycle_bin`}
                    >
                      Employees recycle bin
                    </Link>
                  </motion.div>
                </>
              )}
              <div
                onClick={() => {
                  setProductsOpen(!productsOpen);
                  setEmployeesOpen(false);
                  setInventoryOpen(false);
                  setPricingOpen(false);
                }}
                className="text-[18px] cursor-pointer ml-3"
              >
                Products
              </div>
              {productsOpen && (
                <>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="flex flex-col gap-3 ml-7"
                  >
                    <Link
                      onClick={() => {
                        resetNavigationState();
                      }}
                      className="text-[14px]"
                      to={`/workspace/products`}
                    >
                      Add new product
                    </Link>
                    <Link
                      onClick={() => {
                        resetNavigationState();
                      }}
                      className="text-[14px]"
                      to={`/workspace/all_products`}
                    >
                      Products list
                    </Link>
                    <Link
                      onClick={() => {
                        resetNavigationState();
                      }}
                      className="text-[14px]"
                      to={`/workspace/products_recycle_bin`}
                    >
                      Products recycle bin
                    </Link>
                  </motion.div>
                </>
              )}
              <div
                onClick={() => {
                  setProductsOpen(false);
                  setEmployeesOpen(false);
                  setInventoryOpen(!inventoryOpen);
                  setPricingOpen(false);
                }}
                className="text-[18px] cursor-pointer ml-3"
              >
                Inventory
              </div>
              {inventoryOpen && (
                <>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="flex flex-col gap-3 ml-7"
                  >
                    <Link
                      onClick={() => {
                        resetNavigationState();
                      }}
                      className="text-[14px]"
                      to={`/workspace/new_inventory`}
                    >
                      Add new Inventory
                    </Link>
                    <Link
                      onClick={() => {
                        resetNavigationState();
                      }}
                      className=" text-[14px]"
                      to={`/workspace/all_inventories`}
                    >
                      Inventory list
                    </Link>
                    <Link
                      onClick={() => {
                        resetNavigationState();
                      }}
                      className=" text-[14px]"
                      to={`/workspace/inventories_recycle_bin`}
                    >
                      Inventory recycle bin
                    </Link>
                  </motion.div>
                </>
              )}
              <div
                onClick={() => {
                  setProductsOpen(false);
                  setEmployeesOpen(false);
                  setInventoryOpen(false);
                  setPricingOpen(!pricingOpen);
                }}
                className="text-[18px] cursor-pointer ml-3"
              >
                Pricing
              </div>
              {pricingOpen && (
                <>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="flex flex-col gap-3 ml-7"
                  >
                    <Link
                      onClick={() => {
                        resetNavigationState();
                      }}
                      className="text-[14px]"
                      to={`/workspace/new_product_pricing`}
                    >
                      Add new Pricing
                    </Link>
                    <Link
                      onClick={() => {
                        resetNavigationState();
                      }}
                      className="text-[14px]"
                      to={`/workspace/all_pricing`}
                    >
                      Pricing list
                    </Link>
                    <Link
                      onClick={() => {
                        resetNavigationState();
                      }}
                      className="text-[14px]"
                      to={`/workspace/pricing_recycle_bin`}
                    >
                      Pricing recycle bin
                    </Link>
                  </motion.div>
                </>
              )}
              <Link
                to="/workspace/all_recycle_bin"
                onClick={() => {
                  resetNavigationState();
                }}
                className="text-[18px] cursor-pointer ml-3"
              >
                Recycle Bin
              </Link>
              {name ? (
                <>
                  <div className="flex flex-row items-center mt-auto mb-[80px] ml-3 ">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <span className="border border-solid border-r w-6 h-6 rounded-full text-center text-black bg-green-500 mr-2 px-3 py-1 text-[18px]">
                          {getFirstLetterOfName(name)}
                        </span>
                        <span className="text-[22px]">{name}</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>
                          <Link
                            className="text-[18px] "
                            to={`/workspace/edit_my_account`}
                            onClick={() => {
                              resetNavigationState();
                            }}
                          >
                            Edit My Account
                          </Link>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="" />
                        <DropdownMenuLabel
                          className="cursor-pointer text-[18px]"
                          onClick={() => {
                            handlePharmacyUserLogout();
                            resetNavigationState();
                          }}
                        >
                          Logout
                        </DropdownMenuLabel>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </>
              ) : (
                <>
                  <User2 />{" "}
                  <span className="text-xl mt-auto mb-[80px]">Username</span>{" "}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Menubar.Root>
      <Outlet />
    </>
  );
}

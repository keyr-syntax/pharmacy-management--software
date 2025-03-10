import { getFirstLetterOfName } from "@/lib/utils";
import { logoutPharmacyUser } from "@/services/UserApiService";
import * as Menubar from "@radix-ui/react-menubar";
import { User2 } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function NavigationBar() {
  const name: string | null = localStorage.getItem("name");
  const navigate = useNavigate();

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
      <Menubar.Root className="flex flex-row items-center justify-start bg-[#151533]  p-3 border border-[rgb(255,255,255,0.1)]  rounded-none  z-50 fixed top-0 left-0 right-0 gap-5">
        <Menubar.Menu>
          <Link className="text-3xl" to="/workspace">
            Pharma
          </Link>
        </Menubar.Menu>

        <Menubar.Menu>
          <Menubar.Trigger className="flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[20px]  leading-none text-violet11 outline-none data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4">
            Employees
          </Menubar.Trigger>
          <Menubar.Portal>
            <Menubar.Content
              className="min-w-[180px] bg-[#151533]  p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
              align="start"
              sideOffset={15}
              alignOffset={-3}
            >
              <Link to={`/workspace/register`}>
                <Menubar.Item className="group hover:bg-[#26265f] relative flex h-[35px] select-none items-center rounded px-2.5  text-[18px] leading-none text-white outline-none data-[disabled]:pointer-events-none    data-[highlighted]:data-[state=open]:text-white data-[highlighted]:text-white data-[state=open]:text-white">
                  Add new employee
                </Menubar.Item>
              </Link>
              <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
              <Link to={`/workspace/employees_list`}>
                <Menubar.Item className="group hover:bg-[#26265f] relative flex h-[35px] select-none items-center rounded px-2.5 text-[18px] leading-none text-white outline-none data-[disabled]:pointer-events-none    data-[highlighted]:data-[state=open]:text-white data-[highlighted]:text-white data-[state=open]:text-white">
                  Employees list
                </Menubar.Item>
              </Link>
              <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
              <Link to={`/workspace/employees_recycle_bin`}>
                <Menubar.Item className="group hover:bg-[#26265f] relative flex h-[35px] select-none items-center rounded px-2.5 text-[18px] leading-none text-white outline-none data-[disabled]:pointer-events-none    data-[highlighted]:data-[state=open]:text-white data-[highlighted]:text-white data-[state=open]:text-white">
                  Employees recycle bin
                </Menubar.Item>
              </Link>

              <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
            </Menubar.Content>
          </Menubar.Portal>
        </Menubar.Menu>
        <Menubar.Menu>
          <Menubar.Trigger className="flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[20px]  leading-none text-violet11 outline-none data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4">
            Products
          </Menubar.Trigger>
          <Menubar.Portal>
            <Menubar.Content
              className="min-w-[180px] bg-[#151533]  p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
              align="start"
              sideOffset={15}
              alignOffset={-3}
            >
              <Link to={`/workspace/products`}>
                <Menubar.Item className="group hover:bg-[#26265f] relative flex h-[35px] select-none items-center rounded px-2.5  text-[18px] leading-none text-white outline-none data-[disabled]:pointer-events-none    data-[highlighted]:data-[state=open]:text-white data-[highlighted]:text-white data-[state=open]:text-white">
                  Add new product
                </Menubar.Item>
              </Link>
              <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
              <Link to={`/workspace/all_products`}>
                <Menubar.Item className="group hover:bg-[#26265f] relative flex h-[35px] select-none items-center rounded px-2.5 text-[18px] leading-none text-white outline-none data-[disabled]:pointer-events-none    data-[highlighted]:data-[state=open]:text-white data-[highlighted]:text-white data-[state=open]:text-white">
                  Products list
                </Menubar.Item>
              </Link>
              <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
              <Link to={`/workspace/products_recycle_bin`}>
                <Menubar.Item className="group hover:bg-[#26265f] relative flex h-[35px] select-none items-center rounded px-2.5 text-[18px] leading-none text-white outline-none data-[disabled]:pointer-events-none    data-[highlighted]:data-[state=open]:text-white data-[highlighted]:text-white data-[state=open]:text-white">
                  Products recycle bin
                </Menubar.Item>
              </Link>

              <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
            </Menubar.Content>
          </Menubar.Portal>
        </Menubar.Menu>
        <Menubar.Menu>
          <Menubar.Trigger className="flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[20px]  leading-none text-violet11 outline-none data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4">
            Inventory
          </Menubar.Trigger>
          <Menubar.Portal>
            <Menubar.Content
              className="min-w-[180px] bg-[#151533]  p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
              align="start"
              sideOffset={15}
              alignOffset={-3}
            >
              <Link to={`/workspace/new_inventory`}>
                <Menubar.Item className="group hover:bg-[#26265f] relative flex h-[35px] select-none items-center rounded px-2.5  text-[18px] leading-none text-white outline-none data-[disabled]:pointer-events-none    data-[highlighted]:data-[state=open]:text-white data-[highlighted]:text-white data-[state=open]:text-white">
                  Add new Inventory
                </Menubar.Item>
              </Link>
              <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
              <Link to={`/workspace/all_inventories`}>
                <Menubar.Item className="group hover:bg-[#26265f] relative flex h-[35px] select-none items-center rounded px-2.5 text-[18px] leading-none text-white outline-none data-[disabled]:pointer-events-none    data-[highlighted]:data-[state=open]:text-white data-[highlighted]:text-white data-[state=open]:text-white">
                  Inventory list
                </Menubar.Item>
              </Link>
              <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
              <Link to={`/workspace/inventories_recycle_bin`}>
                <Menubar.Item className="group hover:bg-[#26265f] relative flex h-[35px] select-none items-center rounded px-2.5 text-[18px] leading-none text-white outline-none data-[disabled]:pointer-events-none    data-[highlighted]:data-[state=open]:text-white data-[highlighted]:text-white data-[state=open]:text-white">
                  Inventory recycle bin
                </Menubar.Item>
              </Link>

              <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
            </Menubar.Content>
          </Menubar.Portal>
        </Menubar.Menu>
        <Menubar.Menu>
          <Menubar.Trigger className="flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[20px]  leading-none text-violet11 outline-none data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4">
            Product Pricing
          </Menubar.Trigger>
          <Menubar.Portal>
            <Menubar.Content
              className="min-w-[180px] bg-[#151533]  p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
              align="start"
              sideOffset={15}
              alignOffset={-3}
            >
              <Link to={`/workspace/new_product_pricing`}>
                <Menubar.Item className="group hover:bg-[#26265f] relative flex h-[35px] select-none items-center rounded px-2.5  text-[18px] leading-none text-white outline-none data-[disabled]:pointer-events-none    data-[highlighted]:data-[state=open]:text-white data-[highlighted]:text-white data-[state=open]:text-white">
                  Add new Pricing
                </Menubar.Item>
              </Link>
              <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
              <Link to={`/workspace/all_pricing`}>
                <Menubar.Item className="group hover:bg-[#26265f] relative flex h-[35px] select-none items-center rounded px-2.5 text-[18px] leading-none text-white outline-none data-[disabled]:pointer-events-none    data-[highlighted]:data-[state=open]:text-white data-[highlighted]:text-white data-[state=open]:text-white">
                  Pricing list
                </Menubar.Item>
              </Link>
              <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
              <Link to={`/workspace/pricing_recycle_bin`}>
                <Menubar.Item className="group hover:bg-[#26265f] relative flex h-[35px] select-none items-center rounded px-2.5 text-[18px] leading-none text-white outline-none data-[disabled]:pointer-events-none    data-[highlighted]:data-[state=open]:text-white data-[highlighted]:text-white data-[state=open]:text-white">
                  Pricing recycle bin
                </Menubar.Item>
              </Link>

              <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
            </Menubar.Content>
          </Menubar.Portal>
        </Menubar.Menu>
        <Menubar.Menu>
          <Menubar.Trigger className="flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[20px]  leading-none text-violet11 outline-none data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4">
            <Link to="/workspace/all_recycle_bin">Recycle Bin</Link>
          </Menubar.Trigger>
        </Menubar.Menu>

        <div className="ml-auto">
          <Menubar.Menu>
            <Menubar.Trigger className="flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[20px]  leading-none text-violet11 outline-none data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4">
              {name ? (
                <>
                  <span className="border border-solid border-r w-8 h-8 rounded-full text-center py-1 bg-[#0099ff] mx-1 ">
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
                className="min-w-[180px] bg-[#151533]  p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
                align="start"
                sideOffset={15}
                alignOffset={-3}
              >
                <Link to={`/workspace/edit_my_account`}>
                  <Menubar.Item className="group hover:bg-[#26265f] relative flex h-[35px] select-none items-center rounded px-2.5  text-[18px] leading-none text-white outline-none data-[disabled]:pointer-events-none    data-[highlighted]:data-[state=open]:text-white data-[highlighted]:text-white data-[state=open]:text-white">
                    Edit My Account
                  </Menubar.Item>
                </Link>
                <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
                <Menubar.Item
                  onClick={() => {
                    handlePharmacyUserLogout();
                  }}
                  className="group hover:bg-[#26265f] relative flex h-[35px] cursor-pointer select-none items-center rounded px-2.5 text-[18px] leading-none text-white outline-none data-[disabled]:pointer-events-none    data-[highlighted]:data-[state=open]:text-white data-[highlighted]:text-white data-[state=open]:text-white"
                >
                  Logout
                </Menubar.Item>

                <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
              </Menubar.Content>
            </Menubar.Portal>
          </Menubar.Menu>
        </div>
      </Menubar.Root>
      <Outlet />
    </>
  );
}

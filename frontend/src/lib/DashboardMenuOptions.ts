import { Home, Contact2, Trash2Icon } from "lucide-react";

export const DashboardMenuItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Contact2,
  },
  {
    title: "Register user",
    url: "/dashboard/register",
    icon: Contact2,
  },
  {
    title: "Login user",
    url: "/dashboard/login",
    icon: Contact2,
  },

  {
    title: "Recycle Bin",
    url: "/dashboard/recycle_bin",
    icon: Trash2Icon,
  },
];

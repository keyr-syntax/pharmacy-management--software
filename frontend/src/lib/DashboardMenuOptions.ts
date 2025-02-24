import { Home, Search, Settings, Contact2 } from "lucide-react";

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
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

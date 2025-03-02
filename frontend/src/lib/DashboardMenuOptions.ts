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
    title: "Users Recycle Bin",
    url: "/dashboard/users_recycle_bin",
    icon: Trash2Icon,
  },
  {
    title: "Drugs",
    url: "/dashboard/drugs",
    icon: Trash2Icon,
  },
  {
    title: "Dosage form",
    url: "/dashboard/dosage_form",
    icon: Trash2Icon,
  },
  {
    title: "Dosage form Recycle Bin",
    url: "/dashboard/dosage_form_recycle_bin",
    icon: Trash2Icon,
  },
  {
    title: "Drug Manufacturer",
    url: "/dashboard/drug_manufacturer",
    icon: Trash2Icon,
  },
  {
    title: "Route of Administration",
    url: "/dashboard/drugs",
    icon: Trash2Icon,
  },
];

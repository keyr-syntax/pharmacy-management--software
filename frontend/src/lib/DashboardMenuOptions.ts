import {
  Home,
  Contact2,
  Trash2Icon,
  DraftingCompass,
  DramaIcon,
} from "lucide-react";

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
    icon: Contact2,
  },
  {
    title: "Drugs",
    url: "/dashboard/drugs",
    icon: DramaIcon,
  },
  {
    title: "Dosage form",
    url: "/dashboard/dosage_form",
    icon: DramaIcon,
  },
  {
    title: "Dosage form Recycle Bin",
    url: "/dashboard/dosage_form_recycle_bin",
    icon: DramaIcon,
  },
  {
    title: "Add new drug Manufacturer",
    url: "/dashboard/drug_manufacturer",
    icon: DraftingCompass,
  },
  {
    title: "Drug Manufacturer List",
    url: "/dashboard/drug_manufacturer_list",
    icon: DraftingCompass,
  },
  {
    title: "Recycle Bin for drug manufacturers",
    url: "/dashboard/drug_manufacturer_recycle_bin",
    icon: DraftingCompass,
  },
  {
    title: "Route of Administration",
    url: "/dashboard/drugs",
    icon: Trash2Icon,
  },
];

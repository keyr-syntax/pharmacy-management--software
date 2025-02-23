import { Trash2, Pencil, Check, X } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllPharmacyUsers } from "@/services/UserApiService";
import { PharmacyUserGlobalState } from "@/stores/GlobalState";

import { useEffect } from "react";
export default function PharmacyUsersList() {
  const { usersList } = PharmacyUserGlobalState();

  useEffect(() => {
    getAllPharmacyUsers();
  }, []);

  return (
    <>
      {usersList && usersList.length > 0 ? (
        <Table>
          <TableCaption>A list of Employees</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>User ID</TableHead>
              <TableHead>First name</TableHead>
              <TableHead>Last name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersList.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>

                {user.isBlocked ? (
                  <TableCell className="text-red-700">Blocked</TableCell>
                ) : (
                  <TableCell>Not Blocked</TableCell>
                )}

                <TableCell>
                  <Pencil size={22} className="inline cursor-pointer" />{" "}
                </TableCell>

                <TableCell>
                  <Trash2
                    size={28}
                    className="inline cursor-pointer text-red-700"
                  />
                </TableCell>
                <TableCell>
                  <Check size={30} className="inline cursor-pointer" />{" "}
                </TableCell>
                <TableCell>
        
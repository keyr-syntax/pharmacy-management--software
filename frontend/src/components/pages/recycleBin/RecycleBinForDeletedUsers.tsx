import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  getAllDeletedUsers,
  undoDeletedPharmacyUser,
} from "@/services/UserApiService";

import { useEffect } from "react";
import { DeletedItemsGlobalState } from "@/stores/user_state_store/UserGlobalState";

export default function DeletedUsersList() {
  const { deltedUsersList } = DeletedItemsGlobalState();

  useEffect(() => {
    getAllDeletedUsers();
  }, []);

  return (
    <>
      {deltedUsersList && deltedUsersList.length > 0 ? (
        <>
          <h1 className="text-center text-[20px] font-bold mb-3 mt-[90px]">
            Deleted Employees List
          </h1>
          <Table className="w-[90%] mx-auto border ">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>First name</TableHead>
                <TableHead>Last name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date modified</TableHead>
                <TableHead>Actions </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deltedUsersList.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.isBlocked}</TableCell>

                  <TableCell>
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      undoDeletedPharmacyUser(user.id);
                    }}
                    className=" cursor-pointer text-nowrap"
                  >
                    <span className="inline text-lg font-semibold text-red-700">
                      Undo Delete
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <div className="block text-center text-3xl"></div>
      )}
    </>
  );
}

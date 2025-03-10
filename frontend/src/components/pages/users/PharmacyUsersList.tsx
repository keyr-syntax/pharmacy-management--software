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

import {
  getAllPharmacyUsers,
  findPharmacyUserByID,
  DeletePharmacyUserByAdmin,
  updatePharmacyUserByAdmin,
} from "@/services/UserApiService";
import {
  EditPharmacyUserGlobalState,
  PharmacyUserGlobalState,
} from "@/stores/user_state_store/UserGlobalState";

import { useEffect } from "react";
import { Input } from "@/components/ui/input";

export default function PharmacyUsersList() {
  const { usersList } = PharmacyUserGlobalState();
  const {
    userEditID,
    firstName,
    lastName,
    email,
    phoneNumber,
    role,
    isBlocked,
  } = EditPharmacyUserGlobalState();

  useEffect(() => {
    getAllPharmacyUsers();
  }, []);

  return (
    <>
      {usersList && usersList.length > 0 ? (
        <Table className="w-[90%] mt-[90px] mx-auto border ">
          <TableCaption>A list of Employees</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>First name</TableHead>
              <TableHead>Last name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Actions </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersList.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                {firstName !== null && userEditID === user.id ? (
                  <TableCell>
                    <Input
                      className="block border border-solid border-[rgb(255,255,255,0.2)] rounded"
                      id="first_name"
                      type="text"
                      placeholder="First name"
                      required
                      value={firstName}
                      onChange={(e) => {
                        EditPharmacyUserGlobalState.setState({
                          firstName: e.target.value,
                        });
                      }}
                    />
                  </TableCell>
                ) : (
                  <TableCell>{user.firstName}</TableCell>
                )}
                {lastName !== null && userEditID === user.id ? (
                  <TableCell>
                    <Input
                      className="block border border-solid border-[rgb(255,255,255,0.2)] rounded"
                      id="last_name"
                      type="text"
                      placeholder="Last name"
                      required
                      value={lastName}
                      onChange={(e) => {
                        EditPharmacyUserGlobalState.setState({
                          lastName: e.target.value,
                        });
                      }}
                    />
                  </TableCell>
                ) : (
                  <TableCell>{user.lastName}</TableCell>
                )}

                {phoneNumber !== null && userEditID === user.id ? (
                  <TableCell>
                    <Input
                      className="block border border-solid border-[rgb(255,255,255,0.2)] rounded"
                      type="tel"
                      placeholder="Your Phone number"
                      required
                      value={phoneNumber}
                      onChange={(e) => {
                        EditPharmacyUserGlobalState.setState({
                          phoneNumber: e.target.value,
                        });
                      }}
                    />
                  </TableCell>
                ) : (
                  <TableCell>{user.phoneNumber}</TableCell>
                )}

                {email !== null && userEditID === user.id ? (
                  <TableCell>
                    <Input
                      className="block border border-solid border-[rgb(255,255,255,0.2)] rounded"
                      type="email"
                      placeholder="Your email address"
                      required
                      value={email}
                      onChange={(e) => {
                        EditPharmacyUserGlobalState.setState({
                          email: e.target.value,
                        });
                      }}
                    />
                  </TableCell>
                ) : (
                  <TableCell>{user.email}</TableCell>
                )}
                {role !== null && userEditID === user.id ? (
                  <TableCell>
                    <select
                      title="role"
                      id="role"
                      className="block   border border-solid border-[rgb(255,255,255,0.2)]  p-2 bg-transparent rounded"
                      value={role}
                      onChange={(e) => {
                        EditPharmacyUserGlobalState.setState({
                          role: e.target.value,
                        });
                      }}
                    >
                      <option className="text-white bg-[#151533]" value="">
                        Select a role
                      </option>
                      <option className="text-white bg-[#151533]" value="admin">
                        Admin
                      </option>
                      <option
                        className="text-white bg-[#151533]"
                        value="manager"
                      >
                        Manager
                      </option>
                      <option
                        className="text-white bg-[#151533]"
                        value="pharmacist"
                      >
                        Pharmacist
                      </option>
                    </select>
                  </TableCell>
                ) : (
                  <TableCell>{user.role}</TableCell>
                )}
                {isBlocked !== null && userEditID === user.id && (
                  <TableCell>
                    <select
                      title="block/unblock"
                      id="isBlocked"
                      className="block   border border-solid border-[rgb(255,255,255,0.2)]  p-2 bg-transparent rounded"
                      value={isBlocked}
                      onChange={(e) => {
                        EditPharmacyUserGlobalState.setState({
                          isBlocked: e.target.value,
                        });
                      }}
                    >
                      <option className="text-white bg-[#151533]" value="">
                        Select a status
                      </option>
                      <option
                        className="text-white bg-[#151533]"
                        value="Blocked"
                      >
                        Blocked
                      </option>
                      <option
                        className="text-white bg-[#151533]"
                        value="Not Blocked"
                      >
                        Not Blocked
                      </option>
                    </select>
                  </TableCell>
                )}
                {userEditID !== user.id && user.isBlocked === "Blocked" && (
                  <TableCell className="text-red-700 font-semibold text-[16px]">
                    Blocked
                  </TableCell>
                )}
                {userEditID !== user.id && user.isBlocked === "Not Blocked" && (
                  <TableCell>Not blocked</TableCell>
                )}
                <TableCell>
                  {new Date(user.updatedAt).toLocaleDateString()}
                </TableCell>
                {userEditID === null &&
                  userEditID !== user.id &&
                  firstName === null &&
                  lastName === null &&
                  phoneNumber === null &&
                  email === null &&
                  isBlocked === null &&
                  role === null && (
                    <>
                      <TableCell className="text-nowrap">
                        <Pencil
                          onClick={() => {
                            EditPharmacyUserGlobalState.setState({
                              userEditID: user.id,
                            });
                            findPharmacyUserByID(user.id);
                          }}
                          size={22}
                          className="inline cursor-pointer mr-4"
                        />{" "}
                        <Trash2
                          onClick={() => {
                            DeletePharmacyUserByAdmin(user.id);
                          }}
                          size={28}
                          className="inline cursor-pointer text-red-700"
                        />
                      </TableCell>
                    </>
                  )}
                {userEditID !== null &&
                  userEditID === user.id &&
                  firstName &&
                  lastName &&
                  phoneNumber &&
                  email &&
                  isBlocked &&
                  role && (
                    <>
                      <TableCell className="text-nowrap">
                        <Check
                          onClick={() => {
                            updatePharmacyUserByAdmin(
                              user.id,
                              firstName,
                              lastName,
                              email,
                              phoneNumber,
                              role,
                              isBlocked
                            );
                          }}
                          size={32}
                          className="inline cursor-pointer mr-3 font-bold text-green-700"
                        />{" "}
                        <X
                          onClick={() => {
                            EditPharmacyUserGlobalState.setState({
                              userEditID: null,
                              firstName: null,
                              lastName: null,
                              email: null,
                              phoneNumber: null,
                              role: null,
                              isBlocked: null,
                            });
                          }}
                          size={32}
                          className="inline cursor-pointer text-red-700"
                        />{" "}
                      </TableCell>
                    </>
                  )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="block text-center text-3xl">
          No Employee record found
        </div>
      )}
    </>
  );
}

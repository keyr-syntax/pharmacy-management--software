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
  getAllDrugManufacturers,
  findDrugManufacturerByID,
  updateDrugManufacturerByAdmin,
  DeleteDrugManufacturer,
} from "@/services/DrugManufacturerApiService";

import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { DrugManufacturerGlobalState } from "@/stores/product_state_store/DrugManufacturerGlobalState";
import { DrugManufacturerFormData } from "@/types/productTypes";

export default function TableForDrugManufacturer() {
  const {
    manufacturerName,
    contactName,
    phoneNumber,
    licenseNumber,
    drugManufacturerIDForEdit,
    drugManufacturerList,
  } = DrugManufacturerGlobalState();

  useEffect(() => {
    getAllDrugManufacturers();
  }, []);
  const formData: DrugManufacturerFormData = {
    manufacturerName: manufacturerName ?? "",
    contactName: contactName ?? "",
    phoneNumber: phoneNumber ?? "",
    licenseNumber: licenseNumber ?? "",
  };
  return (
    <>
      {drugManufacturerList && drugManufacturerList.length > 0 ? (
        <Table>
          <TableCaption>Drug Manufacturers</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Manufacturer name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Phone number </TableHead>
              <TableHead>License number </TableHead>{" "}
              <TableHead>Added on </TableHead> <TableHead>Actions </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drugManufacturerList.map((manufacturer) => (
              <TableRow key={manufacturer.manufacturerID}>
                {manufacturerName !== null &&
                drugManufacturerIDForEdit === manufacturer.manufacturerID ? (
                  <TableCell>
                    <Input
                      className="block border border-solid border-[rgb(255,255,255,0.2)] rounded"
                      id="Dosage form"
                      type="text"
                      placeholder="Dosage form"
                      required
                      value={manufacturerName}
                      onChange={(e) => {
                        console.log("dosageForm", e.target.value);
                        DrugManufacturerGlobalState.setState({
                          manufacturerName: e.target.value,
                        });
                      }}
                    />
                  </TableCell>
                ) : (
                  <TableCell>{manufacturer.manufacturerName}</TableCell>
                )}
                {contactName !== null &&
                drugManufacturerIDForEdit === manufacturer.manufacturerID ? (
                  <TableCell>
                    <Input
                      className="block border border-solid border-[rgb(255,255,255,0.2)] rounded"
                      id="contactName"
                      type="text"
                      placeholder="contactName"
                      required
                      value={contactName}
                      onChange={(e) => {
                        console.log("dosageForm", e.target.value);
                        DrugManufacturerGlobalState.setState({
                          contactName: e.target.value,
                        });
                      }}
                    />
                  </TableCell>
                ) : (
                  <TableCell>{manufacturer.contactName}</TableCell>
                )}
                {phoneNumber !== null &&
                drugManufacturerIDForEdit === manufacturer.manufacturerID ? (
                  <TableCell>
                    <Input
                      className="block border border-solid border-[rgb(255,255,255,0.2)] rounded"
                      id="Dosage form"
                      type="text"
                      placeholder="Dosage form"
                      required
                      value={phoneNumber}
                      onChange={(e) => {
                        console.log("dosageForm", e.target.value);
                        DrugManufacturerGlobalState.setState({
                          phoneNumber: e.target.value,
                        });
                      }}
                    />
                  </TableCell>
                ) : (
                  <TableCell>{manufacturer.phoneNumber}</TableCell>
                )}
                {licenseNumber !== null &&
                drugManufacturerIDForEdit === manufacturer.manufacturerID ? (
                  <TableCell>
                    <Input
                      className="block border border-solid border-[rgb(255,255,255,0.2)] rounded"
                      id="phoneNumber"
                      type="text"
                      placeholder="phoneNumber"
                      required
                      value={licenseNumber}
                      onChange={(e) => {
                        DrugManufacturerGlobalState.setState({
                          licenseNumber: e.target.value,
                        });
                      }}
                    />
                  </TableCell>
                ) : (
                  <TableCell>{manufacturer.licenseNumber}</TableCell>
                )}
                <TableCell>
                  {manufacturer.updatedAt
                    ? new Date(manufacturer.updatedAt).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                {drugManufacturerIDForEdit === null &&
                  drugManufacturerIDForEdit !== manufacturer.manufacturerID &&
                  manufacturerName === null &&
                  contactName === null &&
                  phoneNumber === null &&
                  licenseNumber === null && (
                    <>
                      <TableCell>
                        <Pencil
                          onClick={() => {
                            if (manufacturer.manufacturerID) {
                              DrugManufacturerGlobalState.setState({
                                drugManufacturerIDForEdit:
                                  manufacturer.manufacturerID,
                              });
                              findDrugManufacturerByID(
                                manufacturer.manufacturerID
                              );
                            }
                          }}
                          size={22}
                          className="inline cursor-pointer mr-4"
                        />{" "}
                        <Trash2
                          onClick={() => {
                            if (manufacturer.manufacturerID) {
                              DeleteDrugManufacturer(
                                manufacturer.manufacturerID
                              );
                            }
                          }}
                          size={28}
                          className="inline cursor-pointer text-red-700"
                        />
                      </TableCell>
                    </>
                  )}
                {drugManufacturerIDForEdit !== null &&
                  drugManufacturerIDForEdit === manufacturer.manufacturerID &&
                  manufacturerName &&
                  contactName &&
                  phoneNumber &&
                  licenseNumber && (
                    <>
                      <TableCell>
                        <Check
                          onClick={() => {
                            if (manufacturer.manufacturerID) {
                              updateDrugManufacturerByAdmin(
                                manufacturer.manufacturerID,
                                formData
                              );
                            }
                          }}
                          size={32}
                          className="inline cursor-pointer mr-3 font-bold text-green-700"
                        />{" "}
                        <X
                          onClick={() => {
                            DrugManufacturerGlobalState.setState({
                              drugManufacturerIDForEdit: null,
                              manufacturerName: null,
                              contactName: null,
                              phoneNumber: null,
                              licenseNumber: null,
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
          No Drug manufacturers found
        </div>
      )}
    </>
  );
}

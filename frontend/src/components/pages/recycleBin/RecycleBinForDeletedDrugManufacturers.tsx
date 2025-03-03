import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  getAllDeletedDrugManufacturers,
  undoDeletedDrugManufacturer,
} from "@/services/DrugManufacturerApiService";
import { DrugManufacturerGlobalState } from "@/stores/product_state_store/DrugManufacturerGlobalState";

import { useEffect } from "react";

export default function RecycleBinForDeletedDrugManufacturers() {
  const { deletedDrugManufacturerList } = DrugManufacturerGlobalState();

  useEffect(() => {
    getAllDeletedDrugManufacturers();
  }, []);

  return (
    <>
      {deletedDrugManufacturerList && deletedDrugManufacturerList.length > 0 ? (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Manufacturer name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Phone number </TableHead>
                <TableHead>License number </TableHead>{" "}
                <TableHead>Modified on </TableHead>{" "}
                <TableHead>Actions </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deletedDrugManufacturerList.map((manufacturer) => (
                <TableRow key={manufacturer.manufacturerID}>
                  <TableCell>{manufacturer.manufacturerName}</TableCell>
                  <TableCell>{manufacturer.contactName}</TableCell>{" "}
                  <TableCell>{manufacturer.phoneNumber}</TableCell>
                  <TableCell>{manufacturer.licenseNumber}</TableCell>
                  <TableCell>
                    {manufacturer.updatedAt
                      ? new Date(manufacturer.updatedAt).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      if (manufacturer.manufacturerID) {
                        undoDeletedDrugManufacturer(
                          manufacturer.manufacturerID
                        );
                      }
                    }}
                    className="text-red-700 cursor-pointer "
                  >
                    <span className="inline text-lg font-semibold">
                      Undo Delete
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <div className="block text-center text-3xl">
          No Deleted drug manufacturers found
        </div>
      )}
    </>
  );
}

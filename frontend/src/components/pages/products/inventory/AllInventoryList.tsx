import { Trash2, Pencil } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect } from "react";
import {
  DeleteInventory,
  getAllInventories,
} from "@/services/InventoryApiService";

import { Link } from "react-router-dom";
import { InventoryGlobalState } from "@/stores/product_state_store/InventoryGlobalState";
import Loading from "@/components/ui/loading";

export default function AllInventoryList() {
  const { inventoryList, loading } = InventoryGlobalState();

  useEffect(() => {
    getAllInventories();
  }, []);

  return (
    <>
      {loading && <Loading />}
      {!loading && inventoryList && inventoryList.length > 0 ? (
        <Table className="w-[90%] mt-[90px] mx-auto border">
          <TableCaption>All Inventories</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Product name</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Batch No.</TableHead>
              <TableHead>Barcode </TableHead>
              <TableHead>Quantity </TableHead>
              <TableHead>Min. QTY </TableHead>
              <TableHead>Reorder QTY </TableHead>
              <TableHead>Storage</TableHead>
              <TableHead>Location </TableHead>
              <TableHead>Actions </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryList.map((inventory) => (
              <TableRow key={inventory.drugInventoryID}>
                <TableCell>{inventory?.drug?.genericName}</TableCell>
                <TableCell>
                  {inventory.expiryDate
                    ? new Date(inventory.expiryDate).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "numeric" }
                      )
                    : "N/A"}
                </TableCell>
                <TableCell>{inventory.batchNumber}</TableCell>
                <TableCell>{inventory.barCode}</TableCell>
                <TableCell>{inventory.quantityInStock}</TableCell>
                <TableCell>{inventory.minimumQuantityInStock}</TableCell>
                <TableCell>{inventory.reorderStockLevel}</TableCell>
                <TableCell>{inventory.storageConditions}</TableCell>
                <TableCell>{inventory.location}</TableCell>
                <TableCell>
                  <Link
                    to={`/workspace/edit_inventory/${inventory.drugInventoryID}`}
                  >
                    <Pencil
                      size={32}
                      className="inline cursor-pointer mr-5 font-bold text-yellow-500"
                    />
                  </Link>
                  <Trash2
                    onClick={() => {
                      if (inventory.drugInventoryID) {
                        DeleteInventory(inventory.drugInventoryID);
                      }
                    }}
                    size={32}
                    className="inline cursor-pointer  font-bold text-red-700"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="block text-center text-3xl">No Inventory found</div>
      )}
    </>
  );
}

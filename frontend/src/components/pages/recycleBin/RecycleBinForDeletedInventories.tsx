import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect } from "react";
import {
  getAllDeletedInventories,
  undoDeletedInventory,
} from "@/services/InventoryApiService";

import { InventoryGlobalState } from "@/stores/product_state_store/InventoryGlobalState";
import Loading from "@/components/ui/loading";

export default function RecycleBinForDeletedInventories() {
  const { deletedInventoryList, loading } = InventoryGlobalState();

  useEffect(() => {
    getAllDeletedInventories();
  }, []);

  return (
    <>
      {loading && <Loading />}
      {!loading && deletedInventoryList && deletedInventoryList.length > 0 ? (
        <>
          <h1 className="text-center text-[20px] font-bold mb-3 mt-[90px]">
            Deleted Inventories List
          </h1>
          <Table className="w-[90%]  mx-auto border">
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
              {deletedInventoryList.map((inventory) => (
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
                  <TableCell
                    onClick={() => {
                      if (inventory.drugInventoryID) {
                        undoDeletedInventory(inventory.drugInventoryID);
                      }
                    }}
                    className=" cursor-pointer"
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

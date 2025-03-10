import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect } from "react";

import { AddandEditProductDetailsGlobalState } from "@/stores/product_state_store/ProductDetailsGlobalState";

import {
  undoDeletedProducts,
  getAllDeletedProducts,
} from "@/services/ProductDetailsApiService";

export default function RecycleBinForDeletedProducts() {
  const { deletedProductsList, loading } =
    AddandEditProductDetailsGlobalState();

  useEffect(() => {
    getAllDeletedProducts();
  }, []);

  return (
    <>
      {!loading && deletedProductsList && deletedProductsList.length > 0 ? (
        <>
          <h1 className="text-center text-[20px] font-bold mb-3 mt-[90px]">
            Deleted Products List
          </h1>
          <Table className="w-[90%] mx-auto border">
            <TableHeader>
              <TableRow>
                <TableHead>Generic name</TableHead>
                <TableHead>Brand name</TableHead>
                <TableHead>Dosage form</TableHead>
                <TableHead>Strength</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Prescription</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Units/pack</TableHead>
                <TableHead>Status </TableHead>
                <TableHead>Last modified</TableHead>
                <TableHead>Actions </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deletedProductsList.map((product) => (
                <TableRow key={product.drugID}>
                  <TableCell>{product.genericName}</TableCell>
                  <TableCell>{product.brandName}</TableCell>
                  <TableCell>{product.dosageForm}</TableCell>
                  <TableCell>{product.dosageStrength}</TableCell>
                  <TableCell>{product.drugClass}</TableCell>
                  <TableCell>{product.drugType}</TableCell>
                  <TableCell>{product.routeOfDrugAdministration}</TableCell>
                  <TableCell>{product.unitsPerPack}</TableCell>
                  <TableCell>{product.status}</TableCell>
                  <TableCell>
                    {product.updatedAt
                      ? new Date(product.updatedAt).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      if (product.drugID) {
                        undoDeletedProducts(product.drugID);
                      }
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

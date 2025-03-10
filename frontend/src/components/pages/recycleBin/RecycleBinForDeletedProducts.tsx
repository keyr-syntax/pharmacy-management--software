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
        <Table className="w-[90%] mt-[90px] mx-auto border">
          <TableCaption>Recycle Bin for deleted products</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Generic name</TableHead>
              <TableHead>Brand name</TableHead>

              <TableHead>Last modified</TableHead>
              <TableHead>Actions </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deletedProductsList.map((product) => (
              <TableRow key={product.drugID}>
                <TableCell>{product.genericName}</TableCell>
                <TableCell>{product.brandName}</TableCell>

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
      ) : (
        <div className="block text-center text-3xl"></div>
      )}
    </>
  );
}

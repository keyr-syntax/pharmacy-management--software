import { Trash2, Pencil, EyeIcon } from "lucide-react";
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
  DeleteProduct,
  getAllProducts,
} from "@/services/ProductDetailsApiService";
import { AddandEditProductDetailsGlobalState } from "@/stores/product_state_store/ProductDetailsGlobalState";
import { Link } from "react-router-dom";

export default function AllProductsList() {
  const { productsList, loading } = AddandEditProductDetailsGlobalState();

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      {!loading && productsList && productsList.length > 0 ? (
        <Table className="w-[95%] mt-[90px] mx-auto border">
          <TableCaption>All Products</TableCaption>
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
              <TableHead>Added on </TableHead>
              <TableHead>Actions </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsList.map((product) => (
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
                  {product.createdAt
                    ? new Date(product.createdAt).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <EyeIcon
                    size={32}
                    className="inline cursor-pointer mr-5 font-bold text-green-700"
                  />
                  <Link to={`/workspace/edit_product/${product.drugID}`}>
                    <Pencil
                      size={32}
                      className="inline cursor-pointer mr-5 font-bold text-yellow-500"
                    />
                  </Link>
                  <Trash2
                    onClick={() => {
                      if (product.drugID) {
                        DeleteProduct(product.drugID);
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
        <div className="block text-center text-3xl">No Product found</div>
      )}
    </>
  );
}

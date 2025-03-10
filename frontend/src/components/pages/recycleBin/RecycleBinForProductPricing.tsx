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
  getAllDeletedProductPricings,
  undoDeletedProductPricing,
} from "@/services/ProductPricingApiService";
import { ProductPricingGlobalState } from "@/stores/product_state_store/ProductPricingGlobalState";

export default function RecycleBinForProductPricing() {
  const { deletedPricingList, loading } = ProductPricingGlobalState();

  useEffect(() => {
    getAllDeletedProductPricings();
  }, []);

  return (
    <>
      {!loading && deletedPricingList && deletedPricingList.length > 0 ? (
        <Table className="w-[90%] mt-[90px] mx-auto border">
          <TableCaption>All Product Pricings</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Purchase Price</TableHead>
              <TableHead>Selling Price</TableHead>
              <TableHead>Tax Rate</TableHead>
              <TableHead>Margin</TableHead>
              <TableHead>Insurance Coverage</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deletedPricingList.map((pricing) => (
              <TableRow key={pricing.pricingID ?? pricing.drugID}>
                <TableCell>{pricing?.drug?.genericName}</TableCell>
                <TableCell>{pricing.purchasePrice}</TableCell>
                <TableCell>{pricing.sellingPrice}</TableCell>
                <TableCell>{pricing.taxRate}</TableCell>
                <TableCell>{pricing.margin}</TableCell>
                <TableCell>
                  {pricing.insuranceCoverage ? "Yes" : "No"}
                </TableCell>
                <TableCell
                  onClick={() => {
                    if (pricing.pricingID) {
                      undoDeletedProductPricing(pricing.pricingID);
                    }
                  }}
                  className="text-red-700 cursor-pointer"
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

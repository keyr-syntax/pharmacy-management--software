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
        <>
          <h1 className="text-center text-[20px] font-bold mb-3 mt-[90px]">
            Deleted Pricing List
          </h1>
          <Table className="w-[90%]  mx-auto border">
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
                    className="cursor-pointer"
                  >
                    <span className="inline text-lg font-semibold text-red-700 ">
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

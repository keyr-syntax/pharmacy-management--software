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
  deleteProductPricing,
  getAllProductPricings,
} from "@/services/ProductPricingApiService";
import { ProductPricingGlobalState } from "@/stores/product_state_store/ProductPricingGlobalState";
import { Link } from "react-router-dom";
import Loading from "@/components/ui/loading";

export default function ProductPricingsList() {
  const { pricingList, loading } = ProductPricingGlobalState();

  useEffect(() => {
    getAllProductPricings();
  }, []);

  return (
    <>
      {loading && <Loading />}
      {!loading && pricingList && pricingList.length > 0 && (
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
            {pricingList.map((pricing) => (
              <TableRow key={pricing.pricingID ?? pricing.drugID}>
                <TableCell>{pricing?.drug?.genericName}</TableCell>
                <TableCell>{pricing.purchasePrice}</TableCell>
                <TableCell>{pricing.sellingPrice}</TableCell>
                <TableCell>{pricing.taxRate}</TableCell>
                <TableCell>{pricing.margin}</TableCell>
                <TableCell>
                  {pricing.insuranceCoverage ? "Yes" : "No"}
                </TableCell>
                <TableCell>
                  <Link to={`/workspace/edit_pricing/${pricing.pricingID}`}>
                    <Pencil
                      size={32}
                      className="inline cursor-pointer mr-5 font-bold text-yellow-500"
                    />
                  </Link>
                  <Trash2
                    onClick={() => {
                      if (pricing.pricingID) {
                        deleteProductPricing(pricing.pricingID);
                      }
                    }}
                    size={32}
                    className="inline cursor-pointer font-bold text-red-700"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {!loading && pricingList && pricingList.length === 0 && (
        <div className="block text-center text-2xl mt-[90px]">
          No Product Pricing found
        </div>
      )}
    </>
  );
}

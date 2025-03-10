import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import {
  createNewProductPricing,
  resetPricingGlobalState,
} from "@/services/ProductPricingApiService";
import { ProductPricingGlobalState } from "@/stores/product_state_store/ProductPricingGlobalState";
import { ProductPricingTypes } from "@/types/productTypes";
import { useEffect } from "react";
import { getAllProducts } from "@/services/ProductDetailsApiService";
import { AddandEditProductDetailsGlobalState } from "@/stores/product_state_store/ProductDetailsGlobalState";

export default function NewProductPricing() {
  const navigate = useNavigate();
  const {
    drugID,
    purchasePrice,
    sellingPrice,
    taxRate,
    margin,
    insuranceCoverage,
    loading,
  } = ProductPricingGlobalState();
  const { productsList } = AddandEditProductDetailsGlobalState();

  useEffect(() => {
    resetPricingGlobalState();
    getAllProducts();
  }, []);

  const formData: ProductPricingTypes = {
    drugID: drugID,
    purchasePrice: purchasePrice,
    sellingPrice: sellingPrice,
    taxRate: taxRate,
    margin: margin,
    insuranceCoverage: insuranceCoverage,
  };

  const handleSubmitPricing = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await createNewProductPricing(formData);
    if (success) {
      navigate("/workspace/all_pricing");
    }
  };

  return (
    <div className="w-[90%] mx-auto mt-[110px]">
      <p className="text-center text-2xl my-5">Product Pricing Details</p>
      <form
        className="flex flex-row gap-5 flex-wrap sm:justify-start justify-center items-center"
        onSubmit={handleSubmitPricing}
      >
        <div className="md:w-[30%] sm:w-[45%] w-[80%] grid gap-3">
          <Label htmlFor="product">Product</Label>
          <select
            id="Product"
            title="Product"
            className="block w-full border border-solid border-[rgb(255,255,255,0.2)]  p-2 bg-transparent rounded hover:bg-[#151533]"
            value={drugID ?? ""}
            onChange={(e) => {
              ProductPricingGlobalState.setState({
                drugID: e.target.value,
              });
            }}
          >
            <option
              className="bg-[#151533] text-white hover:bg-[#151533]"
              value=""
            >
              Select Product
            </option>
            {productsList?.map((product) => (
              <option
                className="bg-[#151533] text-white hover:bg-[#151533]"
                key={product.drugID}
                value={product.drugID}
              >
                {product.genericName} - {product.brandName}
              </option>
            ))}
          </select>
        </div>

        <div className="md:w-[30%] sm:w-[45%] w-[80%] grid gap-3">
          <Label htmlFor="purchasePrice">Purchase Price</Label>
          <Input
            id="purchasePrice"
            type="number"
            placeholder="Enter Purchase Price"
            required
            value={purchasePrice ?? ""}
            onChange={(e) => {
              ProductPricingGlobalState.setState({
                purchasePrice: Number(e.target.value),
              });
            }}
          />
        </div>

        <div className="md:w-[30%] sm:w-[45%] w-[80%] grid gap-3">
          <Label htmlFor="sellingPrice">Selling Price</Label>
          <Input
            id="sellingPrice"
            type="number"
            placeholder="Enter Selling Price"
            required
            value={sellingPrice ?? ""}
            onChange={(e) => {
              ProductPricingGlobalState.setState({
                sellingPrice: Number(e.target.value),
              });
            }}
          />
        </div>

        <div className="md:w-[30%] sm:w-[45%] w-[80%] grid gap-3">
          <Label htmlFor="taxRate">Tax Rate</Label>
          <Input
            id="taxRate"
            type="number"
            placeholder="Enter Tax Rate"
            required
            value={taxRate ?? ""}
            onChange={(e) => {
              ProductPricingGlobalState.setState({
                taxRate: Number(e.target.value),
              });
            }}
          />
        </div>

        <div className="md:w-[30%] sm:w-[45%] w-[80%] grid gap-3">
          <Label htmlFor="margin">Margin</Label>
          <Input
            id="margin"
            type="number"
            placeholder="Enter Margin"
            value={margin ?? ""}
            onChange={(e) => {
              ProductPricingGlobalState.setState({
                margin: Number(e.target.value),
              });
            }}
          />
        </div>

        <div className="md:w-[30%] sm:w-[45%] w-[80%] grid gap-3">
          <Label htmlFor="insuranceCoverage">Insurance Coverage</Label>
          <select
            title="insurance coverage"
            id="insuranceCoverage"
            required
            value={insuranceCoverage ? "true" : "false"}
            onChange={(e) => {
              ProductPricingGlobalState.setState({
                insuranceCoverage: e.target.value === "true",
              });
            }}
            className="block w-full border border-solid border-[rgb(255,255,255,0.2)] p-2 bg-transparent rounded hover:bg-[#151533]"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <Button className="text-center block mx-auto bg-[#00C8FF] hover:bg-[#0099ff] text-black font-semibold text-md my-5 md:w-[200px] w-[60%] rounded">
          {loading ? "Please wait..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}

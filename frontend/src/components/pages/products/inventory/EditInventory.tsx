import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useNavigate, useParams } from "react-router-dom";
import {
  findInventoryByID,
  updateInventoryByAdmin,
} from "@/services/InventoryApiService";
import { InventoryTypes } from "../../../../types/productTypes";
import { InventoryGlobalState } from "@/stores/product_state_store/InventoryGlobalState";
import { CalendarIcon } from "lucide-react";
import { useEffect } from "react";
import { getAllStorageConditions } from "@/services/ProductConstantsApiService";
import { ProductConstantsGlobalState } from "@/stores/product_state_store/ProductConstantsGlobalState";
import { AddandEditProductDetailsGlobalState } from "@/stores/product_state_store/AddandEditProductDetailsGlobalState";
import { getAllProducts } from "@/services/ProductDetailsApiService";

export default function EditInventory() {
  const { storageConditionsList } = ProductConstantsGlobalState();
  const { productsList } = AddandEditProductDetailsGlobalState();
  const { drugInventoryID } = useParams();

  useEffect(() => {
    if (drugInventoryID) {
      findInventoryByID(drugInventoryID);
    }
  }, [drugInventoryID]);
  useEffect(() => {
    getAllProducts();
    getAllStorageConditions();
  }, []);

  const navigate = useNavigate();
  const {
    batchNumber,
    barCode,
    storageConditions,
    location,
    quantityInStock,
    minimumQuantityInStock,
    reorderStockLevel,
    loading,
    expiryDate,
    drugID,
  } = InventoryGlobalState();

  const formData: InventoryTypes = {
    drugID: drugID,
    batchNumber: batchNumber,
    barCode: barCode,
    storageConditions: storageConditions,
    location: location,
    expiryDate: expiryDate,
    quantityInStock: quantityInStock,
    minimumQuantityInStock: minimumQuantityInStock,
    reorderStockLevel: reorderStockLevel,
  };

  const handleUpdateInventory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (drugInventoryID) {
      const success = await updateInventoryByAdmin(drugInventoryID, formData);
      if (success) {
        navigate("/workspace/all_inventories");
      }
    }
  };

  return (
    <>
      <div className="w-[90%] mx-auto mt-[110px]">
        <p className="text-center text-2xl my-5">Edit Inventory Details</p>
        <form
          className="flex flex-row gap-5 flex-wrap justify-start items-center "
          onSubmit={handleUpdateInventory}
        >
          <div className="w-[30%] grid gap-3">
            <Label htmlFor="Product">Product</Label>

            <select
              id="Product"
              title="Product"
              className="block w-full border border-solid border-[rgb(255,255,255,0.2)]  p-2 bg-transparent rounded hover:bg-[#151533]"
              value={drugID ?? ""}
              onChange={(e) => {
                InventoryGlobalState.setState({
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
          <div className="w-[30%] grid gap-3">
            <Label htmlFor="name">Expiry Date</Label>

            <Popover>
              <PopoverTrigger asChild>
                <Button className="w-full border border-[rgb(255,255,255,0.2)] rounded pl-3 text-left font-normal">
                  <span>
                    {expiryDate ? (
                      new Date(expiryDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "numeric",
                      })
                    ) : (
                      <span>Pick expiry date</span>
                    )}
                  </span>

                  <CalendarIcon className="ml-auto" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto  p-0" align="start">
                <Calendar
                  className="bg-[#151533]"
                  mode="single"
                  selected={expiryDate || undefined}
                  onSelect={(day: Date) =>
                    InventoryGlobalState.setState({
                      expiryDate: day,
                    })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="w-[30%] grid gap-3">
            <Label htmlFor="Batch Number">Batch Number</Label>
            <Input
              id="Batch Number"
              placeholder="Batch number of the product"
              required
              value={batchNumber ?? ""}
              onChange={(e) => {
                InventoryGlobalState.setState({
                  batchNumber: e.target.value,
                });
              }}
            />
          </div>
          <div className="w-[30%] grid gap-3">
            <Label htmlFor="Barcode">Barcode</Label>
            <Input
              id="Barcode"
              placeholder="Barcode of the product"
              required
              value={barCode ?? ""}
              onChange={(e) => {
                InventoryGlobalState.setState({
                  barCode: e.target.value,
                });
              }}
            />
          </div>

          <div className="w-[30%] grid gap-3">
            <Label htmlFor="name">Quantity in stock</Label>
            <Input
              type="number"
              placeholder="Quantity in stock"
              required
              value={quantityInStock ?? ""}
              onChange={(e) => {
                InventoryGlobalState.setState({
                  quantityInStock: Number(e.target.value),
                });
              }}
            />
          </div>
          <div className="w-[30%] grid gap-3">
            <Label htmlFor="name">Minimum Quantity to get notified</Label>
            <Input
              type="number"
              placeholder="Minimum Quantity in stock"
              required
              value={minimumQuantityInStock ?? ""}
              onChange={(e) => {
                InventoryGlobalState.setState({
                  minimumQuantityInStock: Number(e.target.value),
                });
              }}
            />
          </div>
          <div className="w-[30%] grid gap-3">
            <Label htmlFor="Re-order stock level">Re-order stock level</Label>
            <Input
              type="number"
              placeholder="Re-order stock level"
              required
              value={reorderStockLevel ?? ""}
              onChange={(e) => {
                InventoryGlobalState.setState({
                  reorderStockLevel: Number(e.target.value),
                });
              }}
            />
          </div>
          <div className="w-[30%] grid gap-3">
            <Label htmlFor="Storage Conditions">Storage Conditions</Label>

            <select
              id="storage conditions"
              title="storage conditions"
              className="block w-full border border-solid border-[rgb(255,255,255,0.2)]  p-2 bg-transparent rounded hover:bg-[#151533]"
              value={storageConditions ?? ""}
              onChange={(e) => {
                InventoryGlobalState.setState({
                  storageConditions: e.target.value,
                });
              }}
            >
              <option
                className="bg-[#151533] text-white hover:bg-[#151533]"
                value=""
              >
                Select storage condition
              </option>
              {storageConditionsList?.map((storage) => (
                <option
                  className="bg-[#151533] text-white hover:bg-[#151533]"
                  key={storage.id}
                  value={storage.condition}
                >
                  {storage.condition}
                </option>
              ))}
            </select>
          </div>
          <div className="w-[30%] grid gap-3">
            <Label htmlFor="name">Storage Location</Label>
            <Input
              id="Storage Conditions"
              placeholder="Storage Conditions"
              required
              value={location ?? ""}
              onChange={(e) => {
                InventoryGlobalState.setState({
                  location: e.target.value,
                });
              }}
            />
          </div>
          <Button className="text-center block mx-auto bg-[#00C8FF] hover:bg-[#0099ff] text-black font-semibold text-md my-5 w-[200px] rounded">
            {loading ? "Please wait.." : "Submit"}
          </Button>
        </form>
      </div>
    </>
  );
}

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
import { createNewInventory } from "@/services/InventoryApiService";
import { InventoryTypes } from "../../../../types/productTypes";
import { InventoryGlobalState } from "@/stores/product_state_store/InventoryGlobalState";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

export default function NewInventoryPage() {
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const { drugID } = useParams();
  const navigate = useNavigate();
  const {
    batchNumber,
    barCode,
    storageConditions,
    location,
    // expiryDate,
    quantityInStock,
    minimumQuantityInStock,
    reorderStockLevel,
    loading,
  } = InventoryGlobalState();

  const formData: InventoryTypes = {
    drugID: drugID ?? "",
    batchNumber: batchNumber,
    barCode: barCode,
    storageConditions: storageConditions,
    location: location,
    expiryDate: expiryDate,
    quantityInStock: quantityInStock,
    minimumQuantityInStock: minimumQuantityInStock,
    reorderStockLevel: reorderStockLevel,
  };

  const handleSubmitInventory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await createNewInventory(formData);

    if (success) {
      navigate("/workspace/all_products");
    }
  };

  return (
    <>
      <div className="w-[90%] mx-auto mt-[110px]">
        <p className="text-center text-2xl my-5">Inventory Details</p>
        <form
          className="flex flex-row gap-5 flex-wrap justify-start items-center "
          onSubmit={handleSubmitInventory}
        >
          <div className="w-[30%] grid gap-3">
            <Label htmlFor="name">Expiry Date</Label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-full pl-3 text-left font-normal"
                >
                  <span>
                    {expiryDate ? (
                      expiryDate.toDateString()
                    ) : (
                      <span>Pick expiry date</span>
                    )}
                  </span>
                  <CalendarIcon className="ml-auto bg-red-500" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  className="bg-[#151533]"
                  mode="single"
                  selected={expiryDate || undefined}
                  onSelect={(day) => setExpiryDate(day || null)}
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
            <Input
              id="Storage Conditions"
              placeholder="Storage Conditions"
              required
              value={storageConditions ?? ""}
              onChange={(e) => {
                InventoryGlobalState.setState({
                  storageConditions: e.target.value,
                });
              }}
            />
          </div>
          <div className="w-[30%] grid gap-3">
            <Label htmlFor="name">Storage Location</Label>
            <Input
              id="Storage Conditions"
              placeholder="Storage Conditions"
              required
              value={storageConditions ?? ""}
              onChange={(e) => {
                InventoryGlobalState.setState({
                  storageConditions: e.target.value,
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

import type React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DrugManufacturerGlobalState } from "@/stores/product_state_store/DrugManufacturerGlobalState";
import { DrugManufacturerFormData } from "@/types/productTypes";
import { createNewDrugManufacturer } from "@/services/DrugManufacturerApiService";
import { useNavigate } from "react-router-dom";

export function NewDrugManufacturer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { loading, manufacturerName, contactName, phoneNumber, licenseNumber } =
    DrugManufacturerGlobalState();
  const navigate = useNavigate();
  const formData: DrugManufacturerFormData = {
    manufacturerName: manufacturerName ?? "",
    contactName: contactName ?? "",
    phoneNumber: phoneNumber ?? "",
    licenseNumber: licenseNumber ?? "",
  };
  const handleSubmitFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await createNewDrugManufacturer(formData);
    if (success) {
      navigate("/dashboard/drug_manufacturer_list");
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6 w-[80%] max-w-[500px] m-auto",
        className
      )}
      {...props}
    >
      <form onSubmit={handleSubmitFormData}>
        <h1 className="text-center text-2xl py-5">Manufacturer Details</h1>
        <div className="flex flex-col gap-6 w-full">
          <div className="grid gap-2">
            <Label htmlFor="name">Manufacturer name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Name of drug manufacturer"
              required
              value={manufacturerName ?? ""}
              onChange={(e) => {
                DrugManufacturerGlobalState.setState({
                  manufacturerName: e.target.value,
                });
              }}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Contact name</Label>
            <Input
              id="contact"
              type="text"
              placeholder="Name of contact person"
              required
              value={contactName ?? ""}
              onChange={(e) => {
                DrugManufacturerGlobalState.setState({
                  contactName: e.target.value,
                });
              }}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Phone number of manufacturer"
              required
              value={phoneNumber ?? ""}
              onChange={(e) => {
                DrugManufacturerGlobalState.setState({
                  phoneNumber: e.target.value,
                });
              }}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">License number</Label>
            <Input
              id="license"
              type="text"
              placeholder="License number of manufacturer"
              required
              value={licenseNumber ?? ""}
              onChange={(e) => {
                DrugManufacturerGlobalState.setState({
                  licenseNumber: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <Button className="text-center block mx-auto bg-[#00C8FF] hover:bg-[#0099ff] text-black font-semibold text-md my-5 rounded">
          {loading ? "Please wait.." : "Submit"}
        </Button>
      </form>
    </div>
  );
}

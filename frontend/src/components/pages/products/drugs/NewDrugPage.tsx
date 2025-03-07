import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getAllDosageForms,
  getAllDrugClasses,
  getAllRoutesOfDrugAdministration,
} from "@/services/ProductConstantsApiService";
import { useEffect } from "react";

export default function NewDrugPage() {
  useEffect(() => {
    getAllDosageForms();
    getAllDrugClasses();
    getAllRoutesOfDrugAdministration();
  }, []);

  return (
    <>
      <form
        className="flex flex-row gap-5 flex-wrap justify-start items-center w-full"
        action=""
      >
        <div className="w-[30%]">
          <Label htmlFor="name">Generic name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Generic name of the product"
            required
          />
        </div>
        <div className="w-[30%]">
          <Label htmlFor="name">Brand name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Brand name of the product"
            required
          />
        </div>
        <div className="w-[30%]">
          <Label htmlFor="name">Drug class</Label>
          <Input
            id="name"
            type="text"
            placeholder="Class of the product"
            required
          />
        </div>
        <div className="w-[30%]">
          <Label htmlFor="name">Dosage strength</Label>
          <Input id="name" type="text" placeholder="Dosage strength" required />
        </div>
        <div className="w-[30%]">
          <Label htmlFor="name">Dosage form</Label>
          <Input id="name" type="text" placeholder="Dosage form" required />
        </div>{" "}
        <div className="w-[30%]">
          <Label htmlFor="phone">Route of drug administration</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Route of drug administration"
            required
          />
        </div>
        <div className="w-[30%]">
          <Label htmlFor="name">Prescription requirement</Label>
          <Input
            id="contact"
            type="text"
            placeholder="Prescription requirement"
            required
          />
        </div>
        <div className="w-[30%]">
          <Label htmlFor="name">Units per pack</Label>
          <Input
            id="contact"
            type="text"
            placeholder="Units per pack"
            required
          />
        </div>
        <div className="w-[30%]">
          <Label htmlFor="name">Status</Label>
          <Input id="license" type="text" placeholder="status" required />
        </div>
        <Button className="text-center block mx-auto bg-[#00C8FF] hover:bg-[#0099ff] text-black font-semibold text-md my-5 rounded">
          {/* {loading ? "Please wait.." : "Submit"} */}
          Submit
        </Button>
      </form>
    </>
  );
}

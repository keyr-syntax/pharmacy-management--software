import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getAllDosageForms,
  getAllDrugClasses,
  getAllRoutesOfDrugAdministration,
} from "@/services/ProductConstantsApiService";
import { ProductConstantsGlobalState } from "@/stores/product_state_store/ProductConstantsGlobalState";

import { useEffect } from "react";

export default function NewDrugPage() {
  const { dosageFormList, drugClassList, routesOfDrugAdministrationList } =
    ProductConstantsGlobalState();

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
            list="options-list"
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
            list="drug-class-list"
          />
          <datalist id="drug-class-list">
            {drugClassList?.map((drugClass) => (
              <option key={drugClass.id} value={drugClass.class} />
            ))}
          </datalist>
        </div>
        <div className="w-[30%]">
          <Label htmlFor="name">Dosage strength</Label>
          <Input id="name" type="text" placeholder="Dosage strength" required />
        </div>
        <div className="w-[30%]">
          <Label htmlFor="name">Dosage form</Label>
          <Input
            id="name"
            type="text"
            placeholder="Dosage form"
            list="dosage-form-list"
            required
          />
          <datalist id="dosage-form-list">
            {dosageFormList?.map((dosageForm) => (
              <option key={dosageForm.id} value={dosageForm.dosageForm} />
            ))}
          </datalist>
        </div>{" "}
        <div className="w-[30%]">
          <Label htmlFor="phone">Route of drug administration</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Route of drug administration"
            list="route-of-drug-administration-list"
            required
          />
          <datalist id="route-of-drug-administration-list">
            {routesOfDrugAdministrationList?.map((route) => (
              <option key={route.id} value={route.route} />
            ))}
          </datalist>
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

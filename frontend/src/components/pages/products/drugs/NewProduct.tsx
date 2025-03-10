import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getAllDosageForms,
  getAllDrugClasses,
  getAllRoutesOfDrugAdministration,
} from "@/services/ProductConstantsApiService";
import {
  createNewProduct,
  resetProductDetailsGlobalState,
} from "@/services/ProductDetailsApiService";
import { AddandEditProductDetailsGlobalState } from "@/stores/product_state_store/ProductDetailsGlobalState";
import { ProductConstantsGlobalState } from "@/stores/product_state_store/ProductConstantsGlobalState";
import { ProductDetailsTypes } from "@/types/productTypes";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NewDrugPage() {
  const { dosageFormList, drugClassList, routesOfDrugAdministrationList } =
    ProductConstantsGlobalState();
  const navigate = useNavigate();
  const {
    genericName,
    brandName,
    dosageForm,
    drugType,
    dosageStrength,
    routeOfDrugAdministration,
    unitsPerPack,
    drugClass,
    status,
    loading,
  } = AddandEditProductDetailsGlobalState();

  const formData: ProductDetailsTypes = {
    genericName: genericName,
    brandName: brandName,
    dosageForm: dosageForm,
    drugType: drugType,
    dosageStrength: dosageStrength,
    routeOfDrugAdministration: routeOfDrugAdministration,
    unitsPerPack: unitsPerPack,
    drugClass: drugClass,
    status: status,
  };

  useEffect(() => {
    resetProductDetailsGlobalState();
    getAllDosageForms();
    getAllDrugClasses();
    getAllRoutesOfDrugAdministration();
  }, []);

  const handleSubmitProductDetails = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const success = await createNewProduct(formData);

    if (success) {
      navigate("/workspace/all_products");
    }
  };

  return (
    <>
      <div className="w-[90%] mx-auto mt-[110px]">
        <p className="text-center text-2xl my-5">Product Details</p>
        <form
          className="flex flex-row gap-5 flex-wrap sm:justify-start justify-center items-center "
          onSubmit={handleSubmitProductDetails}
        >
          <div className="md:w-[30%] sm:w-[45%] w-[80%] grid gap-3">
            <Label htmlFor="name">Generic name</Label>

            <Input
              id="Generic name"
              placeholder="Generic name of the product"
              required
              value={genericName ?? ""}
              onChange={(e) => {
                AddandEditProductDetailsGlobalState.setState({
                  genericName: e.target.value,
                });
              }}
            />
          </div>
          <div className="md:w-[30%] sm:w-[45%] w-[80%]  grid gap-3">
            <Label htmlFor="name">Brand name</Label>
            <Input
              id="Brand name"
              placeholder="Brand name of the product"
              required
              value={brandName ?? ""}
              onChange={(e) => {
                AddandEditProductDetailsGlobalState.setState({
                  brandName: e.target.value,
                });
              }}
            />
          </div>
          <div className="md:w-[30%] sm:w-[45%] w-[80%]  grid gap-3">
            <Label htmlFor="name">Drug class</Label>
            <select
              id="Drug class"
              title="drug_class"
              className="block w-full border border-solid border-[rgb(255,255,255,0.2)]  p-2 bg-transparent rounded hover:bg-[#151533]"
              required
              value={drugClass ?? ""}
              onChange={(e) => {
                AddandEditProductDetailsGlobalState.setState({
                  drugClass: e.target.value,
                });
              }}
            >
              <option
                className="bg-[#151533] text-[rgba(240,236,236,0.33)]"
                value=""
              >
                Select drug class
              </option>
              {drugClassList?.map((drugclass) => (
                <option
                  className="bg-[#151533] text-white hover:bg-[#151533]"
                  key={drugclass.id}
                  value={drugclass.class}
                >
                  {drugclass.class}
                </option>
              ))}
            </select>
          </div>
          <div className="md:w-[30%] sm:w-[45%] w-[80%]  grid gap-3">
            <Label htmlFor="name">Dosage strength</Label>
            <Input
              id="Dosage strength"
              type="text"
              placeholder="Dosage strength"
              required
              value={dosageStrength ?? ""}
              onChange={(e) => {
                AddandEditProductDetailsGlobalState.setState({
                  dosageStrength: e.target.value,
                });
              }}
            />
          </div>
          <div className="md:w-[30%] sm:w-[45%] w-[80%]  grid gap-3">
            <Label htmlFor="name">Dosage form</Label>
            <select
              id="dosage form"
              title="dosage_form"
              className="block w-full border border-solid border-[rgb(255,255,255,0.2)]  p-2 bg-transparent rounded hover:bg-[#151533]"
              required
              value={dosageForm ?? ""}
              onChange={(e) => {
                AddandEditProductDetailsGlobalState.setState({
                  dosageForm: e.target.value,
                });
              }}
            >
              <option
                className="bg-[#151533] text-[rgba(240,236,236,0.33)]"
                value=""
              >
                Select dosage form
              </option>
              {dosageFormList?.map((dosageForm) => (
                <option
                  className="bg-[#151533] text-white hover:bg-[#151533]"
                  key={dosageForm.id}
                  value={dosageForm.dosageForm}
                >
                  {dosageForm.dosageForm}
                </option>
              ))}
            </select>
          </div>{" "}
          <div className="md:w-[30%] sm:w-[45%] w-[80%]  grid gap-3">
            <Label htmlFor="phone">Route of drug administration</Label>
            <select
              id="Route of drug administration"
              title="Route of drug administration"
              className="block w-full border border-solid border-[rgb(255,255,255,0.2)]  p-2 bg-transparent rounded hover:bg-[#151533]"
              required
              value={routeOfDrugAdministration ?? ""}
              onChange={(e) => {
                AddandEditProductDetailsGlobalState.setState({
                  routeOfDrugAdministration: e.target.value,
                });
              }}
            >
              <option
                className="bg-[#151533] text-[rgba(240,236,236,0.33)]"
                value=""
              >
                Select Route
              </option>
              {routesOfDrugAdministrationList?.map((route) => (
                <option
                  className="bg-[#151533] text-white hover:bg-[#151533]"
                  key={route.id}
                  value={route.route}
                >
                  {route.route}
                </option>
              ))}
            </select>
          </div>
          <div className="md:w-[30%] sm:w-[45%] w-[80%]  grid gap-3">
            <Label htmlFor="name">Prescription requirement</Label>
            <select
              id="Prescription requirement"
              title="Route of drug administration"
              className="block w-full border border-solid border-[rgb(255,255,255,0.2)]  p-2 bg-transparent rounded hover:bg-[#151533]"
              required
              value={drugType ?? ""}
              onChange={(e) => {
                AddandEditProductDetailsGlobalState.setState({
                  drugType: e.target.value,
                });
              }}
            >
              <option
                className="bg-[#151533] text-[rgba(240,236,236,0.33)]"
                value=""
              >
                Select Prescription requirement
              </option>
              <option
                className="bg-[#151533] text-white hover:bg-[#151533]"
                value="OTC"
              >
                OTC
              </option>
              <option
                className="bg-[#151533] text-white hover:bg-[#151533]"
                value="Prescription"
              >
                Prescription
              </option>
            </select>
          </div>
          <div className="md:w-[30%] sm:w-[45%] w-[80%] grid gap-3">
            <Label htmlFor="name">Units per pack</Label>
            <Input
              id="contact"
              type="text"
              placeholder="Units per pack"
              required
              value={unitsPerPack ?? ""}
              onChange={(e) => {
                AddandEditProductDetailsGlobalState.setState({
                  unitsPerPack: Number(e.target.value),
                });
              }}
            />
          </div>
          <div className="md:w-[30%] sm:w-[45%] w-[80%]  grid gap-3">
            <Label htmlFor="name">Status</Label>
            <select
              id="status"
              title="status"
              className="block w-full border border-solid border-[rgb(255,255,255,0.2)]  p-2 bg-transparent rounded hover:bg-[#151533]"
              required
              value={status ?? ""}
              onChange={(e) => {
                AddandEditProductDetailsGlobalState.setState({
                  status: e.target.value,
                });
              }}
            >
              <option
                className="bg-[#151533] text-[rgba(240,236,236,0.33)]"
                value=""
              >
                Select status
              </option>
              <option
                className="bg-[#151533] text-white hover:bg-[#151533]"
                value="Active"
              >
                Active
              </option>
              <option
                className="bg-[#151533] text-white hover:bg-[#151533]"
                value="Discontinued"
              >
                Discontinued
              </option>
              <option
                className="bg-[#151533] text-white hover:bg-[#151533]"
                value="Out of Stock"
              >
                Out of Stock
              </option>
            </select>
          </div>
          <Button
            type="submit"
            className=" text-center block mx-auto bg-[#00C8FF] hover:bg-[#0099ff] text-black font-semibold text-md my-5 md:w-[200px] w-[60%] rounded"
          >
            {loading ? "Please wait.." : "Submit"}
          </Button>
        </form>
      </div>
    </>
  );
}

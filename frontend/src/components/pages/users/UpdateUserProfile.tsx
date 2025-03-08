import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import {
  findPharmacyUserByIDForProfileUpdate,
  updatePharmacyUserProfile,
} from "@/services/UserApiService";
import { UpdatePharmacyUserProfileGlobalState } from "@/stores/user_state_store/UserGlobalState";
import { useEffect } from "react";
export default function UpdateUserProfile() {
  const { loading, firstName, lastName, email, phoneNumber } =
    UpdatePharmacyUserProfileGlobalState();

  useEffect(() => {
    findPharmacyUserByIDForProfileUpdate();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-[90px] mb-8 w-full">
        <form className="flex flex-col gap-2 mx-auto mt-1 w-[100%] max-w-[500px] border border-solid border-[rgb(255,255,255,0.2)] p-8 rounded">
          <p className="text-center text-[24px] font-bold">Edit Your Account</p>
          <div className="grid gap-2 ">
            <Label className="text-md" htmlFor="name">
              First Name
            </Label>
            <Input
              className="block border border-solid border-[rgb(255,255,255,0.2)] rounded"
              id="first_name"
              type="text"
              placeholder="First name"
              value={firstName || ""}
              onChange={(e) => {
                UpdatePharmacyUserProfileGlobalState.setState({
                  firstName: e.target.value,
                });
              }}
            />
          </div>
          <div className="grid gap-2 ">
            <Label className="text-md" htmlFor="name">
              Last Name
            </Label>
            <Input
              className="block border border-solid border-[rgb(255,255,255,0.2)] rounded"
              type="text"
              placeholder="Last name"
              value={lastName || ""}
              onChange={(e) => {
                UpdatePharmacyUserProfileGlobalState.setState({
                  lastName: e.target.value,
                });
              }}
            />
          </div>
          <div className="grid gap-2 ">
            <Label className="text-md" htmlFor="email">
              Email
            </Label>
            <Input
              className="block border border-solid border-[rgb(255,255,255,0.2)] rounded"
              type="email"
              placeholder="Your email address"
              value={email || ""}
              onChange={(e) => {
                UpdatePharmacyUserProfileGlobalState.setState({
                  email: e.target.value,
                });
              }}
            />
          </div>
          <div className="grid gap-2 ">
            <Label className="text-md" htmlFor="phone">
              Phone number
            </Label>
            <Input
              className="block border border-solid border-[rgb(255,255,255,0.2)] rounded"
              type="tel"
              placeholder="Your Phone number"
              value={phoneNumber || ""}
              onChange={(e) => {
                UpdatePharmacyUserProfileGlobalState.setState({
                  phoneNumber: e.target.value,
                });
              }}
            />
          </div>
          <Button
            onClick={() =>
              updatePharmacyUserProfile(firstName, lastName, email, phoneNumber)
            }
            disabled={loading}
            type="submit"
            className="bg-[#00C8FF] hover:bg-[#0099ff] text-black font-semibold text-md mt-5 rounded"
          >
            {loading ? "Please wait" : "Submit"}
          </Button>
        </form>
      </div>
    </>
  );
}

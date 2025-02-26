import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUserformInput } from "../../../types/types";
import { Button } from "@/components/ui/button";
import { HandleRegisterPharmacyUser } from "@/services/UserApiService";
import { RegisterPharmacyUserGlobalState } from "@/stores/GlobalState";
export default function RegisterPharmacyUser() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { loading } = RegisterPharmacyUserGlobalState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserformInput>();
  const handleSubmitRegisterPharmacyUser = async (
    formData: RegisterUserformInput
  ) => {
    const success = await HandleRegisterPharmacyUser(formData);
    if (success) {
      navigate("/dashboard");
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-1 mb-8 w-full">
        <form
          onSubmit={handleSubmit(handleSubmitRegisterPharmacyUser)}
          className="flex flex-col gap-2 mx-auto mt-1 w-[90%] max-w-[500px] border border-solid border-[rgb(255,255,255,0.2)] p-8 rounded"
        >
          <p className="text-center text-[24px] font-bold">Register User</p>
          <div className="grid gap-2 ">
            <Label className="text-md" htmlFor="name">
              First Name
            </Label>
            <Input
              className="block border border-solid border-[rgb(255,255,255,0.2)] rounded"
              id="first_name"
              type="text"
              placeholder="First name"
              {...register("firstName", {
                required: "First name is required",
              })}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>
          <div className="grid gap-2 ">
            <Label className="text-md" htmlFor="name">
              Last Name
            </Label>
            <Input
              className="block border border-solid border-[rgb(255,255,255,0.2)] rounded"
              type="text"
              placeholder="Last name"
              {...register("lastName", {
                required: "Last name is required",
              })}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
          <div className="grid gap-2 ">
            <Label className="text-md" htmlFor="email">
              Email
            </Label>
            <Input
              className="block border border-solid border-[rgb(255,255,255,0.2)] rounded"
              type="email"
              placeholder="Your email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-2 ">
            <Label className="text-md" htmlFor="phone">
              Phone number
            </Label>
            <Input
              className="block border border-solid border-[rgb(255,255,255,0.2)] rounded"
              type="tel"
              placeholder="Your Phone number"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^(09|07)\d{8}$/,
                  message: "Invalid phone number",
                },
              })}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label className="text-md" htmlFor="role">
              Role
            </Label>
            <select
              id="role"
              className="block  w-full border border-solid border-[rgb(255,255,255,0.2)]  p-2 bg-transparent rounded"
              {...register("role", { required: "Role is required" })}
            >
              <option className="text-white bg-[#151533]" value="">
                Select a role
              </option>
              <option className="text-white bg-[#151533]" value="admin">
                Admin
              </option>
              <option className="text-white bg-[#151533]" value="manager">
                Manager
              </option>
              <option className="text-white bg-[#151533]" value="pharmacist">
                Pharmacist
              </option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label className="text-md" htmlFor="role">
              Status
            </Label>
            <select
              id="isBlocked"
              className="block  w-full border border-solid border-[rgb(255,255,255,0.2)]  p-2 bg-transparent rounded"
              {...register("isBlocked", {
                required: "Block status is required",
              })}
            >
              <option className="text-white bg-[#151533]" value="">
                Select status
              </option>
              <option className="text-white bg-[#151533]" value="Blocked">
                Blocked
              </option>
              <option className="text-white bg-[#151533]" value="Not Blocked">
                Not Blocked
              </option>
            </select>
            {errors.isBlocked && (
              <p className="text-red-500 text-sm">{errors.isBlocked.message}</p>
            )}
          </div>
          <div className="grid gap-2 ">
            <Label className="text-md" htmlFor="message">
              Password
            </Label>
            <div className="relative">
              <Input
                className="block border border-solid border-[rgb(255,255,255,0.2)] rounded"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <span
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <Button
            disabled={loading}
            type="submit"
            className="bg-[#00C8FF] hover:bg-[#0099ff] text-black font-semibold text-md mt-5 rounded"
          >
            {loading ? "Please wait" : "Submit"}
          </Button>
          <Link className="text-center mt-3 text-lg" to="/dashboard/login">
            Login
          </Link>
        </form>
      </div>
    </>
  );
}

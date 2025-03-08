import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Eye, EyeOff } from "lucide-react";
import { baseURL } from "@/lib/utils";
import { LoginformInput } from "../../../types/userTypes";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function LoginPharmacyUser() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginformInput>();

  const navigate = useNavigate();

  const LoginPharmacyUser = async (formData: LoginformInput) => {
    setLoading(true);

    try {
      const data = await fetch(`${baseURL}/pharmacy_user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const response = await data.json();

      if (response.success) {
        toast.success(response.message);
        localStorage.setItem(
          "name",
          `${response.user.firstName} ${response.user.lastName}`
        );
        reset();
        setLoading(false);

        navigate("/workspace");
      } else {
        toast.error(response.message);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error while submitting form data", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-16 w-full">
        <form
          onSubmit={handleSubmit(LoginPharmacyUser)}
          className="flex flex-col gap-2 mx-auto mt-2 w-[80%] max-w-[400px] border border-solid border-[rgb(255,255,255,0.2)] p-8 rounded"
        >
          <p className="text-center text-[24px] font-bold">Login</p>

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
          {/* <Link className="text-center mt-5 text-lg" to="/register">
            Create account
          </Link> */}
        </form>
      </div>
    </>
  );
}

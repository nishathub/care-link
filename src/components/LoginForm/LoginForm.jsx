"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useUserStore from "@/lib/zustand/userStore";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    setIsLoginLoading(true);
    setErrorText("");

    try {
      // Submit login request
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_CareLinkAPI}/auth/login`,
        formData
      );
      // if login successful, fetch user
      if (res.data.success) {
        const userRes = await axios.get(
          `${process.env.NEXT_PUBLIC_CareLinkAPI}/auth/me`,
          {
            withCredentials: true,
          }
        );
        const { user } = userRes.data;
        if (!user || !user?.role) {
          throw new Error("Invalid User");
        }
        // set user to zustand
        setUser(user);
        // redirect according to role.
        router.push(
          user.role === "admin"
            ? "admin/dashboard"
            : user.role === "volunteer"
            ? "volunteer/dashboard"
            : "/"
        );
        // alert
        alert(`Hello ${user?.name}`);
      } else {
        throw new Error(res.data.message || "Login failed");
      }
    } catch (err) {
      setErrorText(err?.response?.data?.message || "Login error");
    } finally {
      setIsLoginLoading(false);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email */}
      <div>
        <label className="label">
          <span className="label-text text-sky-800 font-semibold">Email</span>
        </label>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className="input input-bordered w-full bg-gray-100 text-gray-900"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="label">
          <span className="label-text text-sky-800 font-semibold">
            Password
          </span>
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("password", { required: "Password is required" })}
            className="input input-bordered w-full bg-gray-100 text-gray-900 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute z-10 top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-sky-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        disabled={isLoginLoading}
        className="btn btn-block bg-sky-700 hover:bg-sky-900 text-white"
      >
        {isLoginLoading ? "Logging in..." : "Log In"}
      </button>
      {errorText && <p className="text-red-700">{errorText}</p>}
    </form>
  );
};

export default LoginForm;

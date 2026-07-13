"use client";

import { signup } from "@/api/auth";
import PasswordInput from "@/components/PasswordInput";
import Spinner from "@/components/Spinner";
import { HOME_ROUTE, LOGIN_ROUTE } from "@/constants/routes";
import useAuthStore from "@/stores/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const { register, handleSubmit } = useForm();

  const { registerUser } = useAuthStore.getState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submitForm = (data) => {
    setLoading(true);
    signup({
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      address: {
        city: data.city,
        province: data.province,
      },
    })
      .then((response) => {
        registerUser({ user: response.data });
        router.replace(HOME_ROUTE);
        toast.success("Register Sucessfull!");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full max-w-lg rounded-3xl bg-white p-8">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-heading">Create Account</h2>

        <p className="mt-2 text-body">
          Join ShopSage and start shopping smarter.
        </p>
      </div>

      <form onSubmit={handleSubmit(submitForm)} className="mt-8 space-y-5">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-heading mb-2"
          >
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition duration-300 focus:border-primary focus:ring-4 focus:ring-primary/20"
            required
            {...register("name")}
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-heading mb-2"
          >
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition duration-300 focus:border-primary focus:ring-4 focus:ring-primary/20"
            required
            {...register("email")}
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-heading mb-2"
          >
            Phone Number
          </label>

          <input
            type="tel"
            placeholder="98XXXXXXXX"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition duration-300 focus:border-primary focus:ring-4 focus:ring-primary/20"
            required
            {...register("phone")}
          />
        </div>

        {/* Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-heading mb-2"
            >
              City
            </label>

            <input
              type="text"
              placeholder="Kathmandu"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition duration-300 focus:border-primary focus:ring-4 focus:ring-primary/20"
              required
              {...register("city")}
            />
          </div>

          <div>
            <label
              htmlFor="province"
              className="block text-sm font-medium text-heading mb-2"
            >
              Province
            </label>

            <select
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition duration-300 focus:border-primary focus:ring-4 focus:ring-primary/20"
              {...register("province")}
            >
              <option value="">Select Province</option>
              <option>Koshi</option>
              <option>Madhesh</option>
              <option>Bagmati</option>
              <option>Gandaki</option>
              <option>Lumbini</option>
              <option>Karnali</option>
              <option>Sudurpashchim</option>
            </select>
          </div>
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-heading mb-2"
          >
            Password
          </label>

          <PasswordInput {...register("password")} />
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-heading mb-2"
          >
            Confirm Password
          </label>

          <PasswordInput />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full rounded-xl bg-primary py-3 font-semibold text-white transition duration-300 hover:bg-primary-hover hover:-translate-y-1 shadow-lg disabled:opacity-80"
          disabled={loading}
        >
          Create Account{" "}
          {loading && (
            <Spinner className="absolute top-2.5 right-5 w-7! h-7!" />
          )}
        </button>

        {/* Login Link */}
        <p className="text-center text-body">
          Already have an account?{" "}
          <Link
            href={LOGIN_ROUTE}
            className="font-semibold text-primary hover:text-primary-hover"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;

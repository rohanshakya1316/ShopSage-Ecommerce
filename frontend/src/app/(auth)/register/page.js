"use client";

import { signup } from "@/api/auth";
import { LOGIN_ROUTE } from "@/constants/routes";
import Link from "next/link";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const { register, handleSubmit } = useForm();
  const submitForm = (data) => {
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
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
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

          <input
            type="password"
            placeholder="Enter password"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition duration-300 focus:border-primary focus:ring-4 focus:ring-primary/20"
            required
            {...register("password")}
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-heading mb-2"
          >
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm password"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition duration-300 focus:border-primary focus:ring-4 focus:ring-primary/20"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full rounded-xl bg-primary py-3 font-semibold text-white transition duration-300 hover:bg-primary-hover hover:-translate-y-1 shadow-lg"
        >
          Create Account
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

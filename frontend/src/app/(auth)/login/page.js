"use client";

import { login } from "@/api/auth";
import { REGISTER_ROUTE } from "@/constants/routes";
import Link from "next/link";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();

  const submitForm = (data) => {
    login(data)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <div className="w-full max-w-md bg-white/90 backdrop-blur-lg border border-white/30 p-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-heading">Welcome Back 👋</h2>

        <p className="mt-2 text-body">
          Sign in to continue shopping with ShopSage.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(submitForm)} className="mt-8 space-y-5">
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
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition-all duration-300
            focus:border-primary focus:ring-4 focus:ring-primary/20"
            required
            {...register("email")}
          />
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
            placeholder="Enter your password"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition-all duration-300
            focus:border-primary focus:ring-4 focus:ring-primary/20"
            required
            {...register("password")}
          />
        </div>

        {/* Remember */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-body">
            <input type="checkbox" className="accent-primary" />
            Remember Me
          </label>

          <Link
            href="/forgot-password"
            className="text-primary hover:text-primary-hover font-medium"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full rounded-xl bg-primary py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-primary-hover hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
        >
          Login
        </button>

        {/* Divider */}
        <div className="relative flex items-center">
          <div className="grow border-t border-slate-300"></div>

          <span className="mx-4 text-sm text-muted bg-white px-2">OR</span>

          <div className="grow border-t border-slate-300"></div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="rounded-xl border border-slate-300 py-3 font-medium text-heading transition hover:border-primary hover:bg-primary/5"
          >
            Google
          </button>

          <button
            type="button"
            className="rounded-xl border border-slate-300 py-3 font-medium text-heading transition hover:border-primary hover:bg-primary/5"
          >
            GitHub
          </button>
        </div>

        {/* Signup */}
        <p className="text-center text-sm text-body">
          Don&apos;t have an account? &nbsp;
          <Link
            href={REGISTER_ROUTE}
            className="text-sm font-semibold text-primary hover:text-primary-hover"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;

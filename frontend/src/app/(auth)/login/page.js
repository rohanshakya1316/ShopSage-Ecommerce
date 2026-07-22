"use client";

import { login } from "@/api/auth";
import PasswordInput from "@/components/PasswordInput";
import Spinner from "@/components/Spinner";
import { FORGOT_PASSWORD_ROUTE, HOME_ROUTE, REGISTER_ROUTE } from "@/constants/routes";
import useAuthStore from "@/stores/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const { loginUser } = useAuthStore.getState();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const submitForm = (data) => {
    setLoading(true);

    login(data)
      .then((response) => {
        loginUser({ user: response.data });
        router.replace(HOME_ROUTE);
        toast.success("Login Successful!");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data);
      })
      .finally(() => setLoading(false));
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

          <PasswordInput {...register("password")} />
        </div>

        {/* Remember */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-body">
            <input type="checkbox" className="accent-primary" />
            Remember Me
          </label>

          <Link
            href={FORGOT_PASSWORD_ROUTE}
            className="text-primary hover:text-primary-hover font-medium"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="relative w-full rounded-xl bg-primary py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-primary-hover hover:shadow-xl hover:-translate-y-1 active:translate-y-0 disabled:opacity-80"
          disabled={loading}
        >
          Login {loading && <Spinner className="absolute top-2.5 right-5 w-7! h-7!" />}
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

"use client";

import { forgotPassword } from "@/api/auth";
import { LOGIN_ROUTE } from "@/constants/routes";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const { register, handleSubmit, reset } = useForm();

  const submitForm = (data) => {
    forgotPassword(data)
      .then(() => {
        toast.success("Email sent successfully!");
        reset();
      })
      .catch((error) => console.log(error));
  };

  return (
    <section>
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-card rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Top */}
          <div className="bg-primary px-8 py-8 text-white text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 mx-auto flex items-center justify-center">
              <ShieldCheck size={32} />
            </div>

            <h1 className="mt-5 text-3xl font-bold">Forgot Password?</h1>

            <p className="mt-2 text-white/80 text-sm">
              Enter your email address and we will send you a password reset
              link.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(submitForm)} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-heading mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                  size={20}
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-heading focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  required
                  {...register("email")}
                />
              </div>
            </div>

            <button className="w-full bg-primary hover:bg-primary-hover text-white cursor-pointer font-semibold py-3 rounded-xl transition duration-300">
              Send Reset Link
            </button>

            <div className="text-center">
              <Link
                href={LOGIN_ROUTE}
                className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium"
              >
                <ArrowLeft size={18} />
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;

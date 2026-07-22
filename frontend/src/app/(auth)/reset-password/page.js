"use client";

import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import { LOGIN_ROUTE } from "@/constants/routes";
import PasswordInput from "@/components/PasswordInput";
import { useForm, useWatch } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { resetPassword } from "@/api/auth";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const password = useWatch({ control, name: "password" });

  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

  const submitForm = () => {
    resetPassword({ token, userId, password })
      .then(() => {
        toast.success("Password reset successfully!");

        reset();
      })
      .catch((error) => console.log(error));
  };

  return (
    <section>
      <div className="w-full max-w-md">
        <div className="bg-card rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}

          <div className="bg-primary px-8 py-8 text-center text-white">
            <div className="w-16 h-16 rounded-full bg-white/20 mx-auto flex items-center justify-center">
              <Lock size={30} />
            </div>

            <h1 className="mt-5 text-3xl font-bold">Reset Password</h1>

            <p className="mt-2 text-sm text-white/80">
              Choose a strong password to secure your account.
            </p>
          </div>

          {/* Form */}

          <form onSubmit={handleSubmit(submitForm)} className="p-8 space-y-6">
            {/* Password */}

            <div>
              <label className="block text-sm font-semibold text-heading mb-2">
                New Password
              </label>

              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                  size={20}
                />

                <PasswordInput
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
              </div>
            </div>

            {/* Confirm */}

            <div>
              <label className="block text-sm font-semibold text-heading mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                  size={20}
                />

                <PasswordInput
                  placeholder="Enter Confirm Password"
                  {...register("confirmPassword", {
                    required: "Password is required",
                    validate: (value) => {
                      value === password || "Password does not match.";
                    },
                  })}
                />
                <p className="text-xs m-2 text-red-600">
                  {errors.confirmPassword?.message}
                </p>
              </div>
            </div>

            {/* Password Requirements */}

            <div className="rounded-xl bg-background border border-gray-200 p-4">
              <p className="text-sm font-semibold text-heading mb-2">
                Password Requirements
              </p>

              <ul className="space-y-1 text-sm text-body">
                <li>• Minimum 8 characters</li>
                <li>• At least one uppercase letter</li>
                <li>• At least one lowercase letter</li>
                <li>• One number</li>
                <li>• One special character</li>
              </ul>
            </div>

            <button className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white cursor-pointer font-semibold transition">
              Reset Password
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

export default ResetPasswordPage;

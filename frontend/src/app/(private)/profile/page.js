"use client";

import { updateUser } from "@/api/users";
import Spinner from "@/components/Spinner";
import { HOME_ROUTE } from "@/constants/routes";
import useAuthStore from "@/stores/authStore";
import { Mail, MapPin, Phone, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ProfileImage from "./_components/ProfileImage";

const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);

  const [loading, setLoading] = useState(false);

  const { setUser } = useAuthStore.getState();

  const { register, handleSubmit } = useForm({
    values: {
      ...user,
      city: user?.address.city,
      province: user?.address.province,
    },
  });

  const submitForm = (data) => {
    setLoading(true);

    updateUser(user._id, {
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
        setUser({ user: response.data });

        toast.success("User updated successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data);
      })
      .finally(() => setLoading(false));
  };

  return (
    <section className="bg-background min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid lg:grid-cols-3 gap-8">
          <ProfileImage />

          {/* Right */}

          <form
            onSubmit={handleSubmit(submitForm)}
            className="lg:col-span-2 bg-card rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold text-heading mb-8">
              Profile Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}

              <div>
                <label className="block mb-2 font-medium text-heading">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-4 text-muted"
                  />

                  <input
                    className="w-full border border-gray-300 rounded-lg pl-11 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    {...register("name")}
                  />
                </div>
              </div>

              {/* Email */}

              <div>
                <label className="block mb-2 font-medium text-heading">
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-4 text-muted"
                  />

                  <input
                    className="w-full border border-gray-300 rounded-lg pl-11 py-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-80 text-gray-400"
                    disabled
                    {...register("email")}
                  />
                </div>
              </div>

              {/* Phone */}

              <div>
                <label className="block mb-2 font-medium text-heading">
                  Phone
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-4 top-4 text-muted"
                  />

                  <input
                    className="w-full border border-gray-300 rounded-lg pl-11 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    {...register("phone")}
                  />
                </div>
              </div>

              {/* City */}

              <div>
                <label className="block mb-2 font-medium text-heading">
                  City
                </label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-4 top-4 text-muted"
                  />

                  <input
                    className="w-full border border-gray-300 rounded-lg pl-11 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    {...register("city")}
                  />
                </div>
              </div>

              {/* Province */}

              <div className="md:col-span-2">
                <label className="block mb-2 font-medium text-heading">
                  Province
                </label>

                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  {...register("province")}
                >
                  <option value="Bagmati">Bagmati</option>
                  <option value="Gandaki">Gandaki</option>
                  <option value="Karnali">Karnali</option>
                  <option value="Koshi">Koshi</option>
                  <option value="Lumbini">Lumbini</option>
                  <option value="Madhesh">Madhesh</option>
                  <option value="Sudur-Paschim">Sudur-Paschim</option>
                </select>
              </div>
            </div>

            {/* Buttons */}

            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-10">
              <Link href={HOME_ROUTE}>
                <button className="border border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                  Cancel
                </button>
              </Link>

              <button
                type="submit"
                className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg font-semibold transition shadow-md disabled:opacity-80"
                disabled={loading}
              >
                Save Changes {loading && <Spinner className="w-6! h-6!" />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;

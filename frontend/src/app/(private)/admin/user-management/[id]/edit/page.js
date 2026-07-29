"use client";
import { getUsersById, updateUserRoles } from "@/api/users";
import { USER_MANAGEMENT_ROUTE } from "@/constants/routes";
import {
  ROLE_ADMIN,
  ROLE_CUSTOMER,
  ROLE_MERCHANT,
} from "@/constants/userRoles";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateUserPage = () => {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);

  const params = useParams();
  const router = useRouter();

  const updateRoles = (event) => {
    event.preventDefault();

    updateUserRoles(user._id, roles)
      .then(() => {
        toast.success("Status updated");
        router.replace(USER_MANAGEMENT_ROUTE);
      })
      .catch((error) => console.log(error));
  };

  const setUserRoles = (role) => {
    setRoles((prev) => {
      return prev.includes(role)
        ? prev.filter((item) => item != role)
        : [...prev, role];
    });
  };

  useEffect(() => {
    const userId = params.id;

    getUsersById(userId)
      .then((res) => {
        setUser(res.data);
        setRoles(res.data.roles);
      })
      .catch((error) => console.log(error));
  }, [params.id]);

  if (!user) return;

  return (
    <div className="m-12 max-w-5xl bg-card rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-primary px-8 py-8 text-white">
        <h2 className="text-3xl font-bold">{user.name}</h2>
        <p className="mt-2 text-indigo-100">{user.email}</p>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* User Information */}
          <div className="space-y-5">
            <div>
              <p className="text-sm text-muted font-medium">Phone Number</p>
              <p className="text-lg font-semibold text-heading">{user.phone}</p>
            </div>

            <div>
              <p className="text-sm text-muted font-medium mb-2">
                Current Roles
              </p>

              <div className="flex flex-wrap gap-2">
                {roles.map((role) => (
                  <span
                    key={role}
                    className="px-4 py-1.5 rounded-full text-sm font-semibold bg-primary/10 text-primary border border-primary/20"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Update Roles */}
          <div>
            <h3 className="text-xl font-semibold text-heading mb-5">
              Manage User Roles
            </h3>

            <form onSubmit={updateRoles} className="space-y-4">
              <label className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition cursor-pointer">
                <span className="font-medium text-heading">Customer</span>

                <input
                  type="checkbox"
                  className="h-5 w-5 accent-primary"
                  defaultChecked={roles.includes(ROLE_CUSTOMER)}
                  onChange={() => setUserRoles(ROLE_CUSTOMER)}
                />
              </label>

              <label className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition cursor-pointer">
                <span className="font-medium text-heading">Merchant</span>

                <input
                  type="checkbox"
                  className="h-5 w-5 accent-primary"
                  defaultChecked={roles.includes(ROLE_MERCHANT)}
                  onChange={() => setUserRoles(ROLE_MERCHANT)}
                />
              </label>

              <label className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-gray-100 cursor-not-allowed">
                <span className="font-medium text-gray-500">Administrator</span>

                <input
                  type="checkbox"
                  className="h-5 w-5 accent-primary"
                  disabled
                  defaultChecked={roles.includes(ROLE_ADMIN)}
                />
              </label>

              <button
                type="submit"
                className="w-full mt-6 bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Update Roles
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserPage;

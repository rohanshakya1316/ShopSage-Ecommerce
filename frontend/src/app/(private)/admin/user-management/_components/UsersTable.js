"use client";

import { getAllUsers } from "@/api/users";
import Spinner from "@/components/Spinner";

import {
  ROLE_ADMIN,
  ROLE_CUSTOMER,
  ROLE_MERCHANT,
} from "@/constants/userRoles";
import useAuthStore from "@/stores/authStore";
import { format } from "date-fns";
import { Image as ImageIcon, Search, Settings } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import EditUserRoles from "./EditUserRoles";

const rolesStyles = {
  [ROLE_ADMIN]: "bg-blue-100 text-blue-700",
  [ROLE_MERCHANT]: "bg-purple-100 text-purple-700",
  [ROLE_CUSTOMER]: "bg-green-100 text-green-700",
};

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const user = useAuthStore((state) => state.user);

  const isAdmin = user?.roles?.includes(ROLE_ADMIN);

  useEffect(() => {
    if (!user) return;
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [user]);

  const handleUpdated = (updatedUser) => {
    setUsers((prev) =>
      prev.map((user) => (user._id === updatedUser._id ? updatedUser : order)),
    );
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  console.log(filteredUsers);
  if (loading)
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );

  return (
    <div>
      <div className="bg-background p-4 rounded-xl shadow-sm border border-background/50 mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search user by name..."
            className="w-full pl-10 pr-4 py-2 border border-gray rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="px-2 py-4 text-center font-semibold">S.N.</th>
              <th className="px-6 py-4 text-center font-semibold">Username</th>
              <th className="px-6 py-4 text-center font-semibold">Email</th>
              <th className="px-6 py-4 text-center font-semibold">Phone</th>
              <th className="px-6 py-4 text-center font-semibold">Address</th>
              <th className="px-6 py-4 text-center font-semibold">Role</th>
              <th className="px-6 py-4 text-center font-semibold">
                Created At
              </th>
              {isAdmin && (
                <th className="px-6 py-4 font-semibold">
                  <Settings />
                </th>
              )}
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {filteredUsers.length == 0 ? (
              <tr>
                <td colSpan={6} className="text-center font-semibold py-4">
                  {users.length === 0
                    ? "No users found."
                    : "No users match your search."}
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition-colors align-top"
                >
                  <td className="px-2 py-4 text-gray-600 font-mono text-xs">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center">
                        {user?.profileImageUrl ? (
                          <Image
                            width={64}
                            height={64}
                            src={user?.profileImageUrl}
                            alt={user.name}
                            className="w-10 h-10 bg-gray-200 rounded-md mr-4 shrink-0 object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-10 h-10 rounded-md mr-4 shrink-0" />
                        )}
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{user.email}</p>
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-700">
                    {user.phone}
                  </td>

                  <td className="px-6 py-4">
                    <span className={`py-1 text-sm font-medium rounded-full `}>
                      {`${user.address.city}, ${user.address.province}`}
                    </span>
                    <p>{user.address.country}</p>
                  </td>

                  <td className="px-6 py-4">
                    {user.roles.map((role, index) => (
                      <span
                        key={index}
                        className={`flex flex-col my-1 p-1 text-xs text-center font-medium rounded-full ${
                          rolesStyles[role] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {role}
                      </span>
                    ))}
                  </td>

                  <td className="px-6 py-4 text-gray-500 text-xs">
                    {user.createdAt
                      ? format(user.createdAt, "dd MMM, yyyy")
                      : "—"}
                  </td>

                  {isAdmin && (
                    <td className="px-6 py-4 text-primary text-xs">
                      <EditUserRoles userId={user._id} />
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;

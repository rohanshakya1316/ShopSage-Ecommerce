'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getUsersById, updateUserRoles } from '@/api/users';
import { USER_MANAGEMENT_ROUTE } from '@/constants/routes';
import { ROLE_CUSTOMER, ROLE_MERCHANT, ROLE_ADMIN } from '@/constants/userRoles';

const UpdateUserPage = () => {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const params = useParams();
  const router = useRouter();

  function updateRoles(event) {
    event.preventDefault();

    setSubmitting(true);
    updateUserRoles(user._id, roles)
      .then(() => {
        toast.success('User roles updated successfully');
        router.push(USER_MANAGEMENT_ROUTE);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Failed to update user roles');
      })
      .finally(() => setSubmitting(false));
  }

  function setUserRoles(role) {
    setRoles((prev) => {
      return prev.includes(role)
        ? prev.filter((item) => item !== role)
        : [...prev, role];
    });
  }

  useEffect(() => {
    const userId = params.id;

    getUsersById(userId)
      .then((res) => {
        setUser(res.data);
        setRoles(res.data.roles);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Failed to fetch user');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin">
          <i className="fas fa-spinner text-indigo-600 text-3xl"></i>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">User not found</p>
      </div>
    );
  }

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-6">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2"
        >
          <i className="fas fa-arrow-left"></i>
          Back to Users
        </button>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 max-w-2xl">
        {/* User Header */}
        <div className="mb-8 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-2xl"
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
              <p className="text-slate-600">{user.email}</p>
            </div>
          </div>

          {/* User Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-slate-600 text-sm font-medium">Email</p>
              <p className="text-slate-900 font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-slate-600 text-sm font-medium">Phone</p>
              <p className="text-slate-900 font-medium">{user.phone || '-'}</p>
            </div>
            <div>
              <p className="text-slate-600 text-sm font-medium">Address</p>
              <p className="text-slate-900 font-medium">
                {user.address?.city}, {user.address?.province || '-'}
              </p>
            </div>
            <div>
              <p className="text-slate-600 text-sm font-medium">Joined</p>
              <p className="text-slate-900 font-medium">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Current Roles */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Current Roles</h3>
          <div className="flex flex-wrap gap-2">
            {roles?.length > 0 ? (
              roles.map((role) => (
                <span
                  key={role}
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    role === 'ADMIN'
                      ? 'bg-orange-100 text-orange-700'
                      : role === 'MERCHANT'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {role}
                </span>
              ))
            ) : (
              <span className="text-slate-500">No roles assigned</span>
            )}
          </div>
        </div>

        {/* Role Selection Form */}
        <form onSubmit={updateRoles} className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Update Roles
            </h3>

            <div className="space-y-3">
              {/* Customer Role */}
              <label className="flex items-center p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:border-indigo-400 hover:bg-slate-50 transition-all">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-indigo-600 rounded cursor-pointer"
                  checked={roles.includes(ROLE_CUSTOMER)}
                  onChange={() => setUserRoles(ROLE_CUSTOMER)}
                />
                <span className="ml-3 flex flex-col">
                  <span className="font-semibold text-slate-900">Customer</span>
                  <span className="text-sm text-slate-600">Can browse and purchase products</span>
                </span>
              </label>

              {/* Merchant Role */}
              <label className="flex items-center p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:border-indigo-400 hover:bg-slate-50 transition-all">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-indigo-600 rounded cursor-pointer"
                  checked={roles.includes(ROLE_MERCHANT)}
                  onChange={() => setUserRoles(ROLE_MERCHANT)}
                />
                <span className="ml-3 flex flex-col">
                  <span className="font-semibold text-slate-900">Merchant</span>
                  <span className="text-sm text-slate-600">Can create and manage products</span>
                </span>
              </label>

              {/* Admin Role */}
              <label className="flex items-center p-4 border-2 border-slate-200 rounded-lg cursor-not-allowed opacity-50">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded cursor-not-allowed"
                  checked={roles.includes(ROLE_ADMIN)}
                  disabled
                />
                <span className="ml-3 flex flex-col">
                  <span className="font-semibold text-slate-900">Admin</span>
                  <span className="text-sm text-slate-600">Administrator role (cannot be modified)</span>
                </span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t border-slate-200">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <i className="fas fa-spinner animate-spin"></i>
                  Updating...
                </>
              ) : (
                <>
                  <i className="fas fa-check"></i>
                  Update Roles
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-2 px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-900 font-medium rounded-lg transition-colors"
            >
              <i className="fas fa-times"></i>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default UpdateUserPage;
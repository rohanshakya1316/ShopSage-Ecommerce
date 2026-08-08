'use client';

import { useEffect, useState } from 'react';
import { getAllUsers } from '@/api/users';
import { Spinner } from '@/components';
import EditUser from './EditUser';

export const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchUsers() {
    try {
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center py-8">
        <Spinner />
      </div>
    );

  // Role color mapping
  const getRoleStyles = (role) => {
    const roleMap = {
      CUSTOMER: 'bg-blue-100 text-blue-700',
      MERCHANT: 'bg-purple-100 text-purple-700',
      ADMIN: 'bg-orange-100 text-orange-700',
    };
    return roleMap[role] || 'bg-slate-100 text-slate-700';
  };

  const getStatusStyles = (isActive) => {
    return isActive
      ? 'bg-emerald-100 text-emerald-700'
      : 'bg-red-100 text-red-700';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
            <th className="px-6 py-4 font-semibold">User</th>
            <th className="px-6 py-4 font-semibold">Email</th>
            <th className="px-6 py-4 font-semibold">Phone</th>
            <th className="px-6 py-4 font-semibold">Address</th>
            <th className="px-6 py-4 font-semibold">Roles</th>
            <th className="px-6 py-4 font-semibold">Joined Date</th>
            <th className="px-6 py-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="text-sm divide-y divide-slate-200">
          {users?.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-8 text-slate-500">
                No users found.
              </td>
            </tr>
          ) : (
            users?.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold text-sm"
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <p className="font-medium text-slate-900">{user.name}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-slate-600">{user.email}</td>

                <td className="px-6 py-4 text-slate-600">
                  {user.phone || '-'}
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {user.address?.city}, {user.address?.province || '-'}
                </td>

                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {user.roles?.length > 0 ? (
                      user.roles.map((role) => (
                        <span
                          key={role}
                          className={`px-2.5 py-1 text-xs font-medium rounded-full ${getRoleStyles(
                            role
                          )}`}
                        >
                          {role}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-500">No roles</span>
                    )}
                  </div>
                </td>

                <td className="px-6 py-4 text-slate-500">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : '-'}
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <button className="text-indigo-600 hover:text-indigo-800 transition-colors" title="View">
                      <i className="fas fa-eye"></i>
                    </button>

                    <EditUser userId={user._id} />

                    <button className="text-red-600 hover:text-red-800 transition-colors" title="Delete">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
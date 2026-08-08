'use client';

import { UsersTable } from './_components/Table';

const UserManagementPage = () => {
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-6">
      {/* Page Heading */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Users</h2>
          <p className="text-slate-500 text-sm mt-1">
            Manage all registered users and their roles.
          </p>
        </div>

        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          <i className="fas fa-plus mr-2"></i>
          Add User
        </button>
      </div>

      {/* User Table */}
      <div
        className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"
      >
        <UsersTable />
      </div>
    </main>
  );
};

export default UserManagementPage;
'use client';

import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';
import { USER_MANAGEMENT_ROUTE } from '@/constants/routes';
import { ROLE_ADMIN } from '@/constants/userRoles';

const EditUser = ({ userId }) => {
  const user = useAuthStore((state) => state.user);

  if (!user?.roles?.includes(ROLE_ADMIN)) return null;

  return (
    <Link href={`${USER_MANAGEMENT_ROUTE}/${userId}/edit`}>
      <button
        className="text-amber-600 hover:text-amber-800 transition-colors"
        title="Edit"
      >
        <i className="fas fa-pen"></i>
      </button>
    </Link>
  );
};

export default EditUser;
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { LOGIN_ROUTE, HOME_ROUTE } from '@/constants/routes';
import { ROLE_ADMIN } from '@/constants/userRoles';

const UserMangementLayout = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      return router.replace(LOGIN_ROUTE);
    }

    if (!user.roles.includes(ROLE_ADMIN)) return router.replace(HOME_ROUTE);
  }, [user, router]);

  return <div>{children}</div>;
};

export default UserMangementLayout;
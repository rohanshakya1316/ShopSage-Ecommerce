import Link from "next/link";
import useAuthStore from "@/stores/authStore";
import { Pen } from "lucide-react";
import { ROLE_ADMIN } from "@/constants/userRoles";
import { USER_MANAGEMENT_ROUTE } from "@/constants/routes";

const EditUserRoles = ({ userId }) => {
  const user = useAuthStore((state) => state.user);

  if (!user.roles.includes(ROLE_ADMIN)) return;

  return (
    <div className="flex gap-2">
      <Link href={`${USER_MANAGEMENT_ROUTE}/${userId}/edit`}>
        <Pen className="text-primary" />
      </Link>
    </div>
  );
};

export default EditUserRoles;

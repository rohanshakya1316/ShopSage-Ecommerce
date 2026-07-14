
import { FaUsers } from "react-icons/fa6";
import { ROLE_ADMIN } from "./userRoles";

export const HOME_ROUTE = "/";
export const ABOUT_ROUTE = "/about";
export const PROFILE_ROUTE = "/profile";
export const CONTACT_ROUTE = "/contact";
export const PRODUCTS_ROUTE = "/products";
export const ORDER_ROUTE = "/orders";
export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/register";
export const FORGOT_PASSWORD_ROUTE = "/forgot-password";
export const RESET_PASSWORD_ROUTE = "/reset-password";
export const CART_ROUTE = "/cart";
export const ORDERS_ROUTE = "/orders";

// Admin routes
export const USER_MANAGEMENT_ROUTE = "/admin/user-management";


export const adminMenu = [
  {
    label: "User Management",
    route: USER_MANAGEMENT_ROUTE,
    Icon: FaUsers,
    allowedRole: ROLE_ADMIN,
  },
];

import {
  BarChart3,
  LayoutDashboard,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Users2,
} from "lucide-react";

export const HOME_ROUTE = "/";
export const ABOUT_ROUTE = "/about";
export const PRODUCT_ROUTE = "/products";
export const ORDER_ROUTE = "/orders";
export const CONTACT_ROUTE = "/contact";
export const CATEGORY_ROUTE = "/categories";
export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/register";
export const CART_ROUTE = "/cart";
export const RESET_PASSWORD_ROUTE = "/reset-password";
export const FORGOT_PASSWORD_ROUTE = "/forgot-password";

export const navMenu = [
  {
    label: "Home",
    route: HOME_ROUTE,
  },
  {
    label: "About",
    route: ABOUT_ROUTE,
  },
  {
    label: "Products",
    route: PRODUCT_ROUTE,
  },
  {
    label: "Orders",
    route: ORDER_ROUTE,
  },
  {
    label: "Contact",
    route: CONTACT_ROUTE,
  },
];

// Admin Routes
export const USER_MANAGEMENT_ROUTE = "/admin/user-management";
export const PRODUCT_MANAGEMENT_ROUTE = "/admin/product-management";
export const ORDER_MANAGEMENT_ROUTE = "/admin/order-management";
export const DASHBOARD_MANAGEMENT_ROUTE = "/admin/dashboard";

export const adminMenu = [
  {
    label: "Dashboard",
    route: DASHBOARD_MANAGEMENT_ROUTE,
    Icon: <LayoutDashboard />,
  },
  {
    label: "User Management",
    route: USER_MANAGEMENT_ROUTE,
    Icon: <Users2 />,
    active: false,
  },
  {
    label: "Product Management",
    route: PRODUCT_MANAGEMENT_ROUTE,
    Icon: <ShoppingBag />,
  },
  {
    label: "Order Management",
    route: ORDER_MANAGEMENT_ROUTE,
    Icon: <ShoppingCart />,
  },
  {
    label: "Analytics",
    route: "#",
    Icon: <BarChart3 />,
  },
  {
    label: "Settings",
    route: "#",
    Icon: <Settings />,
  },
];

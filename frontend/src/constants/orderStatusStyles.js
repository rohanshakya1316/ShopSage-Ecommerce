import {
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_SHIPPED,
} from "./orderStatus";

export const statusStyles = {
  [ORDER_STATUS_PENDING]: "bg-amber-100 text-amber-700",
  [ORDER_STATUS_CONFIRMED]: "bg-blue-100 text-blue-700",
  [ORDER_STATUS_SHIPPED]: "bg-purple-100 text-purple-700",
  [ORDER_STATUS_DELIVERED]: "bg-green-100 text-green-700",
  [ORDER_STATUS_CANCELLED]: "bg-red-100 text-red-700",
};

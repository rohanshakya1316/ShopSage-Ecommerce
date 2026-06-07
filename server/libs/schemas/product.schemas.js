import { z } from "zod";

// Product validation schema
export const productSchema = z.object({
  vendorId: z.string(),
  catId: z.string(),
  
  productName: z.string()
    .min(1, "Product name is required")
    .trim(),
  
  urlSlug: z.string()
    .min(1, "URL slug is required")
    .toLowerCase()
    .trim(),
  
  descriptionShort: z.string().optional().trim(),
  descriptionLong: z.string().optional().trim(),
  
  price: z.number()
    .min(1, "Price must be greater than 0"),
  
  stockQuantity: z.number()
    .min(0, "Stock quantity cannot be negative")
    .default(0),
  
  status: z.enum(["active", "inactive", "out_of_stock"])
    .default("active"),
});
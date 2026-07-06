import z, { email, maxLength, minLength } from "zod";
import { emailRegex } from "../../constants/regex.js";
import { userSchema } from "./user.schema.js";

const loginSchema = z
  .object({
    email: z
      .string({ error: "Email is required." })
      .regex(emailRegex, { error: "Invalid email address." })
      .optional(),
    phone: z
      .string({ error: "Phone number is required." })
      .check(minLength(5), maxLength(15))
      .optional(),
    password: z.string(),
  })
  .refine((data) => data.email || data.phone, {
    message: "Either email or phone is required.",
    path: ["email", "phone"],
  });

const registerSchema = userSchema;

const forgotPasswordSchema = z.object({
  email: z
    .string({ error: "Email is required." })
    .regex(emailRegex, { error: "Invalid email address." }),
});

const resetPasswordSchema = z.object({
  password: z.string(),
  userId: z.string(),
  token: z.string(),
});

export { loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema };

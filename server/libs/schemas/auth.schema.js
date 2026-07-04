import z, { maxLength, minLength, regex } from "zod";
import { emailRegex, passwordRegex } from "../../constants/regex.js";
import { ROLE_CUSTOMER,ROLE_ADMIN,ROLE_VENDOR} from "../../constants/roles.js";

export const registerSchema = z.object({
    name: z.string().check(minLength(3), maxLength(50)).trim(),
    email: z.string().regex(emailRegex, { error: "Invalid email address" }),
    password: z.string().check(minLength(6), regex(passwordRegex, { error: "Pssword must contain uppercase, lowercase and special characters" })),
    roleId: z.array(z.enum([ROLE_CUSTOMER, ROLE_ADMIN, ROLE_VENDOR]),).default([ROLE_CUSTOMER]),
})
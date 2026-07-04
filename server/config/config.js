import dotenv from "dotenv";

dotenv.config();

const config = {
  khalti: {
    apiUrl: process.env.KHALTI_API_URL || "",
    returnUrl: process.env.KHALTI_RETURN_URL || "",
    secretKey: process.env.KHALTI_SECRET_KEY || "",
  },
};

export default config;

import Header from "@/components/Header";
import "./globals.css";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: {
    default: "ShopSage",
    template: "%s | ShopSage",
  },
  description:
    "ShopSage is an online platform for electronic buying and selling of products",
  keywords: "E-commerce, Online trading, Product Exchange",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <ToastContainer position="top-center" autoClose={1500} />
      </body>
    </html>
  );
};

export default RootLayout;

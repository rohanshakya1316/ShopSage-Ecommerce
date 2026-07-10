import Header from "@/components/Header";
import "./globals.css";

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
      <Header />
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;

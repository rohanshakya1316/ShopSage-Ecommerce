import Header from "@/components/Header";
import "./globals.css";

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <Header />
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;

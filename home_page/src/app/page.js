import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WhyChooseUs from "../components/WhyChooseUs";
import Products from "../components/Products";
import FlashSale from "../components/FlashSale";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <Products />
      <FlashSale />
      <Footer />
    </>
  );
}
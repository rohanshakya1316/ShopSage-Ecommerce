import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "./about/_components/WhyChooseUs";
import Featured from "@/components/Featured";
import FlashSale from "@/components/FlashSales";
import Footer from "@/components/Footer";

const Home = async () => {
  return (
    <div>
      <HeroSection />
      <WhyChooseUs />
      <Featured />
      <FlashSale />
      <Footer />
    </div>
  );
};

export default Home;

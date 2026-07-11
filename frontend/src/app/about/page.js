import CTASection from "./_components/CallToAction";
import OurValues from "./_components/OurValues";
import TrustBanner from "./_components/TrustBanner";
import WhyChooseUs from "./_components/WhyChooseUs";

export const metadata = {
  title: "About",
};

const AboutPage = () => {
  return (
    <>
      <WhyChooseUs />
      <TrustBanner />
      <OurValues />
      <CTASection />
    </>
  );
};

export default AboutPage;

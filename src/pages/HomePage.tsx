import Hero from '../components/home/Hero';
import TrustBar from '../components/home/TrustBar';
import CategoriesSection from '../components/home/CategoriesSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import SpecificNeeds from '../components/home/SpecificNeeds';
import HowItWorks from '../components/home/HowItWorks';
import WhyUs from '../components/home/WhyUs';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FAQSection from '../components/home/FAQSection';
import FinalCTA from '../components/home/FinalCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <CategoriesSection />
      <FeaturedProducts />
      <SpecificNeeds />
      <HowItWorks />
      <WhyUs />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}

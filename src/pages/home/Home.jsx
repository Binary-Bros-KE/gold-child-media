import AboutUs from "./components/AboutUs";
import BlogSection from "./components/BlogSection";
import ContactSection from "./components/ContactSection";
import CoursesSection from "./components/CoursesSection";
import FAQSection from "./components/FAQSection";
import FeaturesSection from "./components/FeaturesSection";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import TestimonialsSection from "./components/TestimonialsSection";


export default function Home() {
  return (
    <div>
      <div>
        <HeroSection />  
      </div>
      <div>
        <AboutUs />
      </div>

      <div>
        <StatsSection />
      </div>

      <div>
        <CoursesSection />
      </div>

      <div>
        <FeaturesSection />
      </div>


      <div>
        <ContactSection />
      </div>


      <div>
        <TestimonialsSection />
      </div>


      <div>
        <FAQSection />
      </div>

      <div>
        <BlogSection />
      </div>
    </div>
  )
}

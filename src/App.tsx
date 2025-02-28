import useSkipSearchPopup from './hooks/useSkipSearchPopup';
import SkipSearchPopup from './components/SkipSearchPopup';
import Navbar from './components/Navbar';
import GradientHero from './components/GradientHero';
import ServicesSection from './components/ServicesSection';
import StepsSection from './components/StepsSection';
import OutboundSection from './components/OutboundSection';
import DestinationsSection from './components/DestinationsSection';
import InboundSection from './components/InboundSection';
import BlogSection from './components/BlogSection';
import TestimonialsSection from './components/TestimonialsSection';
import PartnersSection from './components/PartnersSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  const { isVisible, closePopup } = useSkipSearchPopup();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <GradientHero />

        {/* Main Navigation */}
        <Navbar />

        {/* Services Section */}
        <ServicesSection />

        {/* Steps Section */}
        <StepsSection />

        {/* Outbound Experiences */}
        <OutboundSection />

        {/* Top Destinations */}
        <DestinationsSection />

        {/* Inbound Experiences */}
        <InboundSection />

        {/* Blog Section */}
        <BlogSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Partners Section */}
        <PartnersSection />

        {/* Contact Form */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </main>
      <SkipSearchPopup isVisible={isVisible} onClose={closePopup} />
    </div>
  );
}

export default App;

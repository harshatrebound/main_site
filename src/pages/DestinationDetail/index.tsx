import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useParams, Link } from 'react-router-dom';
import { FiMapPin, FiUsers, FiArrowLeft, FiX, FiChevronLeft, FiChevronRight, FiCheck, FiClock, FiPlus } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactSection from '../../components/ContactSection';
import PartnersSection from '../../components/PartnersSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import { useDestinationBySlug, useStaysByDestinationId } from '../../lib/hooks/useSupabaseData';

// Mock gallery images - in a real implementation, these would come from the database
const mockGalleryImages = [
  { id: 1, url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000', alt: 'Destination image 1' },
  { id: 2, url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1000', alt: 'Destination image 2' },
  { id: 3, url: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1000', alt: 'Destination image 3' },
  { id: 4, url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1000', alt: 'Destination image 4' },
  { id: 5, url: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=1000', alt: 'Destination image 5' },
  { id: 6, url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1000', alt: 'Destination image 6' },
  { id: 7, url: 'https://images.unsplash.com/photo-1573649800108-8b4f8b5fc03d?q=80&w=1000', alt: 'Destination image 7' },
  { id: 8, url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1000', alt: 'Destination image 8' },
  { id: 9, url: 'https://images.unsplash.com/photo-1573649800108-8b4f8b5fc03d?q=80&w=1000', alt: 'Destination image 9' },
  { id: 10, url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000', alt: 'Destination image 10' },
  { id: 11, url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1000', alt: 'Destination image 11' },
  { id: 12, url: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1000', alt: 'Destination image 12' },
  { id: 13, url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1000', alt: 'Destination image 13' },
  { id: 14, url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1000', alt: 'Destination image 14' },
];

const GalleryModal = ({ 
  isOpen, 
  onClose, 
  images, 
  initialIndex = 0 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  images: Array<{ id: number; url: string; alt: string }>; 
  initialIndex?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={onClose}
          className="text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
        >
          <FiX size={24} />
        </button>
      </div>
      
      <div 
        className="relative w-full max-w-5xl max-h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.img
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          src={images[currentIndex].url}
          alt={images[currentIndex].alt}
          className="max-h-[80vh] max-w-full object-contain"
        />
        
        <button 
          onClick={goToPrevious}
          className="absolute left-2 text-white bg-black/50 rounded-full p-3 hover:bg-black/70 transition-colors"
        >
          <FiChevronLeft size={24} />
        </button>
        
        <button 
          onClick={goToNext}
          className="absolute right-2 text-white bg-black/50 rounded-full p-3 hover:bg-black/70 transition-colors"
        >
          <FiChevronRight size={24} />
        </button>
        
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <div className="bg-black/50 px-4 py-2 rounded-full text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const DestinationDetail = () => {
  const { destinationSlug } = useParams<{ destinationSlug: string }>();
  const { destination, loading: destinationLoading, error: destinationError } = useDestinationBySlug(destinationSlug);
  const destinationId = destination?.id ? Number(destination.id) : undefined;
  const { stays, loading: staysLoading } = useStaysByDestinationId(destinationId);
  
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const openGallery = (index: number) => {
    setGalleryInitialIndex(index);
    setIsGalleryOpen(true);
  };

  // If destination is loading, show loading state
  if (destinationLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#FF4C39] border-r-[#FF4C39] border-b-[#FFB573] border-l-[#FFB573] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-[#636363]">Loading destination details...</p>
        </div>
      </div>
    );
  }

  if (!destination || destinationError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#003366] via-[#002244] to-[#001a33] flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-3xl font-bold text-white mb-4">Destination Not Found</h1>
          <p className="text-lg text-white/80 mb-8">The destination you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  // Display only the first 4 images in the gallery, the rest will be shown when clicking "More"
  const displayedImages = mockGalleryImages.slice(0, 4);
  const remainingImagesCount = mockGalleryImages.length - 4;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003366] via-[#002244] to-[#001a33]">
      {/* Navbar */}
      <Navbar />

      {/* Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <GalleryModal
            isOpen={isGalleryOpen}
            onClose={() => setIsGalleryOpen(false)}
            images={mockGalleryImages}
            initialIndex={galleryInitialIndex}
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 md:px-8 lg:px-16 max-w-[1400px] mx-auto">
        <div className="mb-6">
          <Link 
            to="/corporate-team-outing-places" 
            className="inline-flex items-center text-[#636363] hover:text-[#FF4C39] transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to all destinations
          </Link>
        </div>
        
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold text-white mb-6"
        >
          {destination.name}'s Top Spots for Team Fun
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-white/80 mb-12 max-w-3xl font-['DM Sans']"
        >
          Elevate your team's energy with corporate team outing places in {destination.name} by Trebound. 
          Experience team-building activities in the {destination.region || 'City of Pearls'}.
        </motion.p>
        
        <div className="flex flex-col lg:flex-row w-full">
          {/* Main large image */}
          <div className="lg:w-[65%] h-[400px] lg:h-[500px] relative rounded-md overflow-hidden cursor-pointer" onClick={() => openGallery(0)}>
            <motion.img 
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src={destination.destination_main_image || destination.destination_image || mockGalleryImages[0].url} 
              alt={destination.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Thumbnail gallery */}
          <div className="lg:w-[35%] lg:pl-2 flex flex-row lg:flex-col flex-wrap mt-2 lg:mt-0">
            <div className="w-1/2 lg:w-full h-[150px] lg:h-[245px] pr-1 lg:pr-0 lg:mb-2">
              <div className="grid grid-cols-2 h-full gap-1">
                <motion.div
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="relative rounded-md overflow-hidden cursor-pointer h-full"
                  onClick={() => openGallery(1)}
                >
                  <img 
                    src={displayedImages[1]?.url || mockGalleryImages[1].url} 
                    alt={displayedImages[1]?.alt || "Destination image"}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative rounded-md overflow-hidden cursor-pointer h-full"
                  onClick={() => openGallery(2)}
                >
                  <img 
                    src={displayedImages[2]?.url || mockGalleryImages[2].url} 
                    alt={displayedImages[2]?.alt || "Destination image"}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>
            <div className="w-1/2 lg:w-full h-[150px] lg:h-[245px] pl-1 lg:pl-0">
              <div className="grid grid-cols-2 h-full gap-1">
                <motion.div
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative rounded-md overflow-hidden cursor-pointer h-full"
                  onClick={() => openGallery(3)}
                >
                  <img 
                    src={displayedImages[3]?.url || mockGalleryImages[3].url} 
                    alt={displayedImages[3]?.alt || "Destination image"}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="relative rounded-md overflow-hidden cursor-pointer h-full"
                  onClick={() => openGallery(4)}
                >
                  {remainingImagesCount > 0 ? (
                    <>
                      <img 
                        src={displayedImages[4]?.url || mockGalleryImages[4].url} 
                        alt={displayedImages[4]?.alt || "Destination image"}
                        className="w-full h-full object-cover brightness-50"
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-white">
                        <span className="text-lg font-semibold">+{remainingImagesCount} More</span>
                      </div>
                    </>
                  ) : (
                    <img 
                      src={displayedImages[4]?.url || mockGalleryImages[4].url} 
                      alt={displayedImages[4]?.alt || "Destination image"}
                      className="w-full h-full object-cover"
                    />
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resorts Section */}
      <section className="w-full bg-white py-16">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-12 mb-12">
            <div className="flex-1 max-w-2xl">
              <span className="inline-block text-lg font-medium font-['DM Sans'] text-[#636363] mb-2">
                Resorts & Stays
              </span>
              <h2 className="text-[40px] font-semibold font-['Inter'] leading-tight bg-gradient-to-b from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">
                Where You'll Be Staying.
              </h2>
            </div>
            <p className="lg:max-w-md text-left lg:text-right text-base font-normal font-['DM Sans'] text-[#757575] lg:pt-6">
              Discover luxurious accommodations and amenities designed to make your team outing memorable and comfortable.
            </p>
          </div>

          {staysLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((index) => (
                <div key={index} className="bg-[#eeeeee] rounded-[16px] overflow-hidden animate-pulse">
                  <div className="p-5">
                    <div className="aspect-[386/304] rounded-[16px] bg-gray-300 mb-4" />
                    <div className="h-8 bg-gray-300 rounded mb-4" />
                    <div className="h-6 bg-gray-300 rounded mb-6" />
                    <div className="flex justify-between mb-4">
                      <div className="h-8 w-24 bg-gray-300 rounded-full" />
                      <div className="h-8 w-24 bg-gray-300 rounded-full" />
                    </div>
                    <div className="h-12 bg-gray-300 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          ) : stays.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-lg text-[#636363]">No resorts found for this destination.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stays.map((stay, index) => (
                <motion.div
                  key={stay.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="w-full bg-[#eeeeee] rounded-[16px] hover:shadow-md transition-all duration-300 group"
                >
                  <div className="p-5 flex flex-col h-full">
                    <div className="relative aspect-[386/304] rounded-[16px] overflow-hidden shadow-sm mb-4">
                      <img 
                        src={stay.banner_image_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'} 
                        alt={stay.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Rating Badge */}
                      <div className="absolute top-3 left-3 bg-white rounded-full px-2 py-1 flex items-center shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF4C39" className="w-4 h-4 mr-1">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium">4.6</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 flex-1">
                      <h3 className="text-lg font-semibold font-['DM Sans'] text-[#313131]">
                        Team Outing at {stay.name}
                      </h3>
                      <p className="text-base font-normal font-['DM Sans'] text-[#636363] line-clamp-2">
                        {stay.tagline || stay.stay_description?.substring(0, 100) || 'A Tranquil Oasis'}
                      </p>
                    </div>

                    <div className="mt-4">
                      <Link to={`/stays/${stay.slug}`}>
                        <div className="relative w-full h-[45px] group">
                          <div className="absolute inset-0 bg-gradient-to-r from-[#ff4c39] to-[#ffb573] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[8px]" />
                          <button className="absolute inset-0 w-full h-full flex items-center justify-center border border-[#b1b1b1] rounded-[8px] group-hover:border-transparent transition-colors duration-300">
                            <span className="text-base font-bold font-['DM Sans'] text-[#b1b1b1] group-hover:text-white transition-colors duration-300">
                              View Details
                            </span>
                          </button>
                        </div>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Content Section */}
      <section className="w-full bg-white py-16" ref={ref}>
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start"
          >
            {/* Key Highlights Column */}
            <div>
              <h3 className="text-3xl font-semibold mb-6 bg-gradient-to-b from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent font-['Inter']">Key Highlights</h3>
              
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-[#f9f9f9] p-5 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF4C39] to-[#FFB573] flex items-center justify-center text-white mr-4 flex-shrink-0">
                      <FiMapPin size={20} />
                    </div>
                    <h4 className="text-xl font-medium font-['DM Sans']">Location</h4>
                  </div>
                  <p className="text-base text-[#636363] ml-14 font-['DM Sans']">
                    {destination?.region || 'South'}
                  </p>
                </div>
                
                <div className="bg-[#f9f9f9] p-5 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF4C39] to-[#FFB573] flex items-center justify-center text-white mr-4 flex-shrink-0">
                      <FiClock size={20} />
                    </div>
                    <h4 className="text-xl font-medium font-['DM Sans']">Duration</h4>
                  </div>
                  <p className="text-base text-[#636363] ml-14 font-['DM Sans']">
                    Full-day and multi-day options available
                  </p>
                </div>
                
                <div className="bg-[#f9f9f9] p-5 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF4C39] to-[#FFB573] flex items-center justify-center text-white mr-4 flex-shrink-0">
                      <FiUsers size={20} />
                    </div>
                    <h4 className="text-xl font-medium font-['DM Sans']">Group Size</h4>
                  </div>
                  <p className="text-base text-[#636363] ml-14 font-['DM Sans']">
                    Ideal for teams of 10-100 people
                  </p>
                </div>
                
                <div className="bg-[#f9f9f9] p-5 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF4C39] to-[#FFB573] flex items-center justify-center text-white mr-4 flex-shrink-0">
                      <FiPlus size={20} />
                    </div>
                    <h4 className="text-xl font-medium font-['DM Sans']">Activities</h4>
                  </div>
                  <p className="text-base text-[#636363] ml-14 font-['DM Sans']">
                    Team-building, adventure sports, cultural experiences
                  </p>
                </div>
              </div>
            </div>
            
            {/* Why Choose Column */}
            <div>
              <h3 className="text-3xl font-semibold mb-6 bg-gradient-to-b from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent font-['Inter']">
                Why Choose {destination?.name || 'This Destination'}
              </h3>
              
              <ul className="space-y-5 text-[#636363]">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#FF4C39] to-[#FFB573] flex items-center justify-center text-white mr-4 mt-1 flex-shrink-0">
                    <span className="text-xs font-bold">1</span>
                  </div>
                  <p className="text-base font-['DM Sans']">Diverse range of activities suitable for different team dynamics and preferences</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#FF4C39] to-[#FFB573] flex items-center justify-center text-white mr-4 mt-1 flex-shrink-0">
                    <span className="text-xs font-bold">2</span>
                  </div>
                  <p className="text-base font-['DM Sans']">Professional facilitators to ensure smooth execution of team-building activities</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#FF4C39] to-[#FFB573] flex items-center justify-center text-white mr-4 mt-1 flex-shrink-0">
                    <span className="text-xs font-bold">3</span>
                  </div>
                  <p className="text-base font-['DM Sans']">Customizable packages to meet specific team objectives and budgets</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#FF4C39] to-[#FFB573] flex items-center justify-center text-white mr-4 mt-1 flex-shrink-0">
                    <span className="text-xs font-bold">4</span>
                  </div>
                  <p className="text-base font-['DM Sans']">Excellent infrastructure and amenities for a comfortable experience</p>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Stay Description Section */}
      <div className="mb-16 text-center">
        <h2 className="text-4xl font-semibold mb-6 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent font-['Inter']">Stay Description</h2>
        
        <div className="max-w-4xl mx-auto text-lg text-[#636363] font-['DM Sans']">
          {stays && stays.length > 0 ? (
            stays[0].stay_description ? (
              <div className="text-left">
                <p>{stays[0].stay_description}</p>
              </div>
            ) : (
              <p className="text-left">
                {stays[0].name} is a delightful blend of nature and leisure, offering an inviting atmosphere 
                for team building, team offsite, and team outings. Surrounded by lush greenery, it provides a 
                serene backdrop for teams to come together and unwind. The comfortable accommodations 
                and range of amenities ensure a pleasant stay and a rejuvenating experience for your team.
              </p>
            )
          ) : (
            <p className="text-left">
              {destination.name} is a delightful blend of nature and leisure, offering an inviting atmosphere 
              for team building, team offsite, and team outings. Surrounded by lush greenery, it provides a 
              serene backdrop for teams to come together and unwind. The comfortable accommodations 
              and range of amenities ensure a pleasant stay and a rejuvenating experience for your team.
            </p>
          )}
        </div>
      </div>

      {/* Testimonial Quote Section */}
      <section className="py-20 bg-[#f9f9f9]">
        <TestimonialsSection />
      </section>

      {/* Similar Stays Section */}
      <section className="w-full bg-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-6 max-w-[1200px]">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-12 mb-12">
            <div className="flex-1 max-w-2xl">
              <span className="inline-block text-lg font-medium font-['DM Sans'] text-[#636363] mb-2">
                Nearby Luxury Stays
              </span>
              <h2 className="text-[40px] font-semibold font-['Inter'] leading-tight bg-gradient-to-b from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">
                Serene Stays, Lasting Memories.
              </h2>
            </div>
            <p className="lg:max-w-md text-left lg:text-right text-base font-normal font-['DM Sans'] text-[#757575] lg:pt-6">
              Discover exquisite stays that offer the perfect blend of luxury, comfort, and unforgettable experiences.
            </p>
          </div>

          {/* Stay Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stays && stays.length > 0 ? (
              stays.slice(0, 3).map((stay, index) => (
                <div key={stay.id || index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative aspect-[16/9]">
                    <img
                      src={stay.banner_image_url || stay.stay_image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000'}
                      alt={stay.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{stay.name}</h3>
                    <p className="text-gray-600 mb-4">{stay.description?.substring(0, 100)}...</p>
                    <Link
                      to={`/stays/${stay.slug}`}
                      className="text-primary hover:text-primary-dark transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-600">No stays available at this time.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Partners Section */}
      <PartnersSection />

      {/* Contact Section */}
      <div id="contact-section">
        <ContactSection />
      </div>

      {/* Footer */}
      <Footer />

      {/* Stay Facilities Card */}
      <div className="bg-gray-100 rounded-md p-6">
        <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">Stay Facilities</h3>
        <ul className="text-left space-y-1">
          <li className="flex items-start mb-2">
            <FiCheck className="min-w-[16px] h-4 mt-1 text-[#FF4C39]" />
            <span className="ml-2">24-hour front desk</span>
          </li>
          <li className="flex items-start mb-2">
            <FiCheck className="min-w-[16px] h-4 mt-1 text-[#FF4C39]" />
            <span className="ml-2">Audio/Visual Equipment</span>
          </li>
          <li className="flex items-start mb-2">
            <FiCheck className="min-w-[16px] h-4 mt-1 text-[#FF4C39]" />
            <span className="ml-2">Bar/Lounge</span>
          </li>
          <li className="flex items-start mb-2">
            <FiCheck className="min-w-[16px] h-4 mt-1 text-[#FF4C39]" />
            <span className="ml-2">Newspaper</span>
          </li>
          <li className="flex items-start mb-2">
            <FiCheck className="min-w-[16px] h-4 mt-1 text-[#FF4C39]" />
            <span className="ml-2">Free Parking</span>
          </li>
          <li className="flex items-start mb-2">
            <FiCheck className="min-w-[16px] h-4 mt-1 text-[#FF4C39]" />
            <span className="ml-2">Restaurant</span>
          </li>
          <li className="flex items-start mb-2">
            <FiCheck className="min-w-[16px] h-4 mt-1 text-[#FF4C39]" />
            <span className="ml-2">Room Service</span>
          </li>
          <li className="flex items-start mb-2">
            <FiCheck className="min-w-[16px] h-4 mt-1 text-[#FF4C39]" />
            <span className="ml-2">Indoor Sports area</span>
          </li>
          <li className="flex items-start mb-2">
            <FiCheck className="min-w-[16px] h-4 mt-1 text-[#FF4C39]" />
            <span className="ml-2">Outdoor Sports area</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DestinationDetail;

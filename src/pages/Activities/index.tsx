import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiMapPin, FiClock, FiUsers, FiStar } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactSection from '../../components/ContactSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import { useDestinations, useActivities } from '../../lib/hooks/useSupabaseData';

const ITEMS_PER_PAGE = 12;

const Activities = () => {
  const [activeTab, setActiveTab] = useState('all');
  const { destinations } = useDestinations();
  const { activities, loading: activitiesLoading } = useActivities();
  const [filteredActivities, setFilteredActivities] = useState(activities || []);
  const [currentPage, setCurrentPage] = useState(1);

  // Get unique activity_main_tags
  const activityTags = ['all', ...new Set(activities?.map(activity => 
    activity.activity_main_tag || 'uncategorized'
  ).filter(Boolean))];

  useEffect(() => {
    if (activities) {
      if (activeTab === 'all') {
        setFilteredActivities(activities);
      } else {
        setFilteredActivities(activities.filter(activity => 
          activity.activity_main_tag === activeTab
        ));
      }
      // Reset to first page when changing tabs
      setCurrentPage(1);
    }
  }, [activeTab, activities]);

  const formatTagName = (tag: string) => {
    return tag
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredActivities.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentActivities = filteredActivities.slice(startIndex, endIndex);

  if (activitiesLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-[#eeeeee] rounded-[20px] overflow-hidden animate-pulse">
                <div className="p-7">
                  <div className="aspect-[386/304] rounded-[20px] bg-gray-300 mb-6" />
                  <div className="h-8 bg-gray-300 rounded mb-4" />
                  <div className="h-6 bg-gray-300 rounded mb-6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#003366] to-[#001a33] pt-32 pb-20 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Team Building Activities<br />That Make a Difference
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-8">
              Discover engaging activities that strengthen team bonds, boost morale, and create lasting memories
            </p>
            <Link
              to="#activities"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white px-8 py-4 rounded-full text-lg font-medium hover:opacity-90 transition-opacity"
            >
              Explore Activities
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-b from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">
              Choose Your Adventure
            </h2>
            <p className="text-lg text-[#636363]">
              Select from our diverse range of team building activities
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {activityTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTab(tag)}
                className={`px-6 py-3 rounded-full text-base font-medium transition-all ${
                  activeTab === tag
                    ? 'bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white'
                    : 'bg-gray-100 text-[#636363] hover:bg-gray-200'
                }`}
              >
                {formatTagName(tag)}
              </button>
            ))}
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={activity.main_image}
                      alt={activity.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Rating Badge */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-white rounded-full px-2 py-0.5 sm:px-3 sm:py-1 flex items-center gap-1 sm:gap-1.5 shadow-lg">
                    <FiStar className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF4C39] fill-[#FF4C39]" />
                    <span className="text-xs sm:text-sm font-medium">4.6</span>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="text-lg sm:text-xl font-semibold mb-1">{activity.name}</h3>
                  <p className="text-sm sm:text-base text-[#636363] mb-4">{activity.tagline}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-[#636363] mb-4">
                    <div className="flex items-center gap-2">
                      <FiUsers className="w-4 h-4" />
                      <span>{activity.group_size || '20-100'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiMapPin className="w-4 h-4" />
                      <span>{activity.activity_type || 'Outbound'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiClock className="w-4 h-4" />
                      <span>{activity.duration || '8 hrs'}</span>
                    </div>
                  </div>

                  <div className="relative w-full h-[45px] group">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#ff4c39] to-[#ffb573] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                    <button className="absolute inset-0 w-full h-full flex items-center justify-center gap-2 border border-[#b1b1b1] rounded-lg group-hover:border-transparent transition-colors duration-300">
                      <span className="font-medium text-[#b1b1b1] group-hover:text-white transition-colors duration-300">
                        Explore
                      </span>
                      <FiArrowRight className="w-4 h-4 text-[#b1b1b1] group-hover:text-white transition-colors duration-300" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-6 py-3 rounded-full border-2 border-[#FF4C39] text-[#FF4C39] hover:bg-[#FF4C39] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#FF4C39]"
              >
                Previous
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white'
                        : 'text-[#636363] hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-6 py-3 rounded-full border-2 border-[#FF4C39] text-[#FF4C39] hover:bg-[#FF4C39] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#FF4C39]"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Explore Destinations Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-b from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">
              Explore Destinations
            </h2>
            <p className="text-lg text-[#636363]">
              Find the perfect location for your team building activities
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations?.slice(0, 6).map((destination) => (
              <Link
                key={destination.id}
                to={`/corporate-team-outing-places/${destination.slug}`}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden"
              >
                <img
                  src={destination.destination_main_image || destination.destination_image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-semibold text-white">{destination.name}</h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/corporate-team-outing-places"
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#FF4C39] text-[#FF4C39] rounded-full hover:bg-gradient-to-r hover:from-[#FF4C39] hover:to-[#FFB573] hover:text-white transition-all"
            >
              View All Destinations
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Activities; 
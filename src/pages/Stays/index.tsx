import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiSearch, FiMapPin, FiStar, FiUsers, FiArrowRight } from 'react-icons/fi';
import { supabase } from '../../lib/supabaseClient';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

interface Stay {
  id: number;
  name: string;
  location: string;
  price: string;
  stay_image: string;
  tagline: string;
  slug: string;
  facilities: string;
  special_activities: string;
  destination: string;
  images: string[];
}

interface Destination {
  id: number;
  name: string;
  slug: string;
}

const RatingBadge = ({ rating }: { rating: string }) => (
  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-white rounded-full px-2 py-0.5 sm:px-3 sm:py-1 flex items-center gap-1 sm:gap-1.5 shadow-lg">
    <FiStar className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF4C39] fill-[#FF4C39]" />
    <span className="text-xs sm:text-sm font-medium">{rating}</span>
  </div>
);

const BookNowButton = ({ slug }: { slug: string }) => (
  <div className="relative w-full h-[40px] sm:h-[45px] group">
    <div className="absolute inset-0 bg-gradient-to-b from-[#ff4c39] to-[#ffb573] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[8px]" />
    <a 
      href={`/stays/${slug}`}
      className="absolute inset-0 w-full h-full flex items-center justify-center gap-1.5 sm:gap-2 border border-[#b1b1b1] rounded-[8px] group-hover:border-transparent transition-colors duration-300"
    >
      <span className="text-sm sm:text-base font-bold font-['DM Sans'] text-[#b1b1b1] group-hover:text-white transition-colors duration-300">
        Book Now
      </span>
      <FiArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#b1b1b1] group-hover:text-white transition-colors duration-300" />
    </a>
  </div>
);

const StayCard = ({ stay }: { stay: Stay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative aspect-[4/3]">
        <img
          src={stay.stay_image}
          alt={stay.name}
          className="w-full h-full object-cover"
        />
        <RatingBadge rating="4.6" />
      </div>
      
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-semibold mb-1">
          {stay.name}
        </h3>
        <p className="text-xs sm:text-sm text-[#636363] mb-2 italic line-clamp-2">
          "{stay.tagline}"
        </p>
        <div className="flex items-center gap-1 text-xs sm:text-sm text-[#636363] mb-3 sm:mb-4">
          <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF4C39]" />
          {stay.destination}
        </div>
        <div className="pt-2 sm:pt-3 border-t">
          <BookNowButton slug={stay.slug} />
        </div>
      </div>
    </motion.div>
  );
};

const Stays = () => {
  const [stays, setStays] = useState<Stay[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedFacility, setSelectedFacility] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const staysPerPage = 9;

  useEffect(() => {
    fetchDestinations();
    fetchStays();
  }, [currentPage, searchTerm, selectedDestination, selectedFacility, selectedActivity]);

  const fetchDestinations = async () => {
    try {
      const { data, error } = await supabase
        .from('destinations')
        .select('id, name, slug')
        .order('name');

      if (error) throw error;
      setDestinations(data || []);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    }
  };

  const fetchStays = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('stays')
        .select('*')
        .range((currentPage - 1) * staysPerPage, currentPage * staysPerPage - 1);

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%,facilities.ilike.%${searchTerm}%,special_activities.ilike.%${searchTerm}%`);
      }

      if (selectedDestination) {
        query = query.eq('destination', selectedDestination);
      }

      if (selectedFacility) {
        query = query.ilike('facilities', `%${selectedFacility}%`);
      }

      if (selectedActivity) {
        query = query.ilike('special_activities', `%${selectedActivity}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      setStays(data || []);
    } catch (error) {
      console.error('Error fetching stays:', error);
    } finally {
      setLoading(false);
    }
  };

  const FilterButton = ({ 
    icon, 
    label, 
    value, 
    onChange,
    options 
  }: { 
    icon: React.ReactNode; 
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string; }[];
  }) => (
    <div className="relative group w-full sm:flex-1 sm:min-w-[200px]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none pl-10 sm:pl-12 pr-8 sm:pr-10 py-3 sm:py-4 bg-white border-2 border-gray-200 rounded-full text-sm sm:text-base text-[#1a1a1a] focus:outline-none focus:border-[#FF4C39] focus:ring-1 focus:ring-[#FF4C39] cursor-pointer hover:border-[#FF4C39] transition-colors duration-200"
      >
        <option value="">{label}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#FF4C39] pointer-events-none">
        {icon}
      </div>
      <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f8f9fa] pt-14 sm:pt-16 md:pt-20">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-[#003366] to-[#001a33] py-12 sm:py-16 md:py-24">
          <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10" />
          <div className="max-w-[1448px] mx-auto px-3 sm:px-4 md:px-8 lg:px-16 relative">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6 text-center max-w-3xl mx-auto px-2 sm:px-4">
              Find the Perfect Resort for Your Team
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 text-center mb-6 sm:mb-8 md:mb-12 max-w-2xl mx-auto px-3 sm:px-4">
              Discover handpicked resorts and stays perfect for team building, corporate retreats, and memorable outings
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto px-3 sm:px-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search resorts, activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 sm:px-6 md:px-8 pl-10 sm:pl-12 md:pl-14 py-3 sm:py-4 md:py-5 rounded-full bg-white/95 backdrop-blur shadow-xl text-[#1a1a1a] placeholder-[#636363] focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-[#FF4C39]/20 text-sm sm:text-base md:text-lg"
                />
                <FiSearch className="absolute left-3 sm:left-4 md:left-5 top-1/2 transform -translate-y-1/2 text-[#FF4C39] w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                <button
                  onClick={() => fetchStays()}
                  className="absolute right-1.5 sm:right-2 md:right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white px-3 sm:px-4 md:px-8 py-1.5 sm:py-2 md:py-3 rounded-full hover:opacity-95 transition-all duration-300 text-xs sm:text-sm md:text-base font-medium whitespace-nowrap"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white shadow-md relative z-10 -mt-6 sm:-mt-8">
          <div className="max-w-[1448px] mx-auto px-3 sm:px-4 md:px-8 lg:px-16 py-3 sm:py-4 md:py-6">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
              <FilterButton
                icon={<FiMapPin className="w-4 h-4 sm:w-5 sm:h-5" />}
                label="Destination"
                value={selectedDestination}
                onChange={setSelectedDestination}
                options={destinations.map(dest => ({
                  value: dest.name,
                  label: dest.name
                }))}
              />

              <FilterButton
                icon={<FiStar className="w-4 h-4 sm:w-5 sm:h-5" />}
                label="Facilities"
                value={selectedFacility}
                onChange={setSelectedFacility}
                options={[
                  { value: 'Swimming Pool', label: 'Swimming Pool' },
                  { value: 'Conference Room', label: 'Conference Room' },
                  { value: 'Restaurant', label: 'Restaurant' },
                  { value: 'Spa', label: 'Spa' },
                  { value: 'Games Room', label: 'Games Room' }
                ]}
              />

              <FilterButton
                icon={<FiUsers className="w-4 h-4 sm:w-5 sm:h-5" />}
                label="Activities"
                value={selectedActivity}
                onChange={setSelectedActivity}
                options={[
                  { value: 'Team Building', label: 'Team Building' },
                  { value: 'Adventure Sports', label: 'Adventure Sports' },
                  { value: 'Water Sports', label: 'Water Sports' },
                  { value: 'Indoor Games', label: 'Indoor Games' },
                  { value: 'Outdoor Activities', label: 'Outdoor Activities' }
                ]}
              />
            </div>
          </div>
        </div>

        {/* Stays Grid */}
        <div className="max-w-[1448px] mx-auto px-4 md:px-8 lg:px-16 py-8 sm:py-16">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {[1, 2, 3].map((index) => (
                <div key={index} className="bg-[#eeeeee] rounded-xl sm:rounded-2xl overflow-hidden animate-pulse">
                  <div className="p-4 sm:p-7">
                    <div className="aspect-[4/3] rounded-xl sm:rounded-2xl bg-gray-300 mb-4 sm:mb-6" />
                    <div className="h-6 sm:h-8 bg-gray-300 rounded mb-3 sm:mb-4" />
                    <div className="h-4 sm:h-6 bg-gray-300 rounded mb-4 sm:mb-6" />
                  </div>
                </div>
              ))}
            </div>
          ) : stays.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                {stays.map((stay) => (
                  <StayCard key={stay.id} stay={stay} />
                ))}
              </div>
              
              {/* Pagination */}
              <div className="mt-8 sm:mt-16 flex justify-center gap-3 sm:gap-4">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 border-[#FF4C39] text-[#FF4C39] hover:bg-[#FF4C39] hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-[#FF4C39] text-sm sm:text-base"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={stays.length < staysPerPage}
                  className="px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 border-[#FF4C39] text-[#FF4C39] hover:bg-[#FF4C39] hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-[#FF4C39] text-sm sm:text-base"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12 sm:py-20">
              <h3 className="text-xl sm:text-2xl font-semibold text-[#1a1a1a] mb-2 sm:mb-4">No stays found</h3>
              <p className="text-base sm:text-lg text-[#636363]">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Stays; 
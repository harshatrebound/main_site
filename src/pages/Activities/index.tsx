import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactSection from '../../components/ContactSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import { useDestinations } from '../../lib/hooks/useSupabaseData';

const activityCategories = [
  {
    id: 'team-building',
    label: 'Team Building',
    description: 'Activities designed to strengthen team bonds and improve collaboration',
    activities: [
      {
        title: 'Problem Solving Games',
        description: 'Engage in challenging puzzles and scenarios that require teamwork',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000'
      },
      {
        title: 'Group Challenges',
        description: 'Participate in exciting team challenges and competitions',
        image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2000'
      },
      {
        title: 'Communication Workshops',
        description: 'Improve team communication through interactive sessions',
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000'
      }
    ]
  },
  {
    id: 'adventure',
    label: 'Adventure Sports',
    description: 'Thrilling outdoor activities that push boundaries and build confidence',
    activities: [
      {
        title: 'Rock Climbing',
        description: 'Scale new heights with professional guidance and safety equipment',
        image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=2000'
      },
      {
        title: 'Rafting',
        description: 'Navigate rapids as a team in this exciting water adventure',
        image: 'https://images.unsplash.com/photo-1530866495561-e3aa5c8186c5?q=80&w=2000'
      },
      {
        title: 'Trekking',
        description: 'Explore scenic trails and build endurance together',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2000'
      }
    ]
  },
  {
    id: 'cultural',
    label: 'Cultural Activities',
    description: 'Immersive experiences that celebrate local traditions and arts',
    activities: [
      {
        title: 'Cooking Classes',
        description: 'Learn to prepare local delicacies as a team',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2000'
      },
      {
        title: 'Art Workshops',
        description: 'Express creativity through various art forms',
        image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2000'
      },
      {
        title: 'Local Experiences',
        description: 'Engage with local communities and traditions',
        image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2000'
      }
    ]
  }
];

const Activities = () => {
  const [activeTab, setActiveTab] = useState('team-building');
  const { destinations } = useDestinations();

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

      {/* Activities Categories Section */}
      <section id="activities" className="py-20 bg-white">
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
            {activityCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-6 py-3 rounded-full text-base font-medium transition-all ${
                  activeTab === category.id
                    ? 'bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white'
                    : 'bg-gray-100 text-[#636363] hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activityCategories
              .find((cat) => cat.id === activeTab)
              ?.activities.map((activity, index) => (
                <motion.div
                  key={activity.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
                    <p className="text-[#636363]">{activity.description}</p>
                  </div>
                </motion.div>
              ))}
          </div>
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
                to={`/destinations/${destination.slug}`}
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
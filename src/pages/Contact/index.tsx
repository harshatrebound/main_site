import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PartnersSection from '../../components/PartnersSection';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/contact_submissions`,
        {
          method: 'POST',
          headers: {
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify(formData)
        }
      );

      if (response.ok) {
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: ''
        });
        alert('Thank you for your message. We will get back to you shortly.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your message. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <Helmet>
        <title>Contact Trebound | Premium Team Building & Corporate Events</title>
        <meta 
          name="description" 
          content="Partner with Trebound for exceptional team building experiences. Let's create transformative corporate events that elevate your team's potential."
        />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navbar />

        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2940&auto=format&fit=crop"
              alt="Team Building Excellence"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-base md:text-lg text-[#FF4C39] font-semibold mb-4">
                YOUR SEARCH FOR THE BEST ENDS HERE
              </h2>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-outfit leading-tight">
                From Fortune 500 giants to cutting-edge start-ups, we've got a decade of experience under our belts.
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto font-dm-sans">
                Just let us know what you're looking for, then kick back and relax.
              </p>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-8 h-12 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-white rounded-full"></div>
            </div>
          </motion.div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-base md:text-lg text-[#FF4C39] font-semibold mb-4">
                GET IN TOUCH
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 font-outfit">
                Begin Your{' '}
                <span className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">
                  Partnership Journey
                </span>
              </h3>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] mx-auto rounded-full mb-8"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Share your vision with us, and let's craft exceptional team experiences together
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.form
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onSubmit={handleSubmit}
                className="space-y-6 bg-white p-8 rounded-2xl shadow-xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF4C39]/20 focus:border-[#FF4C39] transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Work Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF4C39]/20 focus:border-[#FF4C39] transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF4C39]/20 focus:border-[#FF4C39] transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF4C39]/20 focus:border-[#FF4C39] transition-colors"
                      placeholder="Company Ltd."
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Tell us about your vision
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF4C39]/20 focus:border-[#FF4C39] transition-colors resize-none"
                    placeholder="Share your team building goals and requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white rounded-lg font-medium text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  Send Message
                  <FiArrowRight className="ml-2 w-5 h-5" />
                </button>
              </motion.form>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="bg-white p-8 rounded-2xl shadow-xl">
                  <h4 className="text-2xl font-bold mb-4 font-outfit">Our Office</h4>
                  <p className="text-gray-600 mb-6">
                    91 Springboard Business Hub Pvt Ltd,<br />
                    Plot No. 175, Industrial Area Phase 1,<br />
                    Chandigarh, 160002
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#FF4C39] hover:text-[#FFB573] transition-colors"
                  >
                    View on Map
                    <FiArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-xl">
                  <h4 className="text-2xl font-bold mb-4 font-outfit">Contact Info</h4>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      <span className="font-semibold block">Email:</span>
                      <a href="mailto:partnerships@trebound.com" className="text-[#FF4C39] hover:text-[#FFB573] transition-colors">
                        partnerships@trebound.com
                      </a>
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold block">Phone:</span>
                      <a href="tel:+919876543210" className="text-[#FF4C39] hover:text-[#FFB573] transition-colors">
                        +91 98765 43210
                      </a>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <PartnersSection />

        <Footer />
      </div>
    </>
  );
};

export default ContactPage; 
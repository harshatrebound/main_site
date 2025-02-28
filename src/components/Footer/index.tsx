import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { useNewsletterSubscription } from '../../lib/hooks/useSupabaseData';

const navigation = {
  top: [
    { name: 'Home', href: '/' },
    { name: 'Team Building', href: '/team-building' },
    { name: 'Team Getaways', href: '/team-getaways' },
    { name: 'Stays', href: '/stays' },
    { name: 'Vendors', href: '/vendors' }
  ],
  bottom: [
    { name: 'About', href: '/about' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' }
  ],
  social: [
    { name: 'Whatsapp', href: '#' },
    { name: 'Instagram', href: '#' }
  ]
};

const NavLink = ({ href, children }: { href: string; children: string }) => (
  <a 
    href={href}
    className="text-[#636363] hover:text-[#ff513c] transition-colors duration-300 font-['DM Sans'] text-sm"
  >
    {children}
  </a>
);

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [email, setEmail] = useState('');
  const { subscribe, loading, error, success } = useNewsletterSubscription();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await subscribe(email);
      if (!error) {
        setEmail(''); // Clear input on success
      }
    }
  };

  return (
    <footer 
      ref={ref}
      className="relative px-4 md:px-8 lg:px-12 py-12 bg-white"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side - Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <h1 className="text-4xl md:text-[40px] font-bold leading-[1.2] bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent font-['Outfit']">
              Transform Your<br />
              Team Into<br />
              Champions
            </h1>
          </motion.div>

          {/* Right Side - All Other Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full flex flex-col items-end space-y-4"
          >
            {/* Logo and Description */}
            <div className="space-y-2 text-right">
              <motion.a
                href="/"
                className="block w-[120px] ml-auto"
              >
                <img 
                  src="https://cdn.prod.website-files.com/61ead40fcee1ea7e99aa2b1f/66f54b982ce090736e4e4d1c_Tewbound%20Hover.png"
                  loading="lazy"
                  alt="Trebound"
                  className="w-full h-auto"
                />
              </motion.a>
              <p className="text-sm text-[#636363] font-['DM Sans'] leading-relaxed">
                Team-building to Inspire Creativity, Innovation, and Collaboration with team Trebound.
              </p>
            </div>

            {/* Newsletter Subscription */}
            <form onSubmit={handleSubmit} className="relative w-full max-w-sm mt-1">
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full pr-20 py-2.5 px-4 bg-[#f1f1f1] rounded-[8px] border-none outline-none font-['DM Sans'] text-sm disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-0 top-0 h-full px-4 text-[#FF4C39] hover:text-[#ff6b57] transition-colors duration-300 font-['DM Sans'] text-sm font-medium disabled:opacity-50"
              >
                {loading ? 'Signing up...' : 'Sign up'}
              </button>
              {error && (
                <p className="mt-1 text-xs text-red-500 font-['DM Sans']">{error}</p>
              )}
              {success && (
                <p className="mt-1 text-xs text-green-500 font-['DM Sans']">Successfully subscribed to newsletter!</p>
              )}
            </form>

            {/* Navigation Links */}
            <nav className="w-full space-y-2 mt-1">
              <div className="flex flex-wrap justify-end gap-x-6 gap-y-2">
                {navigation.top.map((item) => (
                  <NavLink key={item.name} href={item.href}>{item.name}</NavLink>
                ))}
              </div>
              <div className="flex flex-wrap justify-end gap-x-6 gap-y-2">
                {navigation.bottom.map((item) => (
                  <NavLink key={item.name} href={item.href}>{item.name}</NavLink>
                ))}
              </div>
            </nav>

            {/* Social Links */}
            <div className="flex gap-4 mt-1">
              {navigation.social.map((item) => (
                <NavLink key={item.name} href={item.href}>{item.name}</NavLink>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex justify-start"
        >
          <p className="text-sm text-[#636363] font-['DM Sans']">© All rights reserved. Trebound 2022</p>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 rounded-full w-12 h-12 bg-[#1a365d] hover:bg-[#2d4a7c] text-white transition-colors duration-300 flex items-center justify-center shadow-lg"
      >
        ↑
      </button>
    </footer>
  );
};

export default Footer;

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SimpleFooter = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#001a33] py-8"
    >
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col items-center">
          <Link to="/" className="inline-block mb-4">
            <img
              src="/logo-white.png"
              alt="Trebound Logo"
              className="h-10 w-auto"
            />
          </Link>
          <p className="text-white/60 text-sm text-center">
            © {new Date().getFullYear()} Trebound. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default SimpleFooter; 
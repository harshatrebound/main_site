const TeamOutingsFooter = () => {
  return (
    <footer className="bg-[#003366] text-white py-16">
      <div className="max-w-[1448px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Logo and Description */}
          <div>
            <div className="mb-6">
              <img
                src="https://cdn.prod.website-files.com/61ead40fcee1ea7e99aa2b1f/66f54b982ce090736e4e4d1c_Tewbound%20Hover.png"
                alt="Trebound"
                className="h-8 w-auto mb-4"
              />
            </div>
            <p className="text-white/80 text-sm leading-relaxed max-w-md">
              Creating unforgettable team experiences that foster collaboration, boost morale, and drive results. Your trusted partner in team building and corporate events.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-white/80">
                Email: info@trebound.com
              </li>
              <li className="text-white/80">
                Phone: +1 (555) 123-4567
              </li>
              <li className="text-white/80">
                Location: San Francisco, CA
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/60 text-sm">
          © {new Date().getFullYear()} Trebound. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default TeamOutingsFooter; 
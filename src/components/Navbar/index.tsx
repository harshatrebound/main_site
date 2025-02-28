import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  label: string;
  href: string;
  isActive: boolean;
}

const NavLink = ({ label, href, isActive }: NavLinkProps) => (
  <Link
    to={href}
    className={`text-base font-medium transition-colors ${
      isActive
        ? 'text-[#FF4C39]'
        : 'text-[#636363] hover:text-[#FF4C39]'
    }`}
  >
    {label}
  </Link>
);

const navItems = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Destinations',
    href: '/corporate-team-outing-places',
  },
  {
    label: 'Regions',
    href: '/team-outing-regions',
  },
  {
    label: 'Stays',
    href: '/stays',
  },
  {
    label: 'Team Outings',
    href: '/team-outings',
  },
  {
    label: 'Activities',
    href: '/activities',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 w-[95%] max-w-[1400px] h-16 bg-neutral-50/95 backdrop-blur-sm rounded-2xl shadow-nav z-50">
      <div className="flex items-center justify-between h-full px-8">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="https://cdn.prod.website-files.com/61ead40fcee1ea7e99aa2b1f/66f54b982ce090736e4e4d1c_Tewbound%20Hover.png"
              alt="Trebound"
              className="w-[120px] h-auto"
            />
          </Link>
        </div>
        
        <div className="flex items-center gap-10">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              label={item.label}
              href={item.href}
              isActive={location.pathname === item.href}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

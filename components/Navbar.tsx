import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Calorie Calculator', path: '/calorie-calculator' },
    { name: 'Supplements', path: '/supplements' },
    { name: 'Height Weight Chart', path: '/height-weight-chart' },
    { name: 'Hall of Fame', path: '/hall-of-fame' },
    { name: 'About Us', path: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-dark-950/90 backdrop-blur-xl border-b border-white/5 shadow-2xl">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-neon-400 rounded-sm flex items-center justify-center text-black font-display font-bold text-3xl transform skew-x-[-10deg] group-hover:skew-x-0 transition-transform duration-300 shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                MV
              </div>
              <div className="flex flex-col">
                 <span className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight leading-none uppercase drop-shadow-md">
                  Muscle<span className="text-neon-400">Verse</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu - Visible on Large Screens */}
          <div className="hidden lg:flex flex-grow items-center justify-center">
            <div className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3 py-2 font-sans text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                    isActive(link.path)
                      ? 'text-neon-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-neon-400 rounded-full shadow-[0_0_5px_#22d3ee]"></span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button */}
           <div className="hidden lg:block ml-4">
              <Link
                  to="/ai-coach"
                  className="bg-neon-400 text-black font-display uppercase font-bold text-xl px-6 py-2 rounded-sm hover:bg-white transition-all hover:scale-105 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                >
                  AI Coach
                </Link>
           </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-neon-400 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
            >
              <svg className="h-8 w-8" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden bg-black/95 border-t border-white/10 absolute top-20 md:top-24 left-0 w-full z-40 h-screen overflow-y-auto">
          <div className="px-4 pt-8 pb-3 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 text-xl font-sans uppercase font-bold transition-all border-l-4 ${
                  isActive(link.path)
                    ? 'text-neon-400 border-neon-400 bg-white/5'
                    : 'text-gray-500 border-transparent hover:text-white hover:border-gray-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
                to="/ai-coach"
                onClick={() => setIsOpen(false)}
                className="block mt-8 text-center px-6 py-4 rounded-sm text-2xl font-display uppercase font-bold text-black bg-neon-400 hover:bg-white transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              >
                Open AI Coach
              </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
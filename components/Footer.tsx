import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
             <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="font-display text-3xl font-bold text-neon-400 tracking-tight">
                MuscleVerse
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              The ultimate universe for sculpting your physique. From AI-driven workouts to precision nutrition tracking.
            </p>
            <div className="flex space-x-4">
              {['Twitter', 'Instagram', 'Facebook'].map(social => (
                <a key={social} href="#" className="text-gray-500 hover:text-neon-400 transition-colors uppercase font-display tracking-wider text-sm">
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-display uppercase text-lg font-bold mb-4 tracking-wider">Menu</h3>
            <ul className="space-y-2">
              {['Calorie Calculator', 'Supplements', 'Height Weight Chart', 'Hall of Fame', 'About Us'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(/ /g, '-')}`} className="text-gray-400 hover:text-neon-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-display uppercase text-lg font-bold mb-4 tracking-wider">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>123 Muscle Blvd</li>
              <li>Gains City, GC 55555</li>
              <li className="text-neon-400 font-bold">support@muscleverse.com</li>
              <li>+1 (800) GO-LIFT</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} MuscleVerse. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm mt-2 md:mt-0">
            Made By <span className="text-neon-400">Kavya</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
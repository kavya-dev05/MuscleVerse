import React from 'react';
import { ClassItem } from '../types';
import Button from '../components/Button';

const classes: ClassItem[] = [
  { id: 1, title: "Iron HIIT", time: "06:00 AM", instructor: "Sarah J.", intensity: 'High', image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1470&auto=format&fit=crop" },
  { id: 2, title: "Power Hour", time: "08:00 AM", instructor: "Alex M.", intensity: 'Extreme', image: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1469&auto=format&fit=crop" },
  { id: 3, title: "Yoga Flow", time: "10:00 AM", instructor: "Elena R.", intensity: 'Low', image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1469&auto=format&fit=crop" },
  { id: 4, title: "Cross-Train", time: "05:00 PM", instructor: "Marcus T.", intensity: 'High', image: "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=1470&auto=format&fit=crop" },
  { id: 5, title: "Box & Burn", time: "07:00 PM", instructor: "Sarah J.", intensity: 'High', image: "https://images.unsplash.com/photo-1549719386-74dfc44173b5?q=80&w=1470&auto=format&fit=crop" },
];

const Classes: React.FC = () => {
  return (
    <div className="relative pt-20 w-full min-h-screen bg-dark-950">
      {/* Background Image */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1534258936925-c489473d86e6?q=80&w=1470&auto=format&fit=crop" 
          alt="Classes Background" 
          className="w-full h-full object-cover opacity-20 filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-950/90 to-dark-950"></div>
      </div>

      <div className="relative z-10">
        <div className="py-20 px-4 text-center">
          <h1 className="text-6xl md:text-9xl font-display font-bold text-white uppercase tracking-tighter mb-6">
            Class <span className="text-neon-400">Schedule</span>
          </h1>
        </div>

        <div className="max-w-6xl mx-auto px-4 pb-24">
          <div className="space-y-6">
            {classes.map((cls) => (
              <div key={cls.id} className="group relative bg-dark-900/40 backdrop-blur-md border border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-8 overflow-hidden hover:border-neon-400 transition-all duration-300 hover:bg-black/60">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-neon-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>

                {/* Time */}
                <div className="relative z-10 min-w-[120px] text-center sm:text-left border-r border-white/10 pr-6">
                  <span className="block text-neon-400 font-display text-4xl font-bold tracking-wide">{cls.time}</span>
                  <span className="text-gray-500 uppercase text-xs font-bold tracking-widest">Daily</span>
                </div>

                {/* Image */}
                <div className="relative z-10 w-full sm:w-56 h-36 overflow-hidden rounded-sm border border-white/10">
                  <img src={cls.image} alt={cls.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>

                {/* Info */}
                <div className="relative z-10 flex-grow text-center sm:text-left">
                  <h3 className="text-4xl font-display font-bold text-white uppercase mb-2 group-hover:text-neon-400 transition-colors">{cls.title}</h3>
                  <p className="text-gray-400 mb-4 text-lg">with <span className="text-white font-semibold">{cls.instructor}</span></p>
                  <span className={`inline-block px-4 py-1 text-sm font-bold uppercase tracking-widest rounded-none border 
                    ${cls.intensity === 'Extreme' ? 'border-red-500 text-red-500' : 
                      cls.intensity === 'High' ? 'border-orange-500 text-orange-500' : 
                      'border-neon-500 text-neon-500'}`}>
                    {cls.intensity}
                  </span>
                </div>

                {/* Button */}
                <div className="relative z-10">
                  <Button variant="outline" size="sm" className="w-full sm:w-auto hover:bg-neon-400 hover:text-black border-neon-400 text-neon-400">Book Seat</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classes;
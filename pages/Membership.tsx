import React from 'react';
import { PricingTier } from '../types';
import Button from '../components/Button';

const tiers: PricingTier[] = [
  {
    name: "Day Pass",
    price: "$20",
    period: "per visit",
    features: ["Full Gym Access", "Locker Room Access", "No Commitment"],
    recommended: false
  },
  {
    name: "Iron Member",
    price: "$59",
    period: "per month",
    features: ["24/7 Gym Access", "1 Free Personal Training Session", "All Group Classes included", "Sauna Access"],
    recommended: true
  },
  {
    name: "Elite",
    price: "$99",
    period: "per month",
    features: ["Everything in Iron Member", "Unlimited Guest Privileges", "Custom Nutrition Plan", "Access to AI Coach Pro", "Priority Support"],
    recommended: false
  }
];

const Membership: React.FC = () => {
  return (
    <div className="relative pt-20 w-full min-h-screen bg-dark-950 flex flex-col items-center">
      {/* Background Image */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1470&auto=format&fit=crop" 
          alt="Membership Background" 
          className="w-full h-full object-cover opacity-15 filter contrast-125 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-950/80 to-dark-950"></div>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
         <div className="py-20 px-4 text-center max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-display font-bold text-white uppercase mb-6 drop-shadow-lg">
            Invest In <span className="text-neon-400">Yourself</span>
          </h1>
          <p className="text-gray-400 text-xl font-light">
            Simple pricing. No hidden fees. Cancel anytime.
          </p>
        </div>

        <div className="w-full max-w-7xl px-4 pb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <div 
              key={tier.name} 
              className={`relative p-10 flex flex-col border rounded-sm backdrop-blur-md ${tier.recommended ? 'border-neon-400 bg-white/5' : 'border-white/10 bg-black/40'} hover:transform hover:-translate-y-2 transition-all duration-300 group`}
            >
              {tier.recommended && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-neon-400 text-black px-6 py-2 font-display font-bold uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(34,211,238,0.6)]">
                  Most Popular
                </div>
              )}

              <h3 className="text-4xl font-display font-bold text-white uppercase mb-2">{tier.name}</h3>
              <div className="flex items-baseline mb-8 border-b border-white/10 pb-8">
                <span className="text-6xl font-bold text-white font-display tracking-tighter">{tier.price}</span>
                <span className="ml-2 text-gray-500 uppercase text-xs font-bold tracking-widest">{tier.period}</span>
              </div>

              <ul className="flex-grow space-y-6 mb-10">
                {tier.features.map((feat, i) => (
                  <li key={i} className="flex items-start text-gray-300">
                    <div className="mt-1 mr-3 p-0.5 rounded-full border border-neon-400 text-neon-400">
                       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-lg font-light">{feat}</span>
                  </li>
                ))}
              </ul>

              <Button variant={tier.recommended ? 'primary' : 'outline'} className="w-full text-lg py-4">
                Choose {tier.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Membership;
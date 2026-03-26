import React, { useState } from 'react';
import Button from '../components/Button';

const HeightWeightChart: React.FC = () => {
  const [height, setHeight] = useState<number>(175);
  const [weight, setWeight] = useState<number>(75);

  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
  const bmiNum = parseFloat(bmi);

  let status = '';
  let color = '';

  if (bmiNum < 18.5) { status = 'Underweight'; color = 'text-blue-400'; }
  else if (bmiNum < 25) { status = 'Normal'; color = 'text-neon-400'; }
  else if (bmiNum < 30) { status = 'Overweight'; color = 'text-orange-400'; }
  else { status = 'Obese'; color = 'text-red-500'; }

  return (
    <div className="relative pt-28 min-h-screen bg-dark-950">
       {/* Background Image */}
       <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1470&auto=format&fit=crop" 
          alt="Measurement Background" 
          className="w-full h-full object-cover opacity-15 filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-950/80 to-dark-950"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4">
         <div className="text-center mb-16">
          {/* Adjusted font size */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white uppercase mb-4 whitespace-nowrap">
            Body Mass <span className="text-neon-400">Index</span>
          </h1>
          <p className="text-gray-400 text-xl font-light">Visualize your health metrics instantly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-black/60 backdrop-blur-xl p-10 rounded-sm border border-white/10 shadow-2xl">
           
           {/* Controls */}
           <div className="space-y-10 flex flex-col justify-center">
             <div>
               <label className="block text-white text-2xl font-display uppercase mb-4 flex justify-between">
                 <span>Height</span>
                 <span className="text-neon-400 font-mono">{height} cm</span>
               </label>
               <input 
                type="range" 
                min="140" 
                max="220" 
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value))}
                className="w-full h-2 bg-dark-800 rounded-lg appearance-none cursor-pointer accent-neon-400"
               />
             </div>

             <div>
               <label className="block text-white text-2xl font-display uppercase mb-4 flex justify-between">
                 <span>Weight</span>
                 <span className="text-neon-400 font-mono">{weight} kg</span>
               </label>
               <input 
                type="range" 
                min="40" 
                max="150" 
                value={weight}
                onChange={(e) => setWeight(parseInt(e.target.value))}
                className="w-full h-2 bg-dark-800 rounded-lg appearance-none cursor-pointer accent-neon-400"
               />
             </div>

             <div className="pt-6">
               <div className="bg-white/5 p-8 rounded-sm border border-white/5 text-center shadow-inner">
                 <p className="text-gray-400 uppercase text-xs tracking-[0.2em] mb-2 font-bold">Calculated BMI</p>
                 <p className="text-8xl font-display font-bold text-white mb-2 leading-none">{bmi}</p>
                 <p className={`text-3xl font-bold uppercase font-display tracking-wide ${color}`}>{status}</p>
               </div>
             </div>
           </div>

           {/* Chart Visualization */}
           <div className="relative flex items-center justify-center bg-dark-900/50 rounded-sm p-6 border border-white/5 aspect-square">
              <div className="w-full h-full relative">
                {/* Y Axis Label */}
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-gray-500 uppercase tracking-widest font-bold">Weight (kg)</div>
                {/* X Axis Label */}
                <div className="absolute bottom-[-1.5rem] left-1/2 -translate-x-1/2 text-xs text-gray-500 uppercase tracking-widest font-bold">Height (cm)</div>

                {/* Grid */}
                <div className="w-full h-full border-l border-b border-gray-700 relative overflow-hidden bg-black/40">
                   {/* BMI Zones Gradient */}
                   <div className="absolute inset-0 opacity-40 bg-[linear-gradient(135deg,#3b82f6_0%,#3b82f6_20%,#22d3ee_20%,#22d3ee_50%,#f97316_50%,#f97316_70%,#ef4444_70%,#ef4444_100%)] blur-2xl"></div>
                   
                   {/* The Dot */}
                   <div 
                      className="absolute w-6 h-6 bg-white rounded-full shadow-[0_0_20px_white] transition-all duration-300 ease-out border-4 border-black z-10"
                      style={{
                        left: `${((height - 140) / (220 - 140)) * 100}%`,
                        bottom: `${((weight - 40) / (150 - 40)) * 100}%`,
                        transform: 'translate(-50%, 50%)'
                      }}
                   >
                     <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neon-400 text-black text-xs font-bold px-3 py-1 rounded uppercase tracking-wider opacity-100 whitespace-nowrap shadow-lg">
                       You
                     </div>
                   </div>
                </div>
              </div>
           </div>
        </div>
        
        {/* Legend */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm relative z-10">
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-sm text-blue-400 font-bold backdrop-blur-sm uppercase tracking-wide">
             &lt; 18.5<br/><span className="text-xs font-normal text-gray-400 tracking-widest">Underweight</span>
          </div>
          <div className="p-4 bg-neon-400/10 border border-neon-400/20 rounded-sm text-neon-400 font-bold backdrop-blur-sm uppercase tracking-wide">
             18.5 - 25<br/><span className="text-xs font-normal text-gray-400 tracking-widest">Normal</span>
          </div>
           <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-sm text-orange-400 font-bold backdrop-blur-sm uppercase tracking-wide">
             25 - 30<br/><span className="text-xs font-normal text-gray-400 tracking-widest">Overweight</span>
          </div>
           <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-sm text-red-400 font-bold backdrop-blur-sm uppercase tracking-wide">
             &gt; 30<br/><span className="text-xs font-normal text-gray-400 tracking-widest">Obese</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeightWeightChart;
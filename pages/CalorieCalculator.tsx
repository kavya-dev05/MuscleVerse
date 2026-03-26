import React, { useState } from 'react';
import Button from '../components/Button';

const CalorieCalculator: React.FC = () => {
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [activity, setActivity] = useState<number>(1.2);
  const [result, setResult] = useState<{bmr: number, tdee: number} | null>(null);

  const calculate = () => {
    if (!age || !weight || !height) return;
    
    // Harris-Benedict Equation
    let bmr = 0;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    const tdee = bmr * activity;
    setResult({ bmr: Math.round(bmr), tdee: Math.round(tdee) });
  };

  return (
    <div className="relative pt-28 min-h-screen bg-dark-950 flex flex-col items-center">
      {/* Background Image */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1512152272829-e3139601d179?q=80&w=1470&auto=format&fit=crop" 
          alt="Food Background" 
          className="w-full h-full object-cover opacity-15 filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-950/80 to-dark-950"></div>
      </div>

      <div className="relative z-10 max-w-5xl w-full px-4">
        <div className="text-center mb-12">
          {/* Adjusted font size to fit single line */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white uppercase mb-4">
            Calorie <span className="text-neon-400">Calculator</span>
          </h1>
          <p className="text-gray-400 text-xl font-light">Determine your exact caloric needs to shred fat or build lean muscle.</p>
        </div>

        <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-sm shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            
            <div>
              <label className="block text-neon-400 text-xl font-display uppercase tracking-wide mb-3">Gender</label>
              <div className="flex gap-4">
                <button 
                  onClick={() => setGender('male')}
                  className={`flex-1 py-4 rounded-sm font-display uppercase tracking-wider text-lg transition-colors border border-transparent ${gender === 'male' ? 'bg-neon-400 text-black' : 'bg-dark-900 text-gray-400 border-white/10 hover:border-white/30'}`}
                >
                  Male
                </button>
                <button 
                  onClick={() => setGender('female')}
                  className={`flex-1 py-4 rounded-sm font-display uppercase tracking-wider text-lg transition-colors border border-transparent ${gender === 'female' ? 'bg-neon-400 text-black' : 'bg-dark-900 text-gray-400 border-white/10 hover:border-white/30'}`}
                >
                  Female
                </button>
              </div>
            </div>

            <div>
              <label className="block text-neon-400 text-xl font-display uppercase tracking-wide mb-3">Activity Level</label>
              <select 
                value={activity} 
                onChange={(e) => setActivity(parseFloat(e.target.value))}
                className="w-full bg-dark-900 border border-white/10 text-white rounded-sm p-4 text-lg focus:outline-none focus:border-neon-400 font-sans"
              >
                <option value={1.2}>Sedentary (Office job)</option>
                <option value={1.375}>Light Exercise (1-2 days/week)</option>
                <option value={1.55}>Moderate Exercise (3-5 days/week)</option>
                <option value={1.725}>Heavy Exercise (6-7 days/week)</option>
                <option value={1.9}>Athlete (2x per day)</option>
              </select>
            </div>

            <div>
              <label className="block text-neon-400 text-xl font-display uppercase tracking-wide mb-3">Age (Years)</label>
              <input 
                type="number" 
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value))}
                className="w-full bg-dark-900 border border-white/10 text-white rounded-sm p-4 text-lg focus:outline-none focus:border-neon-400"
                placeholder="25"
              />
            </div>

            <div>
               <label className="block text-neon-400 text-xl font-display uppercase tracking-wide mb-3">Weight (kg)</label>
               <input 
                type="number" 
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value))}
                className="w-full bg-dark-900 border border-white/10 text-white rounded-sm p-4 text-lg focus:outline-none focus:border-neon-400"
                placeholder="75"
              />
            </div>
            
            <div className="md:col-span-2">
               <label className="block text-neon-400 text-xl font-display uppercase tracking-wide mb-3">Height (cm)</label>
               <input 
                type="number" 
                value={height}
                onChange={(e) => setHeight(parseFloat(e.target.value))}
                className="w-full bg-dark-900 border border-white/10 text-white rounded-sm p-4 text-lg focus:outline-none focus:border-neon-400"
                placeholder="175"
              />
            </div>
          </div>

          <Button onClick={calculate} className="w-full text-2xl py-4 shadow-[0_0_20px_rgba(34,211,238,0.3)]">Calculate Results</Button>

          {result && (
            <div className="mt-12 pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
              <div className="text-center bg-black/40 p-8 rounded-sm border border-neon-400/30 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <p className="text-gray-400 uppercase text-xs tracking-[0.2em] mb-2 font-bold">Basal Metabolic Rate</p>
                <p className="text-6xl font-display font-bold text-white">{result.bmr} <span className="text-xl text-neon-400">kcal</span></p>
              </div>
              <div className="text-center bg-black/40 p-8 rounded-sm border border-neon-400/30 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <p className="text-gray-400 uppercase text-xs tracking-[0.2em] mb-2 font-bold">Total Daily Energy</p>
                <p className="text-6xl font-display font-bold text-white">{result.tdee} <span className="text-xl text-neon-400">kcal</span></p>
              </div>
              <div className="md:col-span-2 text-center bg-white/5 p-6 rounded border border-white/5">
                <p className="text-gray-300 text-lg font-light">
                  <span className="text-neon-400 font-bold">Strategy:</span> To lose weight, aim for <span className="text-white font-bold">{result.tdee - 500} kcal</span>. To gain muscle, aim for <span className="text-white font-bold">{result.tdee + 300} kcal</span>.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalorieCalculator;

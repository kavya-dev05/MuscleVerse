import React, { useState } from 'react';
import { generateWorkoutPlan } from '../services/geminiService';
import { WorkoutPlan } from '../types';
import Button from '../components/Button';

const AIPlanner: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  
  // Form State
  const [goal, setGoal] = useState("Build Muscle");
  const [level, setLevel] = useState("Intermediate");
  const [days, setDays] = useState(4);
  const [equipment, setEquipment] = useState("Full Gym");

  const handleGenerate = async () => {
    setLoading(true);
    const result = await generateWorkoutPlan(goal, level, days, equipment);
    setPlan(result);
    setLoading(false);
    setStep(2);
  };

  return (
    <div className="relative pt-28 min-h-screen bg-dark-950 relative overflow-hidden">
       {/* Background Image */}
       <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1550345332-09e3ac987658?q=80&w=1470&auto=format&fit=crop" 
          alt="AI Coach Background" 
          className="w-full h-full object-cover opacity-20 filter hue-rotate-15 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-950/80 to-dark-950"></div>
        {/* Cyber grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 pb-20">
        
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-display font-bold text-white uppercase mb-4">
            AI <span className="text-neon-400">Coach</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-xl">
            Tell us your goals, and we'll engineer the perfect protocol.
          </p>
        </div>

        {step === 1 && (
          <div className="max-w-3xl mx-auto bg-black/60 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-20 h-20 border-4 border-neon-400 border-t-transparent rounded-full animate-spin mb-8 shadow-[0_0_20px_#22d3ee]"></div>
                <p className="text-neon-400 font-display text-3xl animate-pulse uppercase tracking-widest">Synthesizing Workout Data...</p>
              </div>
            ) : (
              <div className="space-y-10">
                {/* Goal */}
                <div>
                  <label className="block text-neon-400 font-display uppercase text-2xl mb-4">Primary Goal</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['Lose Weight', 'Build Muscle', 'Strength', 'Endurance'].map(g => (
                      <button 
                        key={g}
                        onClick={() => setGoal(g)}
                        className={`p-6 border rounded-sm text-left transition-all font-display uppercase text-xl tracking-wide ${goal === g ? 'border-neon-400 bg-neon-400/10 text-white shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 'border-white/10 text-gray-400 hover:border-white/30 hover:bg-white/5'}`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Level */}
                <div>
                  <label className="block text-neon-400 font-display uppercase text-2xl mb-4">Experience Level</label>
                  <div className="flex gap-4">
                    {['Beginner', 'Intermediate', 'Advanced'].map(l => (
                      <button 
                        key={l}
                        onClick={() => setLevel(l)}
                        className={`flex-1 p-4 border rounded-sm transition-all font-display uppercase text-lg tracking-wide ${level === l ? 'border-neon-400 bg-neon-400/10 text-white' : 'border-white/10 text-gray-400 hover:border-white/30 hover:bg-white/5'}`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Days */}
                <div>
                   <label className="block text-neon-400 font-display uppercase text-2xl mb-4 flex justify-between">
                     <span>Frequency</span>
                     <span className="text-white">{days} Days / Week</span>
                   </label>
                   <input 
                    type="range" 
                    min="1" 
                    max="7" 
                    value={days} 
                    onChange={(e) => setDays(parseInt(e.target.value))}
                    className="w-full h-2 bg-dark-800 rounded-lg appearance-none cursor-pointer accent-neon-400"
                   />
                   <div className="flex justify-between text-xs text-gray-500 mt-2 font-display uppercase tracking-widest">
                      <span>1 Day</span>
                      <span>7 Days</span>
                   </div>
                </div>

                 {/* Equipment */}
                <div>
                  <label className="block text-neon-400 font-display uppercase text-2xl mb-4">Equipment Access</label>
                   <select 
                    value={equipment}
                    onChange={(e) => setEquipment(e.target.value)}
                    className="w-full bg-dark-900 border border-white/20 text-white font-display uppercase text-xl p-4 rounded-sm focus:border-neon-400 focus:outline-none"
                   >
                     <option value="Full Gym">Full Commercial Gym</option>
                     <option value="Dumbbells Only">Dumbbells Only</option>
                     <option value="Bodyweight">Bodyweight Only</option>
                     <option value="Home Gym (Barbell + Rack)">Home Gym (Barbell + Rack)</option>
                   </select>
                </div>

                <Button onClick={handleGenerate} size="lg" className="w-full text-2xl py-5 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                  Generate Program
                </Button>
              </div>
            )}
          </div>
        )}

        {step === 2 && plan && (
          <div className="animate-fade-in">
            <div className="mb-8 flex justify-between items-center">
              <Button variant="outline" onClick={() => setStep(1)}>← Back to Settings</Button>
              <Button onClick={handleGenerate}>Regenerate</Button>
            </div>

            <div className="mb-12 text-center border-b border-white/10 pb-12">
              <h2 className="text-5xl font-display font-bold text-white uppercase mb-4 tracking-wide">{plan.title}</h2>
              <p className="text-gray-400 text-xl font-light italic max-w-3xl mx-auto">"{plan.overview}"</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {plan.schedule.map((day, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-sm p-8 hover:border-neon-400/50 transition-colors">
                  <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                    <h3 className="text-3xl font-display font-bold text-neon-400 uppercase">{day.dayName}</h3>
                    <span className="text-xs font-bold uppercase bg-neon-400/10 text-neon-400 border border-neon-400/20 px-3 py-1 rounded tracking-widest">{day.focus}</span>
                  </div>
                  
                  <div className="space-y-6">
                    {day.exercises.map((ex, i) => (
                      <div key={i} className="flex flex-col gap-2">
                        <div className="flex justify-between items-baseline">
                          <p className="text-white font-bold text-xl uppercase tracking-wide">{ex.name}</p>
                          <div className="flex gap-4 text-sm font-mono text-neon-400">
                             <span>{ex.sets} SETS</span>
                             <span>{ex.reps} REPS</span>
                          </div>
                        </div>
                        <p className="text-gray-500 text-sm border-l-2 border-white/10 pl-3 italic">{ex.notes}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && !plan && !loading && (
          <div className="text-center text-red-500">
            <p>Failed to generate plan. Please try again.</p>
            <Button onClick={() => setStep(1)} className="mt-4">Try Again</Button>
          </div>
        )}

      </div>
    </div>
  );
};

export default AIPlanner;
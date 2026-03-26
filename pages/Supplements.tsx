
import React, { useState } from 'react';
import { generateSupplementPlan } from '../services/geminiService';
import { SupplementPlan } from '../types';

const Supplements: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [diet, setDiet] = useState('');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<SupplementPlan | null>(null);

  const handleRecommend = async () => {
    if (goal === '' || goal === '-- Choose Goal --' || diet === '' || diet === '-- Choose Diet --') return;
    setLoading(true);
    const result = await generateSupplementPlan(goal, diet);
    setPlan(result);
    setLoading(false);
  };

  const resetRecommender = () => {
    setPlan(null);
    setGoal('');
    setDiet('');
  };

  return (
    <div className="relative pt-24 min-h-screen bg-black flex items-center justify-center p-4">
       {/* Background Image - Related to Supplements */}
       <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=1470&auto=format&fit=crop" 
          alt="Supplements Background" 
          className="w-full h-full object-cover opacity-60 filter contrast-110"
        />
        {/* Lighter gradient to allow image to show through clearly */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        {/* Subtle texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        
        {/* RECOMMENDER CONTAINER */}
        <div className="bg-dark-950/80 backdrop-blur-xl rounded-sm border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden relative">
          
          {/* Top Decor Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-400 to-transparent shadow-[0_0_20px_#22d3ee]"></div>

          <div className="p-8 md:p-16 flex flex-col items-center">
             
             {/* Header */}
             <div className="text-center mb-12 animate-fade-in">
                {/* Scaled down font to fit single line */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-wide uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,1)] whitespace-nowrap">
                  Supplement <span className="text-neon-400">Recommender</span>
                </h1>
                <p className="text-gray-200 font-sans text-lg tracking-widest mt-4 uppercase font-semibold drop-shadow-md">
                  Optimize your nutrition with AI precision
                </p>
             </div>

             {!plan && !loading && (
              <div className="w-full max-w-lg space-y-8 animate-fade-in">
                {/* GOAL SELECT */}
                <div className="group">
                  <label className="block text-neon-400 text-xl font-display uppercase mb-3 tracking-wider font-bold shadow-black drop-shadow-md">Select your fitness goal</label>
                  <div className="relative">
                    <select 
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      className="w-full bg-dark-900 text-white border border-white/20 font-sans text-xl font-bold py-4 px-6 rounded-sm focus:outline-none focus:border-neon-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all appearance-none cursor-pointer hover:border-white/40"
                    >
                      <option className="bg-dark-900 text-gray-400">-- Choose Goal --</option>
                      <option className="bg-dark-900" value="Build Muscle">Build Muscle</option>
                      <option className="bg-dark-900" value="Lose Fat">Lose Fat</option>
                      <option className="bg-dark-900" value="Strength">Increase Strength</option>
                      <option className="bg-dark-900" value="Endurance">Endurance</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neon-400">
                       <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                    </div>
                  </div>
                </div>

                {/* DIET SELECT */}
                <div className="group">
                  <label className="block text-neon-400 text-xl font-display uppercase mb-3 tracking-wider font-bold shadow-black drop-shadow-md">Diet Preference</label>
                  <div className="relative">
                    <select 
                      value={diet}
                      onChange={(e) => setDiet(e.target.value)}
                      className="w-full bg-dark-900 text-white border border-white/20 font-sans text-xl font-bold py-4 px-6 rounded-sm focus:outline-none focus:border-neon-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all appearance-none cursor-pointer hover:border-white/40"
                    >
                      <option className="bg-dark-900 text-gray-400">-- Choose Diet --</option>
                      <option className="bg-dark-900" value="Standard">Standard</option>
                      <option className="bg-dark-900" value="Vegan">Vegan</option>
                      <option className="bg-dark-900" value="Keto">Keto</option>
                      <option className="bg-dark-900" value="Paleo">Paleo</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neon-400">
                       <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                    </div>
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="pt-8">
                   <button 
                    onClick={handleRecommend}
                    className="w-full bg-neon-400 text-black font-display font-bold uppercase text-3xl py-5 rounded-sm hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(34,211,238,0.4)]"
                   >
                     Get Recommendation
                   </button>
                </div>
                
                {/* Back Button Placeholder if needed, or user uses nav */}
              </div>
             )}

             {/* LOADING STATE */}
             {loading && (
                <div className="py-20 text-center animate-fade-in">
                   <div className="relative w-24 h-24 mx-auto mb-8">
                      <div className="absolute inset-0 border-t-4 border-neon-400 rounded-full animate-spin"></div>
                      <div className="absolute inset-2 border-b-4 border-white rounded-full animate-spin-reverse"></div>
                   </div>
                   <p className="text-neon-400 font-display text-3xl animate-pulse tracking-widest uppercase">Analyzing Biometrics...</p>
                </div>
             )}

             {/* RESULTS DISPLAY */}
             {plan && (
                <div className="w-full animate-slide-up">
                   <div className="bg-black/60 border border-white/10 p-8 md:p-10 mb-8 backdrop-blur-md rounded-sm">
                      <div className="flex flex-col items-center mb-10 border-b border-white/10 pb-8">
                          <h2 className="text-3xl md:text-5xl text-white font-display font-bold uppercase text-center tracking-wide">{plan.title}</h2>
                          <p className="text-gray-300 text-center mt-4 font-sans text-lg max-w-2xl leading-relaxed">{plan.advice}</p>
                      </div>

                      <div className="grid gap-6">
                         {plan.recommendations.map((rec, i) => (
                            <div key={i} className="flex flex-col md:flex-row items-start gap-6 bg-dark-900/80 p-6 border-l-4 border-neon-400 hover:bg-dark-800 transition-colors group rounded-r-sm">
                               <div className="text-3xl bg-black p-4 rounded text-neon-400 group-hover:scale-110 transition-transform shadow-inner">⚡</div>
                               <div className="flex-1">
                                  <div className="flex flex-wrap items-center gap-4 mb-2">
                                     <h3 className="text-white font-display font-bold uppercase text-2xl tracking-wide">{rec.product}</h3>
                                     <span className="text-xs font-bold bg-neon-400 text-black px-3 py-1 uppercase tracking-wider rounded-sm shadow-[0_0_10px_rgba(34,211,238,0.4)]">{rec.dosage}</span>
                                  </div>
                                  <p className="text-gray-400 text-base font-sans leading-relaxed border-t border-white/5 pt-3">{rec.reason}</p>
                                </div>
                            </div>
                         ))}
                      </div>
                   </div>
                   
                   <div className="flex justify-center gap-4">
                      <button 
                        onClick={resetRecommender}
                        className="bg-orange-500 text-white font-display uppercase font-bold text-xl px-8 py-3 rounded-full hover:bg-orange-600 transition-all flex items-center gap-2 shadow-lg hover:shadow-orange-500/20"
                      >
                        <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        Go Back
                      </button>
                   </div>
                </div>
             )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Supplements;

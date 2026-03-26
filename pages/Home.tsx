import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const Home: React.FC = () => {
  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { question: "What is Muscle Verse?", answer: "Muscle Verse is a comprehensive fitness ecosystem combining AI-powered coaching, scientifically backed nutrition tools, and a community of elite athletes." },
    { question: "Do I need gym experience?", answer: "Not at all. Our AI Planner creates routines tailored to your specific experience level, whether you are a complete beginner or a pro bodybuilder." },
    { question: "Is it free to join?", answer: "We offer a free tier with access to basic calculators and community features. Our Premium AI coaching plans offer more in-depth analysis." },
    { question: "Do you offer diet plans?", answer: "Yes, our AI Coach and Calorie Calculator work together to suggest macronutrient splits and supplement advice to match your dietary preferences." }
  ];

  return (
    <div className="w-full bg-dark-950">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-start overflow-hidden px-4 sm:px-8 lg:px-16">
        <div className="absolute inset-0 z-0">
          {/* Dark Aesthetic Gym Background */}
          <img 
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop" 
            alt="Gym Background" 
            className="w-full h-full object-cover filter brightness-[0.4] contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mt-20">
          <div className="inline-block bg-neon-400 text-black font-display font-bold px-4 py-1 text-sm rounded-sm mb-6 animate-fade-in uppercase tracking-widest shadow-[0_0_15px_rgba(34,211,238,0.4)]">
            MV // EST. 2025
          </div>
          <h1 className="text-7xl md:text-[9rem] font-display font-bold text-white uppercase leading-[0.85] mb-6 animate-slide-up drop-shadow-2xl tracking-tight">
            Muscle <br /> <span className="text-neon-400 font-neon-fill">Verse</span>
          </h1>
          <p className="text-gray-300 font-sans text-lg md:text-2xl mb-10 font-light max-w-xl border-l-4 border-neon-400 pl-6 animate-slide-up leading-relaxed">
            <strong className="text-white">Train Hard. Recover Smart. Stay Consistent.</strong> <br/>
            Your all-in-one fitness hub designed to inspire, guide, and transform your journey.
          </p>
          <div className="flex gap-4 animate-slide-up">
             <Link to="/ai-coach">
              <Button size="lg" className="shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.6)]">Start Training</Button>
             </Link>
          </div>
        </div>
      </section>

      {/* 2. THE PROTOCOL (Cards) - Minimalist & Creative Text */}
      <section className="py-32 relative bg-black overflow-hidden">
         {/* Subtle background decoration */}
         <div className="absolute top-20 right-0 w-96 h-96 bg-neon-400/5 rounded-full blur-[100px] pointer-events-none"></div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/10 pb-8">
               <div className="relative">
                  {/* Watermark effect */}
                  <span className="absolute -top-8 -left-6 text-white/5 font-display text-9xl font-bold select-none z-0">MV</span>
                  <h2 className="text-5xl md:text-8xl font-display font-bold text-white uppercase tracking-tighter leading-none relative z-10">
                     The <span className="text-neon-400">Protocol</span>
                  </h2>
               </div>
               <p className="text-gray-400 font-sans text-sm tracking-[0.3em] uppercase mt-6 md:mt-0 border-l-2 border-neon-400 pl-6 h-full flex items-center">
                  Define. Refine. Reconstruct.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {/* Card 1 */}
               <div className="group relative p-6 pl-0 border-t border-white/10 hover:border-neon-400 transition-all duration-500">
                  <div className="flex justify-between items-start mb-6">
                     <h3 className="text-white text-4xl font-display font-bold uppercase tracking-wide group-hover:text-neon-400 transition-colors">Dominate</h3>
                     <span className="text-white/20 font-display text-4xl font-bold group-hover:text-neon-400 transition-colors">01</span>
                  </div>
                  <p className="text-gray-400 font-sans font-light text-lg leading-relaxed">
                     Gravity is a constant. Your strength is a variable. Force adaptation through progressive overload.
                  </p>
               </div>
               
               {/* Card 2 */}
               <div className="group relative p-6 pl-0 border-t border-white/10 hover:border-neon-400 transition-all duration-500">
                  <div className="flex justify-between items-start mb-6">
                     <h3 className="text-white text-4xl font-display font-bold uppercase tracking-wide group-hover:text-neon-400 transition-colors">Fuel</h3>
                     <span className="text-white/20 font-display text-4xl font-bold group-hover:text-neon-400 transition-colors">02</span>
                  </div>
                  <p className="text-gray-400 font-sans font-light text-lg leading-relaxed">
                     Food is data for your cells. Calibrate your intake to turn every calorie into kinetic energy.
                  </p>
               </div>

               {/* Card 3 */}
               <div className="group relative p-6 pl-0 border-t border-white/10 hover:border-neon-400 transition-all duration-500">
                  <div className="flex justify-between items-start mb-6">
                     <h3 className="text-white text-4xl font-display font-bold uppercase tracking-wide group-hover:text-neon-400 transition-colors">Evolve</h3>
                     <span className="text-white/20 font-display text-4xl font-bold group-hover:text-neon-400 transition-colors">03</span>
                  </div>
                  <p className="text-gray-400 font-sans font-light text-lg leading-relaxed">
                     Growth happens in the silence. Optimize sleep and recovery to wake up a better version.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* 3. FAQS */}
      <section className="py-24 bg-dark-950 relative border-t border-white/5">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-5xl font-display font-bold text-white uppercase mb-12 text-center">Frequently Asked <span className="text-neon-400">Questions</span></h2>
            <div className="space-y-6">
               {faqs.map((faq, index) => (
                  <div key={index} className="bg-dark-900 border border-white/5 rounded-sm p-6 hover:border-neon-400/30 transition-colors">
                     <button 
                        onClick={() => toggleFaq(index)}
                        className="w-full flex justify-between items-center text-left focus:outline-none group"
                     >
                        <span className="text-white font-display uppercase font-bold text-2xl group-hover:text-neon-400 transition-colors tracking-wide">{faq.question}</span>
                        <span className={`text-neon-400 text-2xl font-bold transition-transform duration-300 ${openFaq === index ? 'rotate-45' : ''}`}>
                           +
                        </span>
                     </button>
                     <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                        <p className="text-gray-400 text-lg font-sans">{faq.answer}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 4. CONTACT FORM */}
      <section className="py-24 bg-black relative">
         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-dark-900/50 backdrop-blur-sm p-8 md:p-12 rounded-sm border border-white/5 shadow-2xl relative overflow-hidden">
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h2 className="text-5xl font-display font-bold text-white uppercase mb-6">Get In Touch</h2>
                    <p className="text-gray-400 mb-8 text-lg font-sans">Have questions about our programs or want to collaborate? Contact us using the emails below or send us a message.</p>

                    <div className="space-y-4">
                        <div className="bg-black p-4 border border-white/5 hover:border-neon-400/30 transition-colors">
                            <p className="text-neon-400 text-xs uppercase font-bold tracking-widest mb-1 font-display">General Inquiries</p>
                            <a href="mailto:muscleverse.info@example.com" className="text-white hover:text-neon-400 transition-colors text-lg font-sans">muscleverse.info@example.com</a>
                        </div>
                        <div className="bg-black p-4 border border-white/5 hover:border-neon-400/30 transition-colors">
                            <p className="text-neon-400 text-xs uppercase font-bold tracking-widest mb-1 font-display">Support</p>
                            <a href="mailto:kautilyashukla05@gmail.com" className="text-white hover:text-neon-400 transition-colors text-lg font-sans">Muscleverse05@gmail.com</a>
                        </div>
                    </div>
                  </div>

                  <div>
                     <h3 className="text-2xl font-display font-bold text-white uppercase mb-6">Send us a message</h3>
                     <form className="space-y-6">
                        <div>
                           <label className="block text-gray-500 font-bold mb-2 text-xs uppercase tracking-wider font-sans">Your Name</label>
                           <input type="text" className="w-full bg-black border border-white/10 p-4 text-white focus:border-neon-400 focus:outline-none transition-all placeholder-gray-700 font-sans" placeholder="ENTER YOUR NAME" />
                        </div>
                        <div>
                           <label className="block text-gray-500 font-bold mb-2 text-xs uppercase tracking-wider font-sans">Your Email</label>
                           <input type="email" className="w-full bg-black border border-white/10 p-4 text-white focus:border-neon-400 focus:outline-none transition-all placeholder-gray-700 font-sans" placeholder="ENTER YOUR EMAIL" />
                        </div>
                        <div>
                           <label className="block text-gray-500 font-bold mb-2 text-xs uppercase tracking-wider font-sans">Message</label>
                           <textarea rows={4} className="w-full bg-black border border-white/10 p-4 text-white focus:border-neon-400 focus:outline-none transition-all placeholder-gray-700 font-sans" placeholder="HOW CAN WE HELP?"></textarea>
                        </div>
                        <Button className="w-full rounded-sm" size="lg">Send Message</Button>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
};

export default Home;
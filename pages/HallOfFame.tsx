import React from 'react';

const legends = [
  { 
    name: "Ronnie Coleman", 
    nickname: "The King",
    titles: "8x Mr. Olympia",
    // Massive physique placeholder
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1000&auto=format&fit=crop", 
    quote: "Light weight, baby!",
    desc: "Widely regarded as the strongest bodybuilder in history. Coleman redefined the limits of human muscle mass, squatting 800lbs and dominating the stage for nearly a decade."
  },
  { 
    name: "Arnold Schwarzenegger", 
    nickname: "The Austrian Oak",
    titles: "7x Mr. Olympia",
    // Classic physique placeholder (Updated to Colored Image)
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1000&auto=format&fit=crop", 
    quote: "I'll be back.",
    desc: "The most iconic figure in bodybuilding. Arnold brought the sport to the mainstream with his charisma and sculpted physique, setting the gold standard for the Golden Era."
  },
  { 
    name: "Chris Bumstead", 
    nickname: "CBum",
    titles: "5x Classic Physique",
    // Aesthetic physique placeholder
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop", 
    quote: "Standard set.",
    desc: "The modern king of aesthetics. CBum revived the classic look, prioritizing symmetry, vacuum poses, and proportion over sheer size, inspiring a new generation."
  },
  { 
    name: "Jay Cutler", 
    nickname: "The Comeback Kid",
    titles: "4x Mr. Olympia",
    // Intensity placeholder
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop", 
    quote: "Quad Stomp.",
    desc: "Known for his legendary rivalry with Ronnie. Jay's massive width, business acumen, and the famous 'Quad Stomp' pose cemented him as a Titan of the sport."
  }
];

const HallOfFame: React.FC = () => {
  return (
    <div className="relative pt-20 min-h-screen bg-dark-950">
       {/* Background Image */}
       <div className="fixed inset-0 z-0 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop" 
            alt="Hall of Fame Background" 
            className="w-full h-full object-cover opacity-40 filter grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-950/80 to-dark-950"></div>
       </div>

      <div className="relative z-10 w-full pb-24">
        
        {/* Header */}
        <div className="py-24 text-center px-4">
          <h1 className="text-6xl md:text-9xl font-display font-bold text-white uppercase tracking-tighter mb-4 drop-shadow-[0_0_25px_rgba(34,211,238,0.2)]">
            Hall Of <span className="text-neon-400">Fame</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto font-light tracking-widest uppercase border-l-4 border-neon-400 pl-4">
            Celebrating the Titans of Iron
          </p>
        </div>

        {/* The Pantheon Layout (Zig-Zag) */}
        <div className="max-w-7xl mx-auto px-4 space-y-32">
           {legends.map((legend, idx) => (
              <div key={idx} className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''} group`}>
                 
                 {/* Image Frame */}
                 <div className="w-full md:w-1/2 relative">
                    <div className="absolute inset-0 bg-neon-400 transform translate-x-4 translate-y-4 rounded-sm opacity-20 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
                    <div className="relative h-[500px] w-full overflow-hidden rounded-sm border border-white/10 shadow-2xl group-hover:border-neon-400 transition-colors duration-500">
                       <img 
                          src={legend.image} 
                          alt={legend.name} 
                          className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                    </div>
                    {/* Floating Title Badge */}
                    <div className={`absolute -bottom-6 ${idx % 2 === 1 ? 'right-8' : 'left-8'} bg-black border border-neon-400 px-6 py-3 shadow-[0_0_30px_rgba(34,211,238,0.2)] transform group-hover:-translate-y-2 transition-transform duration-300`}>
                       <span className="text-neon-400 font-display font-bold text-xl tracking-widest uppercase">{legend.titles}</span>
                    </div>
                 </div>

                 {/* Text Content */}
                 <div className={`w-full md:w-1/2 text-center ${idx % 2 === 1 ? 'md:text-right' : 'md:text-left'}`}>
                    <h3 className="text-neon-400 font-display uppercase tracking-[0.2em] text-lg mb-2">{legend.nickname}</h3>
                    <h2 className="text-6xl lg:text-8xl font-display font-bold text-white uppercase leading-[0.85] mb-8">
                       {legend.name}
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light border-l-2 border-white/10 pl-6 mx-auto md:mx-0">
                       {legend.desc}
                    </p>
                    <div className={`inline-block border border-white/20 px-8 py-4 rounded-sm bg-white/5 backdrop-blur-sm`}>
                       <p className="text-white font-display uppercase text-2xl italic tracking-wide">
                          "{legend.quote}"
                       </p>
                    </div>
                 </div>

              </div>
           ))}
        </div>

        <div className="text-center py-20 mt-12 border-t border-white/5 mx-auto max-w-4xl">
            <p className="text-gray-500 uppercase tracking-[0.5em] text-sm font-bold">Legends Never Die</p>
        </div>

      </div>
    </div>
  );
};

export default HallOfFame;
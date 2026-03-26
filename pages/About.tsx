import React from "react";

import kavyaImg from "./team/kavya.jpg";


const team = [
  {
    name: "Kavya Kesarwani",
    role: "Developer",
    bio: "Visionary architect behind the MuscleVerse platform, blending code with fitness logic.",
    image: kavyaImg,
  }
];

const techStack = [""];

const About: React.FC = () => {
  return (
    <div className="relative pt-20 w-full min-h-screen bg-black">

      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1469&auto=format&fit=crop"
          alt="Gym Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10">

        {/* Header Section */}
        <div className="py-16 px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tight">
            Who We <span className="text-neon-400">Are</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl mt-4">
            A passionate team building the future of intelligent fitness with technology and dedication.
          </p>
        </div>

        {/* Team Section - Full Width */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          {team.map((member, index) => (
            <div key={index} className="group">
              <h2 className="text-left text-4xl font-bold text-white uppercase mb-12 border-b-4 inline-block border-neon-400 pb-2">
                Meet the Developer
              </h2>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-black/40 p-8 md:p-12 rounded-lg border border-white/10 hover:border-neon-400 transition-all backdrop-blur-md">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 rounded-full object-cover border-4 border-neon-400 grayscale group-hover:grayscale-0 transition-all flex-shrink-0"
                />

                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-white text-4xl md:text-5xl font-bold">
                    {member.name}
                  </h3>
                  <p className="text-neon-400 text-sm uppercase tracking-widest mt-2">
                    {member.role}
                  </p>
                  <p className="text-gray-400 text-lg mt-6 leading-relaxed max-w-3xl">
                    {member.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="bg-black py-20">
          <h2 className="text-center text-4xl font-bold text-white mb-14 uppercase">
            Our Philosophy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
            {[
              {
                num: "01",
                title: "Scientific Approach",
                desc: "Every workout and nutrition recommendation is supported by research and structured logic.",
              },
              {
                num: "02",
                title: "Discipline Over Motivation",
                desc: "Motivation gets you started — discipline keeps you going.",
              },
              {
                num: "03",
                title: "Community & Growth",
                desc: "Fitness becomes powerful when shared. We build tools for everyone — beginners to athletes.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-white/10 p-8 rounded-lg hover:border-neon-400 transition bg-white/5"
              >
                <h3 className="text-neon-400 text-4xl font-bold">{item.num}</h3>
                <p className="text-white text-xl font-bold mt-2">{item.title}</p>
                <p className="text-gray-400 mt-3">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="py-20 text-center">
          <h2 className="text-4xl font-bold text-white mb-10">
            Built With Precision
          </h2>

          <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-lg opacity-80">
            {techStack.map((tech) => (
              <span key={tech} className="hover:text-white transition cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
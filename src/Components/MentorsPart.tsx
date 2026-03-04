import { useState, useEffect, useRef } from "react";

const teamMembers = [
    {
    name: "Vivek Halder",
    role: "Co-Founder & Developer",
    tags: ["Developer"],
    company: "Google · Amazon",
    color: "from-pink-500 to-rose-500",
    bio: "With his unbound experience in the field of working with tech giants, expect nothing short of achieving absolute mastery over the dominion of all things related to Web Development.",
    initials: "/Images/VivekHaldar.jpg",
  },
  {
    name: "Farshid Hossain",
    role: "Co-Founder & Technologist",
    tags: ["Techie"],
    company: "Deutsche Bank · Amazon",
    color: "from-pink-500 to-rose-500",
    bio: "Not much experienced but teaches with dedication and care :)",
    initials: "/Images/FarshidHossain.jpg",
  },
  {
    name: "Irfan Gazi",
    role: "DSA Grandmaster",
    tags: ["ICPC Regionals Finalist"],
    company: "Google · HSBC",
    color: "from-blue-500 to-purple-500",
    bio: "One of the best competitive coders in India. The brain behind a unique problem-set that gives students a genuine competitive edge in DSA.",
    initials: "/Images/IrfanGazi.png",
  },
  {
    name: "Dipan Mondal",
    role: "AI Futurist",
    tags: ["ML Expert"],
    company: "PwC",
    color: "from-teal-500 to-cyan-500",
    bio: "With his realistic approach in the field of AI, dive deeper into the future than you have ever before.",
    initials: "/Images/DipanMondal.jpg",
  },
  {
    name: "Satwik Biswas",
    role: "Fundamentalist",
    tags: ["GATE-keeper"],
    company: "Accenture",
    color: "from-teal-500 to-cyan-500",
    bio: "With his direct and to the point approach to the principles of all things related to CS Fundamentals, get ready to obtain a solid grasp on the domain..",
    initials: "/Images/SatwikBiswas.jpg",
  },
  {
    name: "Purnendu Kumar Mishra",
    role: "Fundamentalist",
    tags: ["GATE-keeper"],
    company: "PwC",
    color: "from-teal-500 to-cyan-500",
    bio: "With his direct and to the point approach to the principles of all things related to CS Fundamentals, get ready to obtain a solid grasp on the domain..",
    initials: "/Images/PurnenduKumarMishra.jpg",
  },
];

function LinkedInIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function ArrowBtn({ onClick, dir }) {
  return (
    <button
      onClick={onClick}
      className="w-11 h-11 rounded-full bg-white border-2 border-gray-200 hover:border-purple-400 text-gray-400 hover:text-purple-600 shadow hover:shadow-purple-100 flex items-center justify-center transition-all duration-200 hover:scale-110 flex-shrink-0"
    >
      {dir === "left"
        ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
      }
    </button>
  );
}

function Card({ member, full }) {
  return (
    <div
      className={`relative bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center transition-all duration-300
        ${full
          ? "hover:shadow-2xl hover:-translate-y-2 hover:border-gray-200 p-8 w-80"
          : "p-6 w-56 opacity-40 scale-90"
        }`}
    >
      {/* Avatar */}
      <div className="relative -mt-12 mb-5">
        <div className={`rounded-full bg-gradient-to-r ${member.color} text-white font-bold flex items-center justify-center shadow-lg border-4 border-white
          ${full ? "w-24 h-24 text-2xl" : "w-20 h-20 text-lg"}`}>
          <img src={member.initials} alt="" className="w-full h-full rounded-full object-cove"/>
        </div>
        {/* {full && (
          <a
            href="#"
            className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#0077b5] text-white flex items-center justify-center border-2 border-white hover:scale-110 transition-transform"
          >
            <LinkedInIcon />
          </a>
        )} */}
      </div>

      {/* Name */}
      <h3 className={`font-bold text-gray-800 mb-2 transition-colors ${full ? "text-xl group-hover:text-purple-600" : "text-sm"}`}>
        {member.name}
      </h3>

      {full ? (
        <>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 justify-center mb-3">
            {member.tags.map(t => (
              <span
                key={t}
                className="text-xs font-medium px-3 py-1 rounded-full bg-purple-50 text-purple-600 border border-purple-100"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Company */}
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            {member.company}
          </p>

          {/* Divider */}
          <div className="w-10 h-px bg-gradient-to-r from-purple-300 to-pink-300 mb-4" />

          {/* Bio */}
          <p className="text-sm text-gray-500 leading-relaxed">{member.bio}</p>

          {/* Glow overlay on hover */}
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${member.color} opacity-0 hover:opacity-5 transition-opacity duration-300`} />
        </>
      ) : (
        <p className="text-xs text-gray-400">{member.role}</p>
      )}
    </div>
  );
}

export default function MentorPart() {
  const n = teamMembers.length;
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [animDir, setAnimDir] = useState("right");
  const intervalRef = useRef(null);

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setAnimDir("right");
      setAnimKey(k => k + 1);
      setActive(i => (i + 1) % n);
    }, 3500);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (dir) => {
    setAnimDir(dir);
    setAnimKey(k => k + 1);
    setActive(i => dir === "right" ? (i + 1) % n : (i - 1 + n) % n);
    startTimer();
  };

  const goToIndex = (idx) => {
    if (idx === active) return;
    setAnimDir(idx > active ? "right" : "left");
    setAnimKey(k => k + 1);
    setActive(idx);
    startTimer();
  };

  const prev = (active - 1 + n) % n;
  const next = (active + 1) % n;

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes slideInRight { from { opacity:0; transform:translateX(60px);  } to { opacity:1; transform:translateX(0); } }
        @keyframes slideInLeft  { from { opacity:0; transform:translateX(-60px); } to { opacity:1; transform:translateX(0); } }
        .slide-right { animation: slideInRight 0.38s cubic-bezier(0.4,0,0.2,1) both; }
        .slide-left  { animation: slideInLeft  0.38s cubic-bezier(0.4,0,0.2,1) both; }
      `}</style>

      <div className="container mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Meet Your Instructors
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn from industry experts who have been there, done that — and want to help you do it too.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-6 rounded-full" />
        </div>

        {/* ── Scrolling Name Ticker ── */}
        <div className="overflow-hidden relative mb-12">
          <div
            className="flex"
            style={{ animation: "ticker 14s linear infinite", width: "max-content" }}
          >
            {[...Array(4)].flatMap((_, rep) =>
              teamMembers.map((m, i) => (
                <span
                  key={`${rep}-${i}`}
                  onClick={() => goToIndex(i)}
                  className={`flex-shrink-0 text-xs font-bold tracking-widest uppercase cursor-pointer transition-colors duration-300 select-none mr-12
                    ${i === active ? "text-purple-600" : "text-gray-300 hover:text-gray-400"}`}
                >
                  {m.name}
                  <span className="ml-12 text-gray-200">·</span>
                </span>
              ))
            )}
          </div>
          {/* Fade edges */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(90deg, rgb(248,250,252) 0%, transparent 14%, transparent 86%, rgb(248,250,252) 100%)" }}
          />
        </div>

        {/* ── Carousel ── */}
        <div className="flex items-center justify-center gap-6">
          <ArrowBtn onClick={() => goTo("left")} dir="left" />

          {/* Ghost left */}
          <div className="pointer-events-none flex-shrink-0 mt-12 hidden md:block">
            <Card member={teamMembers[prev]} full={false} />
          </div>

          {/* Active card */}
          <div
            key={animKey}
            className={`flex-shrink-0 mt-12 ${animDir === "right" ? "slide-right" : "slide-left"}`}
          >
            <Card member={teamMembers[active]} full={true} />
          </div>

          {/* Ghost right */}
          <div className="pointer-events-none flex-shrink-0 mt-12 hidden md:block">
            <Card member={teamMembers[next]} full={false} />
          </div>

          <ArrowBtn onClick={() => goTo("right")} dir="right" />
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {teamMembers.map((m, i) => (
            <button
              key={i}
              onClick={() => goToIndex(i)}
              className={`h-2 rounded-full border-none cursor-pointer transition-all duration-300
                ${i === active
                  ? "w-7 bg-gradient-to-r from-purple-500 to-pink-500"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [medicalImgIndex, setMedicalImgIndex] = useState(1);
  const [isHoveringMedical, setIsHoveringMedical] = useState(false);
  const [assuranceImgIndex, setAssuranceImgIndex] = useState(1);
  const [isHoveringAssurance, setIsHoveringAssurance] = useState(false);
  const [hotelImgIndex, setHotelImgIndex] = useState(1);
  const [isHoveringHotel, setIsHoveringHotel] = useState(false);

  // --- ÉTAT MODE HACKER / MATRIX ---
  const [isHackerMode, setIsHackerMode] = useState(false);

  // --- ÉTATS DU FORMULAIRE DE CONTACT ---
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      const response = await fetch("https://formspree.io/f/xaeonbed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: contactName, email: contactEmail, message: contactMessage }),
      });

      if (response.ok) {
        setFormStatus("success");
        setContactName("");
        setContactEmail("");
        setContactMessage("");
      } else {
        setFormStatus("error");
      }
    } catch (err) {
      setFormStatus("error");
    }
  };

  // --- EASTER EGG CONSOLE ---
  useEffect(() => {
    console.log(
      "%c👋 Salut le recruteur !",
      "color: #3b82f6; font-size: 20px; font-weight: bold; background: #090d16; padding: 10px;"
    );
    console.log(
      "%cPuisque tu inspectes le code, sache que Bruce (Étudiant en Génie Informatique à l'UIR) gère aussi bien le routage OSPF/Cisco que les architectures Fullstack Next.js/PHP. Tape %cbruce.hire()%c dans la console pour débloquer un contact direct !",
      "color: #94a3b8; font-size: 14px;",
      "color: #10b981; font-weight: bold;",
      "color: #94a3b8; font-size: 14px;"
    );
    
    (window as any).bruce = {
      hire: () => {
        alert("🚀 Offre débloquée ! Contacte Bruce directement par e-mail : bruceemelinfeikito@gmail.com ou au +212 6 64 17 25 70");
        return "Contact direct : bruceemelinfeikito@gmail.com";
      }
    };
  }, []);

  // --- PALETTE DE COMMANDES (Ctrl + K) ---
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [cmdSearch, setCmdSearch] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsCmdOpen((prev) => !prev);
      }
      if (e.key === "Escape") setIsCmdOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // --- EFFET TYPEWRITER + BRUITAGE CLAVIER ---
  const fullText = "Développeur Fullstack spécialisé dans la conception d'applications web robustes et sécurisées, couplée à une expertise pointue en infrastructure réseau Cisco & GNS3.";
  const [displayText, setDisplayText] = useState("");
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playKeySound = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      if (audioCtxRef.current) {
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(400 + Math.random() * 300, audioCtxRef.current.currentTime);
        gain.gain.setValueAtTime(0.015, audioCtxRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start();
        osc.stop(audioCtxRef.current.currentTime + 0.04);
      }
    } catch (e) {}
  };

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText((prev) => prev + fullText.charAt(index));
        playKeySound();
        index++;
      } else {
        clearInterval(timer);
      }
    }, 40);
    return () => clearInterval(timer);
  }, []);

  // --- ÉTAT POUR COPIER L'EMAIL ---
  const [copiedEmail, setCopiedEmail] = useState(false);
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("bruceemelinfeikito@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // --- CURSEUR ---
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [isHoveredInteractive, setIsHoveredInteractive] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);

  useEffect(() => {
    let interval: any;
    if (isHoveringMedical) interval = setInterval(() => setMedicalImgIndex((prev) => (prev % 8) + 1), 1200);
    return () => clearInterval(interval);
  }, [isHoveringMedical]);

  useEffect(() => {
    let interval: any;
    if (isHoveringAssurance) interval = setInterval(() => setAssuranceImgIndex((prev) => (prev % 4) + 1), 1200);
    return () => clearInterval(interval);
  }, [isHoveringAssurance]);

  useEffect(() => {
    let interval: any;
    if (isHoveringHotel) interval = setInterval(() => setHotelImgIndex((prev) => (prev % 9) + 1), 1200);
    return () => clearInterval(interval);
  }, [isHoveringHotel]);

  const cvUrl = "https://bruce-feikito.dev/mon-cv.pdf";
  const qrCodeApi = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(cvUrl)}&color=3b82f6&bgcolor=090d16`;

  return (
    <main className={`min-h-screen font-sans px-6 selection:bg-blue-500/30 relative cursor-auto md:cursor-none overflow-x-hidden transition-colors duration-500 ${isHackerMode ? 'bg-black text-green-400 font-mono' : 'bg-[#020617] text-slate-200'}`}>

      <style jsx global>{`
        @keyframes fullScreenFlash {
          0%, 88%, 100% { opacity: 0; transform: translateY(-100vh) rotate(25deg); }
          92% { opacity: ${isHackerMode ? '0.4' : '0.18'}; transform: translateY(100vh) rotate(25deg); }
        }
        .animate-full-flash { animation: fullScreenFlash 4s infinite ease-in-out; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .cursor-blink { animation: blink 0.8s infinite; }
        .perspective-1000 { perspective: 1000px; }
        .card-tilt { transition: transform 0.2s ease-out; }
        .card-tilt:hover { transform: rotateX(4deg) rotateY(-4deg) scale(1.02); }

        /* ANIMATION DES BARRES LUMINEUSES */
        @keyframes glowingBar {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .glowing-divider {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #10b981, #f59e0b, #3b82f6);
          background-size: 300% 300%;
          animation: glowingBar 6s ease infinite;
        }
        .glowing-vertical-bar {
          background: linear-gradient(180deg, #3b82f6, #8b5cf6, #ec4899, #10b981);
          background-size: 200% 200%;
          animation: glowingBar 6s ease infinite;
        }
      `}</style>

      {/* FLASH */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center">
        <div className={`w-[300vw] h-64 bg-gradient-to-r from-transparent ${isHackerMode ? 'via-green-500' : 'via-blue-400'} to-transparent opacity-0 animate-full-flash blur-3xl`} />
      </div>

      {/* CURSEUR */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block transition-transform duration-75 ease-out"
        style={{ transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)` }}
      >
        <div className={`w-8 h-8 -ml-4 -mt-4 border-2 ${isHackerMode ? 'border-green-500 bg-green-500/20' : 'border-blue-500 bg-blue-500/10'} rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all ${isHoveredInteractive ? 'scale-150 border-white bg-white/20' : ''}`} />
      </div>

      {/* PALETTE CTRL + K */}
      {isCmdOpen && (
        <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md flex items-start justify-center pt-32 px-4">
          <div className="bg-[#090d16] border border-slate-700 w-full max-w-xl rounded-2xl p-6 shadow-2xl">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800 mb-4">
              <span className="text-xs font-mono text-blue-400 tracking-widest uppercase">Palette de Commandes</span>
              <button onClick={() => setIsCmdOpen(false)} className="text-slate-400 hover:text-white text-xs font-bold bg-slate-800 px-2.5 py-1 rounded-lg">ESC</button>
            </div>
            <input 
              type="text" 
              placeholder="Que cherchez-vous ? (ex: CV, UIR, Compétences, Projets)..." 
              value={cmdSearch}
              onChange={(e) => setCmdSearch(e.target.value)}
              className="w-full bg-[#020617] border border-slate-800 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500 mb-4"
              autoFocus
            />
            <div className="space-y-2">
              <a href="/mon-cv.pdf" download onClick={() => setIsCmdOpen(false)} className="block p-3 rounded-xl hover:bg-blue-500/10 hover:text-blue-400 text-slate-300 text-sm transition">📄 Télécharger mon CV PDF</a>
              <a href="#competences" onClick={() => setIsCmdOpen(false)} className="block p-3 rounded-xl hover:bg-blue-500/10 hover:text-blue-400 text-slate-300 text-sm transition">⚡ Compétences & Langages (HTML, PHP, Java...)</a>
              <a href="#timeline" onClick={() => setIsCmdOpen(false)} className="block p-3 rounded-xl hover:bg-blue-500/10 hover:text-blue-400 text-slate-300 text-sm transition">🏛️ Université Internationale de Rabat (UIR) & Parcours</a>
              <a href="#reseau" onClick={() => setIsCmdOpen(false)} className="block p-3 rounded-xl hover:bg-blue-500/10 hover:text-blue-400 text-slate-300 text-sm transition">🌐 Topologie Réseau GNS3 & Cisco</a>
              <a href="#projets" onClick={() => setIsCmdOpen(false)} className="block p-3 rounded-xl hover:bg-blue-500/10 hover:text-blue-400 text-slate-300 text-sm transition">💻 Voir les Projets</a>
              <a href="#contact" onClick={() => setIsCmdOpen(false)} className="block p-3 rounded-xl hover:bg-blue-500/10 hover:text-blue-400 text-slate-300 text-sm transition">✉️ Me Contacter directement</a>
            </div>
          </div>
        </div>
      )}

      {/* HEADER AVEC ICÔNES GITHUB & LINKEDIN */}
      <nav className="max-w-7xl mx-auto py-8 flex justify-between items-center text-sm tracking-widest uppercase relative z-10">
        <span className={`font-black ${isHackerMode ? 'text-green-500' : 'text-blue-500'} tracking-tighter text-2xl`}>BRUCE.DEV</span>
        <div className="flex items-center gap-4 md:gap-6">
          <button
            onMouseEnter={() => setIsHoveredInteractive(true)}
            onMouseLeave={() => setIsHoveredInteractive(false)}
            onClick={() => setIsHackerMode(!isHackerMode)}
            className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono transition border ${isHackerMode ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'}`}
          >
            <span>{isHackerMode ? '🟢 Standard Mode' : '💻 Hacker Mode'}</span>
          </button>

          <button 
            onMouseEnter={() => setIsHoveredInteractive(true)}
            onMouseLeave={() => setIsHoveredInteractive(false)}
            onClick={() => setIsCmdOpen(true)}
            className="hidden md:flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:border-blue-500 transition"
          >
            <span>Rechercher...</span>
            <kbd className="bg-slate-800 px-2 py-0.5 rounded text-[10px] text-blue-400">Ctrl K</kbd>
          </button>

          <div className="hidden md:flex gap-6 border-r border-slate-800 pr-6 font-bold">
            <a href="#competences" className="hover:text-blue-400 transition text-slate-400">Compétences</a>
            <a href="#timeline" className="hover:text-blue-400 transition text-slate-400">UIR & Parcours</a>
            <a href="#reseau" className="hover:text-blue-400 transition text-slate-400">Réseau</a>
          </div>

          {/* ICÔNE GITHUB DANS LE HEADER */}
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            title="Mon profil GitHub"
            onMouseEnter={() => setIsHoveredInteractive(true)}
            onMouseLeave={() => setIsHoveredInteractive(false)}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-blue-500 transition shadow-lg flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </a>

          {/* ICÔNE LINKEDIN DANS LE HEADER */}
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            title="Mon profil LinkedIn"
            onMouseEnter={() => setIsHoveredInteractive(true)}
            onMouseLeave={() => setIsHoveredInteractive(false)}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-blue-400 hover:border-blue-500 transition shadow-lg flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
            </svg>
          </a>

          <a href="/mon-cv.pdf" download className={`px-5 py-2 ${isHackerMode ? 'bg-green-500 text-black font-black' : 'bg-blue-500/10 border border-blue-500/50 text-blue-400 hover:bg-blue-500 hover:text-white'} text-xs font-black rounded-lg transition shadow-lg`}>CV.PDF</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto pt-12 pb-20 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
        <motion.div className="md:col-span-7" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <div className={`inline-flex items-center gap-3 px-4 py-2 mb-8 text-xs font-bold tracking-[0.15em] ${isHackerMode ? 'text-green-400 bg-green-500/10 border-green-500/30' : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'} uppercase border rounded-full backdrop-blur-md`}>
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isHackerMode ? 'bg-green-400' : 'bg-emerald-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isHackerMode ? 'bg-green-500' : 'bg-emerald-500'}`}></span>
            </span>
            Licence Pro Génie Informatique (UIR) // Maroc
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.9]">
            BRUCE <br/>
            <span className={`${isHackerMode ? 'text-green-400' : 'text-blue-500'} text-3xl md:text-5xl block mt-4 font-black`}>Architecte Web & Réseaux.</span>
          </h1>

          <div className="min-h-[90px] mb-8">
            <p className={`text-lg ${isHackerMode ? 'text-green-300' : 'text-slate-300'} max-w-2xl leading-relaxed font-mono`}>
              {displayText}
              <span className={`inline-block w-2.5 h-5 ${isHackerMode ? 'bg-green-500' : 'bg-blue-500'} ml-1 translate-y-1 cursor-blink`}></span>
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
             <a href="#projets" className={`px-8 py-4 ${isHackerMode ? 'bg-green-600 text-black' : 'bg-blue-600 text-white'} font-black rounded-full hover:opacity-90 transition transform hover:scale-105 uppercase text-xs tracking-widest shadow-xl`}>Découvrir mes Réalisations</a>
             <a href="#contact" className="px-8 py-4 bg-slate-900 text-white font-black rounded-full border border-slate-800 hover:border-blue-500 transition uppercase text-xs tracking-widest">Discuter d'un Projet</a>
          </div>
        </motion.div>
        
        <motion.div className="md:col-span-5 flex flex-col items-center md:items-end gap-6" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
          <div className={`w-64 h-64 md:w-[350px] md:h-[350px] rounded-full border-4 border-slate-800 p-3 relative overflow-hidden group transition-all duration-500 ${isHackerMode ? 'hover:border-green-500' : 'hover:border-blue-500'} shadow-2xl`}>
            <div className={`w-full h-full rounded-full bg-slate-900 border-2 ${isHackerMode ? 'border-green-500' : 'border-blue-500'} flex items-center justify-center overflow-hidden relative`}>
               <img src="/photo.jpeg" alt="Bruce" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
               <div className={`absolute inset-0 ${isHackerMode ? 'bg-green-500/10' : 'bg-blue-500/10'} group-hover:bg-transparent transition-colors`}></div>
            </div>
          </div>

          <div className="w-full max-w-md bg-[#090d16] border border-slate-800 rounded-2xl p-4 font-mono text-xs shadow-2xl">
            <div className="flex items-center gap-2 mb-3 border-b border-slate-800/80 pb-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
              <span className="text-slate-500 text-[10px] ml-2">bruce@uir-rabat:~</span>
            </div>
            <div className="space-y-1 text-slate-300">
              <p><span className="text-blue-400">const</span> student = <span className="text-emerald-400">"Bruce Emelin"</span>;</p>
              <p><span className="text-blue-400">const</span> school = <span className="text-amber-300">"Univ. Internationale de Rabat"</span>;</p>
              <p><span className="text-blue-400">const</span> stack = [<span className="text-orange-300">"HTML"</span>, <span className="text-sky-300">"PHP"</span>, <span className="text-yellow-300">"Java"</span>, <span className="text-purple-300">"Cisco"</span>];</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* BARRE HORIZONTALE LUMINEUSE */}
      <div className="max-w-7xl mx-auto py-6 relative z-10">
        <div className="w-full h-1 rounded-full glowing-divider shadow-[0_0_20px_rgba(59,130,246,0.6)]"></div>
      </div>

      {/* --- SECTION TIMELINE / UNIVERSITÉ INTERNATIONALE DE RABAT (UIR) --- */}
      <section id="timeline" className="max-w-7xl mx-auto pb-24 pt-6 relative z-10">
        <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-[0.3em] font-bold mb-10 flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Cursus Académique & Git Log
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-mono text-xs">
          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/50 transition relative group">
            <span className="text-emerald-400 font-bold block mb-2">commit uir-2026</span>
            <p className="text-white font-bold mb-1">Licence Pro Génie Informatique</p>
            <p className="text-slate-400 text-[11px]">Université Internationale de Rabat (UIR) — 2026/2027</p>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl hover:border-blue-500/50 transition relative group">
            <span className="text-blue-400 font-bold block mb-2">commit dev-web</span>
            <p className="text-white font-bold mb-1">Systèmes Web & Applicatifs</p>
            <p className="text-slate-400 text-[11px]">Conception des projets Santée, Hôtel Imperial & Assurance2M</p>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl hover:border-amber-500/50 transition relative group">
            <span className="text-amber-400 font-bold block mb-2">commit net-cisco</span>
            <p className="text-white font-bold mb-1">Infrastructure & Réseaux</p>
            <p className="text-slate-400 text-[11px]">Virtualisation GNS3, Cisco Packet Tracer, OSPF & Sécurité</p>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl hover:border-purple-500/50 transition relative group">
            <span className="text-purple-400 font-bold block mb-2">commit HEAD (master)</span>
            <p className="text-white font-bold mb-1">Prêt pour Recrutement</p>
            <p className="text-slate-400 text-[11px]">Ouvert aux opportunités professionnelles au Maroc & International</p>
          </div>
        </div>
      </section>

      {/* BARRE HORIZONTALE LUMINEUSE */}
      <div className="max-w-7xl mx-auto py-6 relative z-10">
        <div className="w-full h-1 rounded-full glowing-divider shadow-[0_0_20px_rgba(139,92,246,0.6)]"></div>
      </div>

      {/* --- SECTION COMPÉTENCES & LANGAGES --- */}
      <section id="competences" className="max-w-7xl mx-auto pb-24 pt-6 relative z-10">
        <h3 className="text-xs font-mono text-blue-400 uppercase tracking-[0.3em] font-bold mb-10 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span> Stack Technique & Compétences Clés
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 1. PROGRAMMING & WEB */}
          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} className="bg-slate-900/40 p-8 rounded-3xl border border-blue-500/30 hover:border-blue-500 transition-colors shadow-lg">
            <h4 className="text-blue-400 font-mono text-xs mb-6 uppercase tracking-[0.3em] font-bold flex items-center gap-3">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span> 01. Programming & Web
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-orange-500/10 border border-orange-500/40 rounded-xl text-[11px] font-bold text-orange-300 uppercase">HTML</span>
              <span className="px-4 py-2 bg-sky-500/10 border border-sky-500/40 rounded-xl text-[11px] font-bold text-sky-300 uppercase">CSS</span>
              <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/40 rounded-xl text-[11px] font-bold text-blue-300 uppercase">PHP</span>
              <span className="px-4 py-2 bg-red-500/10 border border-red-500/40 rounded-xl text-[11px] font-bold text-red-300 uppercase">Java</span>
              <span className="px-4 py-2 bg-amber-400/10 border border-amber-400/40 rounded-xl text-[11px] font-bold text-amber-200 uppercase">JavaScript</span>
              <span className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/40 rounded-xl text-[11px] font-bold text-emerald-300 uppercase">Next.js / TS</span>
            </div>
          </motion.div>

          {/* 2. BASES DE DONNÉES */}
          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} className="bg-slate-900/40 p-8 rounded-3xl border border-purple-500/30 hover:border-purple-500 transition-colors shadow-lg">
            <h4 className="text-purple-400 font-mono text-xs mb-6 uppercase tracking-[0.3em] font-bold flex items-center gap-3">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span> 02. Bases de Données
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/40 rounded-xl text-[11px] font-bold text-cyan-300 uppercase">MySQL</span>
              <span className="px-4 py-2 bg-red-600/10 border border-red-600/40 rounded-xl text-[11px] font-bold text-red-400 uppercase">Oracle DB</span>
              <span className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/40 rounded-xl text-[11px] font-bold text-indigo-300 uppercase">PostgreSQL</span>
              <span className="px-4 py-2 bg-emerald-400/10 border border-emerald-400/40 rounded-xl text-[11px] font-bold text-emerald-200 uppercase">MongoDB</span>
            </div>
          </motion.div>

          {/* 3. RÉSEAUX & INFRASTRUCTURE */}
          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} className="bg-slate-900/40 p-8 rounded-3xl border border-amber-500/30 hover:border-amber-500 transition-colors shadow-lg">
            <h4 className="text-amber-400 font-mono text-xs mb-6 uppercase tracking-[0.3em] font-bold flex items-center gap-3">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span> 03. Réseaux & Systèmes
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-amber-500/10 border border-amber-500/40 rounded-xl text-[11px] font-bold text-amber-300 uppercase">GNS3</span>
              <span className="px-4 py-2 bg-blue-600/10 border border-blue-600/40 rounded-xl text-[11px] font-bold text-blue-400 uppercase">Cisco Packet Tracer</span>
              <span className="px-4 py-2 bg-teal-500/10 border border-teal-500/40 rounded-xl text-[11px] font-bold text-teal-300 uppercase">TCP/IP / OSPF</span>
              <span className="px-4 py-2 bg-rose-500/10 border border-rose-500/40 rounded-xl text-[11px] font-bold text-rose-300 uppercase">Linux & Sécurité</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* BARRE HORIZONTALE LUMINEUSE */}
      <div className="max-w-7xl mx-auto py-6 relative z-10">
        <div className="w-full h-1 rounded-full glowing-divider shadow-[0_0_20px_rgba(236,72,153,0.6)]"></div>
      </div>

      {/* --- TOPOLOGIE RÉSEAU INTERACTIVE --- */}
      <section id="reseau" className="max-w-7xl mx-auto pb-24 pt-6 relative z-10">
        <h3 className="text-xs font-mono text-amber-400 uppercase tracking-[0.3em] font-bold mb-8 flex items-center gap-2">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></span> Simulation Topologie Réseau (GNS3 & Cisco Packet Tracer)
        </h3>
        <div className="bg-[#090d16] border border-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-around gap-6">
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
          
          <div className="relative z-10 bg-slate-900/90 border border-blue-500/50 p-6 rounded-2xl text-center shadow-xl">
            <span className="text-blue-400 font-mono text-[10px] block mb-1">CISCO CORE</span>
            <h5 className="text-white font-black text-sm uppercase">Cisco Packet Tracer / GNS3</h5>
            <span className="text-xs text-emerald-400 font-mono mt-2 block">● Routage OSPF</span>
          </div>
          
          <div className="hidden md:flex flex-col items-center">
            <div className="w-32 h-0.5 bg-gradient-to-r from-blue-500 via-amber-500 to-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-mono text-slate-500 mt-1">Trunk / VLAN 10-20</span>
          </div>

          <div className="relative z-10 bg-slate-900/90 border border-amber-500/50 p-6 rounded-2xl text-center shadow-xl">
            <span className="text-amber-400 font-mono text-[10px] block mb-1">FIREWALL ZONE</span>
            <h5 className="text-white font-black text-sm uppercase">Sécurité & ACL</h5>
            <span className="text-xs text-amber-400 font-mono mt-2 block">● Filtrage Actif</span>
          </div>

          <div className="hidden md:flex flex-col items-center">
            <div className="w-32 h-0.5 bg-gradient-to-r from-amber-500 via-purple-500 to-blue-500 animate-pulse"></div>
            <span className="text-[10px] font-mono text-slate-500 mt-1">Liaison Web</span>
          </div>

          <div className="relative z-10 bg-slate-900/90 border border-purple-500/50 p-6 rounded-2xl text-center shadow-xl">
            <span className="text-purple-400 font-mono text-[10px] block mb-1">BACKEND / BDD</span>
            <h5 className="text-white font-black text-sm uppercase">PHP / MySQL / Oracle</h5>
            <span className="text-xs text-purple-400 font-mono mt-2 block">● Données Sécurisées</span>
          </div>
        </div>
      </section>

      {/* BARRE HORIZONTALE LUMINEUSE */}
      <div className="max-w-7xl mx-auto py-6 relative z-10">
        <div className="w-full h-1 rounded-full glowing-divider shadow-[0_0_20px_rgba(16,185,129,0.6)]"></div>
      </div>

      {/* --- PROJETS AVEC BARRES VERTICALES LUMINEUSES --- */}
      <section id="projets" className="max-w-7xl mx-auto pb-32 pt-6 relative z-10 perspective-1000">
        <h3 className="text-4xl font-black text-white mb-16 flex items-center gap-4 uppercase tracking-tighter">
          <span className="text-blue-500 font-mono text-xl">01.</span> Applications & Systèmes Web
        </h3>
        
        {/* GRILLE 4 PROJETS AVEC BARRES VERTICALES LUMINEUSES AU MILIEU */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Projet 1 : Santé */}
          <div className="lg:col-span-5">
            <motion.div onMouseEnter={() => setIsHoveringMedical(true)} onMouseLeave={() => setIsHoveringMedical(false)} className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-3 flex flex-col transition-all group overflow-hidden hover:border-blue-500/50 card-tilt h-full">
              <div className="relative w-full h-72 bg-slate-950 rounded-[2rem] overflow-hidden mb-6">
                <img src={`/captures/medical${medicalImgIndex}.png`} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" alt="Médical" />
                <div className="absolute top-6 right-6 bg-blue-500/90 backdrop-blur-md text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">Capture {medicalImgIndex}/8</div>
              </div>
              <div className="px-8 pb-8">
                <h4 className="text-white text-2xl font-black mb-3 uppercase tracking-tighter">Application Santé Web</h4>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed font-medium">Gestion hospitalière complexe : dossiers patients, planning docteurs et sécurité PHP/MySQL.</p>
                <div className="flex flex-wrap gap-2">{["PHP", "MySQL", "JS"].map(t => <span key={t} className="text-[10px] font-black text-blue-400 border border-blue-500/30 px-3 py-1 rounded-lg bg-blue-500/5 uppercase">{t}</span>)}</div>
              </div>
            </motion.div>
          </div>

          {/* BARRE VERTICALE LUMINEUSE ENTRE PROJET 1 ET 2 */}
          <div className="hidden lg:flex lg:col-span-1 justify-center h-[450px]">
            <div className="w-1 h-full rounded-full glowing-vertical-bar shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
          </div>

          {/* Projet 2 : Hôtellerie */}
          <div className="lg:col-span-6">
            <motion.div onMouseEnter={() => setIsHoveringHotel(true)} onMouseLeave={() => setIsHoveringHotel(false)} className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-3 flex flex-col transition-all group overflow-hidden hover:border-purple-500/50 card-tilt h-full">
              <div className="relative w-full h-72 bg-slate-950 rounded-[2rem] overflow-hidden mb-6">
                <img src={`/captures/imperial${hotelImgIndex}.png`} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" alt="Hôtel Imperial" />
                <div className="absolute top-6 right-6 bg-purple-500/90 backdrop-blur-md text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">Capture {hotelImgIndex}/9</div>
              </div>
              <div className="px-8 pb-8">
                <h4 className="text-white text-2xl font-black mb-3 uppercase tracking-tighter">Hôtellerie / Système Imperial</h4>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed font-medium">Logiciel hôtelier complet : gestion des chambres, réservations temps réel et facturation PDF.</p>
                <div className="flex flex-wrap gap-2">{["PHP", "SQL Expert", "MySQL"].map(t => <span key={t} className="text-[10px] font-black text-purple-400 border border-purple-500/30 px-3 py-1 rounded-lg bg-purple-500/5 uppercase">{t}</span>)}</div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* LIGNE DE SÉPARATION HORIZONTALE ENTRE LES PAIRES DE PROJETS */}
        <div className="w-full py-12">
          <div className="w-full h-1 rounded-full glowing-divider shadow-[0_0_20px_rgba(236,72,153,0.6)]"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Projet 3 : Assurance */}
          <div className="lg:col-span-5">
            <motion.div onMouseEnter={() => setIsHoveringAssurance(true)} onMouseLeave={() => setIsHoveringAssurance(false)} className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-3 flex flex-col transition-all group overflow-hidden hover:border-emerald-500/50 card-tilt h-full">
              <div className="relative w-full h-72 bg-slate-950 rounded-[2rem] overflow-hidden mb-6">
                <img src={`/captures/assurance${assuranceImgIndex}.png`} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" alt="Assurance" />
                <div className="absolute top-6 right-6 bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">Capture {assuranceImgIndex}/4</div>
              </div>
              <div className="px-8 pb-8">
                <h4 className="text-white text-2xl font-black mb-3 uppercase tracking-tighter">Assurance en Ligne</h4>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed font-medium">Plateforme de souscription avec algorithmes de calcul de devis instantanés et panel admin.</p>
                <div className="flex flex-wrap gap-2">{["PHP", "MySQL", "Algorithmie"].map(t => <span key={t} className="text-[10px] font-black text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-lg bg-emerald-500/5 uppercase">{t}</span>)}</div>
              </div>
            </motion.div>
          </div>

          {/* BARRE VERTICALE LUMINEUSE ENTRE PROJET 3 ET 4 */}
          <div className="hidden lg:flex lg:col-span-1 justify-center h-[450px]">
            <div className="w-1 h-full rounded-full glowing-vertical-bar shadow-[0_0_15px_rgba(16,185,129,0.6)]"></div>
          </div>

          {/* Projet 4 : Genesis / Réseau */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-10 flex flex-col transition-all group hover:border-amber-500/50 relative overflow-hidden card-tilt h-full justify-center">
               <div className="w-16 h-16 bg-amber-500/10 rounded-3xl flex items-center justify-center text-amber-500 border border-amber-500/20 mb-6 transform group-hover:rotate-12 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6" y2="6"></line><line x1="6" y1="18" x2="6" y2="18"></line></svg>
               </div>
               <h4 className="text-white text-3xl font-black mb-4 uppercase tracking-tighter">Projet Genesis / GNS3</h4>
               <p className="text-slate-400 text-sm mb-8 leading-relaxed font-medium">Virtualisation réseau complète : déploiement de topologies Cisco, sécurisation par Firewall et routage dynamique OSPF.</p>
               <div className="flex flex-wrap gap-2">
                  {["Cisco", "Security", "OSPF"].map(t => <span key={t} className="text-[10px] font-black text-amber-500 border border-amber-500/30 px-3 py-1 rounded-lg bg-amber-500/5 uppercase">{t}</span>)}
               </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- CONTACT (FORMULAIRE CONNECTÉ + WHATSAPP) --- */}
      <section id="contact" className="max-w-7xl mx-auto pb-32 pt-20 border-t border-slate-800/50 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-5">
            <h2 className="text-6xl font-black text-white uppercase mb-16 tracking-tighter leading-[0.85]">Travaillons <br/><span className="text-blue-500">Ensemble.</span></h2>
            <div className="space-y-8">
              
              {/* Email */}
              <div 
                onMouseEnter={() => setIsHoveredInteractive(true)}
                onMouseLeave={() => setIsHoveredInteractive(false)}
                onClick={handleCopyEmail} 
                className="flex items-center gap-6 group cursor-pointer relative" 
                title="Cliquer pour copier l'email"
              >
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-500 font-black text-xl shadow-2xl group-hover:border-blue-500 transition-colors">@</div>
                <div>
                  <span className="text-slate-200 text-xl font-bold group-hover:text-blue-400 transition tracking-tighter block">bruceemelinfeikito@gmail.com</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block mt-1">{copiedEmail ? "✓ Copié !" : "Cliquer pour copier"}</span>
                </div>
              </div>

              {/* Téléphone direct */}
              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-500 shadow-2xl group-hover:border-emerald-500 transition-colors">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328z"/></svg>
                </div>
                <span className="text-slate-200 text-xl font-bold tracking-tighter">+212 6 64 17 25 70</span>
              </div>

              {/* Bouton WhatsApp Direct */}
              <a 
                href="https://wa.me/212664172570?text=Bonjour%20Bruce,%20j'ai%20vu%20ton%20portfolio%20et%20je%20souhaite%20qu'on%20discute%20d'une%20opportunité." 
                target="_blank" 
                rel="noopener noreferrer"
                onMouseEnter={() => setIsHoveredInteractive(true)}
                onMouseLeave={() => setIsHoveredInteractive(false)}
                className="flex items-center gap-6 group p-2 -ml-2 rounded-2xl hover:bg-emerald-500/10 transition"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.068 7.925c0 1.399.366 2.76 1.057 3.965L0 16l4.223-1.107a7.81 7.81 0 0 0 3.772.96h.004c4.363 0 7.926-3.558 7.926-7.93 0-2.11-.822-4.102-2.324-5.607zM7.994 14.521a6.57 6.57 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.558 6.558 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.348.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.342l-.381-.008c-.133 0-.348.05-.53.248-.183.199-.7 6.832-.7 1.666 0 .834.607 1.641.69 1.758.084.118 1.19 1.82 2.885 2.556.405.176.721.282.968.361.407.13.778.112 1.071.068.329-.05 1.17-.478 1.334-.94.164-.462.164-.86.114-.94-.05-.08-.182-.13-.379-.23z"/>
                  </svg>
                </div>
                <div>
                  <span className="text-slate-200 text-xl font-bold group-hover:text-emerald-400 transition tracking-tighter block">Écrire sur WhatsApp</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block mt-1">Réponse instantanée</span>
                </div>
              </a>

            </div>
          </div>
          
          <div className="md:col-span-7">
            <form onSubmit={handleFormSubmit} className="bg-slate-900/30 border border-slate-800/50 p-12 rounded-[3rem] space-y-6 backdrop-blur-xl shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Nom Complet</label>
                  <input 
                    type="text" 
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Bruce..." 
                    className="w-full bg-[#020617] border border-slate-800 rounded-2xl px-6 py-5 focus:border-blue-500 outline-none text-white transition font-bold" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Email Professionnel</label>
                  <input 
                    type="email" 
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="bruce@gmail.com" 
                    className="w-full bg-[#020617] border border-slate-800 rounded-2xl px-6 py-5 focus:border-blue-500 outline-none text-white transition font-bold" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Votre Message</label>
                <textarea 
                  rows={5} 
                  required
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Décrivez votre projet..." 
                  className="w-full bg-[#020617] border border-slate-800 rounded-2xl px-6 py-5 focus:border-blue-500 outline-none text-white resize-none transition font-bold"
                ></textarea>
              </div>

              <button 
                onMouseEnter={() => setIsHoveredInteractive(true)}
                onMouseLeave={() => setIsHoveredInteractive(false)}
                type="submit" 
                disabled={formStatus === "submitting"}
                className="w-full py-6 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-black rounded-2xl transition uppercase tracking-[0.3em] text-sm shadow-2xl shadow-blue-600/30 cursor-pointer"
              >
                {formStatus === "submitting" ? "Envoi en cours..." : "Envoyer le Message"}
              </button>

              {formStatus === "success" && (
                <p className="text-emerald-400 text-xs font-mono text-center mt-2">✓ Message envoyé avec succès ! Je te recontacterai rapidement.</p>
              )}
              {formStatus === "error" && (
                <p className="text-rose-400 text-xs font-mono text-center mt-2">✕ Une erreur est survenue. Réessaie ou contacte-moi directement par e-mail.</p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto py-16 border-t border-slate-800/50 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl flex items-center gap-6 shadow-2xl hover:border-blue-500/50 transition">
          <div className="w-24 h-24 bg-slate-950 p-2 rounded-2xl border border-blue-500/30 flex items-center justify-center shrink-0">
            <img src={qrCodeApi} alt="Scan QR Code CV" className="w-full h-full object-contain rounded-lg" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 block mb-1">Téléchargement Rapide</span>
            <h5 className="text-white font-black text-lg uppercase tracking-tighter mb-2">Scannez pour mon CV</h5>
            <a href="/mon-cv.pdf" download className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition">
              <span>Ou cliquez ici pour télécharger directement</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </a>
          </div>
        </div>

        <div className="text-center md:text-right">
          <span className="text-blue-500 font-black text-xl tracking-tighter block mb-2">BRUCE.DEV</span>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">© 2026 BRUCE — Built with Next.js & Passion</p>
        </div>
      </footer>

    </main>
  );
}
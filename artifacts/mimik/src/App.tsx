import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Twitter, ChevronRight } from "lucide-react";

// Minimal Toast component since we are fully custom
const Toast = ({ message, show, onClose }: { message: string, show: boolean, onClose: () => void }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-[#111] border border-[#c9a227]/30 rounded-full shadow-[0_0_20px_rgba(201,162,39,0.15)] flex items-center gap-3 backdrop-blur-md"
        >
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#c9a227] to-[#f0d060] animate-pulse" />
          <span className="text-[#f0d060] text-sm font-medium tracking-wide font-sans">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Particles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#f0d060]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            boxShadow: "0 0 10px 2px rgba(240, 208, 96, 0.4)",
          }}
          animate={{
            y: ["0%", "-100%", "0%"],
            opacity: [0, 0.8, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

function App() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowToast(true);
      setEmail("");
    }, 1000);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white overflow-hidden flex flex-col justify-between selection:bg-[#c9a227] selection:text-black">
      {/* Cinematic Lighting / Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#c9a227]/10 via-[#0a0a0a]/80 to-[#0a0a0a] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-overlay" />
      
      <Particles />

      <main className="relative z-10 flex flex-col items-center justify-center flex-grow px-6 w-full max-w-4xl mx-auto">
        
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mb-16 md:mb-24 w-full flex justify-center"
        >
          <img 
            src="/mimik-logo.png" 
            alt="MIMIiK Logo" 
            className="w-[280px] md:w-[400px] h-auto object-contain drop-shadow-[0_0_30px_rgba(201,162,39,0.15)]"
          />
        </motion.div>

        <div className="w-full text-center flex flex-col items-center">
          
          <motion.h2 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
            className="text-[#c9a227] font-sans text-xs md:text-sm uppercase font-semibold tracking-[0.5em] mb-4 md:mb-6 pl-[0.5em]"
          >
            AI Virtual Try-On
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
            className="relative"
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-[#f0d060] via-[#c9a227] to-[#8a6b1c] font-bold drop-shadow-sm pb-2">
              COMING SOON
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl pointer-events-none" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-6 md:mt-10 text-gray-400 font-sans max-w-lg mx-auto text-sm md:text-base leading-relaxed"
          >
            The future of luxury fashion is digital. Experience garments with perfect fidelity before they ever ship.
          </motion.p>

          {/* Waitlist Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            onSubmit={handleSubmit}
            className="mt-12 md:mt-16 w-full max-w-md relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#c9a227] to-[#f0d060] rounded-none opacity-0 group-focus-within:opacity-20 transition duration-1000 blur-sm"></div>
            <div className="relative flex items-center border border-white/10 bg-black/40 backdrop-blur-md focus-within:border-[#c9a227]/50 transition-colors duration-500">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Request exclusive access"
                className="w-full bg-transparent border-none text-white px-6 py-4 outline-none placeholder:text-gray-600 font-sans text-sm md:text-base"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center bg-gradient-to-r from-[#c9a227] to-[#8a6b1c] text-black px-6 md:px-8 py-4 font-semibold uppercase tracking-wider text-xs md:text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full"
                  />
                ) : (
                  <span className="flex items-center gap-2">
                    Notify Me
                  </span>
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="relative z-10 w-full px-8 pb-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 mt-20"
      >
        <p className="text-gray-600 text-xs font-sans tracking-wide uppercase">
          &copy; 2026 MIMIiK. All rights reserved.
        </p>
        
        <div className="flex items-center gap-6">
          <a href="#" className="text-gray-500 hover:text-[#c9a227] transition-colors duration-300">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-500 hover:text-[#c9a227] transition-colors duration-300">
            <Twitter className="w-5 h-5" />
          </a>
        </div>
      </motion.footer>

      <Toast message="You've been added to the exclusive waitlist." show={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
}

export default App;

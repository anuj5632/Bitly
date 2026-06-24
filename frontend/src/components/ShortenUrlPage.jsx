import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Link2 } from 'lucide-react';
import { GlassCard } from './ui';

const ShortenUrlPage = () => {
  const { url } = useParams();

  useEffect(() => {
    if (url) {
      const timer = setTimeout(() => {
        window.location.href = import.meta.env.VITE_BACKEND_URL + `/${url}`;
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [url]);

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-crosshatch opacity-20 pointer-events-none" />
      
      {/* Morph blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 animate-morph blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/10 animate-morph blur-3xl" />

      <div className="relative z-10 w-full max-w-lg px-6">
        <GlassCard tilt="2deg" className="!p-16 border-2 border-border-base text-center shadow-lg">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center p-5 bg-surface-secondary border border-border-base rounded-md mb-10 text-primary shadow-sm"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Link2 className="w-12 h-12" />
            </motion.div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl font-bold text-white mb-4 lime-glow"
          >
            Redirecting...
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-body text-on-surface-secondary text-lg mb-12 uppercase tracking-widest font-bold opacity-70"
          >
            Inscribing current location
          </motion.p>

          {/* Loading bar */}
          <div className="relative h-2 bg-surface-secondary rounded-full overflow-hidden border border-border-base max-w-xs mx-auto">
             <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute inset-0 bg-primary shadow-[0_0_15px_rgba(223,255,0,0.6)]"
              />
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-3">
            <ExternalLink className="w-4 h-4 text-on-surface-muted" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-muted">ALPHA v1.2.0-AL</span>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default ShortenUrlPage;

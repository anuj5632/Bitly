import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { GradientBlob } from './ui';

const ShortenUrlPage = () => {
  const { url } = useParams();

  useEffect(() => {
    if (url) {
      // Small delay for better UX - shows the transition page briefly
      const timer = setTimeout(() => {
        window.location.href = import.meta.env.VITE_BACKEND_URL + `/${url}`;
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [url]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <GradientBlob className="w-96 h-96 -top-48 -left-48 opacity-30" color="primary" />
        <GradientBlob className="w-96 h-96 bottom-0 right-0 opacity-20 animation-delay-2000" color="purple" />
      </div>

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="inline-flex items-center justify-center p-4 bg-primary-600/10 rounded-2xl mb-6"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <ExternalLink className="w-12 h-12 text-primary-400" />
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold text-white mb-2"
        >
          Redirecting...
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-dark-400"
        >
          Taking you to your destination
        </motion.p>

        {/* Loading bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.5 }}
          className="h-1 bg-gradient-to-r from-primary-600 to-indigo-600 rounded-full mt-6 max-w-xs mx-auto"
        />
      </div>
    </div>
  );
};

export default ShortenUrlPage;

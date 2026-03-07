import React from 'react';
import { motion } from 'framer-motion';
import { GradientBlob } from './ui';

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <GradientBlob className="w-96 h-96 -top-48 -right-48 opacity-20" color="primary" />
        <GradientBlob className="w-96 h-96 bottom-0 -left-48 opacity-15 animation-delay-2000" color="purple" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Animated Logo */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="relative"
        >
          <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary-600 to-indigo-600 flex items-center justify-center shadow-glow">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"
            />
          </div>
        </motion.div>

        {/* Loading Text */}
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-semibold text-white mb-2"
          >
            Loading
          </motion.h2>
          <motion.div className="flex items-center justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-2 h-2 bg-primary-500 rounded-full"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Loader;

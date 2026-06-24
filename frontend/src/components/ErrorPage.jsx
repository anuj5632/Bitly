import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Button, PageTransition, GlassCard } from './ui';

const ErrorPage = ({ message }) => {
  const navigate = useNavigate();

  return (
    <PageTransition className="min-h-screen flex items-center justify-center px-4 bg-surface relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-crosshatch opacity-20 pointer-events-none" />
      
      {/* Morph blobs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-error/5 animate-morph blur-3xl" />

      <div className="relative z-10 w-full max-w-lg px-6">
        <GlassCard tilt="-2deg" className="!p-16 border-2 border-error/30 text-center shadow-lg">
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center p-5 bg-error/10 border border-error/20 rounded-md mb-10 text-error shadow-sm"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
            >
              <AlertTriangle className="w-12 h-12" />
            </motion.div>
          </motion.div>

          {/* Error Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="font-heading text-4xl font-bold text-white mb-4 uppercase tracking-tight">
              Registry <span className="text-error">Fault</span>
            </h1>
            <p className="font-body text-on-surface-secondary text-lg mb-12">
              {message || "An unexpected error has disrupted the sketching process. Please re-synchronize."}
            </p>
          </motion.div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => navigate("/")}
              icon={Home}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Go Home
            </Button>
            <Button
              variant="primary"
              onClick={() => window.location.reload()}
              icon={RefreshCw}
              className="w-full sm:w-auto"
            >
              Retry Sync
            </Button>
          </div>

          <div className="mt-12 text-[10px] font-bold uppercase tracking-widest text-on-surface-muted border-t border-border-base pt-6">
            Error Code: 500-REG-FAULT
          </div>
        </GlassCard>
      </div>
    </PageTransition>
  );
};

export default ErrorPage;

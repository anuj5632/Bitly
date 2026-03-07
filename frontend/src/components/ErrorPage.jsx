import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Button, GradientBlob, PageTransition } from './ui';

const ErrorPage = ({ message }) => {
  const navigate = useNavigate();

  return (
    <PageTransition className="min-h-screen flex items-center justify-center px-4 pt-20">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <GradientBlob className="w-96 h-96 -top-48 -left-48 opacity-20" color="primary" />
        <GradientBlob className="w-96 h-96 bottom-0 right-0 opacity-15 animation-delay-2000" color="purple" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.02)_1px,transparent_1px)] bg-size-[64px_64px]" />
      </div>

      <div className="relative z-10 text-center max-w-md">
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="inline-flex items-center justify-center p-5 bg-red-500/10 rounded-3xl mb-6"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
          >
            <AlertTriangle className="w-16 h-16 text-red-400" />
          </motion.div>
        </motion.div>

        {/* Error Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-white mb-3">
            Oops! Something went wrong
          </h1>
          <p className="text-dark-400 mb-8">
            {message || "An unexpected error has occurred. Please try again later."}
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button
            onClick={() => navigate("/")}
            icon={Home}
          >
            Go Home
          </Button>
          <Button
            variant="secondary"
            onClick={() => window.location.reload()}
            icon={RefreshCw}
          >
            Try Again
          </Button>
        </motion.div>

        {/* Error Code */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-dark-600 text-sm mt-8"
        >
          Error Code: 500
        </motion.p>
      </div>
    </PageTransition>
  );
};

export default ErrorPage;

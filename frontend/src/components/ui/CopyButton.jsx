import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const CopyButton = ({ text, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleCopy}
      className={`
        relative flex items-center justify-center gap-2
        px-4 py-2 rounded-md
        bg-surface-secondary border border-border-base
        text-on-surface-secondary hover:text-primary
        hover:border-primary/50
        transition-all duration-300
        text-[10px] font-bold uppercase tracking-widest
        ${className}
      `}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="check"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="flex items-center gap-2 text-primary"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Recorded</span>
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="flex items-center gap-2"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Path</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default CopyButton;

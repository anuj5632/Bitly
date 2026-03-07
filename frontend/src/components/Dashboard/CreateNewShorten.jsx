import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, ArrowRight, Check, Copy, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

import api from '../../api/api';
import { useStoreContext } from '../../contextApi/ContextApi';
import { Button } from '../ui';

const CreateNewShorten = ({ setOpen, refetch }) => {
  const { token } = useStoreContext();
  const [loading, setLoading] = useState(false);
  const [createdUrl, setCreatedUrl] = useState(null);
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      originalUrl: "",
    },
    mode: "onTouched",
  });

  const createShortUrlHandler = async (data) => {
    setLoading(true);
    try {
      const { data: res } = await api.post("/api/url/shorten", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });

      const shortenUrl = `${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${res.shortUrl}`;
      setCreatedUrl(shortenUrl);
      
      // Copy to clipboard
      await navigator.clipboard.writeText(shortenUrl);
      setCopied(true);
      
      toast.success("Short URL created and copied!", {
        style: {
          background: '#0f172a',
          color: '#e2e8f0',
          border: '1px solid rgba(124, 58, 237, 0.3)',
        },
      });

      if (refetch) {
        refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create short URL", {
        style: {
          background: '#0f172a',
          color: '#e2e8f0',
          border: '1px solid rgba(239, 68, 68, 0.3)',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAgain = async () => {
    if (createdUrl) {
      await navigator.clipboard.writeText(createdUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCreateAnother = () => {
    setCreatedUrl(null);
    setCopied(false);
    reset();
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {createdUrl ? (
          // Success State
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1 }}
              className="inline-flex items-center justify-center p-4 bg-emerald-500/10 rounded-2xl mb-4"
            >
              <Check className="w-10 h-10 text-emerald-400" />
            </motion.div>
            
            <h3 className="text-xl font-semibold text-white mb-2">
              Short URL Created!
            </h3>
            <p className="text-dark-400 text-sm mb-6">
              Your link is ready to share
            </p>

            {/* Created URL Display */}
            <div className="bg-dark-800/50 border border-dark-600 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-600/10 rounded-lg">
                  <Link2 className="w-5 h-5 text-primary-400" />
                </div>
                <span className="text-primary-300 font-medium flex-1 truncate text-left">
                  {createdUrl?.replace(/^https?:\/\//, '')}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopyAgain}
                  className={`
                    p-2 rounded-lg transition-colors
                    ${copied 
                      ? 'bg-emerald-500/10 text-emerald-400' 
                      : 'bg-dark-700 text-dark-300 hover:text-white'
                    }
                  `}
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </motion.button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={handleCreateAnother}
              >
                Create Another
              </Button>
              <Button
                className="flex-1"
                onClick={() => setOpen(false)}
              >
                Done
              </Button>
            </div>
          </motion.div>
        ) : (
          // Form State
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(createShortUrlHandler)}
            className="space-y-6"
          >
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center p-3 bg-primary-600/10 rounded-xl mb-3">
                <Sparkles className="w-6 h-6 text-primary-400" />
              </div>
              <p className="text-dark-400 text-sm">
                Paste your long URL below to create a shortened link
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="originalUrl" className="block text-sm font-medium text-dark-300">
                Original URL
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">
                  <Link2 className="w-5 h-5" />
                </div>
                <input
                  type="url"
                  id="originalUrl"
                  placeholder="https://example.com/your-long-url"
                  className={`
                    w-full pl-11 pr-4 py-3
                    bg-dark-800/50 backdrop-blur-sm
                    border rounded-xl
                    text-white placeholder-dark-400
                    transition-all duration-300
                    input-glow
                    ${errors.originalUrl ? 'border-red-500' : 'border-dark-600 focus:border-primary-500 hover:border-dark-500'}
                  `}
                  {...register("originalUrl", {
                    required: "URL is required",
                    pattern: {
                      value: /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                      message: "Please enter a valid URL"
                    }
                  })}
                />
              </div>
              {errors.originalUrl && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-400"
                >
                  {errors.originalUrl.message}
                </motion.p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              loading={loading}
              icon={ArrowRight}
              iconPosition="right"
            >
              Create Short URL
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateNewShorten;

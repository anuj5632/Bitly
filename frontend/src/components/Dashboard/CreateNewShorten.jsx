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
      
      await navigator.clipboard.writeText(shortenUrl);
      setCopied(true);
      
      toast.success("Registry updated!");

      if (refetch) {
        refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error("Registry error");
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
    <div className="space-y-8">
      <AnimatePresence mode="wait">
        {createdUrl ? (
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
              className="inline-flex items-center justify-center p-5 bg-primary/10 border border-primary/20 rounded-md mb-6"
            >
              <Check className="w-10 h-10 text-primary" />
            </motion.div>
            
            <h3 className="font-heading text-2xl font-bold text-white mb-2 uppercase tracking-widest">
              Success
            </h3>
            <p className="font-body text-on-surface-secondary text-sm mb-8">
              The link has been inscribed into the registry
            </p>

            <div className="bg-surface-secondary border-2 border-border-base rounded-md p-5 mb-8 neomorph-inset">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-surface border border-border-base rounded-sm text-primary">
                  <Link2 className="w-5 h-5" />
                </div>
                <span className="font-heading font-bold text-primary lime-glow flex-1 truncate text-left">
                  {createdUrl?.replace(/^https?:\/\//, '')}
                </span>
                <button
                  onClick={handleCopyAgain}
                  className={`
                    p-2 rounded-sm transition-all duration-300
                    ${copied 
                      ? 'bg-primary text-black' 
                      : 'bg-surface border border-border-base text-on-surface-muted hover:text-white'
                    }
                  `}
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={handleCreateAnother}
              >
                New Sketch
              </Button>
              <Button
                className="flex-1"
                onClick={() => setOpen(false)}
              >
                Exit
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(createShortUrlHandler)}
            className="space-y-8"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-4 bg-surface-secondary border border-border-base rounded-md mb-6 text-primary shadow-sm">
                <Sparkles className="w-8 h-8" />
              </div>
              <p className="font-body text-on-surface-secondary text-sm">
                Inscribe your long path into the nocturnal registry
              </p>
            </div>

            <div className="space-y-3">
              <label htmlFor="originalUrl" className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-muted">
                Original Path
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-muted">
                  <Link2 className="w-5 h-5" />
                </div>
                <input
                  type="url"
                  id="originalUrl"
                  placeholder="HTTPS://EXAMPLE.COM/PATH"
                  className={`
                    w-full pl-12 pr-4 py-4
                    bg-surface-secondary
                    border rounded-md
                    text-white placeholder-on-surface-muted/50
                    transition-all duration-300
                    neomorph-inset
                    focus:outline-none focus:border-primary
                    hover:border-border-hover
                    ${errors.originalUrl ? 'border-error' : 'border-border-base'}
                  `}
                  {...register("originalUrl", {
                    required: "Required",
                    pattern: {
                      value: /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                      message: "Invalid URL"
                    }
                  })}
                />
              </div>
              {errors.originalUrl && (
                <p className="text-[10px] text-error font-bold uppercase tracking-widest">
                  {errors.originalUrl.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full py-4"
              size="lg"
              loading={loading}
              icon={ArrowRight}
              iconPosition="right"
            >
              Shorten Path
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateNewShorten;

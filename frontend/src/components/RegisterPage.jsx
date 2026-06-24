import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, UserPlus2 } from 'lucide-react';
import toast from 'react-hot-toast';

import api from '../api/api';
import { Button, GlassCard, PageTransition } from './ui';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const registerHandler = async (data) => {
    setLoader(true);
    try {
      await api.post("/api/auth/public/register", data);
      reset();
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Registration failed");
    } finally {
      setLoader(false);
    }
  };

  return (
    <PageTransition className="min-h-screen flex items-center justify-center px-4 bg-surface relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-crosshatch opacity-20 pointer-events-none" />

      <div className="relative w-full max-w-md">
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 animate-morph blur-3xl pointer-events-none" />
        
        <GlassCard className="!p-10 border-2 border-border-base" hover={false} tilt="0deg">
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center justify-center p-4 bg-surface-secondary border border-border-base rounded-md mb-6 text-primary shadow-sm"
            >
              <UserPlus2 className="w-10 h-10" />
            </motion.div>
            <h1 className="font-heading text-3xl font-bold text-white mb-3">Join The Fold</h1>
            <p className="font-body text-on-surface-secondary text-sm">Begin your nocturnal sketching journey</p>
          </div>

          <form onSubmit={handleSubmit(registerHandler)} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-muted">
                Username
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-muted">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  id="username"
                  placeholder="USERNAME"
                  className={`
                    w-full pl-12 pr-4 py-3
                    bg-surface-secondary
                    border rounded-md
                    text-white placeholder-on-surface-muted/50
                    transition-all duration-300
                    neomorph-inset
                    focus:outline-none focus:border-primary
                    hover:border-border-hover
                    ${errors.username ? 'border-error' : 'border-border-base'}
                  `}
                  {...register("username", { required: "Required" })}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-muted">
                Email
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-muted">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="EMAIL@EXAMPLE.COM"
                  className={`
                    w-full pl-12 pr-4 py-3
                    bg-surface-secondary
                    border rounded-md
                    text-white placeholder-on-surface-muted/50
                    transition-all duration-300
                    neomorph-inset
                    focus:outline-none focus:border-primary
                    hover:border-border-hover
                    ${errors.email ? 'border-error' : 'border-border-base'}
                  `}
                  {...register("email", { 
                    required: "Required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email"
                    }
                  })}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-muted">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-muted">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  id="password"
                  placeholder="PASSWORD"
                  className={`
                    w-full pl-12 pr-4 py-3
                    bg-surface-secondary
                    border rounded-md
                    text-white placeholder-on-surface-muted/50
                    transition-all duration-300
                    neomorph-inset
                    focus:outline-none focus:border-primary
                    hover:border-border-hover
                    ${errors.password ? 'border-error' : 'border-border-base'}
                  `}
                  {...register("password", { 
                    required: "Required",
                    minLength: { value: 6, message: "Min 6 chars" }
                  })}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full mt-4"
              size="lg"
              loading={loader}
              icon={ArrowRight}
              iconPosition="right"
            >
              Initialize Account
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center pt-8 border-t border-border-base">
            <p className="text-on-surface-muted text-xs uppercase font-bold tracking-widest">
              Existing Artist?{' '}
              <Link
                to="/login"
                className="text-primary hover:text-primary-hover transition-colors underline underline-offset-4"
              >
                Sign In
              </Link>
            </p>
          </div>
        </GlassCard>
      </div>
    </PageTransition>
  );
};

export default RegisterPage;

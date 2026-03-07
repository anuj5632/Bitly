import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

import api from '../api/api';
import { useStoreContext } from '../contextApi/ContextApi';
import { Button, GlassCard, GradientBlob, PageTransition } from './ui';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { token, setToken } = useStoreContext();

  useEffect(() => {
    console.log("Token changed:", token);
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [token, navigate]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onTouched",
  });

  const loginHandler = async (data) => {
    setLoader(true);
    try {
      const { data: response } = await api.post("/api/auth/public/login", data);
      console.log("API Response:", response);
      console.log("Token from response:", response.Token);
      setToken(response.Token);
      localStorage.setItem("JWT_TOKEN", JSON.stringify(response.Token));
      toast.success("Welcome back!", {
        style: {
          background: '#0f172a',
          color: '#e2e8f0',
          border: '1px solid rgba(124, 58, 237, 0.3)',
        },
      });
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Invalid credentials", {
        style: {
          background: '#0f172a',
          color: '#e2e8f0',
          border: '1px solid rgba(239, 68, 68, 0.3)',
        },
      });
    } finally {
      setLoader(false);
    }
  };

  return (
    <PageTransition className="min-h-screen flex items-center justify-center px-4 py-20">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <GradientBlob className="w-96 h-96 -top-48 -left-48 opacity-30" color="primary" />
        <GradientBlob className="w-96 h-96 bottom-0 right-0 opacity-20 animation-delay-2000" color="purple" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.03)_1px,transparent_1px)] bg-size-[64px_64px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Glow effect behind card */}
        <div className="absolute inset-0 bg-linear-to-r from-primary-600/20 to-indigo-600/20 rounded-3xl blur-3xl" />
        
        <GlassCard className="relative" padding="p-8" hover={false}>
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="inline-flex items-center justify-center p-3 bg-linear-to-br from-primary-600 to-indigo-600 rounded-2xl mb-4"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
            <p className="text-dark-400">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit(loginHandler)} className="space-y-5">
            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-dark-300">
                Username
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  className={`
                    w-full pl-11 pr-4 py-3
                    bg-dark-800/50 backdrop-blur-sm
                    border rounded-xl
                    text-white placeholder-dark-400
                    transition-all duration-300
                    input-glow
                    ${errors.username ? 'border-red-500' : 'border-dark-600 focus:border-primary-500 hover:border-dark-500'}
                  `}
                  {...register("username", { required: "Username is required" })}
                />
              </div>
              {errors.username && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-400"
                >
                  {errors.username.message}
                </motion.p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-dark-300">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className={`
                    w-full pl-11 pr-4 py-3
                    bg-dark-800/50 backdrop-blur-sm
                    border rounded-xl
                    text-white placeholder-dark-400
                    transition-all duration-300
                    input-glow
                    ${errors.password ? 'border-red-500' : 'border-dark-600 focus:border-primary-500 hover:border-dark-500'}
                  `}
                  {...register("password", { 
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters required" }
                  })}
                />
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-400"
                >
                  {errors.password.message}
                </motion.p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              loading={loader}
              icon={ArrowRight}
              iconPosition="right"
            >
              Sign In
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-dark-400 text-sm">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </GlassCard>
      </div>
    </PageTransition>
  );
};

export default LoginPage;

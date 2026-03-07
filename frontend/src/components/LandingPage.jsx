import { useNavigate } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";
import { Link2, BarChart3, Shield, Zap, ArrowRight, Sparkles } from "lucide-react";

import Card from "./Card";
import { useStoreContext } from "../contextApi/ContextApi";
import { Button, GradientBlob, PageTransition } from "./ui";

const features = [
  {
    icon: Link2,
    title: "Simple URL Shortening",
    desc: "Create short, memorable URLs in just a few clicks. Our intuitive interface ensures you can start shortening URLs without any hassle.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: BarChart3,
    title: "Powerful Analytics",
    desc: "Gain insights into your link performance with our comprehensive analytics dashboard. Track clicks and optimize your marketing strategies.",
    color: "from-primary-500 to-indigo-500",
  },
  {
    icon: Shield,
    title: "Enhanced Security",
    desc: "Rest assured with our robust security measures. All shortened URLs are protected with advanced encryption.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Zap,
    title: "Fast and Reliable",
    desc: "Enjoy lightning-fast redirects and high uptime with our reliable infrastructure. Your shortened URLs will always be available.",
    color: "from-amber-500 to-orange-500",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = useStoreContext();

  const dashBoardNavigateHandler = () => {
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <PageTransition className="min-h-screen pt-20">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <GradientBlob className="w-96 h-96 -top-48 -left-48 opacity-30" color="primary" />
        <GradientBlob className="w-96 h-96 top-1/4 -right-48 opacity-20 animation-delay-2000" color="purple" />
        <GradientBlob className="w-96 h-96 bottom-0 left-1/3 opacity-20 animation-delay-4000" color="blue" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.03)_1px,transparent_1px)] bg-size-[64px_64px]" />
      </div>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Hero Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-primary-300">The smarter way to share links</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              <span className="text-white">Shorten URLs.</span>
              <br />
              <span className="gradient-text">Amplify Results.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-dark-300 max-w-xl mx-auto lg:mx-0 mb-8"
            >
              Linklytics streamlines URL shortening, making sharing links effortless and efficient. 
              Generate concise, trackable URLs in seconds with powerful analytics.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Button
                size="lg"
                onClick={dashBoardNavigateHandler}
                icon={ArrowRight}
                iconPosition="right"
              >
                Get Started Free
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={dashBoardNavigateHandler}
              >
                View Dashboard
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center justify-center lg:justify-start gap-8 mt-12 pt-8 border-t border-dark-700/50"
            >
              {[
                { value: "10M+", label: "Links Created" },
                { value: "50K+", label: "Active Users" },
                { value: "99.9%", label: "Uptime" },
              ].map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-dark-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 w-full max-w-lg lg:max-w-none"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-linear-to-r from-primary-600/20 to-indigo-600/20 rounded-3xl blur-3xl" />
              
              {/* Main card */}
              <div className="relative bg-dark-900/80 backdrop-blur-xl border border-dark-700/50 rounded-3xl p-8 shadow-glass-lg">
                {/* URL Input Preview */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-dark-800/50 border border-dark-600 rounded-2xl">
                    <Link2 className="w-5 h-5 text-primary-400" />
                    <span className="text-dark-300 flex-1 truncate">https://example.com/very-long-url-here</span>
                  </div>
                  
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.3 }}
                    className="flex items-center gap-3 p-4 bg-primary-600/10 border border-primary-500/30 rounded-2xl"
                  >
                    <div className="p-2 bg-primary-600 rounded-lg">
                      <Link2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-primary-300 font-medium">lnklyt.cs/abc123</span>
                    <span className="ml-auto text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                      Shortened!
                    </span>
                  </motion.div>

                  {/* Mini stats */}
                  <div className="grid grid-cols-3 gap-3 pt-4">
                    {[
                      { label: "Clicks", value: "1,234" },
                      { label: "Countries", value: "12" },
                      { label: "Devices", value: "456" },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1 + i * 0.1 }}
                        className="text-center p-3 bg-dark-800/50 rounded-xl"
                      >
                        <div className="text-lg font-bold text-white">{stat.value}</div>
                        <div className="text-xs text-dark-400">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything you need to{" "}
            <span className="gradient-text">manage links</span>
          </h2>
          <p className="text-dark-300 max-w-2xl mx-auto">
            Trusted by individuals and teams at the world's best companies. 
            Powerful features to help you track and optimize your links.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              title={feature.title}
              desc={feature.desc}
              icon={feature.icon}
              color={feature.color}
              delay={index * 0.1}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-linear-to-br from-primary-600/20 to-indigo-600/20 border border-primary-500/20 rounded-3xl p-12 text-center"
        >
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-600/30 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-dark-300 max-w-xl mx-auto mb-8">
              Join thousands of users who trust Linklytics for their URL management needs.
            </p>
            <Button size="lg" onClick={dashBoardNavigateHandler}>
              Start Shortening for Free
            </Button>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  );
};

export default LandingPage;

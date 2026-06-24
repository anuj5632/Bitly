import { useNavigate } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";
import { Link2, BarChart3, Shield, Zap, ArrowRight } from "lucide-react";
//import image2 from "images/image2.png";

import { useStoreContext } from "../contextApi/ContextApi";
import { Button, PageTransition, GlassCard as Card } from "./ui";

const features = [
  {
    icon: Link2,
    title: "Simple URL Shortening",
    desc: "Create short, memorable URLs in just a few clicks. Our intuitive interface ensures you can start shortening URLs without any hassle.",
    tilt: "1.2deg"
  },
  {
    icon: BarChart3,
    title: "Powerful Analytics",
    desc: "Gain insights into your link performance with our comprehensive analytics dashboard. Track clicks and optimize your marketing strategies.",
    tilt: "-0.8deg"
  },
  {
    icon: Shield,
    title: "Enhanced Security",
    desc: "Rest assured with our robust security measures. All shortened URLs are protected with advanced encryption.",
    tilt: "1deg"
  },
  {
    icon: Zap,
    title: "Fast and Reliable",
    desc: "Enjoy lightning-fast redirects and high uptime with our reliable infrastructure. Your shortened URLs will always be available.",
    tilt: "-1.5deg"
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
    <PageTransition className="min-h-screen relative overflow-hidden bg-surface pb-48">
      {/* Background Texture */}
      <div className="fixed inset-0 bg-crosshatch pointer-events-none opacity-20" />

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-32">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Hero Content */}
          <div className="flex-1 text-center lg:text-left z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block px-3 py-1 bg-primary text-black text-[10px] font-bold uppercase tracking-widest mb-8 highlight-mark"
            >
              The Nocturnal Sketchbook
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-5xl sm:text-7xl font-bold leading-tight mb-8"
            >
              <span className="text-white">Shorten URLs.</span>
              <br />
              <span className="text-primary lime-glow-lg scribble-underline">Amplify Results.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg sm:text-xl text-on-surface-secondary max-w-xl mx-auto lg:mx-0 mb-12 font-body"
            >
              Linklytics streamlines URL shortening, making sharing links effortless and efficient. 
              Generate concise, trackable URLs in seconds with powerful analytics.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6"
            >
              <Button
                size="xl"
                variant="primary"
                onClick={dashBoardNavigateHandler}
                icon={ArrowRight}
                iconPosition="right"
              >
                Get Started Free
              </Button>
              <Button
                variant="secondary"
                size="xl"
                onClick={dashBoardNavigateHandler}
              >
                View Dashboard
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center lg:justify-start gap-12 mt-16 pt-12 border-t border-border-base"
            >
              {[
                { value: "10M+", label: "Links Created" },
                { value: "50K+", label: "Active Users" },
                { value: "99.9%", label: "Uptime" },
              ].map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-white font-heading">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-on-surface-muted font-bold">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, rotate: 5, scale: 0.9 }}
            animate={{ opacity: 1, rotate: 2, scale: 1 }}
            className="flex-1 w-full max-w-lg lg:max-w-none relative"
          >
            <div className="absolute -z-10 -top-20 -right-20 w-80 h-80 bg-primary/10 animate-morph blur-3xl" />
            
            <Card tilt="2deg" className="p-1 !bg-white border border-white shadow-lg overflow-visible">
               <div className="bg-surface p-8 rounded-sm torn-paper h-full min-h-[350px] flex flex-col justify-center gap-8 border border-border-base">
                  <div className="overflow-hidden rounded-md border border-border-base">
  <img
    src="/image/img2.png"
    alt="Linklytics Dashboard"
    className="w-full h-[350px] object-cover rounded-md"
  />
</div>
                  
                  <motion.div
                    animate={{ scale: [1, 1.05, 1], y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    className="flex items-center gap-4 p-5 bg-primary text-black rounded-md shadow-[0_10px_30px_rgba(223,255,0,0.4)]"
                  >
                    <div className="p-2 bg-black/10 rounded-sm">
                      <Link2 className="w-5 h-5" />
                    </div>
                    <span className="font-heading font-bold text-lg">lnklyt.cs/beta-1</span>
                    <span className="ml-auto text-[10px] font-bold uppercase tracking-tighter bg-black/20 px-2 py-1 rounded-sm">
                      SHORTENED
                    </span>
                  </motion.div>

                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-2 bg-surface-secondary rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ x: "-100%" }}
                          animate={{ x: "0%" }}
                          transition={{ delay: 0.5 + i * 0.2, duration: 1 }}
                          className="h-full bg-border-base"
                        />
                      </div>
                    ))}
                  </div>
               </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative max-w-7xl mx-auto px-6 lg:px-12 py-32 bg-surface-secondary/50 border-y border-border-base">
        <div className="text-center mb-24">
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-6">
            Everything you need to <span className="text-primary lime-glow">manage links</span>
          </h2>
          <div className="h-1.5 w-24 bg-primary mx-auto mb-10" />
          <p className="text-on-surface-secondary max-w-2xl mx-auto font-body text-lg">
            Trusted by individuals and teams at the world's best companies. 
            Powerful features to help you track and optimize your links.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <Card
              key={index}
              tilt={feature.tilt}
              className="flex flex-col gap-8 h-full group"
            >
              <div className="p-4 bg-surface border border-border-base w-fit rounded-md text-primary shadow-sm group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8" />
              </div>
              <div className="space-y-4">
                <h3 className="font-heading text-2xl font-bold text-white">{feature.title}</h3>
                <p className="text-on-surface-secondary leading-relaxed font-body">
                  {feature.desc}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative max-w-7xl mx-auto px-6 lg:px-12 py-32">
        <Card tilt="0deg" className="relative overflow-hidden bg-surface !p-20 text-center border-2 border-border-base shadow-lg">
          <div className="absolute top-0 left-0 w-full h-1.5 marching-ants" />
          <div className="relative z-10">
            <h2 className="font-heading text-4xl sm:text-6xl font-bold text-white mb-10">
              Ready to get started?
            </h2>
            <p className="text-on-surface-secondary max-w-2xl mx-auto mb-14 font-body text-xl">
              Join thousands of users who trust Linklytics for their URL management needs.
              Start shortening for free today.
            </p>
            <Button size="xl" variant="primary" onClick={dashBoardNavigateHandler}>
              Start Shortening for Free
            </Button>
          </div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 animate-morph blur-3xl" />
        </Card>
      </section>
    </PageTransition>
  );
};

export default LandingPage;

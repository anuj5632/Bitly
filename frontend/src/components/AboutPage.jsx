import React from "react";
import { motion } from "framer-motion";
import { Link2, BarChart3, Shield, Zap, Target, Users, Globe } from "lucide-react";
import { GlassCard, PageTransition } from "./ui";

const features = [
  {
    icon: Link2,
    title: "Simple URL Shortening",
    description: "Experience the ease of creating short, memorable URLs in just a few clicks. Our intuitive interface and quick setup process ensure you can start shortening URLs without any hassle.",
    tilt: "0.5deg"
  },
  {
    icon: BarChart3,
    title: "Powerful Analytics",
    description: "Gain insights into your link performance with our comprehensive analytics dashboard. Track clicks, geographical data, and referral sources to optimize your marketing strategies.",
    tilt: "-0.8deg"
  },
  {
    icon: Shield,
    title: "Enhanced Security",
    description: "Rest assured with our robust security measures. All shortened URLs are protected with advanced encryption, ensuring your data remains safe and secure.",
    tilt: "0.6deg"
  },
  {
    icon: Zap,
    title: "Fast and Reliable",
    description: "Enjoy lightning-fast redirects and high uptime with our reliable infrastructure. Your shortened URLs will always be available and responsive, ensuring a seamless experience.",
    tilt: "-1deg"
  }
];

const stats = [
  { value: "10M+", label: "Links Shortened", icon: Link2, tilt: "1deg" },
  { value: "50K+", label: "Active Users", icon: Users, tilt: "-0.5deg" },
  { value: "180+", label: "Countries", icon: Globe, tilt: "0.8deg" },
  { value: "99.9%", label: "Uptime", icon: Target, tilt: "-1.2deg" },
];

const AboutPage = () => {
  return (
    <PageTransition className="min-h-screen relative overflow-hidden bg-surface pt-24 pb-48">
      {/* Background Texture */}
      <div className="fixed inset-0 bg-crosshatch opacity-10 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-block px-3 py-1 bg-primary text-black text-[10px] font-bold uppercase tracking-widest mb-8 highlight-mark">
            Our Manifesto
          </div>
          <h1 className="font-heading text-5xl sm:text-7xl font-bold text-white mb-8">
            About <span className="text-primary lime-glow-lg scribble-underline">Linklytics</span>
          </h1>
          <p className="font-body text-lg sm:text-xl text-on-surface-secondary leading-relaxed">
            Linklytics simplifies URL shortening for efficient sharing. We help individuals 
            and businesses create, manage, and track shortened links with powerful analytics 
            and enterprise-grade security.
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative max-w-7xl mx-auto px-6 lg:px-12 pb-32">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <GlassCard key={stat.label} tilt={stat.tilt} className="text-center group">
              <div className="inline-flex p-4 bg-surface-secondary border border-border-base rounded-md mb-6 text-primary group-hover:scale-110 transition-transform">
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="font-heading text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="font-body text-[10px] font-bold uppercase tracking-widest text-on-surface-muted">{stat.label}</div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative max-w-7xl mx-auto px-6 lg:px-12 pb-32">
        <div className="text-center mb-24">
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-8">
            Why Choose Us?
          </h2>
          <div className="h-1.5 w-24 bg-primary mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <GlassCard key={feature.title} tilt={feature.tilt} className="group">
              <div className="flex flex-col gap-8">
                <div className="p-5 bg-surface-secondary border border-border-base w-fit rounded-md text-primary shadow-sm group-hover:rotate-6 transition-transform">
                  <feature.icon className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-4 uppercase tracking-tight">{feature.title}</h3>
                  <p className="font-body text-on-surface-secondary leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative max-w-7xl mx-auto px-6 lg:px-12 pb-32">
        <GlassCard tilt="0deg" className="text-center !p-1 border-2 border-white shadow-lg overflow-visible" hover={false}>
          <div className="bg-surface p-12 sm:p-20 rounded-sm torn-paper h-full border border-border-base relative">
            <div className="absolute top-0 left-0 w-full h-1 marching-ants opacity-30" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <h2 className="font-heading text-4xl sm:text-6xl font-bold text-white mb-10 lime-glow">Our Mission</h2>
              <p className="font-body text-on-surface-secondary max-w-3xl mx-auto leading-relaxed text-lg sm:text-xl">
                We believe in making link management simple and accessible for everyone. 
                Our mission is to provide the most reliable, secure, and feature-rich URL 
                shortening platform that helps businesses and individuals share content 
                more effectively across the digital landscape.
              </p>
            </motion.div>
          </div>
        </GlassCard>
      </section>
    </PageTransition>
  );
};

export default AboutPage;

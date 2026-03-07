import React from "react";
import { motion } from "framer-motion";
import { Link2, BarChart3, Shield, Zap, Target, Users, Globe } from "lucide-react";
import { GlassCard, GradientBlob, PageTransition } from "./ui";

const features = [
  {
    icon: Link2,
    title: "Simple URL Shortening",
    description: "Experience the ease of creating short, memorable URLs in just a few clicks. Our intuitive interface and quick setup process ensure you can start shortening URLs without any hassle.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: BarChart3,
    title: "Powerful Analytics",
    description: "Gain insights into your link performance with our comprehensive analytics dashboard. Track clicks, geographical data, and referral sources to optimize your marketing strategies.",
    color: "from-primary-500 to-indigo-500"
  },
  {
    icon: Shield,
    title: "Enhanced Security",
    description: "Rest assured with our robust security measures. All shortened URLs are protected with advanced encryption, ensuring your data remains safe and secure.",
    color: "from-emerald-500 to-teal-500"
  },
  {
    icon: Zap,
    title: "Fast and Reliable",
    description: "Enjoy lightning-fast redirects and high uptime with our reliable infrastructure. Your shortened URLs will always be available and responsive, ensuring a seamless experience.",
    color: "from-amber-500 to-orange-500"
  }
];

const stats = [
  { value: "10M+", label: "Links Shortened", icon: Link2 },
  { value: "50K+", label: "Active Users", icon: Users },
  { value: "180+", label: "Countries Reached", icon: Globe },
  { value: "99.9%", label: "Uptime", icon: Target },
];

const AboutPage = () => {
  return (
    <PageTransition className="min-h-screen pt-20">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <GradientBlob className="w-96 h-96 -top-48 -left-48 opacity-30" color="primary" />
        <GradientBlob className="w-96 h-96 top-1/2 -right-48 opacity-20 animation-delay-2000" color="purple" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            About <span className="gradient-text">Linklytics</span>
          </h1>
          <p className="text-lg text-dark-300 leading-relaxed">
            Linklytics simplifies URL shortening for efficient sharing. We help individuals 
            and businesses create, manage, and track shortened links with powerful analytics 
            and enterprise-grade security.
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="text-center">
                <div className="inline-flex p-3 bg-primary-600/10 rounded-xl mb-4">
                  <stat.icon className="w-6 h-6 text-primary-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-dark-400 text-sm">{stat.label}</div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Why Choose Linklytics?
          </h2>
          <p className="text-dark-300 max-w-2xl mx-auto">
            We provide everything you need to manage your links effectively
          </p>
        </motion.div>

        <div className="space-y-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className={`flex flex-col md:flex-row gap-6 items-start ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className={`flex-shrink-0 p-4 rounded-2xl bg-gradient-to-br ${feature.color}`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-dark-300 leading-relaxed">{feature.description}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <GlassCard className="text-center" glow>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-dark-300 max-w-2xl mx-auto leading-relaxed">
              We believe in making link management simple and accessible for everyone. 
              Our mission is to provide the most reliable, secure, and feature-rich URL 
              shortening platform that helps businesses and individuals share content 
              more effectively across the digital landscape.
            </p>
          </motion.div>
        </GlassCard>
      </section>
    </PageTransition>
  );
};

export default AboutPage;

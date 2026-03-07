import React from "react";
import { motion } from "framer-motion";

const Card = ({ title, desc, icon: Icon, color = "from-primary-500 to-indigo-500", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative bg-dark-900/50 backdrop-blur-xl border border-dark-700/50 rounded-2xl p-6 overflow-hidden card-hover"
    >
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-linear-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
      
      {/* Icon */}
      {Icon && (
        <div className={`inline-flex p-3 rounded-xl bg-linear-to-br ${color} mb-4`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      )}
      
      {/* Content */}
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-300 transition-colors">
        {title}
      </h3>
      <p className="text-dark-400 text-sm leading-relaxed">
        {desc}
      </p>
      
      {/* Bottom border glow */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
    </motion.div>
  );
};

export default Card;

import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

const StatsCard = ({ title, value, icon: Icon, trend, trendValue, className = '' }) => {
  const isPositive = trend === 'up';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={`
        relative overflow-hidden
        bg-dark-900/50 backdrop-blur-xl
        border border-dark-700/50
        rounded-2xl p-6
        ${className}
      `}
    >
      {/* Background gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-primary-600/10 to-transparent rounded-full blur-2xl" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-dark-400 text-sm font-medium">{title}</span>
          {Icon && (
            <div className="p-2 bg-primary-600/10 rounded-lg">
              <Icon className="w-5 h-5 text-primary-400" />
            </div>
          )}
        </div>
        
        <div className="flex items-end justify-between">
          <div className="text-3xl font-bold text-white">
            <AnimatedCounter value={value} />
          </div>
          
          {trend && (
            <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              <svg
                className={`w-4 h-4 ${isPositive ? '' : 'rotate-180'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span>{trendValue}%</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;

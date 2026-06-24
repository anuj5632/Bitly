import { motion } from 'framer-motion';

const variants = {
  primary: 'marching-ants bg-transparent text-primary hover:bg-primary hover:text-black transition-colors',
  secondary: 'bg-surface-card border border-border-base text-on-surface hover:bg-surface-card-hover hover:border-border-hover shadow-md',
  outline: 'border-2 border-primary text-primary hover:bg-primary/10',
  ghost: 'text-on-surface-secondary hover:text-on-surface hover:bg-surface-card',
  danger: 'bg-error hover:bg-red-500 text-black',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs tracking-wider uppercase font-bold',
  md: 'px-5 py-2.5 text-sm tracking-wider uppercase font-bold',
  lg: 'px-6 py-3 text-base tracking-wider uppercase font-bold',
  xl: 'px-8 py-4 text-lg tracking-wider uppercase font-bold',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        relative inline-flex items-center justify-center gap-2
        rounded-md font-body
        transition-all duration-300 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="font-bold">Loading...</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
          <span className="relative z-10">{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
        </>
      )}
    </motion.button>
  );
};

export default Button;

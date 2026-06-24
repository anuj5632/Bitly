import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const Input = forwardRef(({
  label,
  id,
  type = 'text',
  error,
  className = '',
  icon: Icon,
  ...props
}, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-bold uppercase tracking-widest text-on-surface-secondary"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-muted">
            <Icon className="w-5 h-5" />
          </div>
        )}
        
        <input
          ref={ref}
          id={id}
          type={type}
          className={`
            w-full px-4 py-3
            ${Icon ? 'pl-11' : ''}
            bg-surface-card/50
            border border-border-base
            rounded-md
            text-on-surface placeholder-on-surface-muted
            transition-all duration-300
            neomorph-inset
            focus:outline-none
            focus:border-primary
            focus:shadow-[0_0_15px_rgba(223,255,0,0.2)]
            hover:border-border-hover
            ${error ? 'border-error focus:border-error' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-error font-bold flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

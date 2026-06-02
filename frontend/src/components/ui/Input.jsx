import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Input = ({
  label,
  id,
  type = 'text',
  error,
  placeholder,
  value,
  onChange,
  className = '',
  icon = null,
  required = false,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-display">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      
      <div className="relative flex items-center w-full">
        {icon && (
          <span className="absolute left-4 text-slate-400 pointer-events-none w-5 h-5 flex items-center justify-center">
            {icon}
          </span>
        )}
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`
            w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400
            transition-all duration-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
            ${icon ? 'pl-11' : ''}
            ${error ? 'border-rose-300 focus:ring-rose-500/10 focus:border-rose-500 bg-rose-50/20' : 'border-slate-200'}
          `}
          {...props}
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-xs text-rose-500 font-medium mt-0.5"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Textarea = ({
  label,
  id,
  error,
  placeholder,
  value,
  onChange,
  className = '',
  rows = 4,
  required = false,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-display">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className={`
          w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400
          transition-all duration-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-y
          ${error ? 'border-rose-300 focus:ring-rose-500/10 focus:border-rose-500 bg-rose-50/20' : 'border-slate-200'}
        `}
        {...props}
      />

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-xs text-rose-500 font-medium mt-0.5"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Select = ({
  label,
  id,
  options = [],
  error,
  value,
  onChange,
  className = '',
  required = false,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-display">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className={`
          w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm text-slate-800 cursor-pointer
          transition-all duration-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
          ${error ? 'border-rose-300 focus:ring-rose-500/10 focus:border-rose-500 bg-rose-50/20' : 'border-slate-200'}
        `}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-xs text-rose-500 font-medium mt-0.5"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

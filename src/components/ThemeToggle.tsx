import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  showLabel?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  showLabel = false, 
  className = '',
  size = 'md' 
}) => {
  const { isDark, toggleTheme } = useTheme();

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-4 h-4 sm:w-5 sm:h-5',
    lg: 'w-5 h-5'
  };

  const buttonPaddings = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 sm:px-3 text-xs sm:text-sm',
    lg: 'p-2.5 sm:px-4 text-sm font-bold'
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
      title={isDark ? 'Mode Terang (Light Mode)' : 'Mode Gelap (Dark Mode)'}
      className={`inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-200 border cursor-pointer select-none ${
        isDark 
          ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700 hover:border-slate-600 shadow-xs' 
          : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-200 hover:border-slate-300 shadow-2xs'
      } ${buttonPaddings[size]} ${className}`}
    >
      {isDark ? (
        <>
          <Sun className={`${iconSizes[size]} text-amber-400 animate-spin-slow`} />
          {showLabel && (
            <span className="font-semibold text-slate-200">
              Mode Terang
            </span>
          )}
        </>
      ) : (
        <>
          <Moon className={`${iconSizes[size]} text-slate-600`} />
          {showLabel && (
            <span className="font-semibold text-slate-700">
              Mode Gelap
            </span>
          )}
        </>
      )}
    </button>
  );
};

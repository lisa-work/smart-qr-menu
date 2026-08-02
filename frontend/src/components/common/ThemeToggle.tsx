import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { FaRegMoon } from "react-icons/fa";
import { LuSun } from "react-icons/lu";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <button onClick={toggleTheme} className="cursor-pointer">
      {isDark ? 
      (
        <div className="flex flex-row gap-3 items-center">
            <LuSun />
            Light Mode
        </div>
        )
       : (
        <div className="flex flex-row gap-3 items-center">
            <FaRegMoon />
            Dark Mode
        </div>
        )}
    </button>
    
  );
};
'use client';

import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Toggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    // <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-8 transition-colors duration-300">
    //   <div className="flex justify-end mb-4">
    //     <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
    //   </div>
    // </div>

    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
  <div className="flex justify-end p-4">
    <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
  </div>
  </div>

  );
}

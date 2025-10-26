import { Moon, Sun } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  return (
    <button
      className="cursor-pointer rounded-lg bg-neutral-900 p-1 px-4 py-2 text-sm font-medium text-neutral-50 dark:bg-neutral-50 dark:text-neutral-950"
      onClick={() => {
        document.documentElement.classList.toggle('dark');
        setIsDarkMode(document.documentElement.classList.contains('dark'));
      }}
      aria-label="toggle theme"
    >
      <motion.div>
        <AnimatePresence mode="wait">
          {isDarkMode ? (
            <motion.div
              animate={{ x: 0, y: 0, opacity: 1 }}
              initial={{ x: -20, y: 20, opacity: 0 }}
              exit={{ x: 20, y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              key="sun"
            >
              <Sun />
            </motion.div>
          ) : (
            <motion.div
              animate={{ x: 0, y: 0, opacity: 1 }}
              initial={{ x: -20, y: 20, opacity: 0 }}
              exit={{ x: 20, y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              key="moon"
            >
              <Moon />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
};
export { ThemeToggle };

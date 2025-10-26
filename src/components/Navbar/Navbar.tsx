import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

const navItems = ['Home', 'Projects', 'Contact', 'Resume'];

const Navbar = () => {
  const [activeArea, setActiveArea] = useState<string | null>('Home');
  const ignoreScroll = useRef(false);

  const onNavItemClick = (area: string) => {
    setActiveArea(area);
    ignoreScroll.current = true;
    const element = document.getElementById(area.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      ignoreScroll.current = false;
    }, 600);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (ignoreScroll.current) return;

      for (const section of navItems) {
        const el = document.getElementById(section.toLowerCase());
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveArea(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex w-full justify-around">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
        className="flex items-center gap-4 rounded-xl bg-neutral-900 p-4 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-950"
      >
        <ul className="flex gap-8">
          {navItems.map(area => (
            <li key={area} className="relative" onClick={() => onNavItemClick(area)}>
              <button className="cursor-pointer">{area}</button>
              {activeArea === area && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-2 left-1/2 h-1 w-4 -translate-x-1/2 rounded-full bg-indigo-500"
                />
              )}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export { Navbar };

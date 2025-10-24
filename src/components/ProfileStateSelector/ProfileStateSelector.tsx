import { useState, useEffect, useRef, type JSX } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle, Circle, CircleMinus, Clock, CircleX } from 'lucide-react';

type ProfileStatus = 'available' | 'busy' | 'do not disturb' | 'be right back' | 'away';
const statuses: ProfileStatus[] = ['available', 'busy', 'do not disturb', 'be right back', 'away'];

interface Status {
  icon: JSX.Element;
  color: string;
}

const statusIconMap: Record<ProfileStatus, Status> = {
  available: {
    icon: <CheckCircle className="h-4 w-4 lg:h-7 lg:w-7" />,
    color: 'bg-green-500',
  },
  busy: {
    icon: <Circle className="h-4 w-4 lg:h-7 lg:w-7" />,
    color: 'bg-red-500',
  },
  'do not disturb': {
    icon: <CircleMinus className="h-4 w-4 lg:h-7 lg:w-7" />,
    color: 'bg-red-500',
  },
  'be right back': {
    icon: <Clock className="h-4 w-4 lg:h-7 lg:w-7" />,
    color: 'bg-amber-500',
  },
  away: {
    icon: <CircleX className="h-4 w-4 lg:h-7 lg:w-7" />,
    color: 'bg-neutral-300',
  },
};

const ProfileStateSelector = () => {
  const [activeStatus, setActiveStatus] = useState<ProfileStatus>('available');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showStatusDropdown) {
        setShowStatusDropdown(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowStatusDropdown(false);
      }
    };

    if (showStatusDropdown) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showStatusDropdown]);

  return (
    <div ref={dropdownRef} className="relative flex flex-col items-center">
      <motion.button
        className="relative aspect-square w-20 cursor-pointer sm:w-24 md:w-28 lg:w-32"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        onClick={() => setShowStatusDropdown(!showStatusDropdown)}
        aria-label="Profile State Selector"
      >
        <img
          className="h-full w-full rounded-full border-2 border-neutral-950 object-cover dark:border-neutral-50"
          src="src/assets/character.png"
          alt="profile image"
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStatus}
            className={`absolute right-1 bottom-0 rounded-full p-0.5 text-black sm:right-1.5 sm:p-1 md:right-2 ${statusIconMap[activeStatus].color}`}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1, y: 20 }}
            transition={{ duration: 0.25 }}
          >
            {statusIconMap[activeStatus].icon}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {showStatusDropdown && (
          <motion.div
            className="absolute top-[calc(100%+1rem)] left-1/2 z-10 flex min-w-max -translate-x-1/2 flex-col gap-1 rounded-lg bg-white p-2 shadow-lg dark:bg-neutral-900"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {statuses.map(status => (
              <button
                key={status}
                className={`cursor-pointer rounded-md px-4 py-2 text-left text-sm transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-950/90 ${
                  status === activeStatus ? 'bg-neutral-200 dark:bg-neutral-950' : ''
                }`}
                onClick={() => {
                  setActiveStatus(status);
                  setShowStatusDropdown(false);
                }}
              >
                {status}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { ProfileStateSelector };

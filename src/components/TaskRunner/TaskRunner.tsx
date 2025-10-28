import { Circle, CircleCheck, LoaderCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

const TaskRunner = () => {
  const [tasks, setTasks] = useState([
    {
      label: 'Checking Out Code',
      description: 'Cloning repository and checking out the latest commit from main branch',
      status: 'todo',
    },
    {
      label: 'Setting Up Node.js',
      description: 'Installing Node.js runtime and configuring package manager',
      status: 'todo',
    },
    {
      label: 'Installing Dependencies',
      description: 'Running npm install to fetch all project dependencies',
      status: 'todo',
    },
    {
      label: 'Running Linter',
      description: 'Checking code quality and style with ESLint',
      status: 'todo',
    },
    {
      label: 'Running Tests',
      description: 'Executing unit tests and generating coverage reports',
      status: 'todo',
    },
    {
      label: 'Building Project',
      description: 'Compiling TypeScript and bundling assets for production',
      status: 'todo',
    },
    {
      label: 'Deploying to Production',
      description: 'Uploading build artifacts and deploying to hosting platform',
      status: 'todo',
    },
  ]);

  // Perform setup actions here
  const runTasks = async () => {
    // ensure all tasks are reset to 'todo' before starting
    setTasks(prevTasks =>
      prevTasks.map(task => ({
        ...task,
        status: 'todo',
      }))
    );

    for (const task of tasks) {
      setTasks(prevTasks =>
        prevTasks.map(prevTask =>
          prevTask.label === task.label ? { ...prevTask, status: 'in progress' } : prevTask
        )
      );

      await new Promise(resolve => setTimeout(resolve, 2500));

      setTasks(prevTasks =>
        prevTasks.map(prevTask =>
          prevTask.label === task.label ? { ...prevTask, status: 'done' } : prevTask
        )
      );
    }
  };

  return (
    <div className="flex max-w-2xl flex-col gap-10 rounded-lg bg-white p-10 shadow-lg dark:bg-neutral-900">
      <motion.button
        className="cursor-pointer rounded-lg bg-neutral-900 p-1 px-4 py-2 text-base font-semibold text-neutral-50 dark:bg-neutral-50 dark:text-neutral-950"
        onClick={runTasks}
        aria-label="run jobs"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Run Tasks
      </motion.button>
      {tasks.map((task, index) => (
        <div key={index} className="flex items-center gap-10">
          <div>
            {task.status === 'todo' && <Circle className="text-neutral-400" />}
            {task.status === 'in progress' && (
              <motion.div layoutId="in-progress-icon">
                <LoaderCircle className="animate-spin text-blue-500" />
              </motion.div>
            )}
            {task.status === 'done' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ rotate: 360, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <CircleCheck className="text-green-500" />
              </motion.div>
            )}
          </div>
          <div>
            <h2>{task.label}</h2>
            <p className="text-sm text-neutral-400">{task.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export { TaskRunner };

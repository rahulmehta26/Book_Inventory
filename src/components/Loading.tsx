import { motion } from "motion/react";
import { useEffect, useState } from "react";

const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const bookColors = [
    "bg-amber-700",
    "bg-emerald-800",
    "bg-indigo-800",
    "bg-rose-800",
    "bg-amber-900",
    "bg-teal-800",
    "bg-purple-900",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const bookVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50">
      <motion.div
        className="flex space-x-2 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {bookColors.map((color, index) => (
          <motion.div
            key={index}
            className={`w-6 h-24 ${color} rounded-t-sm rounded-b-md shadow-md`}
            variants={bookVariants}
          />
        ))}
      </motion.div>
      <div className="w-64 h-4 bg-amber-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-amber-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <p className="mt-4 text-amber-800 font-serif text-lg">Loading your book collection...</p>
    </div>
  );
};

export default Loading;

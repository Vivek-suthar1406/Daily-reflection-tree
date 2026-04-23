import { motion } from 'framer-motion';

/**
 * Minimal progress bar showing how far through the reflection tree the user is.
 */
export default function ProgressBar({ progress }) {
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="h-[2px] bg-white/[0.05] w-full">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-500/40 via-amber-400/60 to-amber-300/40"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}

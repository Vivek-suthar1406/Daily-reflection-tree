import { AnimatePresence, motion } from 'framer-motion';
import { useTreeEngine } from './hooks/useTreeEngine';
import NodeRenderer from './components/NodeRenderer';
import ProgressBar from './components/ProgressBar';

/**
 * Main orchestrator — renders the active node with smooth transitions.
 * Decision nodes are auto-resolved by useTreeEngine and never rendered here.
 */
export default function TreeEngine() {
  const {
    currentNode,
    currentNodeId,
    selectOption,
    advance,
    goBack,
    resolveText,
    progress,
    canGoBack,
    isEnd,
  } = useTreeEngine();

  if (!currentNode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white/50">
        <p>Tree node not found. Check your reflection-tree.json data.</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0f]">
      {/* Ambient background bloom */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-amber-500/[0.03] blur-[120px] animate-bloom" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-violet-500/[0.02] blur-[100px] animate-bloom-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-blue-500/[0.02] blur-[80px] animate-bloom-slow" />
      </div>

      {/* Subtle grain overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015] bg-noise" />

      {/* Progress bar */}
      <ProgressBar progress={progress} />

      {/* Go back button */}
      <AnimatePresence>
        {canGoBack && !isEnd && (
          <motion.button
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.3 }}
            whileHover={{ x: -3 }}
            onClick={goBack}
            className="fixed top-8 left-8 z-40 flex items-center gap-2 text-white/30 text-sm hover:text-white/60 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span>Back</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Node content with animated transitions */}
      <div className="relative z-10 w-full flex items-center justify-center min-h-screen py-20 px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentNodeId}
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full"
          >
            <NodeRenderer
              node={currentNode}
              onSelectOption={selectOption}
              onAdvance={advance}
              resolveText={resolveText}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Subtle footer */}
      {!isEnd && (
        <div className="fixed bottom-6 text-center text-white/10 text-xs tracking-widest">
          REFLECTION ENGINE
        </div>
      )}
    </div>
  );
}

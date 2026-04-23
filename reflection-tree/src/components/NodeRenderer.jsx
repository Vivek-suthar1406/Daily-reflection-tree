import { motion } from 'framer-motion';

/**
 * Renders the appropriate UI for a single tree node.
 * Handles: start, bridge, reflection, summary, end, question
 * Decision nodes are NEVER rendered (handled by the engine).
 */
export default function NodeRenderer({ node, onSelectOption, onAdvance, resolveText }) {
  if (!node) return null;

  const displayText = resolveText(node.text || '');
  const paragraphs = displayText.split('\n').filter(line => line.trim() !== '');

  const renderText = () => (
    <div className="space-y-4">
      {paragraphs.map((paragraph, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: 'easeOut' }}
          className="text-lg md:text-xl leading-relaxed text-white/90"
        >
          {paragraph}
        </motion.p>
      ))}
    </div>
  );

  // Node type badge
  const typeLabels = {
    start: null,
    bridge: 'Transition',
    reflection: 'Reflection',
    summary: 'Your Summary',
    end: null,
    question: 'Question',
  };

  const badge = typeLabels[node.type];

  switch (node.type) {
    case 'start':
    case 'bridge':
    case 'reflection':
    case 'summary':
      return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto px-4">
          {badge && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400/70"
            >
              {badge}
            </motion.span>
          )}

          {renderText()}

          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.12)' }}
            whileTap={{ scale: 0.98 }}
            onClick={onAdvance}
            className="mt-4 px-8 py-3.5 rounded-full border border-white/20 bg-white/5 text-white/80 text-sm font-medium tracking-wide backdrop-blur-sm transition-colors cursor-pointer hover:text-white hover:border-white/40"
          >
            Continue
          </motion.button>
        </div>
      );

    case 'end':
      return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto px-4">
          {renderText()}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="w-12 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mt-4"
          />
        </div>
      );

    case 'question':
      return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto px-4">
          {badge && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400/70"
            >
              {badge}
            </motion.span>
          )}

          {renderText()}

          <div className="flex flex-col gap-3 w-full mt-2">
            {node.options?.map((option, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.4, ease: 'easeOut' }}
                whileHover={{
                  scale: 1.01,
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  borderColor: 'rgba(251, 191, 36, 0.4)',
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectOption(option)}
                className="w-full text-left px-6 py-4 rounded-2xl border border-white/10 bg-white/[0.03] text-white/80 text-sm md:text-base leading-relaxed backdrop-blur-sm transition-all cursor-pointer hover:text-white"
              >
                {option.text}
              </motion.button>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}

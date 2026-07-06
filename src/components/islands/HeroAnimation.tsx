import { motion, MotionConfig } from 'motion/react';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function HeroAnimation({ name, role, tagline }: { name: string; role: string; tagline: string }) {
  const words = name.split(' ');
  return (
    <MotionConfig reducedMotion="user">
      <div>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex items-center gap-3 font-mono text-sm uppercase tracking-[0.2em] text-[var(--color-muted)]"
        >
          <span className="status-dot" aria-hidden="true" />
          {role}
        </motion.p>
        <h1
          className="mt-8 text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tight font-semibold"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {words.map((word, i) => (
            <span key={word} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
              <motion.span
                className="inline-block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.25 + i * 0.12 }}
              >
                {word}
                {i < words.length - 1 ? ' ' : ''}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.65 }}
          className="mt-10 max-w-2xl text-xl sm:text-2xl leading-normal text-[var(--color-fg)]/90"
        >
          {tagline}
        </motion.p>
      </div>
    </MotionConfig>
  );
}

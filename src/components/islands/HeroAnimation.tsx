import { motion } from 'motion/react';

export default function HeroAnimation({ name, role, tagline }: { name: string; role: string; tagline: string }) {
  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
        className="text-6xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tight"
      >
        {name}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
        className="mt-6 text-lg sm:text-xl font-mono text-[var(--color-muted)]"
      >
        {role}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.34 }}
        className="mt-10 max-w-3xl text-2xl sm:text-3xl leading-snug"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {tagline}
      </motion.p>
    </div>
  );
}

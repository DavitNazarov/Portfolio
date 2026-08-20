import { motion } from "framer-motion";
import { PERSONAL } from "@/constants/personal";
import { CONTACT_TINT } from "@/features/contact/constants/contact";

export default function ContactFooter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mt-14 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
    >
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
          <span className="relative flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: `rgb(${CONTACT_TINT})` }} />
        </span>
        <p className="text-xs font-mono text-ink-2">
          © {new Date().getFullYear()} {PERSONAL.name} · Available for work
        </p>
      </div>
      <p className="text-xs font-mono text-ink-3">
        Built with React & Framer Motion
      </p>
    </motion.div>
  );
}

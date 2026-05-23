import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { PERSONAL } from "@/constants/personal";
import { CONTACT_TINT } from "@/features/contact/constants/contact";

export default function ContactDirectCard({ copied, onCopy }) {
  return (
    <SpotlightCard tint={CONTACT_TINT} className="p-5 sm:p-6" hover={false}>
      <div className="flex items-start gap-4 min-w-0">
        <div className="relative shrink-0">
          <div
            aria-hidden
            className="absolute inset-0 rounded-2xl blur-xl opacity-60"
            style={{ background: `rgba(${CONTACT_TINT}, 0.45)` }}
          />
          <div
            className="relative flex h-12 w-12 items-center justify-center rounded-2xl border"
            style={{
              borderColor: `rgba(${CONTACT_TINT}, 0.32)`,
              backgroundColor: `rgba(${CONTACT_TINT}, 0.14)`,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            <Mail className="h-5 w-5" style={{ color: `rgb(${CONTACT_TINT})` }} />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <p
            className="text-[10px] font-mono uppercase tracking-[0.26em] leading-none"
            style={{ color: `rgba(${CONTACT_TINT}, 0.8)` }}
          >
            Direct · Email
          </p>
          <motion.a
            href={`mailto:${PERSONAL.email}`}
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 360, damping: 26 }}
            className="mt-2 inline-flex items-center gap-2 text-lg sm:text-[1.25rem] font-light tracking-tight text-foreground/95 hover:text-foreground transition-colors duration-300 break-all"
          >
            <span>{PERSONAL.email}</span>
            <ArrowUpRight className="h-4 w-4 shrink-0" style={{ color: `rgba(${CONTACT_TINT}, 0.7)` }} />
          </motion.a>

          <motion.button
            type="button"
            onClick={onCopy}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border px-3.5 py-2 text-[12px] font-mono transition-colors duration-200"
            style={{
              borderColor: `rgba(${CONTACT_TINT}, 0.3)`,
              backgroundColor: `rgba(${CONTACT_TINT}, 0.1)`,
              color: `rgba(${CONTACT_TINT}, 0.92)`,
            }}
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy email"}
          </motion.button>
        </div>
      </div>
    </SpotlightCard>
  );
}

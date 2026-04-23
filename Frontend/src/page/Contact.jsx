import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Copy, Check } from "lucide-react";
import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import SpotlightCard from "@/components/ui/SpotlightCard";

const TINT = "167, 139, 250";
const EMAIL = "nazarov.davit17@gmail.com";

const socials = [
  {
    name: "GitHub",
    handle: "@DavitNazarov",
    href: "https://github.com/DavitNazarov",
    label: "Source · Repos",
  },
  {
    name: "LinkedIn",
    handle: "davit-nazarov",
    href: "https://www.linkedin.com/in/davit-nazarov-366b77389",
    label: "Profile · Work",
  },
  {
    name: "Instagram",
    handle: "@nazarovdati_",
    href: "https://www.instagram.com/nazarovdati_",
    label: "Personal · Life",
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* no-op */
    }
  };

  return (
    <div className="w-full max-w-4xl">
      <SectionHeader
        number="05"
        eyebrow="Connect"
        title="Let's"
        accent="build"
        after=" something good."
        description="Open for senior/full-stack roles, collaborations, or a long conversation about interfaces. I reply within a day."
        tint={TINT}
      />

      {/* Email card — the main CTA */}
      <SpotlightCard tint={TINT} className="p-5 sm:p-8 mb-10" hover={false}>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4 min-w-0">
            <div className="relative shrink-0">
              <div
                aria-hidden
                className="absolute inset-0 rounded-2xl blur-xl opacity-60"
                style={{ background: `rgba(${TINT}, 0.45)` }}
              />
              <div
                className="relative flex h-12 w-12 items-center justify-center rounded-2xl border"
                style={{
                  borderColor: `rgba(${TINT}, 0.32)`,
                  backgroundColor: `rgba(${TINT}, 0.14)`,
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                <Mail className="h-5 w-5" style={{ color: `rgb(${TINT})` }} />
              </div>
            </div>

            <div className="min-w-0">
              <p
                className="text-[10px] font-mono uppercase tracking-[0.26em] leading-none"
                style={{ color: `rgba(${TINT}, 0.8)` }}
              >
                Direct · Email
              </p>
              <motion.a
                href={`mailto:${EMAIL}`}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 360, damping: 26 }}
                className="mt-2 inline-flex items-center gap-2 text-lg sm:text-[1.35rem] font-light tracking-tight text-foreground/95 hover:text-foreground transition-colors duration-300 break-all"
              >
                <span>{EMAIL}</span>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  style={{ color: `rgba(${TINT}, 0.7)` }}
                />
              </motion.a>
            </div>
          </div>

          <motion.button
            onClick={copyEmail}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="group/btn flex items-center gap-2 rounded-full border px-3.5 py-2 text-[12px] font-mono transition-colors duration-200 shrink-0 self-start sm:self-auto"
            style={{
              borderColor: `rgba(${TINT}, 0.3)`,
              backgroundColor: `rgba(${TINT}, 0.1)`,
              color: `rgba(${TINT}, 0.92)`,
            }}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy email
              </>
            )}
          </motion.button>
        </div>
      </SpotlightCard>

      {/* Socials */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-5">
          <span
            className="h-px w-8"
            style={{ backgroundColor: `rgba(${TINT}, 0.35)` }}
          />
          <p
            className="text-[10px] font-mono uppercase tracking-[0.3em]"
            style={{ color: `rgba(${TINT}, 0.7)` }}
          >
            Elsewhere
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {socials.map((s, i) => (
            <SpotlightCard
              key={s.name}
              as="a"
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              tint={TINT}
              delay={i * 0.08}
              className="block p-4 sm:p-5 no-underline"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] font-mono uppercase tracking-[0.24em]"
                    style={{ color: `rgba(${TINT}, 0.75)` }}
                  >
                    {s.label}
                  </span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    style={{ color: `rgba(${TINT}, 0.6)` }}
                  />
                </div>
                <div>
                  <p className="text-[15px] font-medium text-foreground/95 leading-tight">
                    {s.name}
                  </p>
                  <p className="mt-1 text-[12px] font-mono text-muted-foreground/55">
                    {s.handle}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
            <span
              className="relative flex h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: `rgb(${TINT})` }}
            />
          </span>
          <p className="text-xs font-mono text-muted-foreground/50">
            © 2025 Davit Nazarov · Available for work
          </p>
        </div>
        <p className="text-xs font-mono text-muted-foreground/35">
          Built with React & Framer Motion
        </p>
      </motion.div>
    </div>
  );
}

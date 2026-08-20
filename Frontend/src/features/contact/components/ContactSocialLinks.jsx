import { ArrowUpRight } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { SOCIAL_LINKS } from "@/constants/personal";
import { CONTACT_TINT } from "@/features/contact/constants/contact";

export default function ContactSocialLinks() {
  return (
    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
      {SOCIAL_LINKS.map((social, index) => (
        <SpotlightCard
          key={social.name}
          as="a"
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          tint={CONTACT_TINT}
          delay={index * 0.06}
          className="block p-4 no-underline"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p
                className="text-[10px] font-mono uppercase tracking-[0.2em]"
                style={{ color: `rgba(${CONTACT_TINT}, 0.85)` }}
              >
                {social.label}
              </p>
              <p className="mt-2 text-[15px] font-medium text-foreground/95 leading-tight">
                {social.name}
              </p>
              <p className="mt-1 text-[12px] font-mono text-ink-2">
                {social.handle}
              </p>
            </div>
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0" style={{ color: `rgba(${CONTACT_TINT}, 0.85)` }} />
          </div>
        </SpotlightCard>
      ))}
    </div>
  );
}

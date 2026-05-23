import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import HeroInfoCard from "@/features/home/components/HeroInfoCard";
import AwardsSection from "@/features/home/components/AwardsSection";
import TechStackEmpty from "@/features/home/components/TechStackEmpty";
import TechStackSection from "@/features/home/components/TechStackSection";
import TechStackSkeleton from "@/features/home/components/TechStackSkeleton";
import { EASE } from "@/features/home/constants/motion";

export default function HomeInfoSection({
  awards,
  currentEdu,
  eduIsCurrent,
  focusTech,
  highlightedWork,
  loading,
  projectCount,
  techGroups,
  workIsCurrent,
}) {
  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 pb-28 sm:pb-36">
      <motion.div
        className="mb-8 sm:mb-10 flex items-center gap-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <motion.span
          className="h-px bg-white/18"
          initial={{ width: 0 }}
          whileInView={{ width: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        />
        <span className="text-[10px] font-mono tracking-[0.34em] uppercase text-muted-foreground/55">
          At a glance
        </span>
      </motion.div>

      <motion.div
        className="grid sm:grid-cols-2 gap-3 sm:gap-3.5 mb-16 sm:mb-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
      >
        <HeroInfoCard
          eyebrow={workIsCurrent ? "Currently" : "Last role"}
          tint="251, 191, 36"
          icon={Briefcase}
          loading={loading}
          title={highlightedWork?.role}
          subtitle={highlightedWork?.company}
          period={highlightedWork?.period}
          isLive={workIsCurrent}
          jumpTo="experience"
          emptyLabel="Between engagements"
        />

        <HeroInfoCard
          eyebrow={eduIsCurrent ? "Current study" : "Last study"}
          tint="52, 211, 153"
          icon={GraduationCap}
          loading={loading}
          title={currentEdu?.degree}
          subtitle={currentEdu?.institution}
          period={currentEdu?.period}
          isLive={eduIsCurrent}
          jumpTo="education"
          emptyLabel="Self-directed study"
        />
      </motion.div>

      {loading ? (
        <TechStackSkeleton />
      ) : focusTech.length === 0 ? (
        <TechStackEmpty />
      ) : (
        <TechStackSection
          techGroups={techGroups}
          totalTools={focusTech.length}
          projectCount={projectCount}
        />
      )}

      {!loading && awards.length > 0 && <AwardsSection awards={awards} />}
    </div>
  );
}

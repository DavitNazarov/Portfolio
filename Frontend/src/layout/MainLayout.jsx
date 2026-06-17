import { Suspense } from "react";
import ChatBotWidget from "@/components/ui/ChatBotWidget";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import BottomFade from "@/layout/components/BottomFade";
import MainSections from "@/layout/components/MainSections";
import ScrollProgress from "@/layout/components/ScrollProgress";
import SectionNav from "@/layout/components/SectionNav";
import TopControls from "@/layout/components/TopControls";
import { useActiveSection } from "@/layout/hooks/useActiveSection";

export default function MainLayout() {
  const active = useActiveSection();

  return (
    <>
      <NoiseOverlay />

      <Suspense fallback={null}>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-400 relative">
          <ScrollProgress />
          <TopControls />
          <SectionNav active={active} />
          <MainSections />
          <BottomFade />
        </div>
      </Suspense>

      <ChatBotWidget />
    </>
  );
}

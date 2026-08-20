import ChatBotWidget from "@/components/ui/ChatBotWidget";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import BottomFade from "@/layout/components/BottomFade";
import MainSections from "@/layout/components/MainSections";
import ScrollProgress from "@/layout/components/ScrollProgress";
import SectionNav from "@/layout/components/SectionNav";
import SectionNavMobile from "@/layout/components/SectionNavMobile";
import TopControls from "@/layout/components/TopControls";
import { useActiveSection } from "@/layout/hooks/useActiveSection";
import { PortfolioProvider } from "@/context/PortfolioContext";

export default function MainLayout() {
  const active = useActiveSection();

  return (
    <PortfolioProvider>
      <NoiseOverlay />

      <div className="relative min-h-screen bg-background text-foreground">
        <ScrollProgress />
        <TopControls />
        <SectionNav active={active} />
        <SectionNavMobile active={active} />
        <MainSections />
        <BottomFade />
      </div>

      <ChatBotWidget />
    </PortfolioProvider>
  );
}

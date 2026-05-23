import HomeHero from "@/features/home/components/HomeHero";
import HomeInfoSection from "@/features/home/components/HomeInfoSection";
import { useHomeData } from "@/features/home/hooks/useHomeData";

export default function Home() {
  const homeData = useHomeData();

  return (
    <div className="w-full">
      <HomeHero
        highlightedWork={homeData.highlightedWork}
        loading={homeData.loading}
        workIsCurrent={homeData.workIsCurrent}
      />
      <HomeInfoSection {...homeData} />
    </div>
  );
}

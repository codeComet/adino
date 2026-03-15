"use client";

import AdinoGlobalMarketAboutHero from "@/components/subsidiaries/global-market/about/AdinoGlobalMarketAboutHero";
import AdinoGlobalMarketAboutSection from "@/components/subsidiaries/global-market/about/AdinoGlobalMarketAboutSection";
import AdinoGlobalMarketAboutMissionVission from "@/components/subsidiaries/global-market/about/AdinoGlobalMarketAboutMissionVission";
import AdinoGlobalMarketGlobalExcellence from "@/components/subsidiaries/global-market/about/AdinoGlobalMarketGlobalExcellence";
import AdinoGlobalMarketCoreValues from "@/components/subsidiaries/global-market/about/AdinoGlobalMarketCoreValues";
import AdinoGlobalMarketApproach from "@/components/subsidiaries/global-market/about/AdinoGlobalMarketApproach";
import AdinoGlobalMarketAboutTeam from "@/components/subsidiaries/global-market/about/AdinoGlobalMarketAboutTeam";



import { useAboutAdinoGlobalMarketPageData } from "@/lib/subsidiary/aboutAdinoGlobalMarket";
import AdinoGlobalMarketNewsletter from "@/components/subsidiaries/global-market/about/AdinoGlobalMarketNewsletter";

const AboutAdinoGlobalMarketClient = () => {
  const { data: aboutAdinoGlobalMarketData } = useAboutAdinoGlobalMarketPageData();

  return (
    <>
      <AdinoGlobalMarketAboutHero
        heroData={aboutAdinoGlobalMarketData?.data?.hero || {}}
      />
      <AdinoGlobalMarketAboutSection aboutData={aboutAdinoGlobalMarketData?.data?.about || {}} />
      <AdinoGlobalMarketAboutMissionVission missionVisionData={aboutAdinoGlobalMarketData?.data?.missionAndVision || []} />
      <AdinoGlobalMarketGlobalExcellence globalExcellenceData={aboutAdinoGlobalMarketData?.data?.globalExcellence || {}} />
      <AdinoGlobalMarketCoreValues coreValuesData={aboutAdinoGlobalMarketData?.data || {}} />
      <AdinoGlobalMarketApproach approachData={aboutAdinoGlobalMarketData?.data || {}} />
      <AdinoGlobalMarketAboutTeam teamData={aboutAdinoGlobalMarketData?.data || {}} />
      <AdinoGlobalMarketNewsletter/>
    </>
  );
};

export default AboutAdinoGlobalMarketClient;

"use client";

import AboutCaptialAbout from "@/components/subsidiaries/capital/about/AboutCaptialAbout";
import AboutAdinoCaptialHero from "@/components/subsidiaries/capital/about/AboutCaptialHero";
import { useAboutAdinoCapitalPageData } from "@/lib/subsidiary/aboutAdinoCapital";
import AboutCapitalMissionVision from "@/components/subsidiaries/capital/about/AboutCapitalMissionVision";
import AboutCapitalValues from "@/components/subsidiaries/capital/about/AboutCapitalValues";
import AboutCaptialTeam from "@/components/subsidiaries/capital/about/AboutCaptialTeam";




const AboutAdinoCapitalClient = () => {
  const { data: aboutAdinoCapitalData } = useAboutAdinoCapitalPageData();

  return (
    <>
        <AboutAdinoCaptialHero hero={aboutAdinoCapitalData?.data?.hero || {}} />
        <AboutCaptialAbout aboutData={aboutAdinoCapitalData?.data?.about || {}} />
        <AboutCapitalMissionVision missionVisionData={aboutAdinoCapitalData?.data?.missionAndVision || {}} />
        <AboutCapitalValues valuesData={aboutAdinoCapitalData || {}} />
        <AboutCaptialTeam teamData={aboutAdinoCapitalData || {}} />
    </>
  );
};

export default AboutAdinoCapitalClient;

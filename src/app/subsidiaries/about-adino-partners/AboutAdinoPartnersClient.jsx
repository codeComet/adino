"use client";
import AboutAdinoPartnersAbout from "@/components/subsidiaries/asset-partners/about/AboutAdinoPartnersAbout";
import AboutAdinoPartnersBottomWhySection from "@/components/subsidiaries/asset-partners/about/AboutAdinoPartnersBottomWhySection";
import AboutAdinoPartnersCoreSection from "@/components/subsidiaries/asset-partners/about/AboutAdinoPartnersCoreSection";
import AboutAdinoPartnersHero from "@/components/subsidiaries/asset-partners/about/AboutAdinoPartnersHero";
import AboutAdinoPartnersMissionVission from "@/components/subsidiaries/asset-partners/about/AboutAdinoPartnersMissionVission";
import AboutAdinoPartnersNewsletter from "@/components/subsidiaries/asset-partners/about/AboutAdinoPartnersNewsletter";
import AboutAdinoPartnersTeam from "@/components/subsidiaries/asset-partners/about/AboutAdinoPartnersTeam";
import AboutAdinoPartnersWhySection from "@/components/subsidiaries/asset-partners/about/AboutAdinoPartnersWhySection";
import { useAboutAdinoPartnersPageData } from "@/lib/subsidiary/AboutAdinoPartners";

const AboutAdinoPartnersClient = () => {
  const { data: aboutAdinoPartnersData } = useAboutAdinoPartnersPageData();

  return (
    <>
      <AboutAdinoPartnersHero hero={aboutAdinoPartnersData?.data?.hero || {}} />
      <AboutAdinoPartnersAbout
        aboutData={aboutAdinoPartnersData?.data?.about || {}}
      />
      <AboutAdinoPartnersMissionVission
        missionData={aboutAdinoPartnersData?.data?.missionAndVision || {}}
      />
      <AboutAdinoPartnersCoreSection coreData={aboutAdinoPartnersData?.data} />
      <AboutAdinoPartnersWhySection
        whySectionData={aboutAdinoPartnersData?.data?.whyAdinoSection || {}}
      />
      <AboutAdinoPartnersTeam teamData={aboutAdinoPartnersData} />
      <AboutAdinoPartnersBottomWhySection whyData={aboutAdinoPartnersData} />
      <AboutAdinoPartnersNewsletter />
    </>
  );
};

export default AboutAdinoPartnersClient;

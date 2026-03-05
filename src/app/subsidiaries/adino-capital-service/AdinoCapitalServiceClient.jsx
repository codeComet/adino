"use client";

import AdinoCapitalServiceHero from "@/components/subsidiaries/capital/service/AdinoCapitalServiceHero";
import AdinoCapitalServiceAbout from "@/components/subsidiaries/capital/service/AdinoCapitalServiceAbout";
import { useAdinoCapitalServicePageData } from "@/lib/subsidiary/adinoCapitalService";
import AdinoCapitalServices from "@/components/subsidiaries/capital/service/AdinoCapitalServices";
import AdinoCaptialIndustry from "@/components/subsidiaries/capital/service/AdinoCaptialIndustry";
import AdinoCapitalWhySection from "@/components/subsidiaries/capital/service/AdinoCapitalWhySection";
import AdinoCapitalUniqueSection from "@/components/subsidiaries/capital/service/AdinoCapitalUniqueSection";
import AdinoCapitalSustainibility from "@/components/subsidiaries/capital/service/AdinoCapitalSustainibility";





const AdinoCapitalServiceClient = () => {
  const { data: aboutAdinoCapitalServiceData } = useAdinoCapitalServicePageData();

  return (
    <>
      <AdinoCapitalServiceHero
        hero={aboutAdinoCapitalServiceData?.data?.hero || {}}
      />
      <AdinoCapitalServiceAbout
        aboutData={aboutAdinoCapitalServiceData?.data?.about || {}}
      />
      <AdinoCapitalServices
        serviceItems={aboutAdinoCapitalServiceData?.data?.servicesItems || []}
      />
      <AdinoCaptialIndustry
        industryValues={aboutAdinoCapitalServiceData?.data || {}}
      />
      <AdinoCapitalWhySection whySectionData={aboutAdinoCapitalServiceData?.data?.whyAdinoSection || {}}/>
      <AdinoCapitalUniqueSection uniqueSectionData={aboutAdinoCapitalServiceData?.data || {}}/>
      <AdinoCapitalSustainibility sustainabilityValues={aboutAdinoCapitalServiceData?.data || {}}/>
    </>
  );
};

export default AdinoCapitalServiceClient;

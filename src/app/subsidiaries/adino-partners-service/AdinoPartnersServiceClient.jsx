"use client";

import AdinoPartnersServiceIndustry from "@/components/subsidiaries/asset-partners/service/AdinoPartnersServiceIndustry";
import AdinoPartnersServiceFocus from "@/components/subsidiaries/asset-partners/service/AdinoPartnersServiceFocus";
import AdinoPartnersServiceHero from "@/components/subsidiaries/asset-partners/service/AdinoPartnersServiceHero";
import AdinoPartnersServiceCore from "@/components/subsidiaries/asset-partners/service/AdinoPartnersServiceCore";
import { useAdinoPartnersServicePageData } from "@/lib/subsidiary/AdinoPartnersService";
import AdinoPartnersServiceNewsletter from "@/components/subsidiaries/asset-partners/service/AdinoPartnersServiceNewsletter";

const AdinoPartnersServiceClient = () => {
  const { data: adinoPartnersServiceData } = useAdinoPartnersServicePageData();

  return (
    <>
      <AdinoPartnersServiceHero
        heroData={adinoPartnersServiceData?.data?.hero || {}}
      />
      <AdinoPartnersServiceFocus
        focusData={adinoPartnersServiceData?.data || {}}
      />
      <AdinoPartnersServiceIndustry
        industryData={adinoPartnersServiceData?.data?.keyIndustry || {}}
      />
      <AdinoPartnersServiceCore
        coreStrategyData={adinoPartnersServiceData?.data || {}}
      />
      <AdinoPartnersServiceNewsletter/>
    </>
  );
};

export default AdinoPartnersServiceClient;

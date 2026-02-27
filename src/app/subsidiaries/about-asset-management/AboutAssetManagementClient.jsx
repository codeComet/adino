
"use client";

import AboutAssetManagementHero from "@/components/subsidiaries/asset-management/about/AboutAssetManagementHero";
import AssetManagementModel from "@/components/subsidiaries/asset-management/about/AssetManagementModel";
import { useAboutAssetManagementPageData } from "@/lib/subsidiary/aboutAssetmanagement";
import AssetManagementMissionAndVision from "@/components/subsidiaries/asset-management/about/AssetManagementMissionAndVision";
import WhyAssetManagement from "@/components/subsidiaries/asset-management/about/WhyAssetManagement";
import AssetManagementValues from "@/components/subsidiaries/asset-management/about/AssetManagementValues";
import AssetManagementTeam from "@/components/subsidiaries/asset-management/about/AssetManagementTeam";

const AboutAssetManagementClient = () => {
  const { data: aboutAssetManagementData } = useAboutAssetManagementPageData();

  return (
    <>
      <AboutAssetManagementHero hero={aboutAssetManagementData} />
      <AssetManagementModel modelData={aboutAssetManagementData} />
      <AssetManagementMissionAndVision missionAndVisionData={aboutAssetManagementData} />
      <WhyAssetManagement whyAssetManagementData={aboutAssetManagementData} />
      <AssetManagementValues valuesData={aboutAssetManagementData} />
      <AssetManagementTeam teamData={aboutAssetManagementData} />
    </>
  );
};

export default AboutAssetManagementClient;

"use client";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/subsidiaries/asset-management/Header";
import SubsidiaryNewsletter from "@/components/generic/SubsidiaryNewsletter";
import About from "@/components/subsidiaries/asset-management/About";
import Services from "@/components/subsidiaries/asset-management/Services";
import qs from "qs";
import AssetTestimonial from "@/components/subsidiaries/asset-management/AssetTestimonial";
import AboutAssetManagementHero from "@/components/subsidiaries/asset-management/about/AboutAssetManagementHero";
import AssetManagementModel from "@/components/subsidiaries/asset-management/about/AssetManagementModel";
import { useAboutAssetManagementPageData } from "@/lib/subsidiary/aboutAssetmanagement";
import AssetManagementMissionAndVision from "@/components/subsidiaries/asset-management/about/AssetManagementMissionAndVision";
import WhyAssetManagement from "@/components/subsidiaries/asset-management/about/WhyAssetManagement";
import AssetManagementValues from "@/components/subsidiaries/asset-management/about/AssetManagementValues";
import AssetManagementTeam from "@/components/subsidiaries/asset-management/about/AssetManagementTeam";


const AdinoAssetManagement = () => {
    const { data: aboutAssetManagementData, isLoading } = useAboutAssetManagementPageData();

    // console.log(aboutAssetManagementData);

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

export default AdinoAssetManagement;

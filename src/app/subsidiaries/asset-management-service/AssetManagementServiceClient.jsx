"use client";
import { useQuery } from "@tanstack/react-query";
import { getAssetManagementServiceData } from "@/lib/subsidiary/assetManagementService";
import AssetManagementServiceHero from "@/components/subsidiaries/asset-management/service/AssetManagementServiceHero";
import AssetManagementServiceSection from "@/components/subsidiaries/asset-management/service/AssetManagementServiceSection";
import AssetMangementServicePortfolio from "@/components/subsidiaries/asset-management/service/AssetMangementServicePortfolio";
import AssetManagementServiceNdSection from "@/components/subsidiaries/asset-management/service/AssetManagementServiceNdSection";
import AssetManagementServiceInvestment from "@/components/subsidiaries/asset-management/service/AssetManagementServiceInvestment";



const AssetManagementClient = () => {
  const {
    data: assetManagementService,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["assetManagementService"],
    queryFn: getAssetManagementServiceData, 
    staleTime: 60 * 60 * 1000, // Data stays fresh for 1 hour
    cacheTime: 60 * 60 * 1000, // Cache persists for 1 hour
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      <AssetManagementServiceHero hero={assetManagementService?.data?.hero} />  
      <AssetManagementServiceSection serviceData={assetManagementService?.data} />
      <AssetMangementServicePortfolio portfolioData={assetManagementService?.data} />
      <AssetManagementServiceNdSection ndSection={assetManagementService?.data} />
      <AssetManagementServiceInvestment investmentData={assetManagementService?.data} />
    </>
  );
};

export default AssetManagementClient;

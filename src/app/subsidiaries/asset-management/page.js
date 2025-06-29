"use client";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/subsidiaries/asset-management/Header";
import SubsidiaryNewsletter from "@/components/generic/SubsidiaryNewsletter";
import About from "@/components/subsidiaries/asset-management/About";
import Services from "@/components/subsidiaries/asset-management/Services";
import qs from "qs";
import AssetTestimonial from "@/components/subsidiaries/asset-management/AssetTestimonial";

const query = qs.stringify(
  {
    populate: {
      sections: {
        on: {
          "home-page.home-hero-section": {
            populate: "*",
          },
          "subsidiaries.global-market-about": {
            populate: "*",
          },
          "subsidiaries.global-market-service": {
            populate: {
              services: {
                populate: ["image"],
              },
            },
          },
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);

const getAssetManagementData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/adino-asset-management?${query}`
  );
  const data = await res.json();
  return data;
};

const AdinoAssetManagement = () => {
  const {
    data: assetManagement,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["assetManagement"],
    queryFn: getAssetManagementData,
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

  const { sections } = assetManagement?.data ? assetManagement?.data : {};

  return (
    <>
      <Header data={sections[0]} />
      <About data={sections[1]} />
      <Services data={sections[2]} />
      <AssetTestimonial />
      <SubsidiaryNewsletter />
    </>
  );
};

export default AdinoAssetManagement;

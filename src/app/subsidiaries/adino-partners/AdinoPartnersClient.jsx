
"use client";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/subsidiaries/asset-partners/Header";
import About from "@/components/subsidiaries/asset-partners/About";
import Services from "@/components/subsidiaries/asset-partners/Services";
import SubsidiaryNewsletter from "@/components/generic/SubsidiaryNewsletter";
import TestimonialGrid from "@/components/generic/TestimonialGrid";
import { getAdinoPartnersData } from "@/lib/subsidiary/adinoPartners";

const AdinoPartnersClient = () => {
  const {
    data: adinoPartners,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["adinoPartners"],
    queryFn: getAdinoPartnersData,
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

  const { sections } = adinoPartners?.data ? adinoPartners?.data : {};
  return (
    <>
      <Header data={sections?.[0]} />
      <About data={sections?.[1]} />
      <Services data={sections?.[2]} />
      <About data={sections?.[3]} />
      <TestimonialGrid />
      <SubsidiaryNewsletter />
    </>
  );
};

export default AdinoPartnersClient;

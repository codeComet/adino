
"use client";
import { useQuery } from '@tanstack/react-query';
import Header from "@/components/subsidiaries/global-market/Header";
import About from "@/components/subsidiaries/global-market/About";
import Services from '@/components/subsidiaries/global-market/Services';
import TestimonialSlider from '@/components/generic/TestimonialSlider';
import SubsidiaryNewsletter from '@/components/generic/SubsidiaryNewsletter';
import { getGlobalMarketData } from "@/lib/subsidiary/adinoGlobalMarket";

const AdinoGlobalMarketClient = () => {
  const {
    data: globalMarketData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["globalMarketData"],
    queryFn: getGlobalMarketData,
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

  const {
    sections,
  } = globalMarketData?.data ? globalMarketData?.data : {};

  return (
    <>
      <Header data={sections[0]}/>
      <About data={sections[1]}/>
      <Services data={sections[2]}/>
      <TestimonialSlider/>
      <SubsidiaryNewsletter/>
    </>
  )
}

export default AdinoGlobalMarketClient;

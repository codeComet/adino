"use client";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/subsidiaries/capital/Header";
import About from "@/components/subsidiaries/capital/About";
import Services from "@/components/subsidiaries/capital/Services";
import SubsidiaryNewsletter from "@/components/generic/SubsidiaryNewsletter";
import TestimonialGrid from "@/components/generic/TestimonialGrid";

const getGlobalCapitalData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/adino-capital?populate[sections][populate]=*`
  );
  const data = await res.json();
  return data;
};

const AdinoCapital = () => {
    const {
      data: adinoCapital,
      isLoading,
      isError,
    } = useQuery({
      queryKey: ["adinoCapital"],
      queryFn: getGlobalCapitalData,
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

    const { sections } = adinoCapital?.data ? adinoCapital?.data : {};

  return (
    <>
      <Header data={sections[0]}/>
      <About data={sections[1]}/>
      <Services data={sections[2]}/>
      <SubsidiaryNewsletter/>
    </>
  );
};

export default AdinoCapital;

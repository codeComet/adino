"use client";

import CareerHero from "@/components/career/CareerHero";
import { useQuery } from "@tanstack/react-query";
import CareerBenefits from "@/components/career/CareerBenefits";
import CareerJobs from "@/components/career/CareerJobs";
import Newsletter from "@/components/generic/Newsletter";
import { getCareerData } from "@/lib/api/career";

const CareerContent = () => {
    const { data: careerData, isLoading } = useQuery({
      queryKey: ["career"],
      queryFn: getCareerData,
      staleTime: 60 * 60 * 1000, // Data stays fresh for 5 minutes
      cacheTime: 30 * 60 * 1000, // Cache persists for 30 minutes
    });
  
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6 bg relative">
          <p>Loading...</p>
        </div>
      );
    }

  return (
    <>
      <CareerHero data={careerData}/>
      <CareerBenefits data={careerData} />
      <CareerJobs data={careerData} />
      <Newsletter/>
    </>
  );
};

export default CareerContent;

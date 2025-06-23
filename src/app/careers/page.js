"use client";

import CareerHero from "@/components/career/CareerHero";
import qs from "qs";
import { useQuery } from "@tanstack/react-query";
import CareerStats from "@/components/career/CareerStats";
import CareerBenefits from "@/components/career/CareerBenefits";
import CareerJobs from "@/components/career/CareerJobs";
import Newsletter from "@/components/generic/Newsletter";

const query = qs.stringify(
  {
    populate: {
      career: {
        on: {
          'career.career-hero': {
            populate: {
              hero_img: true,
              cta: true
            }
          },
          'career.career-stats': {
            populate: {
              stats: true
            }
          },
          'career.career-benefits': {
            populate: {
              benefits: {
                populate: {
                  image: true
                }
              }
            }
          },
          'elements.key-value': {
            populate: {
              image: true
            }
          }
        }
      }
    }
  },
  {
    encodeValuesOnly: true,
  }
);


const getCareerData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/career?${query}`
  );
  const data = await res.json();
  return data;
};

const Career = () => {
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

    // console.log(careerData)
  return (
    <>
      <CareerHero data={careerData}/>
      <CareerStats data={careerData} />
      <CareerBenefits data={careerData} />
      <CareerJobs data={careerData} />
      <Newsletter/>
    </>
  );
};

export default Career;

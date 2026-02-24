"use client";

import HomeAbout from "@/components/home/HomeAbout";
import HomeCareer from "@/components/home/HomeCareer";
import HomeHero from "@/components/home/HomeHero";
import HomeNews from "@/components/home/HomeNews";
import HomeSpecialize from "@/components/home/HomeSpecialize";
import HomePartner from "@/components/home/HomePartner";
import HomeHeader from "@/components/header/HomeHeader";
import { useHomePageData } from "@/lib/homePage";

const SECTION_COMPONENTS = {
  "home-page.home-hero-section": HomeHero,
  "home-page.home-about-section": HomeAbout,
  "home-page.hero-specialize-section": HomeSpecialize,
  "home-page.home-news-and-updates": HomeNews,
  "home-page.home-career-section": HomeCareer,
  "home-page.home-partner-section": HomePartner,
};

export default function Home() {
  const { data, isLoading, isError } = useHomePageData();

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

  const sections = data?.data?.sections ?? [];

  return (
    <>
      <HomeHeader />
      {sections.map((section) => {
        const Component = SECTION_COMPONENTS[section.__component];

        if (!Component) {
          return null;
        }

        return <Component key={section.id} />;
      })}
    </>
  );
}

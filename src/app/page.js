import HomeAbout from "@/components/home/HomeAbout";
import HomeCareer from "@/components/home/HomeCareer";
import HomeHero from "@/components/home/HomeHero";
import HomeNews from "@/components/home/HomeNews";
import HomeSpecialize from "@/components/home/HomeSpecialize";
import HomeHeader from "@/components/header/HomeHeader";

export default function Home() {
  return (
    <>
      <HomeHeader />
      <HomeHero />
      <HomeAbout />
      <HomeSpecialize />
      <HomeNews />
      <HomeCareer />
    </>
  );
}

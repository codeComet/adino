import HomeAbout from "@/components/home/HomeAbout";
import HomeCareer from "@/components/home/HomeCareer";
import HomeHero from "@/components/home/HomeHero";
import HomeNews from "@/components/home/HomeNews";
import HomeSpecialize from "@/components/home/HomeSpecialize";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeAbout/>
      <HomeSpecialize/>
      <HomeNews/>
      <HomeCareer/>
    </>
  );
}

import AboutHero from "@/components/about/AboutHero";
import AboutInsight from "@/components/about/AboutInsight";
import AboutMission from "@/components/about/AboutMission";
import AboutTeams from "@/components/about/AboutTeams";
import AboutValues from "@/components/about/AboutValues";
import Newsletter from "@/components/generic/Newsletter";
import { getAboutPageData } from "@/lib/api/about";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const About = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["aboutPage"],
    queryFn: getAboutPageData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AboutHero />
      <AboutMission />
      <AboutInsight />
      <AboutValues />
      <AboutTeams />
      <Newsletter />
    </HydrationBoundary>
  );
};

export default About;

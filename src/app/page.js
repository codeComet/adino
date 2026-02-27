import { getHomePageData } from "@/lib/api/home";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import HomeContent from "@/components/home/HomeContent";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["homePage"],
    queryFn: getHomePageData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeContent />
    </HydrationBoundary>
  );
}

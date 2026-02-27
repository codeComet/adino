import InsightFooter from "@/components/insights/InsightFooter"
import InsightHero from "@/components/insights/InsightHero"
import InsightPosts from "@/components/insights/InsightPosts"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getInsightData, getInsightPosts } from "@/lib/api/insight";

const Insight = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["insights"],
      queryFn: getInsightData,
    }),
    queryClient.prefetchQuery({
      queryKey: ["insightPosts"],
      queryFn: getInsightPosts,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
       <InsightHero/> 
       <InsightPosts/>
       <InsightFooter/>
    </HydrationBoundary>
  )
}

export default Insight

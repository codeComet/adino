
import AdinoGlobalMarketClient from "./AdinoGlobalMarketClient";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getGlobalMarketData } from "@/lib/subsidiary/adinoGlobalMarket";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["globalMarketData"],
    queryFn: getGlobalMarketData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdinoGlobalMarketClient />
    </HydrationBoundary>
  );
}

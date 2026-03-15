import AboutAdinoGlobalMarketClient from "./AboutAdinoGlobalMarketClient";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAboutAdinoGlobalMarketPageData } from "@/lib/subsidiary/aboutAdinoGlobalMarket";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["aboutAdinoGlobalMarketPage"],
    queryFn: getAboutAdinoGlobalMarketPageData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AboutAdinoGlobalMarketClient />
    </HydrationBoundary>
  );
}

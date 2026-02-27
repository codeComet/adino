
import AboutAssetManagementClient from "./AboutAssetManagementClient";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getAboutAssetManagementPageData } from "@/lib/subsidiary/aboutAssetmanagement";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["aboutAssetManagementPage"],
    queryFn: getAboutAssetManagementPageData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AboutAssetManagementClient />
    </HydrationBoundary>
  );
}

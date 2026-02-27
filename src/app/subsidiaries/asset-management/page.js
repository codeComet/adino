
import AssetManagementClient from "./AssetManagementClient";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getAssetManagementData } from "@/lib/subsidiary/assetManagement";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["assetManagement"],
    queryFn: getAssetManagementData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AssetManagementClient />
    </HydrationBoundary>
  );
}

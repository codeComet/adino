import AssetManagementServiceClient from "./AssetManagementServiceClient";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAssetManagementServiceData } from "@/lib/subsidiary/assetManagementService";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["assetManagementService"],
    queryFn: getAssetManagementServiceData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AssetManagementServiceClient />
    </HydrationBoundary>
  );
}

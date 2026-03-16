import AdinoExecutiveManagementClient from "./AdinoExecutiveManagementClient";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAdinoExecutiveManagementData } from "@/lib/subsidiary/adinoExecutiveManagement";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["adinoExecutiveManagement"],
    queryFn: getAdinoExecutiveManagementData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdinoExecutiveManagementClient />
    </HydrationBoundary>
  );
}

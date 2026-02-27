
import AdinoPartnersClient from "./AdinoPartnersClient";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getAdinoPartnersData } from "@/lib/subsidiary/adinoPartners";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["adinoPartners"],
    queryFn: getAdinoPartnersData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdinoPartnersClient />
    </HydrationBoundary>
  );
}

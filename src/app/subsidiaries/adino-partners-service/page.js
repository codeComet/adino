import AdinoPartnersServiceClient from "./AdinoPartnersServiceClient";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAdinoPartnersServicePageData } from "@/lib/subsidiary/AdinoPartnersService";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["adinoPartnersServicePage"],
    queryFn: getAdinoPartnersServicePageData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdinoPartnersServiceClient />
    </HydrationBoundary>
  );
}

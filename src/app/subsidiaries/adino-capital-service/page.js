
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAdinoCapitalServicePageData } from "@/lib/subsidiary/adinoCapitalService";
import AdinoCapitalServiceClient from "./AdinoCapitalServiceClient";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["adinoCapitalServicePage"],
    queryFn: getAdinoCapitalServicePageData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdinoCapitalServiceClient/>
    </HydrationBoundary>
  );
}

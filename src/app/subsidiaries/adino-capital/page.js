
import AdinoCapitalClient from "./AdinoCapitalClient";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getGlobalCapitalData } from "@/lib/subsidiary/adinoCapital";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["adinoCapital"],
    queryFn: getGlobalCapitalData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdinoCapitalClient />
    </HydrationBoundary>
  );
}

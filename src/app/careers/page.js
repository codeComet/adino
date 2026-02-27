import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getCareerData } from "@/lib/api/career";
import CareerContent from "@/components/career/CareerContent";

export default async function Career() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["career"],
    queryFn: getCareerData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CareerContent />
    </HydrationBoundary>
  );
}


import JobPageClient from "./JobPageClient";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getJobData } from "@/lib/api/job";

export default async function Page({ params }) {
  const { slug } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["job", slug],
    queryFn: () => getJobData(slug),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JobPageClient slug={slug} />
    </HydrationBoundary>
  );
}

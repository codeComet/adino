import { getCsrExploreData } from "@/lib/csrExplore";
import CSRExploreClient from "./CSRExploreClient";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const Page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["csrExplore"],
    queryFn: getCsrExploreData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CSRExploreClient />
    </HydrationBoundary>
  );
};

export default Page;

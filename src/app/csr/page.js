import { getCsrPageData } from "@/lib/api/csrPage";
import CsrClient from "./CsrClient";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const Page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["csrPage"],
    queryFn: getCsrPageData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CsrClient />
    </HydrationBoundary>
  );
};

export default Page;

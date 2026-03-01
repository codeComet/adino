import AboutAdinoCapitalClient from "./AboutAdinoCapitalClient";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAboutAdinoCapitalPageData } from "@/lib/subsidiary/aboutAdinoCapital";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["aboutAdinoCapitalPage"],
    queryFn: getAboutAdinoCapitalPageData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AboutAdinoCapitalClient />
    </HydrationBoundary>
  );
}

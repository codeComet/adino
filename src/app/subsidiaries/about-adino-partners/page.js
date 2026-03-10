import AboutAdinoPartnersClient from "./AboutAdinoPartnersClient";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAboutAdinoPartnersPageData } from "@/lib/subsidiary/AboutAdinoPartners";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["aboutAdinoPartnersPage"],
    queryFn: getAboutAdinoPartnersPageData, 
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AboutAdinoPartnersClient />
    </HydrationBoundary>
  );
}

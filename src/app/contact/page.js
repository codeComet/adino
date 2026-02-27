import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getContactHeroData } from "@/lib/api/contact";
import ContactContent from "@/components/contact/ContactContent";

export default async function Contact() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["contactData"],
    queryFn: getContactHeroData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ContactContent />
    </HydrationBoundary>
  );
}

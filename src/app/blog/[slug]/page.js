import BlogPageClient from "./BlogPageClient";
import Newsletter from "@/components/generic/Newsletter";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getBlogData } from "@/lib/api/blog";

export default async function Page({ params }) {
  const { slug } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["blog", slug],
    queryFn: () => getBlogData(slug),
  });

  // Note: We cannot prefetch related posts here because we don't know the category yet.
  // The category is derived from the blog data, which is fetched in the first query.
  // We could fetch the blog data here, get the category, and then prefetch related posts,
  // but that would delay the initial render. 
  // For now, we'll just prefetch the main blog post.

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogPageClient slugValue={slug} />
      <Newsletter />
    </HydrationBoundary>
  );
}

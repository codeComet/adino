import BlogPageClient from "./BlogPageClient";
import Newsletter from "@/components/generic/Newsletter";

export default async function Page({ params }) {
  const { slug } = await params;
  return (
    <>
      <BlogPageClient slugValue={slug} />
      <Newsletter />
    </>
  );
}

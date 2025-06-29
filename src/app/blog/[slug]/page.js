import BlogPageClient from "./BlogPageClient";
import Newsletter from "@/components/generic/Newsletter";

export default function Page({ params }) {
  return (
    <>
      <BlogPageClient slugValue={params.slug} />
      <Newsletter />
    </>
  );
}

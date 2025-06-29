"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import BlogNewsletter from "@/components/generic/BlogNewsletter";
import BlogCard from "@/components/ui/cards/BlogCard";

export default function BlogPageClient({ slugValue }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["blog", slugValue],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?filters[slug][$eq]=${slugValue}&populate=*`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    enabled: !!slugValue,
  });

  const blog = data?.data?.[0];
  const category = blog?.category;

  // Move the second useQuery hook before any early returns
  const {
    data: relatedData,
    isLoading: relatedLoading,
    error: relatedError,
  } = useQuery({
    queryKey: ["related-posts", category],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?filters[category][$eq]=${category}&pagination[limit]=4&populate=banner_image`
      );
      if (!res.ok) throw new Error("Failed to fetch related posts");
      return res.json();
    },
    enabled: !!category,
  });

  // Now handle loading and error states after all hooks are called
  if (isLoading) return <p>Loading blog...</p>;
  if (error) return <p>Error loading blog: {error.message}</p>;

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Post not found
      </div>
    );
  }

  const { title, slug, banner_image, content, createdAt, read_time } = blog;

  const image = banner_image?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${banner_image.url}`
    : "https://placehold.co/100x100";

  // Filter out current post and limit to 3
  const relatedPosts =
    relatedData?.data?.filter((post) => post.slug !== slug)?.slice(0, 3) || [];

  return (
    <div className="mb-10 md:mb-22">
      {/* Blog Header */}
      <div className="min-h-[70vh] w-full bg-[#F4F4F5]">
        <div className="w-wrapper mx-auto flex flex-col md:flex-row items-center justify-between pt-30 md:pt-40 pb-10 md:pb-30 gap-8">
          <div className="flex flex-col gap-4 md:gap-6 justify-center w-full md:w-1/2">
            <h5 className="font-lato text-sm uppercase text-black font-medium bg-[#F0FDF4] rounded-full py-1 px-4 w-fit border border-[#CDF8D4]">
              {category}
            </h5>
            <h2 className="font-sequel-normal text-[24px] sm:text-[28px] md:text-[32px] lg:text-5xl leading-[1.2] md:leading-[60px] tracking-tighter">
              {title}
            </h2>
            <div className="flex items-center gap-2">
              <p className="font-lato text-sm text-[#666666]">
                {new Date(createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              {read_time && (
                <p className="font-lato text-sm text-[#666666]">
                  • {read_time} min read
                </p>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <Image
              src={image}
              alt={title || "Blog Image"}
              width={700}
              height={700}
              className="object-cover rounded-[10px] max-w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col-reverse md:flex-row justify-between w-wrapper mx-auto gap-10 md:gap-30 pt-3 md:pt-30">
        <div className="w-full md:w-1/3">
          <BlogNewsletter />
        </div>
        <div className="w-full md:w-2/3">
          <div className="bg-white rounded-[10px]">
            <BlocksRenderer content={content || []} />
          </div>
        </div>
      </div>

      {/* Related Posts */}
      <div className="w-wrapper mx-auto pt-20 md:pt-30">
        <h2 className="font-sequel-normal text-[24px] sm:text-[28px] md:text-[40px] leading-[1.2] md:leading-[48px] tracking-tighter">
          Related posts
        </h2>

        {relatedLoading ? (
          <p>Loading related posts...</p>
        ) : relatedError ? (
          <p>Error loading related posts: {relatedError.message}</p>
        ) : relatedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 related-post-section">
            {relatedPosts.map((post) => {
              const img = post?.banner_image?.url;
              const imageUrl = img
                ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${img}`
                : "https://placehold.co/300x200";

              return (
                <div key={post.id}>
                  <BlogCard
                    key={`blog-card-${post.id}`}
                    title={post?.title}
                    summary={post?.summary}
                    image={
                      post?.banner_image?.url
                        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${post.banner_image.url}`
                        : null
                    }
                    category={post?.category}
                    url={post?.slug ? `${post.slug}` : ""}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <p className="pt-8 text-gray-500">No related posts found.</p>
        )}
      </div>
    </div>
  );
}

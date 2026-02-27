"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import BlogNewsletter from "@/components/generic/BlogNewsletter";
import BlogCard from "@/components/ui/cards/BlogCard";
import { getStrapiMedia } from "@/lib/utils";
import { getBlogData, getRelatedPosts } from "@/lib/api/blog";

export default function BlogPageClient({ slugValue }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["blog", slugValue],
    queryFn: () => getBlogData(slugValue),
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
    queryFn: () => getRelatedPosts(category),
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
    ? getStrapiMedia(banner_image.url)
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

      <div className="w-wrapper mx-auto mt-10 md:mt-20 px-4 md:px-0">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-20">
          {/* Main Content */}
          <div className="w-full lg:w-[65%]">
            <div className="prose max-w-none">
              <BlocksRenderer content={content} />
            </div>
          </div>

          {/* Sidebar - Related Posts */}
          <div className="w-full lg:w-[35%]">
            <div className="sticky top-24">
              <h3 className="font-sequel-normal text-2xl mb-6 md:mb-8">
                Related Posts
              </h3>
              <div className="flex flex-col gap-6 md:gap-8">
                {relatedLoading ? (
                  <p>Loading related posts...</p>
                ) : relatedPosts.length > 0 ? (
                  relatedPosts.map((post) => (
                    <BlogCard
                      key={post.id}
                      category={post.category}
                      title={post.title}
                      date={new Date(post.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                      image={
                        post.banner_image
                          ? getStrapiMedia(post.banner_image.url)
                          : "https://placehold.co/100x100"
                      }
                      url={post.slug}
                    />
                  ))
                ) : (
                  <p className="text-gray-500">No related posts found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <BlogNewsletter />
    </div>
  );
}

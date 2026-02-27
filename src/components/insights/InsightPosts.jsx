"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import BlogCard from "../ui/cards/BlogCard";
import { getStrapiMedia } from "@/lib/utils";
import { getInsightPosts } from "@/lib/api/insight";

const InsightPosts = () => {
  const {
    data: insightPosts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["insightPosts"],
    queryFn: getInsightPosts,
    staleTime: 60 * 60 * 1000, // Data stays fresh for 1 hour
    cacheTime: 60 * 60 * 1000, // Cache persists for 1 hour
  });

  const posts = insightPosts?.data;

  const categories = useMemo(() => {
    if (!posts) return [];
    return [...new Set(posts.map((post) => post.category))].filter(Boolean);
  }, [posts]);

  const categoryLabels = {
    "adino news": "Adino News",
    "strategic partnerships": "Strategic Partnerships",
    "industry trends": "Industry Trends",
    "sustainibility spotlight": "Sustainability Spotlight",
  };

  const [activeCategory, setActiveCategory] = useState("all");
  const [postsToShow, setPostsToShow] = useState(8);
  const POSTS_PER_LOAD = 8;

  // Memoize filtered posts to prevent recalculation
  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    return activeCategory === "all"
      ? posts
      : posts.filter((post) => post.category === activeCategory);
  }, [posts, activeCategory]);

  // Posts to display (limited by postsToShow)
  const displayedPosts = useMemo(() => {
    return filteredPosts?.slice(0, postsToShow) || [];
  }, [filteredPosts, postsToShow]);

  // Check if there are more posts to load
  const hasMorePosts = filteredPosts?.length > postsToShow;

  // Handle category change - reset posts to show
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setPostsToShow(POSTS_PER_LOAD);
  };

  // Handle load more
  const handleLoadMore = () => {
    setPostsToShow((prev) => prev + POSTS_PER_LOAD);
  };

  // Capitalize category for display
  const capitalizeCategory = (category) => {
    if (!category) return "";

    return (
      categoryLabels[category] ||
      category
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Something went wrong: {error?.message}</p>
      </div>
    );
  }

  return (
    <div className="w-wrapper mx-auto pb-[60px] md:pb-[120px] px-4 md:px-0">
      {/* Category Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-8 md:mb-16">
        <button
          onClick={() => handleCategoryChange("all")}
          className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm transition-colors uppercase font-lato ${
            activeCategory === "all"
              ? "bg-[#181818] text-white"
              : "bg-[#F4F4F5] text-[#666666] hover:bg-gray-200"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm transition-colors uppercase font-lato ${
              activeCategory === category
                ? "bg-[#181818] text-white"
                : "bg-[#F4F4F5] text-[#666666] hover:bg-gray-200"
            }`}
          >
            {capitalizeCategory(category)}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {displayedPosts.map((post) => (
          <BlogCard
            key={post.id}
            category={capitalizeCategory(post.category)}
            title={post.title}
            date={new Date(post.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
            image={
              post.banner_image
                ? getStrapiMedia(post.banner_image.url)
                : "https://placehold.co/100x100"
            }
            url={post.slug}
          />
        ))}
      </div>

      {/* No Posts Message */}
      {displayedPosts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 font-lato">
            No posts found in this category.
          </p>
        </div>
      )}

      {/* Load More Button */}
      {hasMorePosts && (
        <div className="flex justify-center mt-12 md:mt-20">
          <button
            onClick={handleLoadMore}
            className="px-6 md:px-8 py-3 bg-[#181818] text-white rounded-full font-lato text-sm uppercase hover:bg-black transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default InsightPosts;

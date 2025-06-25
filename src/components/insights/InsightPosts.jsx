"use client";

import React, { useState, useMemo } from "react";
import qs from "qs";
import { useQuery } from "@tanstack/react-query";
import BlogCard from "../ui/cards/BlogCard";

const query = qs.stringify(
  {
    populate: "*",
  },
  { encodeValuesOnly: true }
);

const getInsightPosts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?${query}`
  );

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

const InsightPosts = () => {
  const {
    data: insightPosts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["insightposts"],
    queryFn: getInsightPosts,
    staleTime: 60 * 60 * 1000, // Data stays fresh for 1 hour
    cacheTime: 60 * 60 * 1000, // Cache persists for 1 hour
  });

  // Memoize categories to prevent recalculation on every render
  const categories = useMemo(() => {
    if (!insightPosts?.data) return [];
    return [...new Set(insightPosts.data.map((post) => post.category))].filter(
      Boolean
    );
  }, [insightPosts?.data]);

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
    if (!insightPosts?.data) return [];

    return activeCategory === "all"
      ? insightPosts.data
      : insightPosts.data.filter((post) => post.category === activeCategory);
  }, [insightPosts?.data, activeCategory]);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Something went wrong
            </h3>
            <p className="text-gray-600 mb-4">
              {error?.message ||
                "Failed to load blog posts. Please try again later."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Add safety check for data
  if (!insightPosts?.data || insightPosts.data.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No blog posts available
          </h3>
          <p className="text-gray-500">Check back later for new content.</p>
        </div>
      </div>
    );
  }

  console.log("InsightPosts Data:", insightPosts);
  console.log("Filtered Posts:", filteredPosts);
  console.log("Displayed Posts:", displayedPosts);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-14 justify-center">
        <button
          onClick={() => handleCategoryChange("all")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
            activeCategory === "all"
              ? "bg-[#F0FDF4] text-[#28282B] border border-[#64B46B] text-sm leading-[22px] font-lato font-normal"
              : "text-[#707079] text-sm leading-[22px] font-lato font-normal hover:text-gray-900"
          }`}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
              activeCategory === category
                ? "bg-[#F0FDF4] text-[#28282B] border border-[#64B46B] text-sm leading-[22px] font-lato font-normal"
                : "text-[#707079] text-sm leading-[22px] font-lato font-normal hover:text-gray-900"
            }`}
          >
            {capitalizeCategory(category)}
          </button>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 insight-posts-container">
        {displayedPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
          >
            <BlogCard
              key={`blog-card-${post.id}`}
              title={post?.title}
              summary={post?.summary}
              image={
                post?.banner_image?.url
                  ? `${post.banner_image.url}`
                  : null
              }
              category={post?.category}
              url={post?.slug ? `/blog/${post.slug}` : ""}
            />
          </div>
        ))}
      </div>

      {/* No Posts Message for filtered results */}
      {displayedPosts.length === 0 && filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No posts found
          </h3>
          <p className="text-gray-500">
            No blog posts available for the selected category.
          </p>
        </div>
      )}

      {/* Load More Section */}
      {displayedPosts.length > 0 && (
        <div className="text-center mt-12">
          {/* Post Count */}
          <div className="text-gray-500 text-sm mb-6 uppercase tracking-wide">
            SHOWING {displayedPosts.length} OF {filteredPosts.length}
          </div>

          {/* Load More Button */}
          {hasMorePosts && (
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 group text-sm cursor-pointer"
            >
              Load more
              <div className="ml-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold group-hover:bg-white group-hover:text-primary transition-colors">
                +
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default InsightPosts;

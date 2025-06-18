'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import qs from 'qs';
import Image from "next/image";

const query = qs.stringify(
  {
    populate: {
      footer: {
        populate: [
          "social_links.icon_image",
          "explore_adino_pages",
          "governance_pages",
          "more_info_pages",
        ],
      },
    },
  },
  { encodeValuesOnly: true }
);

const getFooterData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/footer?${query}`
  );
  const data = await res.json();
  return data;
};

export default function Footer() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const result = await getFooterData();
          setData(result.data);
        } catch (error) {
          console.error("Error fetching hero data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, []);

    // Don't render content until data is loaded
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6 bg relative">
          <p>Loading...</p>
        </div>
      );
    }

    const {footer} = data;
    const {social, social_links, explore_adino_text, explore_adino_pages, governance_text, governance_pages, more_info_pages, more_info_text, address_text, address_content } = footer

  return (
    <footer className="bg-green-800 text-white py-12 px-6 relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute right-0 top-0 w-64 h-full opacity-10">
        <div className="absolute right-8 top-16 w-32 h-32 border-2 border-white/20 rotate-45"></div>
        <div className="absolute right-16 top-32 w-24 h-24 border-2 border-white/20 rotate-45"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Social Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-white/30 pb-2">
              {social}
            </h3>
            <div className="flex flex-col space-y-4">
              {social_links.map((link, index) => (
                <Link
                  href={link.icon_url}
                  key={index}
                  className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                >
                  <Image
                    src={`${link.icon_image.url}`}
                    width={40}
                    height={40}
                    alt="icons"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Explore Adino Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-white/30 pb-2">
              {explore_adino_text}
            </h3>
            <div className="space-y-3">
              {explore_adino_pages.map((page, index) => (
                <Link
                  href={page.href}
                  key={index}
                  className="block text-white/80 hover:text-white transition-colors"
                >
                  {page.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Governance Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-white/30 pb-2">
              {governance_text}
            </h3>
            <div className="space-y-3">
              {governance_pages.map((page, index) => (
                <Link
                  href={page.href}
                  key={index}
                  className="block text-white/80 hover:text-white transition-colors"
                >
                  {page.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Address Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-white/30 pb-2">
              {address_text}
            </h3>
            <div className="text-white/80">
              <p>{address_content}</p>
            </div>
          </div>

          {/* More Information Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-white/30 pb-2">
              {more_info_text}
            </h3>
            <div className="space-y-3">
              {more_info_pages.map((page, index) => (
                <Link
                  href={page.href}
                  key={index}
                  className="block text-white/80 hover:text-white transition-colors"
                >
                  {page.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/30 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-white/70 text-sm">
            © Adino Investment Limited, Inc. {new Date().getFullYear()} All
            Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// components/nav-menu.js
"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export const NavMenu = ({ className = "", variant = "desktop" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const mobileStyles =
    variant === "mobile"
      ? "flex-col justify-start items-start bg-white text-black gap-10 text-xl p-4"
      : "";

  return (
    <nav
      className={`flex font-lato ${
        variant === "mobile"
          ? mobileStyles
          : "bg-primary rounded-full px-10 py-2 text-white text-base space-x-9"
      } ${className}`}
    >
      <Link href="/about">About</Link>

      <div className="relative group" ref={dropdownRef}>
        <button
          className="flex items-center gap-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          Subsidiaries <span>{isOpen ? "-" : "+"}</span>
        </button>
        {isOpen && (
          <ul
            className={`bg-white text-black rounded-md shadow-lg z-10 transition-all duration-300 ease-in-out ${
              variant === "mobile"
                ? "mt-2 shadow-none"
                : "absolute top-full left-0 mt-2"
            }`}
          >
            <li>
              <Link
                href="/subsidiary/1"
                className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Subsidiary 1
              </Link>
            </li>
            <li>
              <Link
                href="/subsidiary/2"
                className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Subsidiary 2
              </Link>
            </li>
          </ul>
        )}
      </div>

      <Link href="/insights">Insights</Link>
      <Link href="/careers">Careers</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
};

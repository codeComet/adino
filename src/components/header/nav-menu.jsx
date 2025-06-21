
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export const NavMenu = ({ className = "", variant = "desktop", type="home" }) => {
  const pathname = usePathname();
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

  return type !== "main" ? (
    <nav
      className={`flex font-lato ${
        variant === "mobile"
          ? mobileStyles
          : "bg-primary rounded-full px-10 py-2 text-white text-base space-x-9"
      } ${className}`}
    >
      <Link href="/about" className={pathname === "/about" ? "text-[#AD9056]" : ""}>About</Link>

      <div className="relative group" ref={dropdownRef}>
        <button
          className={`flex items-center gap-1 ${pathname.startsWith("/subsidiary") ? "text-[#AD9056]" : ""}`}
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

      <Link href="/insights" className={pathname === "/insights" ? "text-[#AD9056]" : ""}>Insights</Link>
      <Link href="/careers" className={pathname === "/careers" ? "text-[#AD9056]" : ""}>Careers</Link>
      <Link href="/contact" className={pathname === "/contact" ? "text-[#AD9056]" : ""}>Contact</Link>
    </nav>
  ) : (
    <nav
      className={`flex font-lato ${
        variant === "mobile"
          ? mobileStyles
          : "bg-white w-full px-10 py-2 text-black text-base space-x-9 justify-center"
      } ${className}`}
    >
      <Link href="/about" className={`hover:text-[#AD9056] ${pathname === "/about" ? "text-[#AD9056]" : ""}`}>About</Link>

      <div className="relative group" ref={dropdownRef}>
        <button
          className={`flex items-center gap-1 hover:text-[#AD9056] ${pathname.startsWith("/subsidiary") ? "text-[#AD9056]" : ""}`}
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
                className="block px-4 py-2 hover:text-[#AD9056] transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Subsidiary 1
              </Link>
            </li>
            <li>
              <Link
                href="/subsidiary/2"
                className="block px-4 py-2 hover:text-[#AD9056] transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Subsidiary 2
              </Link>
            </li>
          </ul>
        )}
      </div>

      <Link href="/insights" className={`hover:text-[#AD9056] ${pathname === "/insights" ? "text-[#AD9056]" : ""}`}>Insights</Link>
      <Link href="/careers" className={`hover:text-[#AD9056] ${pathname === "/careers" ? "text-[#AD9056]" : ""}`}>Careers</Link>
      <Link href="/contact" className={`hover:text-[#AD9056] ${pathname === "/contact" ? "text-[#AD9056]" : ""}`}>Contact</Link>
    </nav>
  );
};

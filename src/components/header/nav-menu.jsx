"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import sub1 from "../../../public/assets/img/sub-1.svg";
import sub2 from "../../../public/assets/img/sub-2.svg";
import sub3 from "../../../public/assets/img/sub-3.svg";
import sub4 from "../../../public/assets/img/sub-4.svg";
import rightArrow from "../../../public/assets/img/rightArrow.svg";

export const NavMenu = ({
  className = "",
  variant = "desktop",
  type = "home",
}) => {
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
      <Link
        href="/about"
        className={pathname === "/about" ? "text-[#AD9056]" : ""}
      >
        About
      </Link>

      <div className="relative group" ref={dropdownRef}>
        <button
          className={`flex items-center gap-1 ${
            pathname.startsWith("/subsidiary") ? "text-[#AD9056]" : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          Subsidiaries <span>{isOpen ? "-" : "+"}</span>
        </button>
        {(variant === "mobile" && isOpen) || variant !== "mobile" ? (
  <ul
    className={`bg-white text-black rounded-[40px] shadow-lg z-10 py-[27px] md:px-[15px]
      ${variant === "mobile"
        ? "mt-2 shadow-none w-full grid grid-cols-1"
        : "absolute top-[40px] left-[145px] -translate-x-1/2 mt-2 w-[650px] grid grid-cols-2"
      }
      gap-2 sm:gap-4
      transition-all duration-300 ease-in-out transform
      ${isOpen
        ? "opacity-100 translate-y-0 visible"
        : "opacity-0 -translate-y-4 invisible"
      }`}
  >
          <li className="md:py-[15px] md:px-[20px]">
            <Link
              href="/subsidiary/1"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <span className="flex-shrink-0">
                {/* Replace with your SVG */}
                <Image
                  src={sub1}
                  width={30}
                  height={30}
                  alt="menu"
                  className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]"
                />
              </span>
              <span className="flex flex-col flex-grow gap-1 sm:gap-2">
                <span className="font-sequel-normal text-base sm:text-lg tracking-[-1%] text-[#181818] leading-4.5">
                  Adino <br /> Capital
                </span>
                <span className="text-xs sm:text-sm text-[#666666] font-lato font-medium tracking-[-1%]">
                  Grow with Adino Capital.
                </span>
              </span>
              <span className="ml-auto">
                <Image
                  src={rightArrow}
                  width={15}
                  height={15}
                  alt="arrow"
                  className="w-[12px] h-[12px] sm:w-[15px] sm:h-[15px]"
                />
              </span>
            </Link>
          </li>
          <li className="md:py-[15px] md:px-[20px]">
            <Link
              href="/subsidiary/2"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <span className="flex-shrink-0">
                {/* Replace with your SVG */}
                <Image
                  src={sub2}
                  width={30}
                  height={30}
                  alt="menu"
                  className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]"
                />
              </span>
              <span className="flex flex-col flex-grow gap-1 sm:gap-2">
                <span className="font-sequel-normal text-base sm:text-lg tracking-[-1%] text-[#181818] leading-4.5">
                  Adino <br /> Partners
                </span>
                <span className="text-xs sm:text-sm text-[#666666] font-lato font-medium tracking-[-1%]">
                  Building Success Together.
                </span>
              </span>
              <span className="ml-auto">
                <Image
                  src={rightArrow}
                  width={15}
                  height={15}
                  alt="arrow"
                  className="w-[12px] h-[12px] sm:w-[15px] sm:h-[15px]"
                />
              </span>
            </Link>
          </li>
          <li className="md:py-[15px] md:px-[20px]">
            <Link
              href="/subsidiary/3"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <span className="flex-shrink-0">
                {/* Replace with your SVG */}
                <Image
                  src={sub3}
                  width={30}
                  height={30}
                  alt="menu"
                  className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]"
                />
              </span>
              <span className="flex flex-col flex-grow gap-1 sm:gap-2">
                <span className="font-sequel-normal text-base sm:text-lg tracking-[-1%] text-[#181818] leading-4.5">
                  Adino <br /> Global Markets
                </span>
                <span className="text-xs sm:text-sm text-[#666666] font-lato font-medium tracking-[-1%]">
                  Your Market Edge.
                </span>
              </span>
              <span className="ml-auto">
                <Image
                  src={rightArrow}
                  width={15}
                  height={15}
                  alt="arrow"
                  className="w-[12px] h-[12px] sm:w-[15px] sm:h-[15px]"
                />
              </span>
            </Link>
          </li>
          <li className="md:py-[15px] md:px-[20px]">
            <Link
              href="/subsidiary/4"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <span className="flex-shrink-0">
                {/* Replace with your SVG */}
                <Image
                  src={sub4}
                  width={30}
                  height={30}
                  alt="menu"
                  className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]"
                />
              </span>
              <span className="flex flex-col flex-grow gap-1 sm:gap-2">
                <span className="font-sequel-normal text-base sm:text-lg tracking-[-1%] text-[#181818] leading-4.5">
                  Adino Asset <br /> Management
                </span>
                <span className="text-xs sm:text-sm text-[#666666] font-lato font-medium tracking-[-1%]">
                  Smart Asset Solutions.
                </span>
              </span>
              <span className="ml-auto">
                <Image
                  src={rightArrow}
                  width={15}
                  height={15}
                  alt="arrow"
                  className="w-[12px] h-[12px] sm:w-[15px] sm:h-[15px]"
                />
              </span>
            </Link>
          </li>
        </ul>
        ) : null}
      </div>

      <Link
        href="/insights"
        className={pathname === "/insights" ? "text-[#AD9056]" : ""}
      >
        Insights
      </Link>
      <Link
        href="/careers"
        className={pathname === "/careers" ? "text-[#AD9056]" : ""}
      >
        Careers
      </Link>
      <Link
        href="/contact"
        className={pathname === "/contact" ? "text-[#AD9056]" : ""}
      >
        Contact
      </Link>
    </nav>
  ) : (
    <nav
      className={`flex font-lato ${
        variant === "mobile"
          ? mobileStyles
          : "bg-white w-full px-10 py-2 text-black text-base space-x-9 justify-center"
      } ${className}`}
    >
      <Link
        href="/about"
        className={`hover:text-[#AD9056] ${
          pathname === "/about" ? "text-[#AD9056]" : ""
        }`}
      >
        About
      </Link>

      <div className="relative group" ref={dropdownRef}>
        <button
          className={`flex items-center gap-1 hover:text-[#AD9056] ${
            pathname.startsWith("/subsidiary") ? "text-[#AD9056]" : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          Subsidiaries <span>{isOpen ? "-" : "+"}</span>
        </button>
        <ul
          className={`bg-white text-black rounded-[40px] shadow-lg z-10 py-[27px] md:px-[15px] 
                    ${
                      variant === "mobile"
                        ? "mt-2 shadow-none w-full grid grid-cols-1"
                        : "absolute top-[40px] left-[145px] -translate-x-1/2 mt-2 w-[650px] grid grid-cols-2"
                    } gap-2 sm:gap-4
                    transform transition-all duration-300 ease-in-out
                    ${
                      isOpen
                        ? "opacity-100 translate-y-0 visible"
                        : "opacity-0 -translate-y-4 invisible"
                    }
                    `}
        >
          <li className="md:py-[15px] md:px-[20px]">
            <Link
              href="/subsidiary/1"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <span className="flex-shrink-0">
                {/* Replace with your SVG */}
                <Image
                  src={sub1}
                  width={30}
                  height={30}
                  alt="menu"
                  className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]"
                />
              </span>
              <span className="flex flex-col flex-grow gap-1 sm:gap-2">
                <span className="font-sequel-normal text-base sm:text-lg tracking-[-1%] text-[#181818] leading-4.5">
                  Adino <br /> Capital
                </span>
                <span className="text-xs sm:text-sm text-[#666666] font-lato font-medium tracking-[-1%]">
                  Grow with Adino Capital.
                </span>
              </span>
              <span className="ml-auto">
                <Image
                  src={rightArrow}
                  width={15}
                  height={15}
                  alt="arrow"
                  className="w-[12px] h-[12px] sm:w-[15px] sm:h-[15px]"
                />
              </span>
            </Link>
          </li>
          <li className="md:py-[15px] md:px-[20px]">
            <Link
              href="/subsidiary/2"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <span className="flex-shrink-0">
                {/* Replace with your SVG */}
                <Image
                  src={sub2}
                  width={30}
                  height={30}
                  alt="menu"
                  className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]"
                />
              </span>
              <span className="flex flex-col flex-grow gap-1 sm:gap-2">
                <span className="font-sequel-normal text-base sm:text-lg tracking-[-1%] text-[#181818] leading-4.5">
                  Adino <br /> Partners
                </span>
                <span className="text-xs sm:text-sm text-[#666666] font-lato font-medium tracking-[-1%]">
                  Building Success Together.
                </span>
              </span>
              <span className="ml-auto">
                <Image
                  src={rightArrow}
                  width={15}
                  height={15}
                  alt="arrow"
                  className="w-[12px] h-[12px] sm:w-[15px] sm:h-[15px]"
                />
              </span>
            </Link>
          </li>
          <li className="md:py-[15px] md:px-[20px]">
            <Link
              href="/subsidiary/3"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <span className="flex-shrink-0">
                {/* Replace with your SVG */}
                <Image
                  src={sub3}
                  width={30}
                  height={30}
                  alt="menu"
                  className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]"
                />
              </span>
              <span className="flex flex-col flex-grow gap-1 sm:gap-2">
                <span className="font-sequel-normal text-base sm:text-lg tracking-[-1%] text-[#181818] leading-4.5">
                  Adino <br /> Global Markets
                </span>
                <span className="text-xs sm:text-sm text-[#666666] font-lato font-medium tracking-[-1%]">
                  Your Market Edge.
                </span>
              </span>
              <span className="ml-auto">
                <Image
                  src={rightArrow}
                  width={15}
                  height={15}
                  alt="arrow"
                  className="w-[12px] h-[12px] sm:w-[15px] sm:h-[15px]"
                />
              </span>
            </Link>
          </li>
          <li className="md:py-[15px] md:px-[20px]">
            <Link
              href="/subsidiary/4"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <span className="flex-shrink-0">
                {/* Replace with your SVG */}
                <Image
                  src={sub4}
                  width={30}
                  height={30}
                  alt="menu"
                  className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]"
                />
              </span>
              <span className="flex flex-col flex-grow gap-1 sm:gap-2">
                <span className="font-sequel-normal text-base sm:text-lg tracking-[-1%] text-[#181818] leading-4.5">
                  Adino Asset <br /> Management
                </span>
                <span className="text-xs sm:text-sm text-[#666666] font-lato font-medium tracking-[-1%]">
                  Smart Asset Solutions.
                </span>
              </span>
              <span className="ml-auto">
                <Image
                  src={rightArrow}
                  width={15}
                  height={15}
                  alt="arrow"
                  className="w-[12px] h-[12px] sm:w-[15px] sm:h-[15px]"
                />
              </span>
            </Link>
          </li>
        </ul>
      </div>

      <Link
        href="/insights"
        className={`hover:text-[#AD9056] ${
          pathname === "/insights" ? "text-[#AD9056]" : ""
        }`}
      >
        Insights
      </Link>
      <Link
        href="/careers"
        className={`hover:text-[#AD9056] ${
          pathname === "/careers" ? "text-[#AD9056]" : ""
        }`}
      >
        Careers
      </Link>
      <Link
        href="/contact"
        className={`hover:text-[#AD9056] ${
          pathname === "/contact" ? "text-[#AD9056]" : ""
        }`}
      >
        Contact
      </Link>
    </nav>
  );
};

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import compass from "../../../public/assets/img/adino-mark.png";
import rightArrow from "../../../public/assets/img/rightarrow.svg";

export const NavMenu = ({ className = "", variant = "desktop" }) => {
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

  return (
    <nav
      className={`flex font-lato ${
        variant === "mobile"
          ? mobileStyles
          : "bg-primary rounded-full px-4 xl:px-6 2xl:px-10 py-2 text-white text-sm xl:text-[15px] 2xl:text-base gap-4 xl:gap-6 2xl:gap-9"
      } ${className}`}
    >
      <Link
        href="/"
        className={`hover:text-[#AD9056] ${
          pathname === "/" ? "text-[#AD9056]" : ""
        }`}
      >
        Home
      </Link>

      <Link
        href="/about"
        className={`hover:text-[#AD9056] ${
          pathname === "/about" ? "text-[#AD9056]" : ""
        }`}
      >
        About
      </Link>
      {/* <Link
        href="/what-we-do"
        className={`hover:text-[#AD9056] ${
          pathname === "/what-we-do" ? "text-[#AD9056]" : ""
        }`}
      >
        What We Do
      </Link> */}

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
          className={`bg-white text-black rounded-[40px] z-10 md:px-[15px]
                    ${
                      variant === "mobile"
                        ? "shadow-none w-full grid grid-cols-1 overflow-hidden transform transition-[max-height,opacity,transform,padding,margin] duration-300 ease-in-out"
                        : "shadow-lg absolute top-[40px] left-[145px] -translate-x-1/2 mt-2 w-[650px] grid grid-cols-2 py-[27px] transform transition-all duration-300 ease-in-out"
                    } gap-2 sm:gap-4
                    ${
                      variant === "mobile"
                        ? isOpen
                          ? "mt-2 py-[27px] max-h-[1000px] opacity-100 translate-y-0"
                          : "mt-0 py-0 max-h-0 opacity-0 translate-y-2 pointer-events-none"
                        : isOpen
                          ? "opacity-100 translate-y-0 visible"
                          : "opacity-0 -translate-y-4 invisible"
                    }`}
        >
          <li className="md:py-[15px] md:px-[20px]">
            <div className="flex flex-col gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <Link
                href="/subsidiaries/adino-capital"
                className="flex items-center gap-3"
                onClick={() => setIsOpen(false)}
              >
                <span className="shrink-0">
                  <Image
                    src={compass}
                    width={50}
                    height={50}
                    alt="menu"
                    className="w-[50px] h-[50px] sm:w-[50px] sm:h-[50px]"
                  />
                </span>
                <span className="flex flex-col grow gap-1 sm:gap-2">
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
              <div className="flex gap-2 ml-[32px] sm:ml-[42px]">
                <Link
                  href="/subsidiaries/about-adino-capital"
                  className="inline-flex items-center rounded-full bg-[#AD9056] px-4 py-1 text-white text-xs sm:text-sm font-lato font-medium hover:bg-[#9C7F4A] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/subsidiaries/adino-capital-service"
                  className="inline-flex items-center rounded-full bg-[#AD9056] px-4 py-1 text-white text-xs sm:text-sm font-lato font-medium hover:bg-[#9C7F4A] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </Link>
              </div>
            </div>
          </li>
          <li className="md:py-[15px] md:px-[20px]">
            <div className="flex flex-col gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <Link
                href="/subsidiaries/adino-partners"
                className="flex items-center gap-3"
                onClick={() => setIsOpen(false)}
              >
                <span className="shrink-0">
                  <Image
                    src={compass}
                    width={50}
                    height={50}
                    alt="menu"
                    className="w-[50px] h-[50px] sm:w-[50px] sm:h-[50px]"
                  />
                </span>
                <span className="flex flex-col grow gap-1 sm:gap-2">
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
              <div className="flex gap-2 ml-[32px] sm:ml-[42px]">
                <Link
                  href="/subsidiaries/about-adino-partners"
                  className="inline-flex items-center rounded-full bg-[#AD9056] px-4 py-1 text-white text-xs sm:text-sm font-lato font-medium hover:bg-[#9C7F4A] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/subsidiaries/adino-partners-service"
                  className="inline-flex items-center rounded-full bg-[#AD9056] px-4 py-1 text-white text-xs sm:text-sm font-lato font-medium hover:bg-[#9C7F4A] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </Link>
              </div>
            </div>
          </li>
          <li className="md:py-[15px] md:px-[20px]">
            <div className="flex flex-col gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <Link
                href="/subsidiaries/adino-global-market"
                className="flex items-center gap-3"
                onClick={() => setIsOpen(false)}
              >
                <span className="shrink-0">
                  <Image
                    src={compass}
                    width={50}
                    height={50}
                    alt="menu"
                    className="w-[50px] h-[50px] sm:w-[50px] sm:h-[50px]"
                  />
                </span>
                <span className="flex flex-col grow gap-1 sm:gap-2">
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
              <div className="flex gap-2 ml-[32px] sm:ml-[42px]">
                <Link
                  href="/subsidiaries/about-adino-global-market"
                  className="inline-flex items-center rounded-full bg-[#AD9056] px-4 py-1 text-white text-xs sm:text-sm font-lato font-medium hover:bg-[#9C7F4A] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/subsidiaries/adino-global-market#services"
                  className="inline-flex items-center rounded-full bg-[#AD9056] px-4 py-1 text-white text-xs sm:text-sm font-lato font-medium hover:bg-[#9C7F4A] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </Link>
              </div>
            </div>
          </li>
          <li className="md:py-[15px] md:px-[20px]">
            <div className="flex flex-col gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <Link
                href="/subsidiaries/asset-management"
                className="flex items-center gap-3"
                onClick={() => setIsOpen(false)}
              >
                <span className="shrink-0">
                  <Image
                    src={compass}
                    width={50}
                    height={50}
                    alt="menu"
                    className="w-[50px] h-[50px] sm:w-[50px] sm:h-[50px]"
                  />
                </span>
                <span className="flex flex-col grow gap-1 sm:gap-2">
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
              <div className="flex gap-2 ml-[32px] sm:ml-[42px]">
                <Link
                  href="/subsidiaries/about-asset-management"
                  className="inline-flex items-center rounded-full bg-[#AD9056] px-4 py-1 text-white text-xs sm:text-sm font-lato font-medium hover:bg-[#9C7F4A] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/subsidiaries/asset-management-service"
                  className="inline-flex items-center rounded-full bg-[#AD9056] px-4 py-1 text-white text-xs sm:text-sm font-lato font-medium hover:bg-[#9C7F4A] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </Link>
              </div>
            </div>
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
        href="/csr"
        className={`hover:text-[#AD9056] ${
          pathname === "/csr" ? "text-[#AD9056]" : ""
        }`}
      >
        CSR
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

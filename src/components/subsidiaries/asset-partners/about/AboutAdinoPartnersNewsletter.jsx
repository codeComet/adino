import React from "react";
import Link from "next/link";

const AboutAdinoPartnersNewsletter = () => {
  return (
    <section className="bg-[#F7F7F7] py-12 sm:py-16 md:py-20 lg:py-[104px]">
      <div className="w-wrapper mx-auto px-4 md:px-0">
        <div className="relative overflow-hidden rounded-[28px] bg-[#166636] px-6 py-14 sm:px-10 md:px-16 lg:py-[88px] flex flex-col items-center text-center">
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full opacity-30"
            viewBox="0 0 1200 300"
            preserveAspectRatio="none"
          >
            <path
              d="M0,55 C150,10 300,100 450,55 C600,10 750,100 900,55 C1050,10 1150,60 1200,45"
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
            <path
              d="M0,85 C160,40 310,130 470,85 C630,40 780,130 940,85 C1070,50 1140,95 1200,75"
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
            <path
              d="M0,115 C150,70 320,160 470,115 C620,70 790,160 940,115 C1070,80 1140,125 1200,105"
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
            <path
              d="M0,145 C160,100 320,190 480,145 C640,100 800,190 960,145 C1080,115 1145,160 1200,135"
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
            <path
              d="M0,175 C150,130 320,220 470,175 C620,130 790,220 940,175 C1070,145 1140,190 1200,165"
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
            <path
              d="M0,205 C160,160 320,250 480,205 C640,160 800,250 960,205 C1080,175 1145,220 1200,195"
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
            <path
              d="M0,235 C150,190 320,280 470,235 C620,190 790,280 940,235 C1070,205 1140,250 1200,225"
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
          </svg>

          <div className="relative z-10 max-w-3xl">
            <h2 className="font-sequel-normal text-white text-[28px] sm:text-4xl md:text-5xl leading-[1.15] tracking-tighter">
              Ready to Partner with Us?
            </h2>
            <p className="mt-4 font-lato font-normal text-white/90 text-sm sm:text-base md:text-lg leading-6 sm:leading-7">
              Connect with our experienced team to discuss how we can help you
              achieve your financial and investment goals.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/subsidiaries/adino-partners"
                className="bg-white text-primary font-lato font-medium rounded-full px-6 py-3 text-sm sm:text-base hover:bg-white/95 transition-colors"
              >
                Explore our Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAdinoPartnersNewsletter;

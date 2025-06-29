import Link from "next/link";

const Services = ({ data }) => {
  const { title, heading, services } = data;
  return (
    <div className="w-full bg-[#EDF3F1] py-12 sm:py-16 md:py-20 lg:py-[104px]">
      <div className="w-wrapper mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:gap-6 pb-3 border-b border-[#00000033]">
          <h5 className="font-lato text-xs sm:text-sm uppercase text-black font-medium bg-white rounded-full py-1 px-3 sm:px-4 w-fit">
            {title}
          </h5>
          <h2 className="font-sequel-normal text-[24px] sm:text-[28px] md:text-[32px] lg:text-5xl leading-[1.2] md:leading-[60px] tracking-tighter">
            {heading}
          </h2>
        </div>

        {/* services */}

        {services.length !== 0
          ? services.map((item, index) => (
              <div
                className="flex flex-col md:flex-row md:items-center justify-between py-4 sm:py-5 border-b border-[#00000033] gap-4 md:gap-0"
                key={index}
              >
                <div className="flex flex-col gap-2 sm:gap-3 w-full md:w-1/2">
                  <h3 className="font-sequel-normal text-xl sm:text-2xl leading-8 sm:leading-10 text-black tracking-tighter">
                    {item.title}
                  </h3>
                  <p className="font-lato font-medium text-base sm:text-lg leading-7 sm:leading-7.5 text-[#333333]">
                    {item.description}
                  </p>
                </div>
                <div className="flex gap-2.5 items-center">
                  <Link 
                    href={item?.url || ""} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-sm sm:text-base hover:underline"
                  >
                    {item?.url_text}
                  </Link>
                  <>
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 sm:w-[18px] sm:h-[19px]"
                    >
                      <path
                        d="M2 9.38989H16M16 9.38989L11.8933 13.3899M16 9.38989L11.8933 5.38989"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Services;

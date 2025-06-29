import Link from "next/link";
import Image from "next/image";

const Services = ({ data }) => {
  const { title, heading, services, image, cta } = data;
  return (
    <div className="w-wrapper mx-auto flex flex-col md:flex-row gap-8 md:gap-0 bg-[#EDF3F1] p-4 sm:p-6 md:p-8 lg:p-10 rounded-[5px]">
      <div className="px-3 sm:px-4 md:px-6 lg:px-8 w-full md:w-1/2 h-full">
        <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 pb-3">
          <h5 className="font-lato text-xs sm:text-sm uppercase text-black font-medium bg-white rounded-full py-1 px-3 sm:px-4 w-fit">
            {title}
          </h5>
          <h2 className="font-sequel-normal text-[20px] sm:text-[24px] md:text-[32px] lg:text-5xl leading-[1.2] md:leading-[60px] tracking-tighter">
            {heading}
          </h2>
        </div>

        {/* services */}
        <>
          {services.length !== 0
            ? services.map((item, index) => (
                <div
                  className="mt-[30px] sm:mt-[40px] md:mt-[56px]"
                  key={index}
                >
                  <div className="flex gap-2 sm:gap-3 w-full mb-[30px] sm:mb-[45px] md:mb-[57px] max-w-[400px]">
                    <div>
                      <span className="font-lato font-medium text-base sm:text-[32px] md:text-[52px] leading-7 md:leading-[52px] text-[#00000073] mr-1.5 sm:mr-2.5">
                        0{index + 1}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 sm:gap-3.5">
                      <h3 className="font-sequel-normal text-lg sm:text-xl md:text-2xl leading-7 sm:leading-8 md:leading-10 text-black tracking-tighter">
                        {item.title}
                      </h3>
                      <p className="font-lato font-medium text-sm sm:text-base leading-5 sm:leading-6 text-[#333333]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </>

        {/* Cta */}
        <div className="flex gap-2 sm:gap-2.5 items-center">
          <Link
            href={cta?.cta_btn_url}
            className="font-lato font-medium text-xs sm:text-sm leading-4.5 text-black"
          >
            {cta?.cta_btn_text}
          </Link>
          <>
            <svg
              width="16"
              height="16"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="sm:w-[18px] sm:h-[18px]"
            >
              <path
                d="M2 9H16M16 9L11.8933 13M16 9L11.8933 5"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
        </div>
      </div>

      <div className="w-full md:w-1/2 h-full flex justify-center md:justify-end">
        <Image
          src={`${image?.url}`}
          alt="image"
          width={600}
          height={600}
          className="w-full max-w-[400px] md:max-w-[600px] h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Services;

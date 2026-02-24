import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

const About = ({ data }) => {
  const { title, heading, description_1, image_1, stats } = data;
  return (
    <div className="w-wrapper mx-auto pt-[52px] md:pt-[104px] px-4 md:px-0">
      <div className="flex flex-col gap-6 max-w-[400px] mb-10">
        <h5 className="font-lato text-sm uppercase text-black font-medium bg-[#E4EDF4] rounded-full py-1 px-4 w-fit">
          {title}
        </h5>
        <h2 className="font-sequel-normal text-[24px] sm:text-[28px] md:text-[32px] lg:text-5xl leading-[1.2] md:leading-[60px] tracking-tighter text-[#181818] max-w-[460px]">
          {heading}
        </h2>
      </div>
      <div className="flex flex-col md:flex-row gap-8 md:gap-30 justify-between">
        <div className="flex flex-col gap-4 md:gap-6 justify-center w-full md:w-1/2">
          <Image
            src={getStrapiMedia(image_1?.url)}
            alt="About Image"
            width={600}
            height={400}
            className="h-full object-cover rounded-lg md:rounded-none"
          />
        </div>
        <div className="flex flex-col gap-4 md:gap-6 justify-center w-full md:w-1/2">
          <>
            {description_1.map((item, index) => (
              <p
                className="text-base md:text-lg leading-[26px] md:leading-[30px] font-lato font-medium text-[#666666]"
                key={index}
              >
                {item?.children?.[0]?.text}
              </p>
            ))}
          </>
          <div className="bg-primary py-8 md:py-[45px] px-4 md:px-[30px] flex flex-col md:flex-row justify-center items-center gap-6 md:gap-[55px]">
            {stats.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-1 text-center md:text-left"
              >
                <h3 className="text-[24px] leading-[24px] md:text-[56px] md:leading-[64px] tracking-tighter font-sequel-normal text-white">
                  {item?.title}
                </h3>
                <p className="text-base md:text-lg font-lato font-medium text-[#EAF3F3] leading-6 md:leading-7.5">
                  {item?.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

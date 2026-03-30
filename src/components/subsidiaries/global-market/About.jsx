import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";
import RightArrow from "../../../../public/assets/img/arrow-right.svg";

const About = ({ data }) => {
  const {
    title,
    heading,
    description_1,
    description_2,
    image_1,
    image_2,
    cta_btn,
  } = data;

  return (
    <div className="w-wrapper mx-auto flex flex-col md:flex-row gap-8 md:gap-20 justify-between pb-[52px] md:py-[104px] px-4 md:px-0">
      <div className="flex flex-col gap-4 md:gap-6 justify-center w-full md:w-1/2">
        <h5 className="font-lato text-base md:text-xl uppercase text-primary font-medium bg-[#F0FDF4] rounded-full py-1 px-4 w-fit">
          {title}
        </h5>
        <h2 className="font-sequel-normal text-[24px] sm:text-[28px] md:text-[32px] lg:text-5xl leading-[1.2] md:leading-[60px] tracking-tighter">
          {heading}
        </h2>
        <p className="text-base md:text-lg leading-[26px] md:leading-[35px] font-lato font-medium text-[#333333]">
          {description_1?.[0]?.children?.[0]?.text}
        </p>
        <Image
          src={getStrapiMedia(image_1?.url)}
          alt="Hero Image"
          width={200}
          height={200}
          className="w-full h-[250px] sm:h-[300px] md:h-auto object-cover rounded-lg md:rounded-none"
        />
      </div>
      <div className="flex flex-col gap-4 md:gap-6 justify-center w-full md:w-1/2">
        <Image
          src={getStrapiMedia(image_2?.url)}
          alt="Hero Image"
          width={200}
          height={200}
          className="w-full h-[250px] sm:h-[300px] md:h-auto object-cover rounded-lg md:rounded-none"
        />
        <p className="text-base md:text-lg leading-[26px] md:leading-[30px] font-lato font-medium text-[#333333]">
          {description_2?.[0]?.children?.[0]?.text}
        </p>
        <div className="w-full md:max-w-fit flex items-center justify-start mt-4 md:mt-7.5 mb-8 bg-primary hover:bg-green-700 cursor-pointer text-white font-medium py-3 px-6 rounded-[20px] transition-colors duration-200 focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
          <a
            href={cta_btn[0]?.cta_btn_url}
            rel="noopener noreferrer"
            size="lg"
            className="flex items-center justify-between gap-5"
          >
            {cta_btn[0]?.cta_btn_text}
            <Image
              src={RightArrow}
              alt="down arrow"
              width={20}
              height={20}
              className="md:w-6 md:h-6"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;

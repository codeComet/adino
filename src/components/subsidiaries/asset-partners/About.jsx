import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

const About = ({ data }) => {
  const { title, heading, description_1, image_1, stats, cta_btn } = data;

  console.log(data);

  return (
    <div className="w-wrapper mx-auto pt-[52px] md:pt-[104px] px-4 md:px-0">
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
          <div className="flex flex-col gap-6 max-w-[400px] mb-10">
            <h2 className="font-sequel-normal text-primary text-[24px] sm:text-[28px] md:text-[32px] lg:text-5xl leading-[1.2] md:leading-[60px] tracking-tighter max-w-[460px]">
              {heading}
            </h2>
          </div>
          <>
            {description_1 && description_1?.map((item, index) => (
              <p
                className="text-base md:text-lg leading-[26px] md:leading-[30px] font-lato font-medium text-[#666666]"
                key={index}
              >
                {item?.children?.[0]?.text}
              </p>
            ))}
          </>
          <div className="mt-12  flex flex-col justify-center items-center gap-6 md:gap-[55px]">
            {stats.map((item, index) => (
              <div key={index} className="flex gap-5 text-center md:text-left">
                <Image
                  src={getStrapiMedia(item?.image?.url) || ""}
                  alt="Stats Icon"
                  width={40}
                  height={40}
                  className="w-[40px] h-[40px] object-cover"
                />
                <div className={`flex flex-col ${item?.title === null ? "gap-0" : "gap-4"}`}>
                  <h3 className="text-[24px] leading-[30px] tracking-tighter font-sequel-normal text-[#181818] font-semibold">
                    {item?.title}
                  </h3>
                  <p className="text-base md:text-lg font-lato font-medium text-[#666666] leading-6 md:leading-7.5">
                    {item?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-15">
            <a
              href={cta_btn?.cta_btn_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#166636] hover:bg-green-700 cursor-pointer text-white font-medium py-5 px-10 rounded-sm transition-colors duration-200 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              {cta_btn?.cta_btn_text}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

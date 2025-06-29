import Image from "next/image";

const About = ({ data }) => {
  const { title, heading, description_1, image_1, image_2, stats } = data;
  return (
    <div className="w-wrapper mx-auto pt-[52px] md:py-[104px] px-4 md:px-0">
      <div className="flex gap-5 items-center mb-[40px] md:mb-[72px]">
        <h5 className="font-lato text-xs md:text-sm uppercase text-black font-medium w-[80px] md:w-[100px]">
          {title}
        </h5>
        <div className="w-full border border-[#DCDCDC]"></div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 md:gap-22 justify-between">
        <div className="flex flex-col gap-4 md:gap-6 justify-start w-full md:w-2/5">
          <h2 className="font-sequel-normal text-[24px] sm:text-[28px] md:text-[32px] lg:text-5xl leading-[1.2] md:leading-[60px] tracking-tighter">
            {heading}
          </h2>
          <p className="text-sm sm:text-base md:text-lg leading-[24px] sm:leading-[26px] md:leading-[30px] font-lato font-medium text-[#666666]">
            {description_1?.[0]?.children?.[0]?.text}
          </p>
        </div>
        <div className="flex flex-col gap-4 md:gap-6 justify-center w-full md:w-3/5">
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <div className="flex flex-col gap-6 md:gap-8 w-full sm:w-1/2">
              <Image
                src={`${image_1?.url}`}
                alt="Hero Image"
                width={500}
                height={200}
                className="w-full h-[200px] sm:h-[250px] md:h-auto object-cover rounded-lg md:rounded-none"
              />
              <div className="flex flex-col gap-2 md:gap-3 justify-center w-full">
                <h3 className="text-[20px] sm:text-[24px] leading-[24px] md:text-[56px] md:leading-[64px] tracking-tighter font-sequel-normal text-[#181818]">
                  {stats?.[0]?.title}
                </h3>
                <p className="text-sm sm:text-base font-lato font-medium text-[#666666] leading-5 sm:leading-6">
                  {stats?.[0]?.description}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-6 md:gap-8 w-full sm:w-1/2">
              <Image
                src={`${image_2?.url}`}
                alt="Hero Image"
                width={500}
                height={200}
                className="w-full h-[200px] sm:h-[250px] md:h-auto object-cover rounded-lg md:rounded-none"
              />
              <div className="flex flex-col gap-2 md:gap-3 justify-center w-full">
                <h3 className="text-[20px] sm:text-[24px] leading-[24px] md:text-[56px] md:leading-[64px] tracking-tighter font-sequel-normal text-[#181818]">
                  {stats?.[1]?.title}
                </h3>
                <p className="text-sm sm:text-base font-lato font-medium text-[#666666] leading-5 sm:leading-6">
                  {stats?.[1]?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

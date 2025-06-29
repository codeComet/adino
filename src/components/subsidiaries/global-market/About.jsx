import Image from "next/image";

const About = ({data}) => {

    const {title, heading, description_1, description_2, image_1, image_2} = data;
  return (
    <div className="w-wrapper mx-auto flex flex-col md:flex-row gap-8 md:gap-20 justify-between pb-[52px] md:pb-[104px] px-4 md:px-0">
      <div className="flex flex-col gap-4 md:gap-6 justify-center w-full md:w-1/2">
        <h5 className="font-lato text-sm uppercase text-black font-medium bg-[#E4EDF4] rounded-full py-1 px-4 w-fit">
          {title}
        </h5>
        <h2 className="font-sequel-normal text-[24px] sm:text-[28px] md:text-[32px] lg:text-5xl leading-[1.2] md:leading-[60px] tracking-tighter">
          {heading}
        </h2>
        <p className="text-base md:text-lg leading-[26px] md:leading-[30px] font-lato font-medium text-[#333333]">
          {description_1?.[0]?.children?.[0]?.text}
        </p>
        <Image
          src={`${image_1?.url}`}
          alt="Hero Image"
          width={200}
          height={200}
          className="w-full h-[250px] sm:h-[300px] md:h-auto object-cover rounded-lg md:rounded-none"
        />
      </div>
      <div className="flex flex-col gap-4 md:gap-6 justify-center w-full md:w-1/2">
        <Image
          src={`${image_2?.url}`}
          alt="Hero Image"
          width={200}
          height={200}
          className="w-full h-[250px] sm:h-[300px] md:h-auto object-cover rounded-lg md:rounded-none"
        />
        <p className="text-base md:text-lg leading-[26px] md:leading-[30px] font-lato font-medium text-[#333333]">
          {description_2?.[0]?.children?.[0]?.text}
        </p>
      </div>
    </div>
  );
}

export default About
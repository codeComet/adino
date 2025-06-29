import Image from "next/image";

const Services = ({ data }) => {
  const { title, heading, services } = data;
  return (
    <div className="w-full py-20 md:py-16 lg:py-[104px]">
      <div className="w-wrapper mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-3 sm:gap-5 items-center mb-4 sm:mb-[20px] md:mb-[44px]">
          <h5 className="font-lato text-[10px] xs:text-xs md:text-sm uppercase text-black font-medium w-[100px] xs:w-[100px] md:w-[140px]">
            What we do
          </h5>
          <div className="w-full border border-[#DCDCDC]"></div>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 justify-start w-full md:w-2/5 mb-8 sm:mb-[50px] md:mb-[70px]">
          <h2 className="font-sequel-normal text-[20px] xs:text-[24px] sm:text-[28px] md:text-[32px] lg:text-5xl leading-[1.2] md:leading-[60px] tracking-tighter">
            {title}
          </h2>
          <p className="text-xs xs:text-sm sm:text-base md:text-lg leading-[20px] xs:leading-[24px] sm:leading-[26px] md:leading-[30px] font-lato font-medium text-[#666666]">
            {heading}
          </p>
        </div>

        {/* services */}

        {services.length !== 0
          ? services.map((item, index) => (
              <div
                className="flex flex-col md:flex-row md:items-center justify-between py-3 xs:py-4 sm:py-5 gap-3 xs:gap-4 md:gap-[200px] border-t border-[#DCDCDC] first:border-t-0"
                key={index}
              >
                <h3 className="font-sequel-normal text-lg xs:text-xl md:text-2xl leading-7 xs:leading-8 md:leading-10 text-[#181818] tracking-tighter w-full md:w-1/3">
                  {item.title}
                </h3>
                <p className="font-lato font-medium text-sm xs:text-base md:text-lg leading-6 xs:leading-7 md:leading-7.5 text-[#333333] w-full md:w-3/5">
                  {item.description}
                </p>
                <Image
                  src={`${item?.image?.url}`}
                  alt={item.title}
                  width={150}
                  height={150}
                  className="w-[100px] xs:w-[120px] sm:w-[150px] h-auto object-contain"
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Services;

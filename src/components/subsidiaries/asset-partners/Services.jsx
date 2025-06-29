import Image from "next/image";

const Services = ({ data }) => {
  const { title, heading, services, image } = data;
  return (
    <div className="w-wrapper mx-auto pt-[52px] md:pt-[104px] px-4 md:px-0 flex flex-col md:flex-row gap-12 md:gap-24">
      <div className="w-full md:w-1/2 h-full flex flex-col gap-8 md:gap-16">
        <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 pb-3">
          <h2 className="font-sequel-normal text-[20px] sm:text-[24px] md:text-[32px] lg:text-5xl leading-[1.2] md:leading-[60px] tracking-tighter">
            {title}
          </h2>
          <p className="text-base md:text-lg leading-[26px] md:leading-[30px] font-lato font-medium text-[#666666] max-w-[530px]">
            {heading}
          </p>
        </div>

        {/* services */}
        <div className="flex flex-col gap-8 md:gap-16">
          {services.length !== 0
            ? services.map((item, index) => (
                <div key={index}>
                  <div className="flex gap-3 md:gap-4">
                    <div className="flex-shrink-0">
                      <span className="font-sequel-normal font-normal text-base md:text-2xl leading-6 md:leading-16 text-white mr-1.5 sm:mr-2.5 w-[32px] h-[32px] md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center bg-primary">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-sequel-normal text-lg sm:text-xl md:text-2xl leading-7 sm:leading-8 md:leading-10 text-[#181818] tracking-tighter">
                        {item.title}
                      </h3>
                      <p className="font-lato font-medium text-sm sm:text-lg leading-5 sm:leading-7.5 text-[#666666]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>

      <div className="w-full md:w-1/2 h-full flex justify-center md:justify-end relative">
        <div className="relative w-full max-w-[700px]">
          <Image
            src={`${image?.url}`}
            alt="image"
            width={700}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="w-[140px] md:w-[187px] h-[100px] md:h-[125px] p-3 md:p-4 bg-white absolute left-2 md:left-5 bottom-2 md:bottom-5 flex flex-col justify-start items-start">
            <h2 className="text-primary font-sequel-normal text-xl md:text-[56px] md:leading-[64px] tracking-tighter">
              11+
            </h2>
            <p className="text-sm md:text-lg leading-[22px] md:leading-[30px] font-lato font-medium text-[#666666]">
              Years of experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;

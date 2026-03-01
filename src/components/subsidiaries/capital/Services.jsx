import Image from "next/image";

const Services = ({ data }) => {
  const { title, heading, services, image, cta } = data;
  return (
    <div className="w-wrapper mx-auto flex flex-col md:flex-row gap-8 md:gap-0 bg-[#EDF3F1] p-4 sm:p-6 md:p-8 lg:p-10 rounded-[5px] mb-10 md:mb-20">
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
                  className="mt-[30px] sm:mt-6 md:mt-[34px]"
                  key={index}
                >
                  <div className="flex gap-2 sm:gap-3 w-full mb-[30px] sm:mb-[45px] md:mb-[57px] max-w-[400px]">
                    <div>
                      <span className="font-lato font-medium text-base sm:text-[32px] md:text-[52px] leading-7 md:leading-[52px] text-[#AD9056] mr-1.5 sm:mr-2.5">
                        0{index + 1}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 sm:gap-3.5">
                      <h3 className="font-sequel-normal text-2xl sm:text-xl md:text-2xl leading-10 sm:leading-8 md:leading-10 text-black tracking-tighter">
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
        <div>
          <a
            href={cta?.cta_btn_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#166636] hover:bg-green-700 cursor-pointer text-white font-medium py-3 px-6 rounded-[20px] transition-colors duration-200 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            {cta?.cta_btn_text}
          </a>
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

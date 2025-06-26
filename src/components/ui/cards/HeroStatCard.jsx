import React from 'react'

const HeroStatCard = ({num, desc, img}) => {
  return (
    <div className="relative h-[300px] md:h-[390px] flex flex-1 flex-col justify-end rounded-[8px] overflow-hidden group">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-center bg-cover grayscale group-hover:grayscale-0 transition-all duration-300"
        style={{
          backgroundImage: `url(${img})`,
        }}
      />

      {/* Color overlay */}
      <div className="absolute inset-0 bg-[#1F2020CC] group-hover:bg-[#052E17CC] transition-colors duration-300" />

      {/* Content */}
      <div className="relative z-10 px-4 md:px-6 py-10 md:py-15 flex flex-col gap-1 md:gap-1.5">
        <div className="text-white text-[40px] md:text-[69px] leading-tight md:leading-18 font-normal font-sequel-normal">
          {num}
        </div>
        <div className="text-white text-[16px] md:text-[21px] leading-5 md:leading-6 font-normal font-lato">
          {desc}
        </div>
      </div>
    </div>
  );
}

export default HeroStatCard
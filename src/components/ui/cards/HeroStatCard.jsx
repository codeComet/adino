import React from 'react'

const HeroStatCard = ({num, desc, img}) => {
  return (
    <div
      className="h-[300px] md:h-[390px] flex flex-1 flex-col justify-baseline rounded-[8px]"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="bg-black/70 h-full flex gap-1 md:gap-1.5 flex-col justify-end rounded-[8px] px-4 md:px-6 py-10 md:py-15">
        <div className="text-white text-[40px] md:text-[69px] leading-tight md:leading-18 font-normal font-sequel-normal">
          {num}
        </div>
        <div className="text-white text-[16px] md:text-[21px] leading-5 md:leading-6 font-normal font-lato">{desc}</div>
      </div>
    </div>
  );
}

export default HeroStatCard
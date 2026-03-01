import React from 'react'

const AboutCaptialAbout = ({aboutData}) => {
    if (!aboutData) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6 bg relative">
          <p>Loading...</p>
        </div>
      );
    }

    const {title,heading, cta_btn, description_1} = aboutData || {};
    
  return (
    <div className="w-wrapper mx-auto flex flex-col gap-8 md:gap-5 items-center justify-between py-[52px] md:py-[30px] px-4 md:px-0">
      <div className="flex flex-col gap-4 md:gap-6 justify-center items-center">
        <h5 className="font-lato text-sm uppercase text-primary font-medium bg-white rounded-full py-2 px-6 border border-primary">
          {title}
        </h5>
        <h2 className="font-sequel-normal text-[24px] sm:text-[28px] md:text-[32px] lg:text-5xl leading-[1.2] md:leading-[60px] tracking-tighter text-primary max-w-[460px] text-center">
          {heading}
        </h2>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-4 md:gap-6 justify-center items-center w-full md:max-w-[700px]">
          {description_1?.map((item, index) => {
            if (item.type === "paragraph") {
              return (
                <p
                  key={index}
                  className="text-base md:text-lg leading-[26px] md:leading-[30px] font-lato font-medium text-[#666666] text-center"
                >
                  {item.children.map((child) => child.text).join("")}
                </p>
              );
            }
            if (item.type === "list") {
              const ListTag = item.format === "ordered" ? "ol" : "ul";
              return (
                <ListTag
                  key={index}
                  className={`pl-5 ${item.format === "ordered" ? "list-decimal" : "list-disc"}`}
                >
                  {item.children.map((listItem, liIndex) => (
                    <li key={liIndex}>
                      {listItem.children.map((child) => child.text).join("")}
                    </li>
                  ))}
                </ListTag>
              );
            }
            return null;
          })}
      </div>

      <div className="flex items-center justify-center gap-4 mt-4 md:mt-7.5 mb-8 md:mb-14.5 flex-wrap md:flex-nowrap w-full md:max-w-[400px]">
        {cta_btn && cta_btn[0]?.cta_btn_text !== "" && (
          <a
            href={cta_btn[0]?.cta_btn_url ?? "#"}
            className="w-full md:max-w-[380px] rounded-full bg-primary text-sm sm:text-base leading-7 backdrop-blur-[70px] py-2.5 sm:py-3 md:py-[15px] px-4 font-lato font-medium text-center text-white cursor-pointer"
          >
            {cta_btn[0]?.cta_btn_text}
          </a>
        )}
        {cta_btn && cta_btn[1]?.cta_btn_text !== "" && (
          <a
            href={cta_btn[1]?.cta_btn_url ?? "#"}
            className="w-full md:max-w-[380px] rounded-full bg-transparent text-sm sm:text-base leading-7 backdrop-blur-[70px] py-2.5 sm:py-3 md:py-[15px] px-4 font-lato font-medium text-center text-primary cursor-pointer border-primary border-1"
          >
            {cta_btn[1]?.cta_btn_text}
          </a>
        )}
      </div>
    </div>
  );
}

export default AboutCaptialAbout
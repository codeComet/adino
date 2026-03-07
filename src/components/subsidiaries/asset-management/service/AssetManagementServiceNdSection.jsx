import React from "react";

const AssetManagementServiceNdSection = ({ ndSection }) => {
  if (!ndSection) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const {
    ndPortfolioHeading,
    ndPortfolioDescription,
    ndPortfolioDescription2,
    ndPortfolioItems,
  } = ndSection;

  // Helper to safely get text from potentially rich text fields
  const getText = (content) => {
    if (!content) return "";
    if (typeof content === "string") return content;
    if (Array.isArray(content)) {
      return content[0]?.children?.[0]?.text || "";
    }
    return "";
  };

  const description1 = getText(ndPortfolioDescription);
  const description2 = getText(ndPortfolioDescription2);

  return (
    <div className="bg-primary py-16 md:py-24 px-0">
      <div className="w-wrapper mx-auto bg-[#EDF3F1] rounded-2xl p-8 md:p-16 lg:p-20 shadow-lg m-0">
        {/* Header */}
        <div className="mb-12">
          <h2 className="font-sequel-normal text-3xl md:text-4xl lg:text-[40px] leading-tight text-[#181818] mb-6 tracking-tighter">
            {ndPortfolioHeading}
          </h2>
          <p className="font-lato font-normal text-base md:text-lg leading-[28px] text-[#666666] max-w-3xl">
            {description1}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {ndPortfolioItems?.map((item, index) => {
            const itemTitle = item.title || item.heading || "";
            const itemDesc = getText(item.description);

            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm h-full flex flex-col"
              >
                <h3 className="font-sequel-normal text-xl md:text-2xl text-[#181818] mb-4 text-center tracking-tighter font-bold">
                  {itemTitle}
                </h3>
                <p className="font-lato text-base md:text-xl leading-[26px] md:leading-[30px] text-[#666666] text-center">
                  {itemDesc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer Text */}
        {description2 && (
          <p className="font-lato font-normal text-base md:text-lg leading-[30px] text-[#666666] max-w-4xl">
            {description2}
          </p>
        )}
      </div>
    </div>
  );
};

export default AssetManagementServiceNdSection;

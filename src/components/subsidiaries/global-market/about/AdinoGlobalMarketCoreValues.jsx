import React from "react";

const AdinoGlobalMarketCoreValues = ({ coreValuesData }) => {
  if (!coreValuesData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const {
    coreValuesTitle,
    coreValueHeading,
    coreValueDescription,
    coreValueItems,
  } = coreValuesData || {};

  const itemsRaw = coreValueItems;
  const items = Array.isArray(itemsRaw)
    ? itemsRaw
    : Array.isArray(itemsRaw?.data)
      ? itemsRaw.data
      : [];

  if (!coreValueHeading && !coreValueDescription && !items.length) return null;

  return (
    <section className="w-wrapper mx-auto py-12 md:py-24 px-4 md:px-0">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center justify-center rounded-full bg-[#E9F7EE] px-4 py-1 w-fit">
          <p className="font-lato font-medium text-xs leading-5 text-primary uppercase">
            {coreValuesTitle || "VALUES"}
          </p>
        </div>

        <h2 className="mt-3 font-sequel-normal text-[#0B1B3F] text-4xl md:text-5xl leading-[1.05] tracking-tighter">
          {coreValueHeading || "Core Values"}
        </h2>

        {coreValueDescription ? (
          <p className="mt-5 font-lato font-normal text-[#666666] text-sm sm:text-base md:text-lg leading-[24px] md:leading-[30px]">
            {coreValueDescription}
          </p>
        ) : null}
      </div>

      {items.length ? (
        <div className="mt-12 md:mt-16 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {items.map((item, index) => {
              const col = index % 3;
              const row = Math.floor(index / 3);

              const baseCell =
                "py-10 md:py-12 px-6 md:px-10 text-left border-[#E6F2EA]";
              const topBorders =
                index === 0
                  ? ""
                  : row === 0
                    ? "border-t md:border-t-0"
                    : "border-t md:border-t";
              const desktopBorders = col === 0 ? "" : "md:border-l";

              return (
                <div
                  key={item?.id || index}
                  className={`${baseCell} ${topBorders} ${desktopBorders}`.trim()}
                >
                  <p className="font-lato font-semibold text-xs leading-4 uppercase tracking-[0.18em] text-[#0E1435]">
                    {item?.title || ""}
                  </p>
                  <p className="mt-4 font-lato font-normal text-[#474B64] text-sm md:text-base leading-[22px] md:leading-[26px] max-w-[320px]">
                    {item?.description || ""}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default AdinoGlobalMarketCoreValues;

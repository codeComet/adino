import React from "react";

const CareerStats = (data) => {
  let careerStatsData = data?.data;
  if (!careerStatsData || !careerStatsData.data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>No data available</p>
      </div>
    );
  }

  const { stats } = careerStatsData?.data?.career?.[1] || {};

  return (
    <div className="w-full py-10 md:py-20 bg-[#F4F4F5]">
      <div className="w-wrapper mx-auto flex flex-col">
        {stats && stats.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col justify-between gap-6 border-l-[2px] border-[#D1D1D1] p-6"
              >
                <h4 className="text-[#666666] font-lato font-normal text-sm leading-5 md:text-base md:leading-[30px] uppercase">{stat.stat_desc}</h4>
                <h2 className="text-primary text-4xl leading-12 md:text-[56px] md:leading-16">{stat.stat_number}</h2>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-[#666666] text-base md:text-lg leading-[26px] md:leading-[30px] max-w-[100%] md:max-w-[778px] font-lato px-4 md:px-0">
            No statistics available
          </p>
        )}
      </div>
    </div>
  );
};

export default CareerStats;

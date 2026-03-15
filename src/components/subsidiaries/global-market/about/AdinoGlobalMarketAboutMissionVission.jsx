import React from 'react'

const AdinoGlobalMarketAboutMissionVission = ({missionVisionData}) => {
    if(!missionVisionData) {
        return (
            <div className="min-h-screen flex items-center justify-center px-6 bg relative">
                <p>Loading...</p>
            </div>
        );
    }
  return (
    <div className="w-wrapper mx-auto py-10">
      <div className="flex flex-wrap">
        {missionVisionData?.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col justify-center gap-6 w-full border-0 py-5 md:py-10 md:w-1/2 md:border-l md:border-[#0000000D]"
          >
            <div
              className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-1 mx-auto w-fit"
              style={{
                boxShadow:
                  "0px 2px 4px 0px #FFFFFF40 inset, 0px 1px 14px 0px #057C8B59",
              }}
            >
              <p className="font-lato font-medium text-sm leading-5 text-white uppercase">
                {item?.title || ""}
              </p>
            </div>
            <p className="text-base leading-[25px] text-center font-lato font-medium text-[#787878]">
              {item?.description || ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdinoGlobalMarketAboutMissionVission
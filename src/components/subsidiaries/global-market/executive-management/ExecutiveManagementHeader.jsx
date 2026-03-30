import React from 'react';
import { renderDescriptionFromEditor } from '@/lib/utils';

const ExecutiveManagementHeader = ({data}) => {
    if (!data) return null;
    const {title, heading, description} = data || {};
  return (
    <div className="w-wrapper mx-auto pt-30 md:pt-40 pb-16 md:pb-24 px-4 md:px-0 flex flex-col gap-7">
      {title ? (
        <div className="block items-start justify-start rounded-full px-0 py-1 uppercase">
          <p className="font-lato font-medium text-base md:text-xl uppercase leading-5 text-[#181818]">
            {title}
          </p>
        </div>
      ) : null}
      <h1 className="font-sequel-normal font-normal text-[28px] sm:text-[32px] md:text-[64px] leading-[1.15] md:leading-[1.05] tracking-tighter text-black w-full md:w-[40%]">
        {heading}
      </h1>
      <div className="text-base md:text-lg leading-[30px] text-[#474B64] font-lato md:w-[55%]">
        {renderDescriptionFromEditor(description)}
      </div>
    </div>
  );
}

export default ExecutiveManagementHeader
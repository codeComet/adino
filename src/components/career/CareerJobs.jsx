import React from 'react'
import JobList from './JobList';

const CareerJobs = (data) => {
      let careerJobsData = data?.data;
      if (!careerJobsData || !careerJobsData.data) {
        return (
          <div className="min-h-screen flex items-center justify-center px-6 bg relative">
            <p>No data available</p>
          </div>
        );
      }

      const { title, description } = careerJobsData?.data?.career?.[3] || {};
  return (
    <div className="w-wrapper mx-auto ">
      <div className="flex flex-col items-start justify-start gap-6">
        <h5 className="font-lato text-sm uppercase text-[#666666] font-medium">
          {title}
        </h5>
        <h2 className="font-sequel-normal text-3xl text-[#181818] md:text-[40px] leading-[1.2] md:leading-[48px]">
          {description}
        </h2>
      </div>

      {/* Jobs list */}
      <JobList />
    </div>
  );
}

export default CareerJobs
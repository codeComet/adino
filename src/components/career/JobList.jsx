"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const getJobListData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/jobs?populate=*`
  );
  const data = await res.json();
  return data;
};

const JobList = () => {
  const { data: jobData, isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobListData,
    staleTime: 60 * 60 * 1000, // Data stays fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Cache persists for 30 minutes
  });

  if (isLoading) {
    return (
      <section className="w-wrapper mx-auto bg-green-900 text-white rounded-3xl p-6 md:py-[90px] md:px-[80px] grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-lato uppercase tracking-wide text-green-100 mb-4">
            Loading...
          </h3>
        </div>
        <div className="relative rounded-2xl overflow-hidden bg-green-800 min-h-[300px]"></div>
      </section>
    );
  }

  // Group jobs by category
  const groupedJobs = jobData?.data?.reduce((acc, job) => {
    const category = job.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(job);
    return acc;
  }, {});

  return (
    <section className="w-wrapper py-10 md:py-25">
      {Object.entries(groupedJobs).map(([category, jobs]) => (
        <div key={category} className="mb-8 md:mb-16">
          <h2 className="text-2xl mb-4 font-sequel-normal md:mb-12 md:text-4xl md:leading-[47px] text-[#666666] tracking-tighter">
            {category}
          </h2>
          <ul className="space-y-4">
            {jobs.map((job) => (
              <Link
                href={`job/${job?.slug}`}
                className="no-underline text-inherit"
                key={job.id}
              >
                <li className="flex flex-col border-t py-6 md:py-9 space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center">
                  <div className="flex flex-col space-y-3 md:space-y-0 md:w-2/3 md:flex-row md:justify-between md:items-center md:gap-[87px]">
                    <h3 className="text-base md:w-[25%] font-semibold font-sequel-normal md:text-2xl text-[#181818]">
                      {job.title}
                    </h3>
                    <span className="w-fit md:w-[15%] px-3 py-1.5 bg-[#EFFDF4] text-[#166636] text-xs md:text-sm rounded-full text-center font-medium font-inter">
                      {job.type}
                    </span>
                    <p className="text-sm text-[#666666] md:w-[60%] font-lato font-normal md:text-lg leading-6 md:leading-7.5">
                      {job.short_description}
                    </p>
                  </div>
                  <div className="md:w-1/3 flex justify-start md:justify-end">
                    <span className="text-[#181818] font-lato font-normal text-sm md:text-lg leading-6 md:leading-7.5">
                      {job.location}
                    </span>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default JobList;

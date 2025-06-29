import qs from "qs";
import { useQuery } from "@tanstack/react-query";

const query = qs.stringify(
  {
    populate: {
      testimonials: {
        populate: {
          testimonials: {
            populate: ["image"],
          },
        },
      },
    },
  },
  { encodeValuesOnly: true }
);

const getTestimonials = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/subsidiary-testimonial?${query}`
  );
  const data = await res.json();
  return data;
};
  

export default function TestimonialGrid() {
    const {
      data: testimonial,
      isLoading,
      isError,
    } = useQuery({
      queryKey: ["testimonialGrid"],
      queryFn: getTestimonials,
      staleTime: 60 * 60 * 1000, // Data stays fresh for 1 hour
      cacheTime: 60 * 60 * 1000, // Cache persists for 1 hour
    });

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6 bg relative">
          <p>Loading...</p>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6 bg relative">
          <p>Something went wrong. Please try again later.</p>
        </div>
      );
    }

    const {title, testimonials } = testimonial?.data?.testimonials;
  // Always use the first 5 testimonials for the layout
  const displayTestimonials = testimonials.slice(0, 5);

  // Default testimonials if not enough provided
  const defaultTestimonials = [
    { name: "James Carterr", location_designation: "CEO of GreenBuild" },
    { name: "Sarah Mitchell", location_designation: "CEO of TechSpark" },
    { name: "Linda Rodriguez", location_designation: "Owner of Bloom" },
    { name: "David Thompson", location_designation: "Director at Apex" },
    { name: "Maria Garcia", location_designation: "Founder of InnovateCorp" },
  ];

  // Fill with defaults if needed
  while (displayTestimonials.length < 5) {
    displayTestimonials.push(defaultTestimonials[displayTestimonials.length]);
  }

  return (
    <div className="w-wrapper mx-auto py-[104px]">
      <div className="flex flex-col gap-4 md:gap-6 justify-center items-center w-full mb-6">
        <h5 className="font-lato text-sm uppercase text-primary font-medium bg-white rounded-full py-1 px-4 w-fit border border-primary">
        • {title}
        </h5>
        <h2 className="font-sequel-normal text-[24px] sm:text-[28px] md:text-[32px] lg:text-5xl leading-[1.2] md:leading-[60px] tracking-tighter text-center text-primary">
          Hear From Our <br /> Happy Clients
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {/* First Row - 2 columns with no gap */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0">
          {/* Green patterned card - First column */}
          <div className="col-span-1 md:col-span-1 bg-gradient-to-br from-primary to-green-700 rounded-3xl text-white flex flex-col justify-end min-h-[300px] md:min-h-[416px] relative overflow-hidden">
            {/* Pattern overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 10px,
                    rgba(255,255,255,0.1) 10px,
                    rgba(255,255,255,0.1) 20px
                  )`,
              }}
            />
            <div className="relative z-10 pb-8 md:pb-12 px-5 md:px-7.5">
              <blockquote className="font-lato font-medium text-xl md:text-2xl leading-7 md:leading-8.5">
                "{testimonials[0]?.description[0]?.children[0]?.text}"
              </blockquote>
              <div className="w-full md:w-fit flex flex-col md:flex-row justify-between gap-2 md:gap-5 mt-4 md:mt-5">
                <p className="font-lato font-medium text-sm leading-5">
                  {displayTestimonials[0].name}
                </p>
                <span className="text-[#FFFFFFB2] font-lato font-medium text-sm leading-5">
                  {displayTestimonials[0].location_designation}
                </span>
              </div>
            </div>
          </div>

          {/* Second column spanning 2 columns */}
          <div className="col-span-1 md:col-span-2 bg-gray-100 rounded-3xl p-4 md:p-6 flex flex-col gap-6 md:gap-[54px] min-h-[300px] md:min-h-[416px] justify-end">
            <blockquote className="font-lato font-medium text-xl md:text-2xl leading-7 md:leading-8.5 max-w-[600px]">
              "{testimonials[1]?.description[0]?.children[0]?.text}"
            </blockquote>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
              <p className="font-lato font-medium text-sm leading-5 text-primary">
                {displayTestimonials[1].name}
              </p>
              <span className="text-primary font-lato font-medium text-sm leading-5">
                • {displayTestimonials[1].location_designation}
              </span>
            </div>
          </div>
        </div>

        {/* Second Row - 3 columns with 16px gaps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Third testimonial */}
          <div className="bg-[#054F3012] rounded-3xl px-6 pb-[31px] flex flex-col gap-4.5 justify-end min-h-[200px]">
            <blockquote className="text-sm font-medium font-lato text-primary leading-5">
              "{testimonials[2]?.description[0]?.children[0]?.text}"
            </blockquote>
            <div className="flex items-center gap-2">
              <p className="font-lato font-medium text-sm leading-5 text-primary">
                {displayTestimonials[2].name}
              </p>
              <span className="text-primary font-lato font-medium text-sm leading-5">
                • {displayTestimonials[2].location_designation}
              </span>
            </div>
          </div>

          {/* Fourth testimonial */}
          <div className="bg-[#054F3012] rounded-3xl px-6 pb-[31px] flex flex-col gap-4.5 justify-end min-h-[200px]">
            <blockquote className="text-sm font-medium font-lato text-primary leading-5">
              "{testimonials[3]?.description[0]?.children[0]?.text}"
            </blockquote>
            <div className="flex items-center gap-2">
              <p className="font-lato font-medium text-sm leading-5 text-primary">
                {displayTestimonials[3].name}
              </p>
              <span className="text-primary font-lato font-medium text-sm leading-5">
                • {displayTestimonials[3].location_designation}
              </span>
            </div>
          </div>

          {/* Fifth testimonial */}
          <div className="bg-[#054F3012] rounded-3xl px-6 pb-[31px] flex flex-col gap-4.5 justify-end min-h-[200px]">
            <blockquote className="text-sm font-medium font-lato text-primary leading-5">
              "{testimonials[4]?.description[0]?.children[0]?.text}"
            </blockquote>
            <div className="flex items-center gap-2">
              <p className="font-lato font-medium text-sm leading-5 text-primary">
                {displayTestimonials[4].name}
              </p>
              <span className="text-primary font-lato font-medium text-sm leading-5">
                • {displayTestimonials[4].location_designation}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Example usage component


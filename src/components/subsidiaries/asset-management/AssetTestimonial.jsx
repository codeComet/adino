import TestimonialSlider from "@/components/generic/TestimonialSlider";

const AssetTestimonial = () => {
  return (
    <div className="w-full pt-20 md:pt-16 lg:pt-[104px] bg-primary">
      <div className="w-wrapper mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex gap-3 sm:gap-5 items-center mb-0 md:mb-[-90px]">
          <h5 className="font-lato text-[10px] xs:text-xs md:text-sm uppercase text-white font-medium w-[100px] xs:w-[100px] md:w-[140px]">
            Testimonials
          </h5>
          <div className="w-full border border-[#ffffffa4]"></div>
        </div>


        {/* Testimonial Slider */}
        <TestimonialSlider showHeading={false}/>
      </div>
    </div>
  );
}

export default AssetTestimonial
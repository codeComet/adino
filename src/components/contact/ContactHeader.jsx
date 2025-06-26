import Image from "next/image";
import ContactForm from "./ContactForm";
import ContactMap from "./ContactMap";
export default function ContactHeader({title, heading, mapHeading}) {
  

  return (
    <div className="py-0 md:py-12">
      <div className="">
        {/* Header */}
        <div className="text-center mb-10 md:mb-22">
          <h4 className="text-sm text-center font-lato font-medium uppercase text-[#181818]">
            {title}
          </h4>
          <h1 className="w-full md:max-w-[750px] mx-auto text-center text-4xl md:text-5xl lg:text-[64px] lg:leading-[76px] font-normal font-sequel-normal text-[#181818] mt-[23px] leading-tight tracking-tighter">
            {heading}
          </h1>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Map and Description */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl text-center md:text-left md:text-4xl md:leading-12 font-sequel-normal font-normal text-[#0D0D0D] mb-4 tracking-[-.48px]">
                {mapHeading}
              </h2>
            </div>

            {/* Map */}
            <div className="relative">
              <ContactMap />
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

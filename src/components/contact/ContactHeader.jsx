import Image from "next/image";
import ContactForm from "./ContactForm";
import ContactMap from "./ContactMap";
export default function ContactHeader({ title, heading, mapHeading }) {
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
            <div className="relative w-full overflow-hidden aspect-4/3">
              {/* <ContactMap /> */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.5321355316887!2d3.4477547999999993!3d6.454050499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf4ee64d307d3%3A0x3322e378b368859c!2s10a%20Alexander%20Ave%2C%20Ikoyi%2C%20Lagos%20106104%2C%20Lagos!5e0!3m2!1sen!2sng!4v1776299795845!5m2!1sen!2sng"
                className="h-full w-full"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
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

import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ContactFaq = ({faqTitle, faqHeading, faqItem}) => {
  return (
    <div className="max-w-[800px] mx-auto mt-5 sm:mt-10 px-4 sm:px-6 lg:px-0">
      <div className="text-center mb-8 sm:mb-10 md:mb-22">
        <h4 className="text-xs sm:text-sm text-center font-lato font-medium uppercase text-[#181818]">
          {faqTitle}
        </h4>
        <h2 className="w-full text-center text-3xl sm:text-4xl md:text-5xl md:leading-[57px] font-normal font-sequel-normal text-[#08090A] mt-2 sm:mt-3 leading-tight tracking-tighter">
          {faqHeading}
        </h2>
      </div>

      {/* Accordion item */}
      {faqItem?.map((item, index) => (
        <Accordion key={item?.id} type="single" collapsible>
          <AccordionItem value={item?.id}>
            <AccordionTrigger className="w-full text-left text-[#181818] font-sequel-normal text-lg sm:text-xl md:text-[24px] leading-[1.2] sm:leading-[30px] flex justify-start">
              <span className="text-[#08090A] font-sequel-light text-lg sm:text-xl md:text-[24px] leading-[1.2] sm:leading-[29px] mr-3 sm:mr-5">
                0{index + 1}
              </span>{" "}
              {item?.title}
            </AccordionTrigger>
            <AccordionContent className="w-full text-[#08090A] font-sequel-normal text-base sm:text-lg md:text-[18px] leading-[1.6] sm:leading-[32px] tracking-[-.36px]">
              {item?.description}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}

export default ContactFaq
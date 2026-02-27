"use client";

import { useQuery } from "@tanstack/react-query";
import ContactHeader from "@/components/contact/ContactHeader";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactFaq from "@/components/contact/ContactFaq";
import Newsletter from "@/components/generic/Newsletter";
import { getContactHeroData } from "@/lib/api/contact";

const ContactContent = () => {
  const {
    data: contactData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["contactData"],
    queryFn: getContactHeroData,
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

  const {
    title,
    heading,
    map_heading,
    contact_info,
    faq_title,
    faq_heading,
    faq_item,
  } = contactData?.data;

  return (
    <>
      <div className="w-wrapper mx-auto py-30">
        <ContactHeader
          title={title}
          heading={heading}
          mapHeading={map_heading}
        />
        <ContactInfo contactInfo={contact_info} />
        <ContactFaq
          faqTitle={faq_title}
          faqHeading={faq_heading}
          faqItem={faq_item}
        />
      </div>
      <Newsletter />
    </>
  );
};

export default ContactContent;

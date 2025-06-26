"use client";

import qs from "qs";
import { useQuery } from "@tanstack/react-query";
import ContactHeader from "@/components/contact/ContactHeader";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactFaq from "@/components/contact/ContactFaq";
import Newsletter from "@/components/generic/Newsletter";

const query = qs.stringify(
  {
    populate: {
      contact_info: {
        populate: ["image"],
      },
      faq_item: true,
    },
  },
  {
    encodeValuesOnly: true,
  }
);

const getContactHeroData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contact?${query}`
  );
  const data = await res.json();
  return data;
};

const Contact = () => {
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

export default Contact;

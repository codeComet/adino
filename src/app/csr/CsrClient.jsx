"use client";

import Header from "@/components/csr/Header";
import Body from "@/components/csr/Body";
import { useCsrPageData } from "@/lib/csrPage";

const CsrClient = () => {
  const { data } = useCsrPageData();
  const csrData = data?.data || {};

  return (
    <>
      <Header hero={csrData?.hero} />
      <Body
        heading={csrData?.heading}
        description={csrData?.description}
        box={csrData?.box}
        cta={csrData?.cta}
      />
    </>
  );
};

export default CsrClient;

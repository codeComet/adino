"use client";

import { useCsrExploreData } from "@/lib/csrExplore";
import ExploreHeader from "@/components/csr/explore/ExploreHeader";
import Gallery from "@/components/csr/explore/Gallery";

const CSRExploreClient = () => {
  const { data } = useCsrExploreData();
  const csrData = data?.data || {};

  return (
    <>
      <ExploreHeader hero={csrData || {}} />
      <Gallery
        gallery={csrData?.gallery || []}
      />
    </>
  );
};

export default CSRExploreClient;

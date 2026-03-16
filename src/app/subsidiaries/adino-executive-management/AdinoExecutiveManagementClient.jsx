"use client";
import { useQuery } from "@tanstack/react-query";
import ExecutiveManagementHeader from "@/components/subsidiaries/global-market/executive-management/ExecutiveManagementHeader"      
import ManagementTeam from "@/components/subsidiaries/global-market/executive-management/ManagementTeam"
import SubsidiaryNewsletter from "@/components/generic/SubsidiaryNewsletter";
import { getAdinoExecutiveManagementData } from "@/lib/subsidiary/adinoExecutiveManagement";

const AdinoExecutiveManagementClient = () => {
  const {
    data: adinoExecutiveManagement,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["adinoExecutiveManagement"],
    queryFn: getAdinoExecutiveManagementData,
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

  return (
    <>
      <ExecutiveManagementHeader data={adinoExecutiveManagement?.data || {}} />
      <ManagementTeam teamData={adinoExecutiveManagement?.data?.managementTeam || []} />
    </>
  );
};

export default AdinoExecutiveManagementClient;

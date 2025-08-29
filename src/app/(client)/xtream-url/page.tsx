"use client";

import { Suspense } from "react";
import { api } from "@/trpc/react";
import Loading from "@/components/Loading";
import XtreamUrls from "@/app/(client)/xtream-url/_components/xtream-url";
import { notFound } from "next/navigation";

export default function XtreamUrlPage() {
  const { data: countries, isLoading, error } = api.country.getAllCountries.useQuery();
  
    if (isLoading) {
      return <Loading />;
    }
  
    if (error || (countries && countries.length === 0) || !countries) {
      return notFound();
    }
  
  return (
    <Suspense fallback={<Loading />}>
      <XtreamUrls countries={countries} />
    </Suspense>
  );
}
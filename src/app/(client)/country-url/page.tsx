"use client";

import { Suspense } from "react";
import { api } from "@/trpc/react";
import CountryUrls from "./_components/CountryComponents";
import Loading from '@/app/(client)/country-url/loading';
import { notFound } from "next/navigation";

export default function CountryUrlPage() {
  const { data: countries, isLoading, error } = api.country.getAllCountries.useQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (error || (countries && countries.length === 0) || !countries) {
    return notFound();
  }

  return (
    <Suspense fallback={<Loading />}>
      <CountryUrls countries={countries} />
    </Suspense>
  );
}
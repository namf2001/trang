"use client";

import Link from "next/link";
import { Suspense } from "react";
import { api } from "@/trpc/react";
import Loading from "@/components/Loading";
import { CountryList, CountryUrlList, CountryStats } from "./_components/CountryComponents";

function CountriesWrapper() {
  const { data: countries } = api.country.getAll.useQuery({ limit: 10 });
  return <CountryList countries={countries} />;
}

export default function CountryUrlPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mt-4">Country URLs</h1>
        </div>

        <Suspense fallback={<Loading />}>
          <CountryStats />
        </Suspense>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Suspense fallback={<Loading />}>
            <CountriesWrapper />
          </Suspense>

          <Suspense fallback={<Loading />}>
            <CountryUrlList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
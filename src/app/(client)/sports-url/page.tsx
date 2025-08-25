"use client";

import Link from "next/link";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import { SportsCategory, SportsStats, SportsUrlList } from "./_components/SportsComponents";

export default function SportsUrlPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mt-4">Sports URLs</h1>
        </div>

        <Suspense fallback={<Loading />}>
          <SportsCategory />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <SportsStats />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <SportsUrlList />
        </Suspense>
      </div>
    </div>
  );
}
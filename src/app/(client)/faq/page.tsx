"use client";

import Link from "next/link";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import { CategoryEnumValues, AllCategories, SystemStats, FaqContent } from "./_components";

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mt-4">FAQ & System Overview</h1>
        </div>

        <div className="space-y-8">
          <Suspense fallback={<Loading />}>
            <CategoryEnumValues />
          </Suspense>

          <Suspense fallback={<Loading />}>
            <AllCategories />
          </Suspense>

          <Suspense fallback={<Loading />}>
            <SystemStats />
          </Suspense>

          <FaqContent />
        </div>
      </div>
    </div>
  );
}
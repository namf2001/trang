"use client";
"use client";

import { api } from "@/trpc/react";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import { CategoryName } from "@prisma/client";
import { notFound } from "next/navigation";
import CategoryList from "@/app/(client)/(categories)/_components/common/category-list";

export default function SingleStreamUrlPage() {
  const { data, isLoading, error } = api.category.getByName.useQuery({ name: CategoryName.SINGLE_STREAM });
  
    if (isLoading) {
      return <Loading />;
    }
  
    if (error || (data && data.urls.length === 0) || !data) {
      return notFound();
    }
  
    const { urls } = data;
  
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="mt-4 mb-15 flex justify-between gap-2 md:mt-8">
          <div>
            <h2 className='text-4xl font-bold text-metal font-kamerik205'>Single Stream</h2>
            <p className="text-xl text-white">Tune into our single stream channel for an uninterrupted, focused viewing experience</p>
          </div>
        </div>
        <Suspense fallback={<Loading />}>
          <CategoryList category={urls} />
        </Suspense>
      </div>
    );
  }
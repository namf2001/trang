import { api } from "@/trpc/react";
import { CategoryName } from "@prisma/client";

export function SingleStreamCategory() {
  const { data: singleStreamCategory } = api.category.getByName.useQuery({ 
    name: CategoryName.SINGLE_STREAM 
  });
  
  return (
    <div className="mb-8 p-4 bg-white/10 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Single Stream Category</h2>
      <pre className="text-sm overflow-auto">
        {JSON.stringify(singleStreamCategory, null, 2)}
      </pre>
    </div>
  );
}

export function SingleStreamStats() {
  const { data: singleStreamCategory } = api.category.getByName.useQuery({ 
    name: CategoryName.SINGLE_STREAM 
  });
  const { data: stats } = api.categoryUrl.getStats.useQuery({
    categoryId: singleStreamCategory?.id
  });
  
  return (
    <div className="mb-8 p-4 bg-white/10 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Statistics</h2>
      <pre className="text-sm overflow-auto">
        {JSON.stringify(stats, null, 2)}
      </pre>
    </div>
  );
}

export function SingleStreamUrlList() {
  const { data: singleStreamCategory } = api.category.getByName.useQuery({ 
    name: CategoryName.SINGLE_STREAM 
  });
  const { data: singleStreamUrls } = api.categoryUrl.getByCategory.useQuery(
    { categoryId: singleStreamCategory?.id ?? "", limit: 30 },
    { enabled: !!singleStreamCategory?.id }
  );
  
  return (
    <div className="bg-white/10 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Single Stream URLs</h2>
      <pre className="text-sm overflow-auto max-h-96">
        {JSON.stringify(singleStreamUrls, null, 2)}
      </pre>
    </div>
  );
}
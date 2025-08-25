import { api } from "@/trpc/react";
import { CategoryName } from "@prisma/client";

export function SportsCategory() {
  const { data: sportsCategory } = api.category.getByName.useQuery({ 
    name: CategoryName.SPORTS 
  });
  
  return (
    <div className="mb-8 p-4 bg-white/10 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Sports Category</h2>
      <pre className="text-sm overflow-auto">
        {JSON.stringify(sportsCategory, null, 2)}
      </pre>
    </div>
  );
}

export function SportsStats() {
  const { data: sportsCategory } = api.category.getByName.useQuery({ 
    name: CategoryName.SPORTS 
  });
  const { data: stats } = api.categoryUrl.getStats.useQuery({
    categoryId: sportsCategory?.id
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

export function SportsUrlList() {
  const { data: sportsCategory } = api.category.getByName.useQuery({ 
    name: CategoryName.SPORTS 
  });
  const { data: sportsUrls } = api.categoryUrl.getByCategory.useQuery(
    { categoryId: sportsCategory?.id ?? "", limit: 30 },
    { enabled: !!sportsCategory?.id }
  );
  
  return (
    <div className="bg-white/10 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Sports URLs</h2>
      <pre className="text-sm overflow-auto max-h-96">
        {JSON.stringify(sportsUrls, null, 2)}
      </pre>
    </div>
  );
}
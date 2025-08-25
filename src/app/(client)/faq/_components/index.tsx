import { api } from "@/trpc/react";

export function CategoryEnumValues() {
  const { data: enumValues } = api.category.getEnumValues.useQuery();
  
  return (
    <div className="bg-white/10 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Available Category Types</h2>
      <pre className="text-sm overflow-auto">
        {JSON.stringify(enumValues, null, 2)}
      </pre>
    </div>
  );
}

export function AllCategories() {
  const { data: categories } = api.category.getAll.useQuery({ limit: 50 });
  
  return (
    <div className="bg-white/10 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">All Categories</h2>
      <pre className="text-sm overflow-auto max-h-96">
        {JSON.stringify(categories, null, 2)}
      </pre>
    </div>
  );
}

export function SystemStats() {
  const { data: countryStats } = api.countryUrl.getStats.useQuery({});
  const { data: categoryStats } = api.categoryUrl.getStats.useQuery({});
  const { data: xtreamStats } = api.xtreamUrl.getStats.useQuery({});

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white/10 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Country URL Stats</h3>
        <pre className="text-sm overflow-auto">
          {JSON.stringify(countryStats, null, 2)}
        </pre>
      </div>

      <div className="bg-white/10 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Category URL Stats</h3>
        <pre className="text-sm overflow-auto">
          {JSON.stringify(categoryStats, null, 2)}
        </pre>
      </div>

      <div className="bg-white/10 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Xtream URL Stats</h3>
        <pre className="text-sm overflow-auto">
          {JSON.stringify(xtreamStats, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export function FaqContent() {
  return (
    <div className="bg-white/10 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">What is this IPTV Manager?</h3>
          <p className="text-gray-300">
            This is a management system for IPTV URLs organized by countries and categories.
            It supports regular URLs, category-based URLs, and Xtream API endpoints.
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">What types of URLs are supported?</h3>
          <p className="text-gray-300">
            - Country URLs: URLs organized by geographic regions<br/>
            - Category URLs: URLs organized by content types (Sports, Movies, etc.)<br/>
            - Xtream URLs: Xtream API endpoints for streaming services
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">How are categories defined?</h3>
          <p className="text-gray-300">
            Categories are predefined enum values including AUTO, ANIMATION, BUSINESS, CLASSIC, COMEDY, 
            COOKING, CULTURE, DOCUMENTARY, EDUCATION, ENTERTAINMENT, FAMILY, GENERAL, KIDS, LEGISLATIVE, 
            LIFESTYLE, MOVIES, MUSIC, NEWS, SPORTS, and SINGLE_STREAM.
          </p>
        </div>
      </div>
    </div>
  );
}
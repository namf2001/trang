import { api } from "@/trpc/react";

interface CountryListProps {
  countries: any;
}

export function CountryList({ countries }: CountryListProps) {
  return (
    <div className="bg-white/10 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Countries</h2>
      <pre className="text-sm overflow-auto max-h-96">
        {JSON.stringify(countries, null, 2)}
      </pre>
    </div>
  );
}

export function CountryUrlList() {
  const { data: countryUrls } = api.countryUrl.getAll.useQuery({ limit: 20 });
  
  return (
    <div className="bg-white/10 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Country URLs</h2>
      <pre className="text-sm overflow-auto max-h-96">
        {JSON.stringify(countryUrls, null, 2)}
      </pre>
    </div>
  );
}

export function CountryStats() {
  const { data: stats } = api.countryUrl.getStats.useQuery({});
  
  return (
    <div className="mb-8 p-4 bg-white/10 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Statistics</h2>
      <pre className="text-sm overflow-auto">
        {JSON.stringify(stats, null, 2)}
      </pre>
    </div>
  );
}
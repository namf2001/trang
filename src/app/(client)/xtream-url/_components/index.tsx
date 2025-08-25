import { api } from "@/trpc/react";

export function XtreamStats() {
  const { data: stats } = api.xtreamUrl.getStats.useQuery({});
  
  return (
    <div className="mb-8 p-4 bg-white/10 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Statistics</h2>
      <pre className="text-sm overflow-auto">
        {JSON.stringify(stats, null, 2)}
      </pre>
    </div>
  );
}

export function XtreamCountries() {
  const { data: countries } = api.country.getAll.useQuery({ limit: 10 });
  
  return (
    <div className="bg-white/10 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Countries</h2>
      <pre className="text-sm overflow-auto max-h-96">
        {JSON.stringify(countries, null, 2)}
      </pre>
    </div>
  );
}

export function XtreamUrlList() {
  const { data: xtreamUrls } = api.xtreamUrl.getAll.useQuery({ limit: 20 });
  
  return (
    <div className="bg-white/10 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Xtream URLs</h2>
      <pre className="text-sm overflow-auto max-h-96">
        {JSON.stringify(xtreamUrls, null, 2)}
      </pre>
    </div>
  );
}
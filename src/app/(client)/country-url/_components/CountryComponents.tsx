"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Copy, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { copyToClipboard } from '@/lib/utils';

interface CountryListProps {
  id: string;
  name: string;
  _count: { urls: number; xtreams: number; };
  urls: { id: string; url: string }[];
  xtreams?: { id: string; url: string }[];
}

export default function CountryUrls({ countries }: Readonly<{ countries: CountryListProps[] }>) {
  const [filteredCountries, setFilteredCountries] = useState<CountryListProps[]>([]);

  useEffect(() => {
    setFilteredCountries(countries);
  }, [countries]);

  const handleFilterChange = (searchTerm: string) => {
    const filtered = countries.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mt-4 mb-15 flex justify-between gap-2 md:mt-8">
        <div>
          <h2 className='text-4xl font-bold text-metal font-kamerik205'>Country</h2>
          <p className="text-xl text-white">Channels curated in various languages</p>
        </div>
        <div className='max-w-[272px]'>
          <Input
            type="text"
            placeholder="Search for your country..."
            onChange={(e) => handleFilterChange(e.target.value)}
            className="w-[272px] h-[44px] py-2 px-4 rounded-3xl border border-orange-400"
          />
        </div>
      </div>
      <CountryList countries={filteredCountries} />
    </div>
  );
}

export function CountryList({ countries }: Readonly<{ countries: CountryListProps[] }>) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyToClipboard = async (url: string, id: string) => {
    try {
      await copyToClipboard(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  return (
    <Accordion type="multiple" className="w-full space-y-8">
      {countries.map((country) => (
        <AccordionItem
          key={country.id}
          value={`country-${country.id}`}
          className="border-12 border-black rounded-xl bg-black hover:shadow-md transition-shadow backdrop-blur-sm"
        >
          <AccordionTrigger className="hover:no-underline px-4 bg-[#1B1B1E] data-[state=open]:bg-primary transition-colors">
            <div className="flex items-center justify-between w-full pr-4">
              <div className="flex flex-col items-start">
                <h3 className="text-lg font-semibold text-white">{country.name}</h3>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className='pt-4 pb-0'>
            {country.urls && country.urls.length > 0 ? (
              <div className="space-y-3">
                <div className="grid gap-2">
                  {country.urls.map((url) => (
                    <div
                      key={url.id}
                      className="flex items-center justify-between p-3 bg-[#1B1B1E] rounded-md group"
                    >
                      <div className="flex-1 min-w-0">
                        <span className="font-mono text-white text-sm truncate block">
                          {url.url}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="iptvsecondary"
                        onClick={() => handleCopyToClipboard(url.url, url.id)}
                        className="ml-2 p-0 hover:bg-white/10 transition-opacity"
                      >
                        {copiedId === url.id ? (
                          <>
                            <Check className="h-4 w-4" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" /> Copy
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <p>No URLs available for this country.</p>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

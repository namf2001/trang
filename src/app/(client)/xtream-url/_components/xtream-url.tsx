'use client';
"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Copy, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { parseStreamURL, copyToClipboard } from '@/lib/utils';

interface CountryWithURLs {
  id: string;
  name: string;
  urls: { id: string; url: string }[];
  xtreams?: { id: string; url: string }[];
}

export default function XtreamUrls({
  countries,
}: Readonly<{ countries: CountryWithURLs[] }>) {
  const [filteredCountries, setFilteredCountries] = useState<CountryWithURLs[]>([]);

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
          <h2 className='text-4xl font-bold text-metal font-kamerik205'>Xtream</h2>
          <p className="text-xl text-white">Watch a wide variety of TV shows, movies, <br />and documentaries on demand</p>
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
      <XtreamList countries={filteredCountries} />
    </div>
  );
}

export function XtreamList({
  countries,
}: Readonly<{ countries: CountryWithURLs[] }>) {
  const handleCopyToClipboard = async (text: string) => {
    await copyToClipboard(text);
  };

  return (
    <Accordion type="multiple" className="w-full space-y-8">
      {countries.map((country) => (
        <AccordionItem
          key={country.id}
          value={`country-${country.id}`}
        >
          <AccordionTrigger>
            <div className="flex items-center justify-between w-full pr-4">
              <div className="flex flex-col items-start">
                <h3 className="text-lg font-semibold text-white">{country.name}</h3>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {country.xtreams && country.xtreams.length > 0 ? (
              country.xtreams.map((x) => {
                const info = parseStreamURL(x.url);
                return (
                  <div key={x.id} className="space-y-2 p-5 border rounded-md bg-[#1B1B1E] border-orange-400">
                    <FieldRow label="URL" value={info?.baseURL ?? x.url} onCopy={() => handleCopyToClipboard(info?.baseURL ?? x.url)} />
                    <FieldRow label="Username" value={info?.username ?? ''} onCopy={() => handleCopyToClipboard(info?.username ?? '')} />
                    <FieldRow label="Password" value={info?.password ?? ''} onCopy={() => handleCopyToClipboard(info?.password ?? '')} />
                  </div>
                );
              })
            ) : (
              <div className="text-center py-4 text-gray-400 text-sm">No Xtream URLs for this country.</div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

interface FieldRowProps {
  label: string;
  value: string;
  onCopy: () => void;
}

function FieldRow({ label, value, onCopy }: Readonly<FieldRowProps>) {
  const isEmpty = !value;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="w-24 text-xs text-gray-300 tracking-wide">{label}</div>
      <div className="flex-1">
        <div className="w-full p-3 bg-black text-white text-sm rounded-md border border-[#323232] truncate">
          {isEmpty ? <span className="opacity-40">(empty)</span> : value}
        </div>
      </div>
      <Button
        size="sm"
        variant="iptvsecondary"
        onClick={handleCopy}
        className="ml-2 p-0 "
      >
        {copied ? (
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
  );
}

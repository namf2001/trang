'use client';

import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';

interface CategoryWithURLs {
  id: string; 
  url: string; 
  status?: string | null
}

export default function CategoryList({
  category,
}: Readonly<{ category: CategoryWithURLs[]}>) {

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyToClipboard = async (text: string, id: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  if (!category) {
    return (
      <div className='mt-6 text-center text-red-500'>
        <p>No categories available.</p>
      </div>
    );
  }


  if (!category) {
    return (
      <div className='mt-6 text-center text-gray-500'>
        <p>No category found.</p>
      </div>
    );
  }

  if (category.length === 0) {
    return (
      <div className='mt-6 text-center text-gray-500'>
        <p>No URLs found.</p>
      </div>
    );
  }

  return (
    <div className='p-4 bg-black rounded-lg shadow-xl'>
      <div className='space-y-3'>
        <div className='grid gap-2'>
          {category.map((url) => (
            <div key={url.id} className='flex items-center justify-between p-3 bg-[#1B1B1E] rounded-md group'>
              <div className='flex-1 min-w-0'>
                <span className='font-mono text-white text-sm truncate block'>{url.url}</span>
              </div>
              <Button
                size='sm'
                variant='iptvsecondary'
                onClick={() => handleCopyToClipboard(url.url, url.id)}
                className='ml-2 p-0  transition-opacity'
              >
                {copiedId === url.id ? (
                  <>
                    <Check className='h-4 w-4' /> Copied
                  </>
                ) : (
                  <>
                    <Copy className='h-4 w-4' /> Copy
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

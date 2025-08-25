import type { Metadata } from 'next'
import "@/styles/globals.css";
import Link from 'next/link';
import Image from 'next/image';
import { notFound404 } from '@/assets/image';
import { Button } from '@/components/ui/button';
export const metadata: Metadata = {
  title: 'Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col items-center justify-center gap-8 min-h-screen">
          <Image src={notFound404} alt="Not Found" width={400} height={300} className="mb-4" />
          <Link href="/">
            <Button className="w-full h-12 bg-[#F56F10] text-white hover:bg-[#F56F10]/90 transition-colors rounded-[100px]">
              Go back to Home
            </Button>
          </Link>
        </div>
      </body>
    </html>
  )
}
import { background } from '@/assets/image';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import linksSection from '@/constants/links-section';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
export default function LinksSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-31">
      <h2 className="text-center text-white text-xl sm:text-2xl font-bold mb-10 uppercase">Select playlists according to your taste</h2>
      <div className="relative flex flex-wrap justify-between gap-4">
        <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 h-1/2 w-full rounded-full bg-gradient-to-tl from-orange-400 to-transparent blur-3xl opacity-70" />
        {linksSection.map((playlist) => (
          <div key={playlist.id} className='relative flex-1 h-[350px] '>
            <Image src={background} alt="Background" height={350} width={290} className="absolute inset-0 object-cover opacity-20" />
            <Card className='border-0 bg-transparent shadow-none'>
              <CardHeader>
                <CardTitle className="text-3xl text-white">{playlist.title}</CardTitle>
                <CardDescription className='text-lg text-white'>{playlist.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Image src={playlist.image} alt={playlist.title} height={210} width={210} className="rounded-lg mb-4" />
              </CardContent>
            </Card>
            <Link href={playlist.url} className="absolute bottom-0 right-0 ">
              <Button asChild className="h-16 w-16 rounded-full" variant='iptvsecondary'>
                <ArrowRight className="text-4xl text-white font-extrabold" />
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy } from 'lucide-react';
import Image from "next/image";
import { vector, guideItem } from "@/assets/image";

export default function GuideSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 className="text-center text-white text-xl sm:text-2xl font-bold mb-10 uppercase">how to import playlist?</h2>
      <div className="flex flex-col gap-25 items-center w-full">
        {/* Step 1: Card left, arrow right */}
        <div className="relative w-full flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="flex-1">
            <h2 className="text-white text-lg sm:text-2xl mb-5">Step 1: Copy any IPTV link from the website</h2>
            <Card className="bg-[#73737c33] w-full backdrop-blur-md rounded-xl border border-white/20 px-3 sm:px-4">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-white text-lg sm:text-xl">
                  M3U8 Playlist URL
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-3 sm:gap-4">
                <Input
                  type="text"
                  value="http://m3u.sstv.one:80"
                  readOnly
                  className="bg-[#1B1B1E] text-white text-sm sm:text-base lg:text-lg border-0 py-3 sm:py-4 lg:py-6 w-full"
                />
                <Button
                  className="text-sm sm:text-base lg:text-lg w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3"
                  size="lg"
                  variant="iptvsecondary"
                >
                  <Copy className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Copied
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="flex-1"></div>
          <div className="absolute right-90 -bottom-15 transform -translate-y-1/2">
            <Image src={vector} alt="arrow" width={124} height={124} />
          </div>
        </div>
        {/* Step 2: Card right, arrow left */}
        <div className="relative w-full flex flex-col md:flex-row-reverse items-center justify-center gap-4">
          <div className="flex-1">
            <h2 className="text-white text-lg sm:text-2xl mb-5">Step 2: Open “Smart IPTV Player”. <br />Import the copied link to start watching  </h2>
            <Card className="bg-[#73737c33] w-full backdrop-blur-md rounded-xl border border-white/20 px-3 sm:px-4">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-white text-lg sm:text-xl">
                  M3U8 Playlist URL
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-3 sm:gap-4">
                <Input
                  type="text"
                  value="http://m3u.sstv.one:80"
                  readOnly
                  className="bg-[#1B1B1E] text-white text-sm sm:text-base lg:text-lg border-0 py-3 sm:py-4 lg:py-6 w-full"
                />
                <Button
                  className="text-sm sm:text-base lg:text-lg w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3"
                  size="lg"
                  variant="iptvsecondary"
                >
                  <Copy className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Copied
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="flex-1"></div>
          <div className="absolute -bottom-10 left-100 scale-x-[-1]">
            <Image src={vector} alt="arrow" width={90} height={90} />
          </div>
        </div>
        {/* Step 3: Card left, arrow right */}
        <div className="relative w-full flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="flex-1">
            <h2 className="text-white text-lg sm:text-2xl mb-5">Step 3. Click “Add Playlist” to save your URL</h2>
            <Card className="bg-[#73737c33] w-full backdrop-blur-md rounded-xl border border-white/20 px-3 sm:px-4">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-white text-lg sm:text-xl">
                  M3U8 Playlist URL
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-3 sm:gap-4">
                <Input
                  type="text"
                  value="http://m3u.sstv.one:80"
                  readOnly
                  className="bg-[#1B1B1E] text-white text-sm sm:text-base lg:text-lg border-0 py-3 sm:py-4 lg:py-6 w-full"
                />
                <Button
                  className="text-sm sm:text-base lg:text-lg w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3"
                  size="lg"
                  variant="iptvsecondary"
                >
                  <Copy className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Copied
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="flex-1"></div>
          <div className="absolute right-90 -bottom-15 transform -translate-y-1/2">
            <Image src={vector} alt="arrow" width={124} height={124} />
          </div>
        </div>
        {/* Step 4: Centered */}
        <div className="w-full flex flex-col md:flex-row-reverse items-center justify-center gap-4">
          <div className="flex-1">
            <h2 className="text-white text-lg sm:text-2xl mb-5">Step 4. Enjoy your entertainment experience</h2>
            <Image src={guideItem} alt="arrow" width={400} height={250} className="mx-auto object-contain" />
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
    </section>
  );
}
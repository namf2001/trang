import Link from "next/link";
import Image from "next/image";
import { homeItem1, homeItem2, homeItem3, handDrawnInkBrushStrokes, apple, googlePlay } from "@/assets/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative flex justify-center mt-13 pb-40">
      {/* Background decorative elements with home items */}
      <div className="absolute inset-0">
        {/* Top left decoration */}
        <div className="absolute top-5 left-2 w-16 h-16 md:top-10 md:left-10 md:w-32 md:h-32 opacity-70">
          <Image
            src={homeItem3 || "/placeholder.svg"}
            alt="Home Item 1"
            width={128}
            height={128}
            className="object-contain opacity-20"
          />
        </div>
        
        {/* Bottom right decoration */}
        <div className="absolute bottom-10 right-2 w-32 h-32 md:bottom-20 md:right-10 md:w-60 md:h-60 scale-120">
          <Image
            src={homeItem1 || "/placeholder.svg"}
            alt="Home Item 2"
            width={240}
            height={240}
            className="object-contain opacity-20"
          />
        </div>
        
        {/* Top right decoration */}
        <div className="absolute top-5 right-10 w-12 h-12 md:-top-10 md:right-20 md:w-20 md:h-20 opacity-80">
          <Image
            src={homeItem2 || "/placeholder.svg"}
            alt="Home Item 3"
            width={32}
            height={32}
            className="object-contain opacity-20"
          />
        </div>
        
        {/* Bottom left decoration */}
        <div className="absolute bottom-8 left-1/4 w-12 h-12 md:bottom-15 md:w-20 md:h-20 opacity-70">
          <Image
            src={homeItem2 || "/placeholder.svg"}
            alt="Home Item 1"
            width={96}
            height={96}
            className="object-contain opacity-20"
          />
        </div>
      </div>
      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-6xl">
        <h1
          className="relative font-kamerik205 text-3xl md:text-6xl lg:text-[80px] leading-tight mb-6 uppercase font-bold"
          data-text="smarter streaming
unlimited choices"
        >
          smarter streaming
          <br />
          unlimited choices
          <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 h-1/2 w-full rounded-full bg-gradient-to-tl from-orange-400 to-transparent blur-3xl" />
        </h1>

        <p className="font-kamerik205 text-white text-xs md:text-[28px] mb-15 flex items-center justify-center gap-2">
          <span className="z-10">exploring more than{" "}</span>
          <span className="relative z-10">
            10,000 channels
            <Image
              src={handDrawnInkBrushStrokes}
              alt="Brush stroke decoration"
              width={80}
              height={40}
              className="absolute w-full h-full top-0 -z-10 scale-x-110"
            />
          </span>{" "}
          <span className="z-10">
            of entertainment
          </span>
        </p>

        {/* Download buttons */}
        <div className="flex gap-4 md:gap-14 justify-center items-center">
        <Link href="https://play.google.com/store/apps/details?id=com.iptv.smartplayer.onlinetv&hl=vi&pli=1" className="flex items-center" target="_blank" rel="noopener noreferrer">

          <Button
            variant="outline"
            className="text-black hover:bg-gray-100 h-auto px-2 py-1 cursor-pointer"
          >
              <Image
                src={googlePlay}
                alt="Google Play Icon"
                width={26.5}
                height={30}
              />
              <div className="text-left">
                <div className="text-xs font-light">GET IT ON</div>
                <div className="text-lg font-semibold">Google Play</div>
              </div>
            
          </Button>
          </Link>

          <Button
            asChild
            variant="outline"
            className="bg-white text-black hover:bg-gray-100 h-auto px-2 py-1 cursor-pointer"
          >
            <Link href="https://apps.apple.com/app/smart-iptv-player-online-tv/id6686402003" className="flex items-center" target="_blank" rel="noopener noreferrer">
              <Image
                src={apple}
                alt="App Store Icon"
                width={25}
                height={30}
              />
              <div className="text-left">
                <div className="text-xs font-light">Download on the</div>
                <div className="text-lg font-semibold">App Store</div>
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
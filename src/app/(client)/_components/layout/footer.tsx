import Link from "next/link";
import Image from "next/image";
import { footerIconFacebook, footerIconYoutube, footerIconApple, footerIconChplay } from "@/assets/image";

export default function Footer() {
  return (
    <footer className="bg-[#151515] text-white ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-8 lg:px-14">
          {/* IPTV Player Brand Section */}
          <div className="col-span-1 lg:col-span-1">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 lg:mb-12">IPTV Player</h2>
            <p className="text-[#9F9F9F] mb-4 sm:mb-6 text-sm sm:text-base">Follow Us:</p>
            <div className="flex space-x-3 sm:space-x-4">
              <Link 
                href="#" 
                className="hover:opacity-80 transition-opacity p-1"
                aria-label="Facebook"
              >
                <Image 
                  src={footerIconFacebook} 
                  alt="Facebook" 
                  width={20} 
                  height={20}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
              </Link>
              <Link 
                href="#" 
                className="hover:opacity-80 transition-opacity p-1"
                aria-label="YouTube"
              >
                <Image 
                  src={footerIconYoutube} 
                  alt="YouTube" 
                  width={20} 
                  height={20}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
              </Link>
              <Link 
                href="#" 
                className="hover:opacity-80 transition-opacity p-1"
                aria-label="Apple"
              >
                <Image 
                  src={footerIconApple} 
                  alt="Apple" 
                  width={20} 
                  height={20}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
              </Link>
              <Link 
                href="#" 
                className="hover:opacity-80 transition-opacity p-1"
                aria-label="Google Play"
              >
                <Image 
                  src={footerIconChplay} 
                  alt="Google Play" 
                  width={20} 
                  height={20}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
              </Link>
            </div>
          </div>

          {/* Links Section */}
          <div className="col-span-1">
            <h3 className="font-medium mb-6 sm:mb-8 lg:mb-14 text-[#9F9F9F] text-sm sm:text-base">Links</h3>
            <nav className="space-y-3 sm:space-y-4 lg:space-y-[46px]">
              <Link 
                href="/" 
                className="block text-white hover:text-gray-400 transition-colors text-sm sm:text-base"
              >
                Home
              </Link>
              <Link 
                href="/country-url" 
                className="block text-white hover:text-gray-400 transition-colors text-sm sm:text-base"
              >
                Country URL
              </Link>
              <Link 
                href="/sports-url" 
                className="block text-white hover:text-gray-400 transition-colors text-sm sm:text-base"
              >
                Sports URL
              </Link>
              <Link 
                href="/single-stream-url" 
                className="block text-white hover:text-gray-400 transition-colors text-sm sm:text-base"
              >
                Single Stream URL
              </Link>
              <Link 
                href="/xtream-url" 
                className="block text-white hover:text-gray-400 transition-colors text-sm sm:text-base"
              >
                Xtream URL
              </Link>
            </nav>
          </div>

          {/* Help Section */}
          <div className="col-span-1">
            <h3 className="font-medium mb-6 sm:mb-8 lg:mb-14 text-[#9F9F9F] text-sm sm:text-base">Help</h3>
            <nav className="space-y-3 sm:space-y-4 lg:space-y-[46px]">
              <Link 
                href="/help/import-playlist" 
                className="block text-white hover:text-gray-400 transition-colors text-sm sm:text-base"
              >
                How to import playlist?
              </Link>
              <Link 
                href="/terms" 
                className="block text-white hover:text-gray-400 transition-colors text-sm sm:text-base"
              >
                Term of Service
              </Link>
              <Link 
                href="/privacy" 
                className="block text-white hover:text-gray-400 transition-colors text-sm sm:text-base"
              >
                Privacy Policies
              </Link>
              <Link 
                href="/faq" 
                className="block text-white hover:text-gray-400 transition-colors text-sm sm:text-base"
              >
                FAQ
              </Link>
            </nav>
          </div>

          {/* Feedback Section */}
          <div className="col-span-1">
            <h3 className="font-medium mb-6 sm:mb-8 lg:mb-14 text-[#9F9F9F] text-sm sm:text-base">Feedback</h3>
            <nav className="space-y-3 sm:space-y-4 lg:space-y-[46px]">
              <Link 
                href="/contact" 
                className="block text-white hover:text-gray-400 transition-colors text-sm sm:text-base"
              >
                Contact
              </Link>
              <Link 
                href="/feedback" 
                className="block text-white hover:text-gray-400 transition-colors text-sm sm:text-base"
              >
                Feedback
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-[#D9D9D9] mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © {new Date().getFullYear()} IPTV Player. All rights reserved.
            </p>
            <div className="flex space-x-4 sm:space-x-6">
              <Link 
                href="/terms" 
                className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors"
              >
                Terms
              </Link>
              <Link 
                href="/privacy" 
                className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors"
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
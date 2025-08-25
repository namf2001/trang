import Hero from "@/app/(client)/_components/sections/hero";
import PlaylistSection from "@/app/(client)/_components/sections/playlist-section";
import GuideSection from "@/app/(client)/_components/sections/guide-section";
import LinksSection from "@/app/(client)/_components/sections/links-section";
export default function HomePage() {
  return (
    <div>
      <Hero />
      <PlaylistSection />
      <GuideSection />
      <LinksSection />
    </div>
  );
}

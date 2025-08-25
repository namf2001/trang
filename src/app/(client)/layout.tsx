import Navbar from "@/app/(client)/_components/layout/navbar";
import Footer from "@/app/(client)/_components/layout/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#1B1B1E]"> 
      <Navbar />
        <main className="py-[120px]">{children}</main>
      <Footer />
    </div>
  );
}

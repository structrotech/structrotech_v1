import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AmbientBackground } from "@/components/AmbientBackground";
import { NotFoundView } from "@/components/NotFoundView";

export default function NotFound() {
  return (
    <>
      <AmbientBackground />
      <div className="flex min-h-screen w-full max-w-[1400px] flex-col mx-auto">
        <Navbar />
        <main className="flex-1 w-full pt-[5.5rem] md:pt-24">
          <NotFoundView />
        </main>
      </div>
      <Footer />
    </>
  );
}

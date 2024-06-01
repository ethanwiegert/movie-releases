import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-2">
    <Navbar />
    <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
      <h1 className="text-6xl font-bold">Cinema Oracle</h1>
      <p className="mt-3 text-2xl">
        Recommendations like magic.
      </p>
      <span className="animated-gradient bg-white rounded-full size-44 mt-8"></span>
    </main>
    

  </div>
  );
}

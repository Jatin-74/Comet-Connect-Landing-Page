
import Hero from "./components/Hero";

import MatrixRain from "./components/MatrixRain";

export default function Home() {
  return (
    
    <main className="relative bg-transparent min-h-screen flex flex-col overflow-x-hidden">
      
      
      <div className="fixed inset-0 z-[-1]">
        <MatrixRain />
      </div>
      
      
     

      
      <Hero />
     
      
     
      <footer className="">
        <div className="">
          <span></span>
        </div>
        <div className="flex justify-center gap-6">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="mt-4 opacity-50"></div>
      </footer>
    </main>
  );
}
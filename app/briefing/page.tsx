import Hero from "./components/Hero";
import LegalFooter from "./components/LegalFooter";
import MatrixRain from "./components/MatrixRain"; // 👈 1. Import it

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-black flex flex-col">
      
      {/* 2. BACKGROUND LAYER (Matrix Rain) */}
      {/* fixed inset-0 ensures it stays stuck to the screen while you scroll */}
      <div className="fixed inset-0 z-0 opacity-50"> 
        <MatrixRain />
      </div>

      {/* 3. CONTENT LAYER (Hero + Footer) */}
      {/* relative z-10 ensures this sits ON TOP of the rain */}
      <div className="relative z-10 flex flex-col min-h-screen w-full">
        
        <div className="flex-grow">
          <Hero />
        </div>
        
        <LegalFooter />
      </div>
      
    </main>
  );
}
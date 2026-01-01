import Hero from "./components/Hero";
import LegalFooter from "./components/LegalFooter";

export default function Home() {
  return (
    // 'flex-col' stacks them vertically
    <main className="w-full min-h-screen bg-black flex flex-col">
      
      {/* Hero takes up the first 100% of height */}
      <div className="flex-grow">
        <Hero />
      </div>
      
      {/* Footer sits at the bottom, naturally */}
      <LegalFooter />
      
    </main>
  );
}
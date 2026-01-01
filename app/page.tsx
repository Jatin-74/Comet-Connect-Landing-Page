import Hero from "./components/Hero";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-black">
      {/* 1. The Main Interface */}
      <Hero />
      
      {/* 2. The Legal Footer (Scroll down to see it) */}
      <Footer />
    </main>
  );
}
import Hero from './components/Hero';
import Features from './components/Features';
import Newsletter from './components/Newsletter'; // <--- Import this

export default function Home() {
  return (
    <main className="bg-transparent min-h-screen selection:bg-green-500/30">
      <Hero />
      <Features />
      <Newsletter /> {/* <--- Add this at the bottom */}
    </main>
  );
}
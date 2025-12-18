import { Terminal } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-black/80 backdrop-blur-xl mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 md:px-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          
          <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
            <Terminal className="w-4 h-4 text-green-500" />
            <span className="font-tech text-white text-sm tracking-widest">SURONEX_SYSTEMS</span>
          </div>

          
          <div className="flex gap-8 text-xs font-mono text-neutral-500">
            <a href="#" className="hover:text-green-400 transition-colors">PRIVACY_PROTOCOL</a>
            <a href="#" className="hover:text-green-400 transition-colors">TERMS_OF_SERVICE</a>
            <a href="#" className="hover:text-green-400 transition-colors">STATUS_PAGE</a>
          </div>

         
          <div className="text-neutral-600 text-xs font-mono">
             © 2025 ENCRYPTED.
          </div>
        </div>
      </div>
    </footer>
  );
}
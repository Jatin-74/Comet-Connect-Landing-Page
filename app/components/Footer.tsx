"use client";

import { useState } from "react";
import { Terminal, X, Shield, FileText, AlertTriangle, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- LEGAL CONTENT CONSTANTS ---
const LEGAL_CONTENT = {
  TERMS: {
    title: "TERMS OF SERVICE",
    icon: <FileText className="w-6 h-6 text-green-500" />,
    text: (
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-white font-bold">1. "As-Is" Warranty Disclaimer</p>
          <p>The software is provided "AS IS", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
          <ul className="list-disc pl-5 space-y-1 mt-2 text-neutral-500">
            <li>We do not guarantee that the extension will function indefinitely.</li>
            <li>Third-party platforms (OpenAI, Google, Anthropic) frequently update their code. These updates may temporarily disrupt Comet Connect's functionality until a patch is released.</li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="text-white font-bold">2. Limitation of Liability</p>
          <p>In no event shall <strong className="text-white">Comet Edge Technologies</strong> be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software.</p>
        </div>

        <div className="space-y-2">
          <p className="text-white font-bold">3. Third-Party Compliance</p>
          <p>You acknowledge that you are responsible for complying with the Terms of Service of the third-party platforms you interact with (e.g., OpenAI, Anthropic, Google). Comet Connect is an independent productivity tool and is <strong>not</strong> affiliated with, endorsed by, or partnered with these providers.</p>
        </div>
      </div>
    ),
    plainText: `TERMS OF SERVICE - COMET CONNECT\nVersion 4.1\n\n1. "As-Is" Warranty Disclaimer\nThe software is provided "AS IS", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement.\n- We do not guarantee that the extension will function indefinitely.\n- Third-party platforms (OpenAI, Google, Anthropic) frequently update their code. These updates may temporarily disrupt Comet Connect's functionality until a patch is released.\n\n2. Limitation of Liability\nIn no event shall Comet Edge Technologies be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software.\n\n3. Third-Party Compliance\nYou acknowledge that you are responsible for complying with the Terms of Service of the third-party platforms you interact with (e.g., OpenAI, Anthropic, Google). Comet Connect is an independent productivity tool and is not affiliated with, endorsed by, or partnered with these providers.`
  },
  PRIVACY: {
    title: "PRIVACY POLICY (2026)",
    icon: <Shield className="w-6 h-6 text-green-500" />,
    text: (
      <div className="space-y-6">
        {/* ADDED: EXACT DATA RESPONSIBILITY BLOCK */}
        <div className="bg-white/5 p-4 rounded border-l-2 border-green-500/50 space-y-3">
          <p className="text-green-400 font-bold uppercase tracking-widest text-xs">
            1. Data Responsibility & Local Processing
          </p>
          <p className="text-neutral-300">
            Comet Connect is engineered as a local-first browser extension to ensure maximum privacy.
          </p>
          <ul className="space-y-2 mt-2">
            <li><strong className="text-white">No Cloud Storage:</strong> Comet Edge Technologies does not operate servers to store, process, or view your chat history.</li>
            <li><strong className="text-white">User Control:</strong> All data processed by this tool remains strictly on your local machine (in your browser's local storage and your physical hard drive).</li>
            <li><strong className="text-white">Liability:</strong> You are the sole controller of your data. Comet Edge Technologies cannot recover lost data and is not responsible for data mishandling, deletion, or corruption on your local device.</li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="text-white font-bold">2. Data Collection & Transmission</p>
          <p>We do not track your IP address, browser history, or chat contents. No data is ever sent to Comet Edge Technologies servers.</p>
        </div>

        <div className="space-y-2">
          <p className="text-white font-bold">3. PII Redaction</p>
          <p>The built-in "Safety Shield" attempts to redact sensitive info (emails, phone numbers) before export, but <strong className="text-white">you</strong> are ultimately responsible for reviewing your files before sharing them.</p>
        </div>
      </div>
    ),
    plainText: `PRIVACY POLICY (2026) - COMET CONNECT\n\n1. DATA RESPONSIBILITY & LOCAL PROCESSING\nComet Connect is engineered as a local-first browser extension to ensure maximum privacy.\n\n- No Cloud Storage: Comet Edge Technologies does not operate servers to store, process, or view your chat history.\n- User Control: All data processed by this tool remains strictly on your local machine (in your browser's local storage and your physical hard drive).\n- Liability: You are the sole controller of your data. Comet Edge Technologies cannot recover lost data and is not responsible for data mishandling, deletion, or corruption on your local device.\n\n2. Data Collection & Transmission\nWe do not track your IP address, browser history, or chat contents. No data is ever sent to Comet Edge Technologies servers.\n\n3. PII Redaction\nThe built-in "Safety Shield" attempts to redact sensitive info (emails, phone numbers) before export, but you are ultimately responsible for reviewing your files before sharing them.`
  },
  USE: {
    title: "ACCEPTABLE USE POLICY",
    icon: <AlertTriangle className="w-6 h-6 text-green-500" />,
    text: (
      <div className="space-y-6">
        <p>You agree <strong className="text-white">NOT</strong> to use Comet Connect for:</p>
        
        <div className="space-y-4">
          <div className="bg-white/5 p-4 rounded border-l-2 border-red-500/50">
            <p className="text-white font-bold mb-1">1. Web Scraping Violations</p>
            <p>Mass-scraping websites in violation of their <code>robots.txt</code> or Terms of Service.</p>
          </div>

          <div className="bg-white/5 p-4 rounded border-l-2 border-red-500/50">
            <p className="text-white font-bold mb-1">2. Illegal Content</p>
            <p>Processing or transferring illegal, harassing, or harmful content.</p>
          </div>

          <div className="bg-white/5 p-4 rounded border-l-2 border-red-500/50">
            <p className="text-white font-bold mb-1">3. Reverse Engineering</p>
            <p>Attempting to decompile or reverse engineer the extension's source code for malicious purposes.</p>
          </div>
        </div>
      </div>
    ),
    plainText: `ACCEPTABLE USE POLICY - COMET CONNECT\n\nYou agree NOT to use Comet Connect for:\n\n1. Web Scraping Violations\nMass-scraping websites in violation of their robots.txt or Terms of Service.\n\n2. Illegal Content\nProcessing or transferring illegal, harassing, or harmful content.\n\n3. Reverse Engineering\nAttempting to decompile or reverse engineer the extension's source code for malicious purposes.`
  }
};

type PolicyType = 'TERMS' | 'PRIVACY' | 'USE' | null;

export default function Footer() {
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);

  const downloadLegalDoc = (filename: string, content: string) => {
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <>
      <footer className="fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-xl border-t border-green-500/30 z-[100] py-4">
        <div className="max-w-7xl mx-auto px-6 py-12 md:px-20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Brand */}
            <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
              <Terminal className="w-4 h-4 text-green-500" />
              <span className="font-mono text-white text-sm tracking-widest">Comet Edge Technologies</span>
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-8 text-xs font-mono text-neutral-500">
              <button onClick={() => setActivePolicy('TERMS')} className="hover:text-green-400 transition-colors uppercase">
                TERMS_OF_SERVICE
              </button>
              <button onClick={() => setActivePolicy('PRIVACY')} className="hover:text-green-400 transition-colors uppercase">
                PRIVACY_POLICY
              </button>
              <button onClick={() => setActivePolicy('USE')} className="hover:text-green-400 transition-colors uppercase">
                ACCEPTABLE_USE
              </button>
            </div>

            {/* Copyright */}
            <div className="text-neutral-600 text-xs font-mono">
               © 2026 ENCRYPTED.
            </div>
          </div>
        </div>
      </footer>

      {/* LEGAL MODAL */}
      <AnimatePresence>
        {activePolicy && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2147483646] flex items-center justify-center bg-black/90 backdrop-blur-sm px-4"
            onClick={() => setActivePolicy(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-neutral-900 border border-green-500/30 p-8 rounded-lg max-w-2xl w-full shadow-[0_0_50px_rgba(34,197,94,0.1)] relative max-h-[80vh] overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActivePolicy(null)}
                className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                {LEGAL_CONTENT[activePolicy].icon}
                <h2 className="font-tech text-xl text-green-500 tracking-wider">
                  {LEGAL_CONTENT[activePolicy].title}
                </h2>
              </div>

              <div className="font-mono text-sm text-neutral-400 leading-relaxed">
                {LEGAL_CONTENT[activePolicy].text}
              </div>

              {/* Modal Footer with Download Button */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                <button 
                  onClick={() => downloadLegalDoc(`${LEGAL_CONTENT[activePolicy].title.replace(/\s+/g, '_')}.txt`, LEGAL_CONTENT[activePolicy].plainText)}
                  className="flex items-center gap-2 text-xs font-mono text-green-500 hover:text-green-400 transition-colors border border-green-900/30 hover:border-green-500/50 bg-green-900/10 px-4 py-2 rounded"
                >
                  <Download size={14} />
                  DOWNLOAD_DOCUMENT
                </button>

                <button 
                  onClick={() => setActivePolicy(null)}
                  className="px-6 py-2 bg-white/5 hover:bg-green-500/10 border border-white/10 hover:border-green-500/50 text-neutral-300 hover:text-green-400 rounded transition-all font-mono text-xs"
                >
                  ACKNOWLEDGE_SIGNAL
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
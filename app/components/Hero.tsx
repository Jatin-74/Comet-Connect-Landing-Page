"use client";

import { track } from '@vercel/analytics';
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react"; 
import GlitchText from "./GlitchText";
import dynamic from 'next/dynamic'; 
import JSZip from 'jszip';
import { ShieldCheck, X, CheckSquare, Square, FileText } from "lucide-react";

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false, 
  loading: () => (
    <div className="w-full h-full flex items-center justify-center opacity-20">
       <span className="text-green-500 font-mono text-xs animate-pulse">LOADING_MODEL...</span>
    </div>
  ),
});

// --- FILE CONTENTS (For the Extension Download) ---
const MANIFEST_CONTENT = JSON.stringify({
  "manifest_version": 3,
  "name": "Comet Connect",
  "version": "4.1", 
  "description": "Migrate context between ChatGPT, Claude, and Gemini.",
  "permissions": ["activeTab", "scripting"],
  "host_permissions": ["<all_urls>"],
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"],
      "run_at": "document_idle"
    }
  ]
}, null, 2);

// SAFE CONTENT_JS (No innerHTML, trusted types compatible)
const CONTENT_JS_CONTENT = `//Comet Relay v4.1 (CSP Safe)
(function() {
    const BLOCKED_DOMAINS = ["bank", "wallet", "secure", "login", "signin", "password", "account", "paypal", "chase", "wells", "settings", "admin"];
    function isSensitiveSite() { const url = window.location.href.toLowerCase(); return BLOCKED_DOMAINS.some(domain => url.includes(domain)); }
    if (isSensitiveSite()) { console.log("Comet Relay: Safety Protocol active."); return; }
    
    const CHUNK_SIZE = 10000; 
    const PROMPTS = {
        START: \`[SYSTEM: IMPORT START]\\nI am pasting a large transcript in multiple parts.\\nINSTRUCTIONS:\\n1. Receive each part.\\n2. Do NOT reply or summarize yet.\\n3. Just say "✅ Part Received" and wait for the next part.\\n\`,
        CONTINUE: \`\\n[SYSTEM: PART \${"{{CURRENT}}"} OF \${"{{TOTAL}}"}]\\nContinuing transcript...\\n\`,
        END: \`\\n[SYSTEM: IMPORT FINISHED]\\n-- TRANSCRIPT END --\\n\\nINSTRUCTIONS:\\n1. Reconstruct the full conversation from all parts.\\n2. Identify Project Goal, Constraints, and Current State.\\n3. Say "✅ Context Restored" and await instructions.\\n\`
    };
    
    let importQueue = [], currentPart = 0, totalParts = 0, autoFeedTimer = null;
    if (document.getElementById('Comet Connect')) return;
    
    // Create Host
    const host = document.createElement('div'); 
    host.id = 'Comet Connect'; 
    document.documentElement.appendChild(host);
    const shadow = host.attachShadow({ mode: 'open' });

    // 1. Create Styles (Safe)
    const style = document.createElement('style');
    style.textContent = \`
        .container { position: fixed; bottom: 30px; right: 30px; z-index: 2147483647; display: flex; flex-direction: column; gap: 12px; font-family: -apple-system, sans-serif; }
        .btn { width: 60px; height: 60px; border-radius: 50%; border: none; cursor: pointer; font-size: 24px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); transition: transform 0.2s; display: flex; align-items: center; justify-content: center; background: white; position: relative; font-weight: bold; color: #333; }
        .btn:hover { transform: scale(1.1); box-shadow: 0 6px 20px rgba(0,0,0,0.25); }
        #btn-scrape { background: #ea580c; color: white; } 
        #btn-load { background: #10b981; color: white; } 
        .auto-mode { background: #ef4444 !important; animation: pulse 1.5s infinite; }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }
        .btn::after { content: attr(data-tooltip); position: absolute; right: 75px; background: #1f2937; color: white; padding: 6px 10px; border-radius: 6px; font-size: 13px; opacity: 0; pointer-events: none; white-space: nowrap; transition: opacity 0.2s; font-weight: normal; box-shadow: 0 2px 5px rgba(0,0,0,0.2); }
        .btn:hover::after { opacity: 1; }
        .shield { position: absolute; top: -5px; right: -5px; font-size: 14px; }
    \`;
    shadow.appendChild(style);

    // 2. Create Container
    const container = document.createElement('div');
    container.className = 'container';

    // 3. Create Scrape Button
    const btnScrape = document.createElement('button');
    btnScrape.id = 'btn-scrape';
    btnScrape.className = 'btn';
    btnScrape.setAttribute('data-tooltip', 'Safe Export (PII Removed)');
    btnScrape.textContent = '📡'; 
    const shieldSpan = document.createElement('span');
    shieldSpan.className = 'shield';
    btnScrape.appendChild(shieldSpan);
    container.appendChild(btnScrape);

    // 4. Create Load Button
    const btnLoad = document.createElement('button');
    btnLoad.id = 'btn-load';
    btnLoad.className = 'btn';
    btnLoad.setAttribute('data-tooltip', 'Import JSON');
    btnLoad.textContent = '📥';
    container.appendChild(btnLoad);

    shadow.appendChild(container);

    // 5. Create File Input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'file-input';
    fileInput.accept = '.json';
    fileInput.style.display = 'none';
    shadow.appendChild(fileInput);

    // LOGIC
    btnScrape.onclick = () => {
        if(isSensitiveSite()) return alert("⚠️ Security Alert: Export disabled on sensitive page.");
        if(!confirm("⚠️ Have you scrolled to the top?\\n\\nIf not, old messages might be missing. Click OK to proceed.")) return;
        
        btnScrape.textContent = "⏳";
        
        setTimeout(() => {
            const rawText = ((()=>{const c=document.querySelectorAll('main, [role="main"], .flex-1, body');let h=document.body,m=0;c.forEach(x=>{if(x.innerText.length>m){m=x.innerText.length;h=x}});return h.innerText})());
            let cleanText = ((t)=>{const j=["New chat","Ctrl","Shift","Upgrade","Free offer","Share","Regenerate","Copy code","Read Aloud","Bad response","ChatGPT can make mistakes"];return t.split('\\n').filter(l=>{let x=l.trim();if(x.length===0)return!1;if(j.some(z=>x.includes(z)))return!1;if(x.match(/^[0-9a-f-]{36}/)||x.match(/^\\d{4}-\\d{2}-\\d{2}T/))return!1;return!0}).join('\\n').replace(/\\n{3,}/g,'\\n\\n')})(rawText);
            cleanText = ((t)=>t.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/g,"[EMAIL_REDACTED]").replace(/\\b\\d{4}[- ]?\\d{4}[- ]?\\d{4}[- ]?\\d{4}\\b/g,"[CARD_REDACTED]").replace(/\\b\\+?\\d{1,2}[- ]?\\(?\\d{3}\\)?[- ]?\\d{3}[- ]?\\d{4}\\b/g,"[PHONE_REDACTED]"))(cleanText);
            
            if(cleanText.length < 50){
                alert("⚠️ Scrape failed. No text found.");
                resetScrapeBtn();
            } else {
                const d = {timestamp:new Date().toISOString(),source:window.location.hostname,content:cleanText};
                const b = new Blob([JSON.stringify(d,null,2)],{type:"application/json"});
                const u = URL.createObjectURL(b);
                const a = document.createElement('a');
                a.href = u;
                a.download = \`chat-transcript-\${Date.now()}.json\`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                
                btnScrape.textContent = "✅";
                setTimeout(resetScrapeBtn, 2000);
            }
        }, 500);
    };

    function resetScrapeBtn() {
        btnScrape.textContent = '';
        btnScrape.append('📡');
        const s = document.createElement('span');
        s.className = 'shield';
        btnScrape.append(s);
    }

    btnLoad.onclick = () => {
        if(importQueue.length > 0){
            clearTimeout(autoFeedTimer);
            if(confirm("Pause Auto-Import?")) btnLoad.classList.remove("auto-mode");
            else processNextChunk();
        } else {
            fileInput.click();
        }
    };

    fileInput.onchange = (e) => {
        if(!e.target.files[0]) return;
        const r = new FileReader();
        r.onload = (v) => {
            try { prepareChunks(JSON.parse(v.target.result).content); }
            catch(z) { alert("Invalid JSON file"); }
        };
        r.readAsText(e.target.files[0]);
        e.target.value = '';
    };

    function prepareChunks(t){
        importQueue = [];
        for(let i=0; i<t.length; i+=CHUNK_SIZE) importQueue.push(t.substring(i, i+CHUNK_SIZE));
        totalParts = importQueue.length;
        currentPart = 1;
        if(totalParts > 1){
            alert(\`File is large (\${t.length} chars).\\nSplitting into \${totalParts} parts.\\n\\nThe system will auto-paste them. Don't touch the mouse!\`);
            btnLoad.className = "btn auto-mode";
            processNextChunk();
        } else {
            injectText(PROMPTS.START + "\\n" + t + "\\n" + PROMPTS.END);
            alert("File loaded!");
        }
    }

    function processNextChunk(){
        const c = importQueue.shift();
        let p = "";
        if(currentPart === 1) p = PROMPTS.START + "\\n-- PART 1 --\\n" + c;
        else p = PROMPTS.CONTINUE.replace('{{CURRENT}}', currentPart).replace('{{TOTAL}}', totalParts) + c;
        if(importQueue.length === 0) p += PROMPTS.END;
        
        injectText(p);
        tryPressEnter();
        
        btnLoad.textContent = \`\${currentPart}/\${totalParts}\`;
        btnLoad.setAttribute('data-tooltip', \`Auto-Pasting Part \${currentPart}...\`);
        
        if(importQueue.length > 0){
            currentPart++;
            autoFeedTimer = setTimeout(processNextChunk, 5000);
        } else {
            btnLoad.className = "btn";
            btnLoad.textContent = "✅";
            btnLoad.setAttribute('data-tooltip', 'Done!');
            setTimeout(() => {
                btnLoad.textContent = "📥";
                btnLoad.setAttribute('data-tooltip', 'Import JSON');
            }, 4000);
        }
    }

    function injectText(t){
        const s = ['div[contenteditable="true"]', '#prompt-textarea', 'textarea'];
        let i = null;
        for(let x of s){ const e = document.querySelector(x); if(e && e.offsetParent !== null){ i=e; break; } }
        if(!i) return;
        i.focus();
        if(!document.execCommand('insertText', !1, t) && i.tagName === 'TEXTAREA'){
            const d = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
            d.call(i, t);
            i.dispatchEvent(new Event('input', {bubbles:!0}));
        }
    }

    function tryPressEnter(){
        const i = document.querySelector('textarea, div[contenteditable="true"]');
        if(!i) return;
        i.dispatchEvent(new KeyboardEvent('keydown', {bubbles:!0, cancelable:!0, keyCode:13, key:'Enter'}));
        setTimeout(() => {
            const b = document.querySelector('button[data-testid="send-button"], button[aria-label="Send message"], .send-button');
            if(b) b.click();
        }, 300);
    }
})();
`;
// --- END FILE CONTENTS ---

export default function Hero() {
  const router = useRouter(); 
  
  const [trigger, setTrigger] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const startDelay = setTimeout(() => {
      setTrigger(true);
      setTimeout(() => setTrigger(false), 500);
    }, 5000);
    return () => clearTimeout(startDelay);
  }, []);

  const initiateDownloadFlow = () => {
    if (window.innerWidth < 768) {
        alert("⚠️ SYSTEM RESTRICTION:\n\nComet Connect is a desktop browser extension.\nPlease access this terminal via a Computer to initialize.");
        return;
    }
    setShowLegalModal(true);
  };

  const executeDownload = async () => {
    try {
      const zip = new JSZip();
      
      track('Extension Downloaded'); // Vercel Analytics
      
      zip.file("manifest.json", MANIFEST_CONTENT);
      zip.file("content.js", CONTENT_JS_CONTENT);
        
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Comet-Connect.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setShowLegalModal(false);
      setAgreed(false); 

      setTimeout(() => {
        router.push("/briefing"); 
      }, 1000);

    } catch (error) {
      console.error("Download failed:", error);
      alert("System Error: Download Protocol Failed.");
    }
  };

  return (
    <section className="relative w-full h-screen bg-transparent overflow-hidden flex flex-col md:flex-row items-center">
      
      {/* Brand Name - Top Left */}
      <div className="absolute top-8 left-8 md:left-12 z-20 pointer-events-auto">
        <span className="font-mono text-xl md:text-2xl font-bold text-white tracking-widest uppercase opacity-90 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          Comet Edge Technologies
        </span>
      </div>

      <div className="z-10 w-full md:w-1/2 px-6 md:pl-24 pt-20 flex flex-col justify-center h-full pointer-events-none">
        <div className="pointer-events-auto">
          
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-green-900/20 border border-green-500/30 text-green-400 text-xs font-mono mb-8"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
            SYSTEM_ONLINE :: v2.4.0
          </motion.div>
          
          <h1 className="font-tech text-6xl md:text-8xl font-bold text-white leading-[0.9] tracking-tighter mb-8 min-h-[160px]">
            <motion.span 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, type: "tween", ease: "linear" }} 
              className="inline-block overflow-hidden whitespace-nowrap border-r-4 border-green-500 pr-2 align-top w-fit"
              style={{ borderRightColor: "transparent" }}
            >
              COMET
            </motion.span>
            <br />
            <motion.span 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 1, type: "tween", ease: "linear" }} 
              className="inline-block overflow-hidden whitespace-nowrap border-r-4 border-green-500 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-700 pr-2 pb-2"
            >
              <GlitchText text="CONNECT" trigger={trigger} />
            </motion.span>
          </h1>
          
          <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-body text-neutral-400 text-lg md:text-xl max-w-md mb-10 border-l-2 border-green-500/50 pl-6"
          >
            Connect Without Limits.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            {/* INITIALIZE PROTOCOL (Extension Download) */}
            <button 
              onClick={initiateDownloadFlow}
              className="relative px-8 py-4 rounded-lg bg-green-500/10 border border-green-500/50 text-green-400 font-tech font-bold text-lg hover:bg-green-500 hover:text-black transition-all duration-300 backdrop-blur-sm overflow-hidden group cursor-pointer"
            >
              <span className="relative z-10">INITIALIZE_PROTOCOL</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-green-400/20 to-transparent skew-x-12" />
            </button>
            
            {/* SYSTEM MANUAL (PDF Download) */}
            <a 
              href="/guide.pdf" 
              download="Comet_Connect_Manual.pdf"
              className="px-8 py-4 rounded-lg border border-white/10 text-neutral-400 font-tech text-sm hover:text-white hover:border-white/30 transition-colors backdrop-blur-sm flex items-center gap-2"
            >
              <FileText className="w-4 h-4 opacity-70" />
              SYSTEM_MANUAL
            </a>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute top-0 right-0 w-full md:w-[60%] h-full z-0">
        <div className="w-full h-full">
           <Spline scene="https://prod.spline.design/Gyik1BJ91KLHO5K8/scene.splinecode" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-transparent" />
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* LEGAL GATE MODAL */}
      <AnimatePresence>
        {showLegalModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-neutral-900 border border-green-500/30 p-8 rounded-lg max-w-lg w-full shadow-[0_0_50px_rgba(34,197,94,0.1)] relative"
            >
              <button 
                onClick={() => setShowLegalModal(false)}
                className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-6 text-green-500">
                <ShieldCheck size={32} />
                <h2 className="font-tech text-xl tracking-wider">PROTOCOL_SAFEGUARDS</h2>
              </div>

              <div className="font-mono text-sm text-neutral-400 leading-relaxed mb-6 space-y-4">
                <p>
                  <strong className="text-white">User Data Responsibility & Local Processing:</strong>
                </p>
                <p>
                  Comet Connect is a local-first browser extension. The Publisher does not operate remote servers for chat storage, does not have access to your chat history, and cannot recover data if it is lost.
                </p>
              </div>

              <div 
                className="flex items-start gap-3 p-4 bg-black/50 border border-white/10 rounded cursor-pointer hover:border-green-500/50 transition-colors mb-6"
                onClick={() => setAgreed(!agreed)}
              >
                <div className="mt-1 text-green-500">
                  {agreed ? <CheckSquare size={20} /> : <Square size={20} />}
                </div>
                <p className="text-xs text-neutral-300 font-mono">
                  To download, I confirm that I understand Comet Connect is a local tool and I am responsible for my own data.
                </p>
              </div>

              <button
                onClick={executeDownload}
                disabled={!agreed}
                className={`w-full py-3 rounded font-bold font-tech tracking-widest transition-all duration-300 ${
                  agreed 
                  ? 'bg-green-600 hover:bg-green-500 text-black shadow-[0_0_20px_rgba(34,197,94,0.4)]' 
                  : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                }`}
              >
                {agreed ? 'CONFIRM_DOWNLOAD' : 'AWAITING_CONFIRMATION...'}
              </button>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
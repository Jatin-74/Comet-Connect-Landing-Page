"use client";

import { useEffect, useRef } from "react";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

   
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);
    
    const chars = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789:・.=*+-<>";

    let lastTime = 0;
    const fps = 30; 
    const nextFrame = 1000 / fps;

    const draw = (currentTime: number) => {
     
      if (currentTime - lastTime < nextFrame) {
        requestAnimationFrame(draw);
        return;
      }
      lastTime = currentTime;

      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0"; 
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        
        drops[i]++;
      }

      requestAnimationFrame(draw);
    };

    const animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-[1] opacity-20 pointer-events-none"
    />
  );
}
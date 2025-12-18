# SURONEX // 3D Portfolio

Suronex is an immersive, high-performance portfolio website designed to showcase innovation in AI and Cybersecurity. It features a fully interactive 3D environment, matrix simulations, and a "Glass & Glitch" aesthetic, built with the latest modern web technologies.


 Live Demo
 
 [View Live Protocol] - (https://suronex-portfolio.vercel.app/)


Tech Stack

This project leverages a modern, type-safe stack optimized for animation performance.

1) Core Framework: [Next.js 14](https://nextjs.org/) 
2) Language: [TypeScript](https://www.typescriptlang.org/)
3) Styling: [Tailwind CSS](https://tailwindcss.com/)
4) 3D Engine: [Spline](https://spline.design/)
5) Animations: [Framer Motion](https://www.framer.com/motion/)
6) Visual Effects: HTML5 Canvas (Matrix Rain), CSS Backdrop Filters

Design Philosophy & Key Features

The design goal was to create a "Security Architecture" aesthetic, dark, minimal, and industrial, while maintaining 60FPS performance on all devices.

1. Interactive 3D Integration:
The "Watcher" Droid: A Spline 3D model that tracks the user's cursor in real-time.

2. High-Performance Matrix Rain:
   
A custom MatrixRain.tsx component built on HTML5 Canvas.
Unlike heavy video backgrounds, it ensure that it scales to any screen size without pixelation or high memory usage.

3. Mobile-First Optimization:
   
Adaptive Layouts: The layout shifts from a "Side-by-Side" view on desktop to a "Stacked/Overlay" view on mobile.
Visual Hierarchy: On mobile, the 3D robot is dimmed, and positioned as a background layer to ensure text readability remains the priority.
Touch Optimizations: Heavy glass blurs and custom cursors are disabled on touch devices to preserve battery life and scroll performance.

4. Glassmorphism & Glitch UI:
   
Custom GlitchText components add a cyber-security feel to headers.
UI elements use hardware-accelerated CSS backdrop-filter for the frosted glass look, floating above the matrix background.




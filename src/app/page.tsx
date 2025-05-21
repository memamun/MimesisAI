"use client";

import { Hero } from '@/components/Hero';
import ImageGenerator from '@/components/ImageGenerator';
import { ImageHistory } from '@/components/ImageHistory';
import { useEffect } from 'react';

export default function Home() {
  // Add effect to check for the scroll flag when component mounts
  useEffect(() => {
    const shouldScroll = sessionStorage.getItem('scrollToGenerate');
    if (shouldScroll === 'true') {
      // Clear the flag
      sessionStorage.removeItem('scrollToGenerate');

      // Wait for page to be fully loaded
      setTimeout(() => {
        const generateSection = document.getElementById('generate');
        if (generateSection) {
          const headerOffset = 100;
          const elementPosition = generateSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white">
      <Hero />
      <div className="container mx-auto px-4 py-24">
        <ImageGenerator />
        <ImageHistory />
      </div>
    </div>
  );
}

import { Hero } from '@/components/Hero';
import ImageGenerator from '@/components/ImageGenerator';
import { ImageHistory } from '@/components/ImageHistory';

export default function Home() {
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

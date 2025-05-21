"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Download, Trash2, ImageIcon, Palette, Sparkles, Clapperboard, Maximize2, Filter, Wand2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getImages, toggleFavorite, deleteImage } from '@/app/actions/images';
import { toast } from '@/components/ui/use-toast';
import { CustomGallery } from '@/components/ui/CustomGallery';
import { useGeneratedImages } from '@/store/imageStore';
import { useRouter } from 'next/navigation';

type FilterType = 'all' | 'realistic' | 'digital' | 'anime' | 'cinematic';

export default function GalleryPage() {
  const { images, setImages, deleteImage: removeImage, toggleFavorite: toggleImageFavorite } = useGeneratedImages();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const router = useRouter();

  const filters: { value: FilterType; label: string; icon: React.ReactElement; count: number }[] = [
    {
      value: 'all',
      label: 'All',
      icon: <Filter className="w-4 h-4" />,
      count: images.length
    },
    {
      value: 'realistic',
      label: 'Photographic',
      icon: <ImageIcon className="w-4 h-4" />,
      count: images.filter(img => img.style?.toLowerCase() === 'realistic').length
    },
    {
      value: 'digital',
      label: 'Digital Art',
      icon: <Palette className="w-4 h-4" />,
      count: images.filter(img => img.style?.toLowerCase() === 'digital').length
    },
    {
      value: 'anime',
      label: 'Anime',
      icon: <Sparkles className="w-4 h-4" />,
      count: images.filter(img => img.style?.toLowerCase() === 'anime').length
    },
    {
      value: 'cinematic',
      label: 'Cinematic',
      icon: <Clapperboard className="w-4 h-4" />,
      count: images.filter(img => img.style?.toLowerCase() === 'cinematic').length
    },
  ];

  const filteredImages = images.filter(img =>
    activeFilter === 'all' || img.style?.toLowerCase() === activeFilter
  );

  useEffect(() => {
    const loadImages = async () => {
      try {
        const dbImages = await getImages();
        setImages(dbImages);
      } catch (error) {
        console.error('Error loading images:', error);
        toast({
          title: "Error",
          description: "Failed to load images",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [setImages]);

  const getStyleIcon = (style?: string | null) => {
    switch (style?.toLowerCase()) {
      case 'realistic': return <ImageIcon className="w-3 h-3" />;
      case 'digital': return <Palette className="w-3 h-3" />;
      case 'anime': return <Sparkles className="w-3 h-3" />;
      case 'cinematic': return <Clapperboard className="w-3 h-3" />;
      default: return <ImageIcon className="w-3 h-3" />;
    }
  };

  const downloadImage = async (url: string, prompt?: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const linkUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = linkUrl;
      link.download = `image-${prompt ? prompt.substring(0, 20).replace(/\W+/g, '-') : 'generated'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(linkUrl);

      toast({
        title: "Success",
        description: "Image downloaded successfully",
      });
    } catch (error) {
      console.error('Error downloading image:', error);
      toast({
        title: "Error",
        description: "Failed to download image",
        variant: "destructive",
      });
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Function to handle direct scrolling to generator section
  const handleScrollToGenerate = () => {
    // Store a flag in sessionStorage to indicate we should scroll after navigation
    sessionStorage.setItem('scrollToGenerate', 'true');
    // Navigate to home page using router
    router.push('/');
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col space-y-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-white">Gallery</h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Maximize2 className="w-5 h-5 text-white" />
            </motion.button>
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              onClick={handleScrollToGenerate}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r 
                from-purple-600/20 to-blue-600/20 text-purple-400 
                hover:from-purple-600/30 hover:to-blue-600/30 transition-colors"
            >
              <Wand2 className="w-4 h-4" />
              <span>AI Generate</span>
            </motion.button>
            <div className="text-sm text-white/60">
              {filteredImages.length} {filteredImages.length === 1 ? 'image' : 'images'}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <AnimatePresence mode="wait">
            {filters.map(filter => (
              <motion.button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`group inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${activeFilter === filter.value
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/20'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className={`transition-colors duration-200 ${activeFilter === filter.value
                  ? 'text-purple-300'
                  : 'text-white/70 group-hover:text-white'
                  }`}>
                  {filter.icon}
                </span>
                <span className="font-medium">{filter.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${activeFilter === filter.value
                  ? 'bg-purple-500/20 text-purple-300'
                  : 'bg-white/10 text-white/60'
                  }`}>
                  {filter.count}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-square rounded-xl overflow-hidden backdrop-blur-sm 
                border-2 border-white/5 hover:border-white/20 transition-all duration-300"
              onClick={() => {
                setSelectedImageIndex(index);
                setIsGalleryOpen(true);
              }}
            >
              <Image
                src={image.url}
                alt={image.prompt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/60">
                <div className="absolute top-3 left-3 z-10">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium 
                    rounded-full bg-black/50 backdrop-blur-sm text-white border border-white/10"
                  >
                    {getStyleIcon(image.style)}
                    <span>{image.style}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {isGalleryOpen && (
        <CustomGallery
          images={filteredImages.map(img => ({
            ...img,
            description: (
              <div className="space-y-2 p-4 bg-black/50 backdrop-blur-sm rounded-lg">
                <div className="flex items-center gap-2">
                  {getStyleIcon(img.style)}
                  <span className="text-sm font-medium">{img.style}</span>
                </div>
                <p className="text-sm text-white/90 leading-relaxed">
                  {img.prompt}
                </p>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => toggleImageFavorite(img.id)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <Star className={`w-4 h-4 ${img.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-white'}`} />
                  </button>
                  <button
                    onClick={() => downloadImage(img.url, img.prompt)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <Download className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            ),
            createdAt: img.createdAt ? img.createdAt.toString() : undefined
          }))}
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          startIndex={selectedImageIndex || 0}
          isFullscreen={isFullscreen}
          onToggleFavorite={async (id) => {
            toggleImageFavorite(id);
            return Promise.resolve();
          }}
        />
      )}
    </div>
  );
} 
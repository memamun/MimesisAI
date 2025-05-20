"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Download, Trash2, ImageIcon, Palette, Clapperboard, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { CustomGallery } from './ui/CustomGallery';
import { toast } from './ui/use-toast';
import { getImages, toggleFavorite, deleteImage } from '@/app/actions/images';

interface GalleryImage {
  id: string;
  prompt: string;
  url: string;
  width: number;
  height: number;
  style: string | null;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const loadImages = async () => {
    try {
      const dbImages = await getImages();
      setImages(dbImages);
    } catch (error) {
      console.error('Error loading images:', error);
      toast({
        title: "Error",
        description: "Failed to load gallery images",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, [setImages]);

  const handleToggleFavorite = async (id: string) => {
    try {
      await toggleFavorite(id);
      await loadImages(); // Reload images after toggling favorite
      toast({
        title: "Success",
        description: "Updated favorite status",
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "Error",
        description: "Failed to update favorite status",
        variant: "destructive",
      });
    }
  };

  const handleDeleteImage = async (id: string) => {
    try {
      await deleteImage(id);
      await loadImages(); // Reload images after deletion
      toast({
        title: "Success",
        description: "Image deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      });
    }
  };

  const getStyleIcon = (style?: string | null) => {
    switch (style?.toLowerCase()) {
      case 'photographic':
        return <ImageIcon className="w-4 h-4" />;
      case 'digital art':
        return <Palette className="w-4 h-4" />;
      case 'cinematic':
        return <Clapperboard className="w-4 h-4" />;
      case 'anime':
        return <Sparkles className="w-4 h-4" />;
      default:
        return <ImageIcon className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <h2 className="text-2xl font-bold text-white mb-8">Gallery</h2>
      
      {images.length === 0 ? (
        <div className="text-center text-white/60 py-12">
          <p>No images in the gallery yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-square rounded-xl overflow-hidden group"
            >
              <Image
                src={image.url}
                alt={image.prompt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Overlay with controls */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-sm truncate mb-3">{image.prompt}</p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleToggleFavorite(image.id)}
                      className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <Star
                        className={`w-5 h-5 ${image.isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-white'}`}
                      />
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = image.url;
                          link.download = `image-${image.id}.png`;
                          link.click();
                        }}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors"
                      >
                        <Download className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={() => handleDeleteImage(image.id)}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <CustomGallery
        images={images.map(img => ({
          url: img.url,
          prompt: img.style || undefined
        }))}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        startIndex={selectedImageIndex ?? 0}
      />
    </div>
  );
} 
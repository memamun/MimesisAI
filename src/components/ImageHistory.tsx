"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Download, RefreshCw, Trash2, Clock, Filter } from 'lucide-react';
import { Button } from './ui/Button';
import { ImagePopup } from './ui/ImagePopup';
import { getImages, toggleFavorite, deleteImage } from '@/app/actions/images';
import { toast } from '@/components/ui/use-toast';
import Image from 'next/image';
import Link from 'next/link';
import { useGeneratedImages } from '@/store/imageStore';

interface HistoryImage {
  id: string;
  url: string;
  prompt: string;
  style?: string;
  width: number;
  height: number;
  isFavorite: boolean;
  createdAt: Date;
}

export function ImageHistory() {
  const { images, setImages, deleteImage: removeImage, toggleFavorite: toggleImageFavorite } = useGeneratedImages();
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadImages = async () => {
    try {
      setRefreshing(true);
      const dbImages = await getImages();
      setImages(dbImages);
      toast({
        title: "Refreshed",
        description: "Image history has been updated",
      });
    } catch (error) {
      console.error('Error loading images:', error);
      toast({
        title: "Error",
        description: "Failed to load images",
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadImages();
  }, []);

  const handleToggleFavorite = async (id: string) => {
    try {
      await toggleFavorite(id);
      toggleImageFavorite(id);
    } catch (error) {
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
      removeImage(id);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      });
    }
  };

  // Limit to last 32 images
  const limitedImages = images.slice(0, 32);
  
  const imageSets = limitedImages.reduce((sets: HistoryImage[][], image, index) => {
    const setIndex = Math.floor(index / 4);
    if (!sets[setIndex]) {
      sets[setIndex] = [];
    }
    sets[setIndex].push(image);
    return sets;
  }, []);

  const filteredSets = imageSets.filter(set => 
    filter === 'all' || set.some(img => img.isFavorite)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-white">Recent Generations</h2>
          <button
            onClick={loadImages}
            disabled={refreshing}
            className={`p-2 rounded-full hover:bg-white/10 transition-colors ${
              refreshing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <RefreshCw className={`w-5 h-5 text-white ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="/gallery"
            className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            View All in Gallery
          </Link>
          <div className="flex gap-2 bg-black/20 p-1 rounded-full backdrop-blur-sm">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
                ${filter === 'all' 
                  ? 'bg-white/10 text-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('favorites')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
                ${filter === 'favorites' 
                  ? 'bg-white/10 text-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'}`}
            >
              Favorites
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSets.map((imageSet, index) => (
          <ImageSet 
            key={imageSet[0].id} 
            images={imageSet}
            onToggleFavorite={handleToggleFavorite}
            onDelete={handleDeleteImage}
          />
        ))}
      </div>
    </div>
  );
}

function ImageSet({ 
  images, 
  onToggleFavorite, 
  onDelete 
}: { 
  images: HistoryImage[];
  onToggleFavorite: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  if (!images || images.length === 0) return null;

  const mainImage = images[0];
  if (!mainImage) return null;

  return (
    <motion.div 
      className="relative w-[280px] bg-black/20 rounded-xl p-4 backdrop-blur-sm border border-white/10 hover:bg-black/30 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-3">
        <Image
          src={mainImage.url}
          alt={mainImage.prompt}
          fill
          className="object-cover"
          sizes="280px"
        />
        
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex justify-between items-center">
            <button
              onClick={() => onToggleFavorite(mainImage.id)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <Star
                className={`w-5 h-5 ${mainImage.isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-white'}`}
              />
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = mainImage.url;
                  link.download = `image-${mainImage.id}.png`;
                  link.click();
                }}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <Download className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => onDelete(mainImage.id)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <Trash2 className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 h-16">
        {images.slice(1).map((image) => (
          <motion.div
            key={image.id}
            className="relative flex-1 rounded-md overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src={image.url}
              alt={image.prompt}
              fill
              className="object-cover"
              sizes="80px"
            />
          </motion.div>
        ))}
      </div>

      <div className="mt-3">
        <p className="text-sm text-white/80 truncate">
          {mainImage.prompt}
        </p>
      </div>
    </motion.div>
  );
} 
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wand2, Loader2, Download, ImageIcon, Sparkles, Copy, Check,
  Square, RectangleVertical, RectangleHorizontal, Settings2, X,
  Palette, Layers, Zap, Monitor, Smartphone, Clapperboard, Star, RefreshCw, Trash2, Clock
} from 'lucide-react';
import { Button } from './ui/Button';
import { ImagePopup } from './ui/ImagePopup';
import { getImages, toggleFavorite, deleteImage } from '@/app/actions/images';
import { toast } from '@/components/ui/use-toast';
import Image from 'next/image';
import Link from 'next/link';
import { useGeneratedImages } from '@/store/imageStore';
import { CustomGallery } from '@/components/ui/CustomGallery';

interface HistoryImage {
  id: string;
  url: string;
  prompt: string;
  style?: string;
  width: number;
  height: number;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
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
      // Find the set that contains this image
      const setIndex = imageSets.findIndex(set =>
        set.some(img => img.id === id)
      );

      if (setIndex !== -1) {
        const imageSet = imageSets[setIndex];

        // Delete all images in the set from the database
        await Promise.all(imageSet.map(img => deleteImage(img.id)));

        // Remove all images in the set from the local state
        imageSet.forEach(img => removeImage(img.id));

        toast({
          title: "Success",
          description: "Image set deleted successfully",
        });
      } else {
        // Fallback to deleting just the single image
        await deleteImage(id);
        removeImage(id);
      }
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

  // Adjust the grouping to handle sets of 4 images
  const historyImages: HistoryImage[] = limitedImages.map(image => ({
    ...image,
    style: image.style ?? undefined, // Handle null style
    updatedAt: image.createdAt // Use createdAt for updatedAt
  }));

  const imageSets = historyImages.reduce((sets: HistoryImage[][], image, index) => {
    const setIndex = Math.floor(index / 4); // Changed from 3 to 4 to match variations
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
            className={`p-2 rounded-full hover:bg-white/10 transition-colors ${refreshing ? 'opacity-50 cursor-not-allowed' : ''
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
  // Find the index of the photographic style image
  const defaultIndex = images.findIndex(img =>
    img.style?.toLowerCase() === 'realistic' ||
    img.style?.toLowerCase() === 'photographic'
  );

  // Use photographic index if found, otherwise use 0
  const [mainImageIndex, setMainImageIndex] = useState(defaultIndex !== -1 ? defaultIndex : 0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const mainImage = images[mainImageIndex];

  const getStyleIcon = (style: string) => {
    switch (style) {
      case 'realistic':
        return <ImageIcon className="w-4 h-4" />;
      case 'digital':
        return <Palette className="w-4 h-4" />;
      case 'cinematic':
        return <Clapperboard className="w-4 h-4" />;
      case 'anime':
        return <Sparkles className="w-4 h-4" />;
      default:
        return <ImageIcon className="w-4 h-4" />;
    }
  };

  const getStyleLabel = (style: string) => {
    switch (style) {
      case 'realistic':
        return 'Photographic';
      case 'digital':
        return 'Digital Art';
      case 'cinematic':
        return 'Cinematic';
      case 'anime':
        return 'Anime';
      default:
        return 'Generated';
    }
  };

  const handleDownload = async (e: React.MouseEvent, image: HistoryImage) => {
    e.stopPropagation();
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `image-${image.id}-${image.style?.toLowerCase() || 'generated'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
      // You might want to add a toast notification here for error feedback
    }
  };

  if (!images || images.length === 0 || !mainImage) return null;

  // Sort images to ensure photographic style appears first in thumbnails
  const sortedImages = [...images].sort((a, b) => {
    const isAPhotographic = a.style?.toLowerCase() === 'realistic' || a.style?.toLowerCase() === 'photographic';
    const isBPhotographic = b.style?.toLowerCase() === 'realistic' || b.style?.toLowerCase() === 'photographic';
    if (isAPhotographic) return -1;
    if (isBPhotographic) return 1;
    return 0;
  });

  const galleryMappedImages = images.map(img => ({
    ...img,
    createdAt: img.createdAt.toISOString(),
    updatedAt: img.updatedAt.toISOString(),
  }));

  return (
    <>
      <motion.div
        className="relative w-[280px] bg-gradient-to-b from-black/30 to-black/10 rounded-xl p-4 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Delete Set Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Delete the first image which will trigger the set deletion
            onDelete(images[0].id);
          }}
          className="absolute top-3 right-3 z-10 p-2 bg-black/50 hover:bg-red-600/70 rounded-full transition-colors opacity-0 group-hover:opacity-100"
          title="Delete entire set"
        >
          <Trash2 className="w-4 h-4 text-white" />
        </button>

        {/* Main Image Container */}
        <div
          className="relative w-full aspect-square rounded-lg overflow-hidden mb-3 cursor-pointer"
          onClick={() => setIsGalleryOpen(true)}
        >
          <Image
            src={mainImage.url}
            alt={mainImage.prompt || "Generated image"}
            fill
            className="object-cover transform transition-transform duration-300 group-hover:scale-105"
            sizes="280px"
          />

          {/* Overlay and Controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <div className="flex justify-between items-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(mainImage.id);
                  }}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <Star
                    className={`w-5 h-5 ${mainImage.isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-white'}`}
                  />
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => handleDownload(e, mainImage)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors group/download"
                  >
                    <Download className="w-5 h-5 text-white group-hover/download:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Style Label */}
        <div className="absolute top-6 left-6 px-2.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
          {getStyleIcon(mainImage.style || 'default')}
          <span className="text-xs font-medium text-white">
            {getStyleLabel(mainImage.style || 'default')}
          </span>
        </div>

        {/* Thumbnail Strip - Using sorted images */}
        <div className="w-full px-1">
          <div className="grid grid-cols-4 gap-2">
            {sortedImages.map((image, index) => (
              <motion.button
                key={image.id}
                onClick={() => setMainImageIndex(images.findIndex(img => img.id === image.id))}
                className={`relative aspect-square w-full rounded-md overflow-hidden ${images[mainImageIndex].id === image.id
                  ? 'ring-2 ring-purple-500 ring-offset-1 ring-offset-black/50'
                  : 'hover:ring-2 hover:ring-white/50 hover:ring-offset-1 hover:ring-offset-black/50'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={image.url}
                  alt={image.prompt || "Variation"}
                  fill
                  className="object-cover"
                  sizes="60px"
                />
                <div className={`absolute inset-0 transition-opacity duration-200 ${images[mainImageIndex].id === image.id ? 'bg-purple-500/10' : 'hover:bg-white/10'
                  }`} />
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      <CustomGallery
        images={galleryMappedImages}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        startIndex={mainImageIndex}
      />
    </>
  );
} 
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { 
  X, ChevronLeft, ChevronRight, Download, Star, 
  Maximize2, Minimize2, Share2, ZoomIn, ZoomOut, 
  Copy, Check, RotateCw, ChevronDown, ChevronUp,
  ImageIcon, Palette, Sparkles, Clapperboard
} from 'lucide-react';
import Image from 'next/image';
import { toast } from '@/components/ui/use-toast';

interface CustomGalleryProps {
  images: Array<{
    url: string;
    prompt?: string;
    style?: string;
    id?: string;
    isFavorite?: boolean;
    description?: React.ReactNode;
    width?: number;
    height?: number;
    createdAt?: string;
  }>;
  isOpen: boolean;
  onClose: () => void;
  startIndex?: number;
  isFullscreen?: boolean;
}

export function CustomGallery({ images, isOpen, onClose, startIndex = 0, isFullscreen }: CustomGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isFullscreenMode, setIsFullscreenMode] = useState(isFullscreen);
  const [isLoading, setIsLoading] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showDescription) {
      timeout = setTimeout(() => setShowDescription(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [showDescription]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    } else if (e.key === 'ArrowRight') {
      setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreenMode(true);
    } else {
      document.exitFullscreen();
      setIsFullscreenMode(false);
    }
  };

  const handleZoom = (delta: number) => {
    setScale(prev => Math.min(Math.max(0.5, prev + delta), 3));
    if (delta < 0) setPosition({ x: 0, y: 0 }); // Reset position when zooming out
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleCopyPrompt = async () => {
    const prompt = images[currentIndex].prompt;
    if (prompt) {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      toast({
        title: "Copied",
        description: "Prompt copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      handleZoom(e.deltaY > 0 ? -0.1 : 0.1);
    }
  };

  const getStyleIcon = (style?: string) => {
    switch (style?.toLowerCase()) {
      case 'realistic':
      case 'photographic':
        return <ImageIcon className="w-3 h-3" />;
      case 'digital':
      case 'digital art':
        return <Palette className="w-3 h-3" />;
      case 'anime':
        return <Sparkles className="w-3 h-3" />;
      case 'cinematic':
        return <Clapperboard className="w-3 h-3" />;
      default:
        return <ImageIcon className="w-3 h-3" />;
    }
  };

  // Reset prompt visibility on image change
  useEffect(() => {
    setShowPrompt(false);
  }, [currentIndex]);

  // Update image dimensions when image loads
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    setImageDimensions({
      width: img.naturalWidth,
      height: img.naturalHeight
    });
    setIsLoading(false);
  };

  // Calculate image dimensions based on screen size and aspect ratio
  const calculateImageDimensions = () => {
    if (!imageDimensions.width || !imageDimensions.height) return { width: 0, height: 0 };

    const maxWidth = window.innerWidth * 0.9;
    const maxHeight = window.innerHeight * 0.8;
    const aspectRatio = imageDimensions.width / imageDimensions.height;

    let width = imageDimensions.width;
    let height = imageDimensions.height;

    if (width > maxWidth) {
      width = maxWidth;
      height = width / aspectRatio;
    }

    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }

    return { width, height };
  };

  // Get optimal dimensions
  const { width: optimalWidth, height: optimalHeight } = calculateImageDimensions();

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="gallery-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl"
        onMouseMove={() => setShowDescription(true)}
        onWheel={handleWheel}
      >
        {/* Top Bar - Always Visible */}
        <div className="absolute top-0 left-0 right-0 z-50 p-4 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex justify-between items-center max-w-screen-xl mx-auto">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
              <span className="text-white/70 text-sm">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleZoom(-0.1)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                disabled={scale <= 0.5}
              >
                <ZoomOut className="w-5 h-5 text-white" />
              </button>
              <span className="text-white/70 text-sm w-16 text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={() => handleZoom(0.1)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                disabled={scale >= 3}
              >
                <ZoomIn className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={handleRotate}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <RotateCw className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                {isFullscreenMode ? (
                  <Minimize2 className="w-5 h-5 text-white" />
                ) : (
                  <Maximize2 className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <motion.div
          key="gallery-content"
          className="relative h-full flex items-center justify-center"
          drag={scale > 1}
          dragConstraints={{
            left: -(optimalWidth * scale - optimalWidth) / 2,
            right: (optimalWidth * scale - optimalWidth) / 2,
            top: -(optimalHeight * scale - optimalHeight) / 2,
            bottom: (optimalHeight * scale - optimalHeight) / 2
          }}
          dragElastic={0.1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
        >
          <motion.div
            key={`image-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              scale,
              rotate: rotation,
              x: position.x,
              y: position.y
            }}
            transition={{ duration: 0.3 }}
            style={{
              width: optimalWidth,
              height: optimalHeight
            }}
            className="relative"
          >
            <Image
              key={`img-${currentIndex}`}
              src={images[currentIndex].url}
              alt={images[currentIndex].prompt || "Image"}
              width={imageDimensions.width || 1200}
              height={imageDimensions.height || 800}
              onLoad={handleImageLoad}
              className="object-contain w-full h-full"
              priority
              draggable={false}
              unoptimized
            />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Navigation Controls - Always Visible */}
        <div key="nav-controls" className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
            }}
            className="p-3 rounded-full bg-black/50 backdrop-blur-sm text-white/75 hover:text-white hover:bg-black/70 transition-all duration-300 pointer-events-auto"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
            }}
            className="p-3 rounded-full bg-black/50 backdrop-blur-sm text-white/75 hover:text-white hover:bg-black/70 transition-all duration-300 pointer-events-auto"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Description Panel - Now Persistent */}
        <div
          key="description-panel"
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/90 to-transparent"
        >
          <div className="max-w-screen-xl mx-auto p-6">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                {/* Style and Metadata Row */}
                <div className="flex items-center gap-3 flex-wrap mb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full bg-white/10 text-white/90 border border-white/10">
                    {getStyleIcon(images[currentIndex].style)}
                    <span className="capitalize">{images[currentIndex].style}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-white/60">
                      {images[currentIndex].width}×{images[currentIndex].height}
                    </span>
                    <span className="text-white/40">•</span>
                    <span className="text-sm text-white/60">
                      {new Date(images[currentIndex].createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Prompt Section with Animation */}
                <motion.div 
                  initial={false}
                  animate={{ 
                    height: showPrompt ? 'auto' : '0',
                    opacity: showPrompt ? 1 : 0,
                    marginBottom: showPrompt ? '1rem' : '0'
                  }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2 py-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-white/80">Prompt</h3>
                      <button
                        onClick={handleCopyPrompt}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-green-400" />
                            <span className="text-green-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-white/70" />
                            <span className="text-white/70">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-sm leading-relaxed text-white/80 whitespace-pre-wrap">
                      {images[currentIndex].prompt}
                    </p>
                  </div>
                </motion.div>

                {/* Description Toggle Button */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowPrompt(!showPrompt)}
                    className={`group inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      showPrompt 
                        ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border border-purple-500/20'
                        : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5'
                    }`}
                  >
                    <span className="text-sm font-medium">
                      {showPrompt ? 'Hide Description' : 'See Description'}
                    </span>
                    <motion.div
                      animate={{ rotate: showPrompt ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronUp className="w-4 h-4" />
                    </motion.div>
                  </button>
                </div>
              </div>

              {/* Actions Column */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleFavorite(images[currentIndex].id)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors group"
                  title="Add to favorites"
                >
                  <Star className={`w-5 h-5 ${
                    images[currentIndex].isFavorite 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'text-white/70 group-hover:text-white'
                  }`} />
                </button>
                <button
                  onClick={() => downloadImage(images[currentIndex].url)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors group"
                  title="Download image"
                >
                  <Download className="w-5 h-5 text-white/70 group-hover:text-white" />
                </button>
                <button
                  onClick={handleCopyPrompt}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors group"
                  title="Copy prompt"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5 text-white/70 group-hover:text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Add this CSS to your global styles */}
      <style jsx global>{`
        .mask-linear-gradient {
          mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
        }
      `}</style>
    </AnimatePresence>
  );
} 
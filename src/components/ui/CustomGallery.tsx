"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { 
  X, ChevronLeft, ChevronRight, Download, Star, 
  Maximize2, Minimize2, Share2, ZoomIn, ZoomOut, 
  Copy, Check, RotateCw, ChevronDown, ChevronUp,
  ImageIcon, Palette, Sparkles, Clapperboard, Play, Square
} from 'lucide-react';
import Image from 'next/image';
import { toast } from '@/components/ui/use-toast';

interface CustomGalleryProps {
  images: Array<{
    url: string;
    prompt?: string;
    style?: string | null;
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
  onToggleFavorite?: (id: string) => Promise<void>;
}

export function CustomGallery({ images, isOpen, onClose, startIndex = 0, isFullscreen, onToggleFavorite }: CustomGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isFullscreenMode, setIsFullscreenMode] = useState(isFullscreen);
  const [isLoading, setIsLoading] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [copied, setCopied] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showPrompt, setShowPrompt] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [slideshowInterval, setSlideshowInterval] = useState<NodeJS.Timeout | null>(null);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [direction, setDirection] = useState(0);

  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

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

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    } else if (e.key === 'ArrowRight') {
      setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'Escape') {
      onClose();
    }
  }, [images.length, onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, isOpen]);

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

  const getStyleIcon = (style?: string | null) => {
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

  const handleDownload = async (image: CustomGalleryProps['images'][number]) => {
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

  const handleToggleFavorite = async () => {
    const currentImage = images[currentIndex];
    if (!onToggleFavorite || !currentImage?.id) return;

    try {
      await onToggleFavorite(currentImage.id);
      toast({
        title: currentImage.isFavorite ? "Removed from favorites" : "Added to favorites",
        description: currentImage.isFavorite 
          ? "Image removed from your favorites" 
          : "Image added to your favorites",
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

  // Enhanced animation variants for slideshow
  const slideshowVariants = {
    enter: (direction: number) => ({
      scale: 1.2,
      opacity: 0,
      x: direction > 0 ? 1000 : -1000,
    }),
    center: {
      zIndex: 1,
      scale: 1,
      opacity: 1,
      x: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      scale: 0.8,
      opacity: 0,
      x: direction < 0 ? 1000 : -1000,
    }),
  };

  // Enhanced continuous animation
  const animateImage = () => {
    const duration = 5000;
    const steps = 180;
    const stepDuration = duration / steps;
    let currentStep = 0;
    let currentKeyframes = generateKeyframes();
    let nextKeyframes = generateKeyframes();

    function generateKeyframes() {
      return {
        zoom: 1.1 + Math.random() * 0.3,
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        rotate: (Math.random() - 0.5) * 5, // Subtle rotation
      };
    }

    const animate = () => {
      if (!isSlideshow) return;
      
      const progress = (currentStep % steps) / steps;
      const eased = easeInOutCubic(progress);
      
      // Interpolate between keyframes
      const currentZoom = currentKeyframes.zoom + (nextKeyframes.zoom - currentKeyframes.zoom) * eased;
      const currentX = currentKeyframes.x + (nextKeyframes.x - currentKeyframes.x) * eased;
      const currentY = currentKeyframes.y + (nextKeyframes.y - currentKeyframes.y) * eased;
      const currentRotate = currentKeyframes.rotate + (nextKeyframes.rotate - currentKeyframes.rotate) * eased;

      // Add multi-layered motion
      const time = currentStep / 30;
      const zoomOscillation = Math.sin(time) * 0.05;
      const xOscillation = Math.sin(time * 1.3) * 15;
      const yOscillation = Math.cos(time * 1.7) * 15;
      const rotateOscillation = Math.sin(time * 0.5) * 1;

      setZoomLevel(currentZoom + zoomOscillation);
      setPanPosition({
        x: currentX + xOscillation,
        y: currentY + yOscillation
      });
      setRotation(currentRotate + rotateOscillation);

      currentStep++;

      if (currentStep % steps === 0) {
        currentKeyframes = nextKeyframes;
        nextKeyframes = generateKeyframes();
      }

      requestAnimationFrame(() => setTimeout(animate, stepDuration));
    };

    animate();
  };

  const stopSlideshow = useCallback(() => {
    setIsSlideshow(false);
    if (slideshowInterval) {
      clearInterval(slideshowInterval);
      setSlideshowInterval(null);
    }
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    // Smooth reset of effects
    setPanPosition({ x: 0, y: 0 });
    setZoomLevel(1);
  }, [slideshowInterval]);

  // Enhanced keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSlideshow) {
        stopSlideshow();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSlideshow, stopSlideshow]);

  // Enhanced slideshow transition
  const startSlideshow = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    }
    setIsSlideshow(true);
    const interval = setInterval(() => {
      setDirection(1); // Set direction to forward
      const transitionOut = () => {
        const startZoom = zoomLevel;
        const startX = panPosition.x;
        const startY = panPosition.y;
        const steps = 30;
        let step = 0;

        const transition = () => {
          if (step >= steps) {
            setCurrentIndex(prev => (prev + 1) % images.length);
            setZoomLevel(1.2);
            setPanPosition({ x: 0, y: 0 });
            setTimeout(animateImage, 50);
            return;
          }

          const progress = step / steps;
          const eased = easeInOutCubic(progress);
          
          setZoomLevel(startZoom + (1.3 - startZoom) * eased);
          setPanPosition({
            x: startX * (1 - eased),
            y: startY * (1 - eased)
          });

          step++;
          requestAnimationFrame(() => setTimeout(transition, 16));
        };

        transition();
      };

      transitionOut();
    }, 5000);
    
    setSlideshowInterval(interval);
    setZoomLevel(1.2);
    setTimeout(animateImage, 50);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (slideshowInterval) {
        clearInterval(slideshowInterval);
      }
    };
  }, [slideshowInterval]);

  // Add direction handling for manual navigation
  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black cursor-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseMove={() => !isSlideshow && setShowDescription(true)}
          onWheel={handleWheel}
        >
          {/* Show all controls only when not in slideshow mode */}
          {!isSlideshow && (
            <>
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
                      onClick={startSlideshow}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      title="Start Slideshow"
                    >
                      <Play className="w-5 h-5 text-white" />
                    </button>
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
              <div className="relative w-full h-full flex items-center justify-center bg-black/90">
                <div
                  className="relative"
                  style={{
                    width: imageDimensions.width ? Math.min(window.innerWidth * 0.9, imageDimensions.width) : 'auto',
                    height: imageDimensions.height ? Math.min(window.innerHeight * 0.8, imageDimensions.height) : 'auto',
                    transform: `scale(${scale}) rotate(${rotation}deg) translateX(${position.x}px) translateY(${position.y}px)`
                  }}
                >
                  <Image
                    key={`img-${currentIndex}`}
                    src={images[currentIndex].url}
                    alt={images[currentIndex].prompt || "Image"}
                    width={imageDimensions.width || 1200}
                    height={imageDimensions.height || 800}
                    className="object-contain max-w-[90vw] max-h-[80vh]"
                    priority
                    quality={100}
                    draggable={false}
                    onLoad={handleImageLoad}
                    sizes="(max-width: 1200px) 90vw, 80vw"
                  />
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                    </div>
                  )}
                </div>

                {/* Navigation Controls */}
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                  <button
                    onClick={handlePrevious}
                    className="p-3 rounded-full bg-black/50 backdrop-blur-sm text-white/75 hover:text-white hover:bg-black/70 pointer-events-auto"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-3 rounded-full bg-black/50 backdrop-blur-sm text-white/75 hover:text-white hover:bg-black/70 pointer-events-auto"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Description Panel - Now Persistent */}
              <div
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
                            {images[currentIndex].createdAt ? new Date(images[currentIndex].createdAt).toLocaleDateString() : ''}
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
                      {onToggleFavorite && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleFavorite();
                          }}
                          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors group"
                          title={images[currentIndex]?.isFavorite ? "Remove from favorites" : "Add to favorites"}
                        >
                          <Star 
                            className={`w-5 h-5 transition-colors ${
                              images[currentIndex]?.isFavorite 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-white/70 group-hover:text-white'
                            }`} 
                          />
                        </button>
                      )}
                      <button
                        onClick={() => handleDownload(images[currentIndex])}
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
            </>
          )}

          {/* Slideshow mode - only show stop button */}
          {isSlideshow && (
            <div className="absolute top-4 right-4 z-50">
              <button
                onClick={stopSlideshow}
                className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                title="Stop Slideshow"
              >
                <Square className="w-5 h-5 text-white" />
              </button>
            </div>
          )}

          {/* Image Container with enhanced animations */}
          <motion.div
            className="relative w-full h-full cursor-auto"
            onClick={isSlideshow ? stopSlideshow : undefined}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                className="absolute w-full h-full"
                custom={direction}
                variants={slideshowVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.8,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                <motion.div
                  className="w-full h-full cursor-auto"
                  animate={{
                    scale: isSlideshow ? zoomLevel : 1,
                    x: isSlideshow ? panPosition.x : 0,
                    y: isSlideshow ? panPosition.y : 0,
                    rotate: isSlideshow ? rotation : 0
                  }}
                  transition={{ 
                    duration: isSlideshow ? 2.5 : 0.5,
                    ease: "easeInOut"
                  }}
                >
                  <Image
                    key={`image-${currentIndex}`}
                    src={images[currentIndex].url}
                    alt={images[currentIndex].prompt || "Image"}
                    fill
                    className={`transition-all duration-1000 ease-in-out cursor-auto ${
                      isSlideshow ? 'object-cover' : 'object-contain'
                    }`}
                    style={{
                      objectPosition: isSlideshow ? 'center center' : undefined,
                      cursor: 'auto'
                    }}
                    priority
                    sizes="100vw"
                    quality={100}
                    draggable={false}
                    onLoadingComplete={() => {
                      if (isSlideshow) {
                        animateImage();
                      }
                    }}
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Add global style to ensure cursor visibility */}
          <style jsx global>{`
            * {
              cursor: auto !important;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 
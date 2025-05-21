"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Wand2, Loader2, Download, ImageIcon, Sparkles, Copy, Check,
  Square, RectangleVertical, RectangleHorizontal, Settings2, X, RefreshCw,
  Eraser, Palette, Layers, Zap, Monitor, Smartphone, AlertCircle, Clapperboard,
  Trash2, Star, ChevronDown
} from 'lucide-react';
import { saveGeneratedImage } from '@/app/actions/images';
import { CustomGallery } from './ui/CustomGallery';
import { toast } from '@/components/ui/use-toast';
import { useGeneratedImages } from '@/store/imageStore';
import { getImages } from '@/app/actions/images';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { generateImage } from '@/services/pollinations';
import Image from 'next/image';

const IMAGE_SIZES = [
  { width: 1280, height: 720, label: 'Landscape', icon: RectangleHorizontal },
  { width: 512, height: 512, label: 'Square', icon: Square },
  { width: 768, height: 1024, label: 'Portrait', icon: RectangleVertical },
  { width: 1704, height: 960, label: 'Desktop', icon: Monitor },
  { width: 960, height: 1704, label: 'Mobile', icon: Smartphone },
];

const STYLE_VARIATIONS = [
  {
    id: 'realistic',
    label: 'Photographic',
    icon: '📷',
    prompt: 'ultra realistic 8k photography, professional lighting, RAW photo, highly detailed'
  },
  {
    id: 'digital',
    label: 'Digital Art',
    icon: '🎨',
    prompt: 'digital painting, highly detailed, fantasy concept art, trending on artstation, octane render, unreal engine 5'
  },
  {
    id: 'cinematic',
    label: 'Cinematic',
    icon: '🎬',
    prompt: 'cinematic lighting, movie scene, dramatic atmosphere, depth of field, 35mm film'
  },
  {
    id: 'anime',
    label: 'Anime',
    icon: '🎯',
    prompt: 'anime style, high quality anime art, studio ghibli, detailed anime illustration, vibrant anime colors, anime key visual'
  },
];

interface LocalImage {
  url: string;
  label?: string;
  style?: string;
  prompt?: string;
  isLoading?: boolean;
  error?: boolean;
}

// Create a custom event emitter for real-time updates
const imageEventEmitter = {
  listeners: new Set<(images: LocalImage[]) => void>(),

  emit(images: LocalImage[]) {
    this.listeners.forEach(listener => listener(images));
  },

  subscribe(listener: (images: LocalImage[]) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
};

export { imageEventEmitter };

const ImageSizeInput = ({
  onSizeChange,
  initialWidth,
  initialHeight
}: {
  onSizeChange: (width: number, height: number) => void;
  initialWidth: number;
  initialHeight: number;
}) => {
  const [width, setWidth] = useState<string>(initialWidth.toString());
  const [height, setHeight] = useState<string>(initialHeight.toString());
  const [widthError, setWidthError] = useState<string>('');
  const [heightError, setHeightError] = useState<string>('');

  const validateSize = (value: string, isWidth: boolean) => {
    const num = parseInt(value, 10);
    if (isNaN(num)) return 'Please enter a valid number';
    if (num < 64) return 'Minimum size is 64px';
    if (isWidth && num > 1704) return 'Maximum width is 1704px';
    if (!isWidth && num > 960) return 'Maximum height is 960px';
    return '';
  };

  const handleWidthBlur = () => {
    const error = validateSize(width, true);
    setWidthError(error);

    if (!error && height && !heightError) {
      onSizeChange(parseInt(width), parseInt(height));
    }
  };

  const handleHeightBlur = () => {
    const error = validateSize(height, false);
    setHeightError(error);

    if (!error && width && !widthError) {
      onSizeChange(parseInt(width), parseInt(height));
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="relative">
        <input
          type="text"
          value={width}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            setWidth(value);
          }}
          onBlur={handleWidthBlur}
          placeholder="Width"
          className={`w-full px-3 py-1.5 bg-gray-900/50 border rounded text-sm text-white pr-12 focus:outline-none focus:ring-1 focus:ring-purple-500/30 ${widthError ? 'border-red-500/50' : 'border-white/5'
            }`}
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">px</span>
        {widthError && (
          <X className="absolute right-8 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500" />
        )}
        {!widthError && width && (
          <Check className="absolute right-8 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
        )}
      </div>
      {widthError && <p className="text-xs text-red-400">{widthError}</p>}

      <div className="relative">
        <input
          type="text"
          value={height}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            setHeight(value);
          }}
          onBlur={handleHeightBlur}
          placeholder="Height"
          className={`w-full px-3 py-1.5 bg-gray-900/50 border rounded text-sm text-white pr-12 focus:outline-none focus:ring-1 focus:ring-purple-500/30 ${heightError ? 'border-red-500/50' : 'border-white/5'
            }`}
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">px</span>
        {heightError && (
          <X className="absolute right-8 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500" />
        )}
        {!heightError && height && (
          <Check className="absolute right-8 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
        )}
      </div>
      {heightError && <p className="text-xs text-red-400">{heightError}</p>}

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Min: 64px</span>
        <span>Max: 1704×960px</span>
      </div>
    </div>
  );
};

type PromptMode = 'enhanced' | 'direct';

const enhancePrompt = async (prompt: string) => {
  try {
    const cleanedPrompt = prompt
      .replace(/Image Prompt Description:|Prompt:|Description:/gi, '')
      .replace(/```[\s\S]*?```/g, '')
      .replace(/\*\*/g, '')
      .replace(/\[.*?\]/g, '')
      .replace(/[^\w\s,.-]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const enhancementRequest = `Enhance this image prompt with detailed visual descriptions, focusing only on appearance, lighting, style, and atmosphere. No introductions or questions: ${cleanedPrompt}`;

    const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(enhancementRequest)}`);
    if (!response.ok) throw new Error('Failed to enhance prompt');

    const enhancedText = await response.text();

    // Clean up the response to remove all conversational elements
    const finalPrompt = enhancedText
      .replace(/```[\s\S]*?```/g, '')
      .replace(/\*\*/g, '')
      .replace(/\[.*?\]/g, '')
      .replace(/Certainly!|Here's|I'll|Let me|Would you like|Should I|Can I|Please|Note:|Remember:/gi, '')
      .replace(/Here is|This is|I've created|I have created|I think|You might|You may|You could/gi, '')
      .replace(/a detailed image generation prompt for|an image generation prompt for|a prompt for|an enhanced prompt for/gi, '')
      .replace(/with a strong focus on|focusing on|emphasizing|highlighting/gi, '')
      .replace(/visual and artistic elements:|visual elements:|artistic elements:/gi, '')
      .replace(/[\n\r]+/g, ' ')  // Replace multiple newlines with single space
      .replace(/\s{2,}/g, ' ')   // Replace multiple spaces with single space
      .replace(/^[,\s]+/, '')    // Remove leading commas and spaces
      .replace(/[,\s]+$/, '')    // Remove trailing commas and spaces
      .replace(/\?|\!|\:/g, ',') // Replace question marks, exclamation points, and colons with commas
      .trim();

    return finalPrompt;
  } catch (error) {
    console.error('Error enhancing prompt:', error);
    throw error;
  }
};

const ImageCard = ({
  image,
  index,
  selectedVariation,
  onSelect,
  onDownload
}: {
  image: LocalImage;
  index: number;
  selectedVariation: number | null;
  onSelect: (index: number) => void;
  onDownload: () => void;
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isImageError, setIsImageError] = useState(false);

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className={`group relative aspect-square rounded-2xl overflow-hidden backdrop-blur-sm border-2 transition-all duration-300 ${selectedVariation === index
          ? 'border-purple-500 ring-2 ring-purple-500/50 scale-105'
          : 'border-white/5 hover:border-white/20'
        }`}
      onClick={() => onSelect(index)}
    >
      {/* Loading State */}
      {(!isImageLoaded || image.isLoading) && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/20 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* Image */}
      {image.url && (
        <div className={`relative w-full h-full transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <Image
            src={image.url}
            alt={image.label || ''}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index === 0}
            onLoad={() => setIsImageLoaded(true)}
            onError={() => {
              setIsImageError(true);
              setIsImageLoaded(true);
            }}
          />
        </div>
      )}

      {/* Error State */}
      {(isImageError || image.error) && (
        <div className="absolute inset-0 bg-red-500/10 flex items-center justify-center">
          <div className="text-red-400 text-sm text-center px-4">
            Failed to load image
          </div>
        </div>
      )}

      {/* Style Label */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-black/50 backdrop-blur-sm text-white border border-white/10">
          {image.style === 'realistic' && <ImageIcon className="w-3 h-3" />}
          {image.style === 'digital' && <Palette className="w-3 h-3" />}
          {image.style === 'cinematic' && <Clapperboard className="w-3 h-3" />}
          {image.style === 'anime' && <Sparkles className="w-3 h-3" />}
          <span>{image.label}</span>
        </div>
        {selectedVariation === index && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-purple-500/50 backdrop-blur-sm text-white border border-purple-300/20">
            <Check className="w-3 h-3" />
            <span>Selected</span>
          </div>
        )}
      </div>

      {/* Hover Actions */}
      {image.url && isImageLoaded && !isImageError && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onDownload();
              }}
              className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white text-sm flex items-center justify-center space-x-2 hover:bg-white/20"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const ImageGenerator = () => {
  const { addImages, setImages } = useGeneratedImages();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [localImages, setLocalImages] = useState<Array<LocalImage>>([]);
  const [selectedSize, setSelectedSize] = useState(IMAGE_SIZES[0]);
  const [selectedVariation, setSelectedVariation] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isCustomSize, setIsCustomSize] = useState(false);
  const [customSize, setCustomSize] = useState({ width: 512, height: 512 });
  const [promptMode, setPromptMode] = useState<PromptMode>('enhanced');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setPrompt(value);
  };

  const handleCopyPrompt = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSizeChange = (width: number, height: number) => {
    setCustomSize({ width, height });
    const icon = selectedSize.icon || Square; // Default to Square icon if none exists
    setSelectedSize({ width, height, label: 'Custom', icon });
  };

  const downloadImage = async (imageUrl: string, basePrompt: string = '', label: string = 'generated') => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      // Create a clean filename using the prompt and style label
      const cleanPrompt = basePrompt
        .slice(0, 30) // Limit prompt length
        .replace(/[^a-z0-9]/gi, '_') // Replace special chars with underscore
        .toLowerCase();

      const cleanLabel = label.toLowerCase().replace(/\s+/g, '_');
      const timestamp = new Date().getTime();

      // Format: prompt_style_timestamp.png
      link.href = url;
      link.download = `${cleanPrompt}_${cleanLabel}_${timestamp}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Download Started",
        description: `Downloading ${label} version`,
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: "Could not download the image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEnhanceClick = async () => {
    if (!prompt.trim() || isEnhancing) return;

    setIsEnhancing(true);
    try {
      toast({
        title: "Enhancing Prompt",
        description: "Creating detailed image generation prompt...",
      });

      const enhancedPrompt = await enhancePrompt(prompt);
      if (enhancedPrompt) {
        setPrompt(enhancedPrompt);
        toast({
          title: "Prompt Enhanced",
          description: "Your prompt has been optimized for image generation",
        });
      }
    } catch (error) {
      console.error('Enhancement error:', error);
      toast({
        title: "Enhancement Failed",
        description: "Could not enhance the prompt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleGenerate = async (inputPrompt: string) => {
    if (!inputPrompt.trim() || loading) return;

    setLoading(true);
    setLocalImages([]);
    setShowSaveButton(false);

    try {
      const variations = STYLE_VARIATIONS.map(style => ({
        prompt: `${inputPrompt}, ${style.prompt}`,
        label: style.label,
        style: style.id
      }));

      // Initialize with empty placeholders
      setLocalImages(variations.map(v => ({
        url: '',
        label: v.label,
        style: v.style,
        prompt: v.prompt,
        isLoading: true
      })));

      // Add a small delay to ensure UI updates
      await new Promise(resolve => setTimeout(resolve, 100));

      const results = await Promise.allSettled(
        variations.map(async (variation): Promise<LocalImage> => {
          try {
            const seed = Math.floor(Math.random() * 1000000);
            const imageUrl = await generateImage(variation.prompt, {
              seed,
              width: isCustomSize ? customSize.width : selectedSize.width,
              height: isCustomSize ? customSize.height : selectedSize.height,
              timeout: 30000 // Increased timeout to 30 seconds
            });

            return {
              url: imageUrl,
              label: variation.label,
              style: variation.style,
              prompt: variation.prompt,
              isLoading: false
            };
          } catch (error) {
            console.error(`Failed to generate ${variation.label} variation:`, error);
            throw error;
          }
        })
      );

      // Process results and update state
      const successfulImages = results
        .map((result, index) => {
          if (result.status === 'fulfilled') {
            return result.value;
          } else {
            toast({
              title: `${variations[index].label} Generation Failed`,
              description: "Will retry automatically...",
              variant: "destructive"
            });
            // Return a failed placeholder
            return {
              url: '',
              label: variations[index].label,
              style: variations[index].style,
              prompt: variations[index].prompt,
              isLoading: false,
              error: true
            };
          }
        })
        .filter(img => img.url || img.error); // Keep both successful and error states

      setLocalImages(successfulImages);

      // Retry failed generations
      const failedVariations = results
        .map((result, index) => result.status === 'rejected' ? variations[index] : null)
        .filter((v): v is typeof variations[0] => v !== null);

      if (failedVariations.length > 0) {
        // Retry after a short delay
        setTimeout(async () => {
          const retryResults = await Promise.allSettled(
            failedVariations.map(async (variation) => {
              try {
                const seed = Math.floor(Math.random() * 1000000);
                const imageUrl = await generateImage(variation.prompt, {
                  seed,
                  width: isCustomSize ? customSize.width : selectedSize.width,
                  height: isCustomSize ? customSize.height : selectedSize.height,
                  timeout: 30000
                });

                // Update the specific failed image
                setLocalImages(prev =>
                  prev.map(img =>
                    img.style === variation.style ? {
                      url: imageUrl,
                      label: variation.label,
                      style: variation.style,
                      prompt: variation.prompt,
                      isLoading: false
                    } : img
                  )
                );

                return imageUrl;
              } catch (error) {
                console.error(`Retry failed for ${variation.label}:`, error);
                throw error;
              }
            })
          );

          const anySuccess = retryResults.some(result => result.status === 'fulfilled');
          if (anySuccess) {
            setShowSaveButton(true);
          }
        }, 2000); // Wait 2 seconds before retrying
      } else {
        setShowSaveButton(true);
      }

    } catch (error) {
      console.error('Generation error:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate images. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToHistory = async () => {
    try {
      const savedImages = [];
      for (const image of localImages) {
        const savedImage = await saveGeneratedImage({
          url: image.url,
          prompt: image.prompt || '',
          style: image.style,
          width: selectedSize.width,
          height: selectedSize.height
        });
        if (savedImage) savedImages.push(savedImage);
      }

      addImages(savedImages);
      const latestImages = await getImages();
      setImages(latestImages);
      setShowSaveButton(false);

      toast({
        title: "Saved",
        description: "Images saved to history",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save images",
        variant: "destructive",
      });
    }
  };

  const generatePromptVariations = async (basePrompt: string) => {
    const cleanedPrompt = cleanInputPrompt(basePrompt);

    return Promise.all(
      STYLE_VARIATIONS.map(async (style) => ({
        prompt: `${cleanedPrompt}, ${style.prompt}`,
        label: style.label,
        style: style.id,
        originalPrompt: basePrompt
      }))
    );
  };

  const cleanInputPrompt = (text: string) => {
    return text
      .replace(/Image Prompt Description:|Prompt:|Description:/gi, '')
      .replace(/[^\w\s,.-]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const SizeControl = () => {
    const [isPresetListOpen, setIsPresetListOpen] = useState(false);

    const handleSizeChange = (width: number, height: number) => {
      setCustomSize({ width, height });
      const icon = selectedSize.icon || Square; // Default to Square icon if none exists
      setSelectedSize({ width, height, label: 'Custom', icon });
    };

    return (
      <div className="space-y-2 bg-gray-900/30 rounded-xl p-3 border border-white/5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Image Size</span>
          <button
            onClick={() => {
              setIsCustomSize(!isCustomSize);
              if (!isCustomSize) { // Switching to Custom Size
                setIsPresetListOpen(false);
              } else { // Switching to Use Presets
                setIsPresetListOpen(true);
              }
            }}
            className="text-xs text-purple-400 hover:text-purple-300"
          >
            {isCustomSize ? 'Use Presets' : 'Custom Size'}
          </button>
        </div>

        {isCustomSize ? (
          <ImageSizeInput
            onSizeChange={handleSizeChange}
            initialWidth={selectedSize.width}
            initialHeight={selectedSize.height}
          />
        ) : (
          <>
            {/* Current Size Indicator - Now a button */}
            <button
              onClick={() => {
                if (!isCustomSize) {
                  setIsPresetListOpen(!isPresetListOpen);
                }
              }}
              className="w-full pt-1.5 border-t border-white/5 mt-2" // Added mt-2 for spacing when presets are hidden
            >
              <div className="text-xs text-gray-400 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span>Current Size:</span>
                  <span className="text-purple-400">
                    {selectedSize.width}px × {selectedSize.height}px
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isPresetListOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </motion.div>
              </div>
            </button>

            {/* Collapsible Preset List */}
            {isPresetListOpen && !isCustomSize && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 gap-1 overflow-hidden"
              >
                {IMAGE_SIZES.map((size) => {
                  const Icon = size.icon;
                  const isSelected = selectedSize.width === size.width && selectedSize.height === size.height;
                  const isHD = size.width >= 1080 || size.height >= 1080;

                  return (
                    <button
                      key={size.label}
                      onClick={() => {
                        setSelectedSize(size);
                        setCustomSize({ width: size.width, height: size.height });
                        setIsPresetListOpen(false); // Close list after selection
                      }}
                      className={`p-2 rounded-lg flex items-center justify-between transition-colors ${isSelected
                          ? 'bg-purple-600/20 text-purple-400'
                          : 'text-gray-400 hover:bg-gray-800/50'
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <span className="text-xs">{size.label}</span>
                        {isHD && (
                          <span className="px-1.5 py-0.5 text-[10px] font-medium bg-purple-500/20 text-purple-400 rounded-full">
                            HD
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </>
        )}

        {/* Current Size Indicator - For Custom Size Mode */}
        {isCustomSize && (
          <div className="pt-1.5 border-t border-white/5">
            <div className="text-xs text-gray-400 flex items-center justify-between">
              <span>Current Size:</span>
              <span className="text-purple-400">
                {customSize.width}px × {customSize.height}px
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Format images for CustomGallery with proper prompt handling
  const galleryImages = localImages.map((img, index) => ({
    id: String(index),
    url: img.url,
    prompt: img.prompt || prompt || '',
    width: selectedSize.width,
    height: selectedSize.height,
    style: img.label || 'Generated',
    isFavorite: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    description: `${img.prompt || prompt || ''} • ${img.label || 'Generated'} • ${selectedSize.width}×${selectedSize.height}`,
    label: img.label || 'Generated'
  }));

  return (
    <section id="generate" className="relative py-8 scroll-mt-32 scroll-smooth">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 order-last lg:order-first">
            <div className="bg-gray-900/50 rounded-xl border border-white/5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <span className="text-base sm:text-sm font-medium text-gray-300">AI Image Generator</span>
                  <span id="generator-anchor" className="sr-only">Generator Section</span>
                </div>
                <div className="flex flex-col items-start gap-1 mt-2 sm:mt-0 sm:flex-row sm:items-center sm:gap-4 text-sm sm:text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Palette className="w-4 h-4" />
                    <span>4 Styles</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Layers className="w-4 h-4" />
                    <span>Multiple Sizes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4" />
                    <span>Instant Generation</span>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex space-x-1 mb-3 sm:mb-2 bg-gray-900/30 p-0.5 rounded-lg w-fit">
                  <button
                    onClick={() => setPromptMode('enhanced')}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${promptMode === 'enhanced'
                        ? 'bg-purple-600/20 text-purple-400'
                        : 'text-gray-400 hover:text-white'
                      }`}
                  >
                    Enhanced
                  </button>
                  <button
                    onClick={() => setPromptMode('direct')}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${promptMode === 'direct'
                        ? 'bg-purple-600/20 text-purple-400'
                        : 'text-gray-400 hover:text-white'
                      }`}
                  >
                    Direct
                  </button>
                </div>

                <div className="relative">
                  <textarea
                    id="prompt-input"
                    value={prompt}
                    onChange={handlePromptChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.shiftKey) {
                        e.preventDefault();
                        handleGenerate(prompt);
                      }
                    }}
                    placeholder="Describe what you want to see in the image. Be specific and detailed. Avoid using special characters or markdown."
                    rows={4}
                    className="w-full px-4 py-3 pr-12 bg-gray-900/50 border border-white/5 rounded-xl text-white placeholder-gray-400 placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  />
                  <button
                    onClick={handleEnhanceClick}
                    disabled={!prompt.trim() || isEnhancing}
                    className={`absolute right-3 top-3 p-2 rounded-lg transition-all ${isEnhancing
                        ? 'bg-purple-500/20 text-purple-400'
                        : prompt.trim()
                          ? 'bg-gray-800/50 text-gray-400 hover:bg-purple-500/20 hover:text-purple-400'
                          : 'bg-gray-800/20 text-gray-600 cursor-not-allowed'
                      }`}
                    title="Enhance prompt with AI"
                  >
                    <Sparkles
                      className={`w-4 h-4 ${isEnhancing ? 'animate-spin' : ''}`}
                    />
                  </button>
                  {promptMode === 'enhanced' && (
                    <div className="mt-3 sm:mt-2 flex items-center gap-2 text-xs text-gray-400">
                      <AlertCircle className="w-4 h-4" />
                      <span>Click the sparkle icon to enhance your prompt with AI</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between px-4 py-3 border-t border-white/5 bg-black/20 gap-3">
                <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <ImageIcon className="w-4 h-4" />
                    <span>4 Variations</span>
                  </div>
                  <div className="h-4 w-px bg-gray-700 hidden sm:block" />
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Settings2 className="w-4 h-4" />
                    <span>Custom Size</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleGenerate(prompt)}
                    disabled={loading || !prompt.trim()}
                    className={`w-full sm:w-auto px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${loading || !prompt.trim()
                        ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-400 hover:from-purple-600/30 hover:to-blue-600/30'
                      }`}
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Wand2 className="w-4 h-4" />
                    )}
                    <span className="text-xs sm:text-sm">{loading ? 'Generating...' : `Generate ${promptMode === 'enhanced' ? 'Variations' : 'Image'}`}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-48 order-first lg:order-last">
            <SizeControl />
          </div>
        </div>

        {/* Results Grid with Save Button */}
        <div className="mt-8">
          {showSaveButton && localImages.length > 0 && (
            <div className="mb-4 flex justify-end">
              <button
                onClick={handleSaveToHistory}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-400 hover:from-purple-600/30 hover:to-blue-600/30 flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Save to History</span>
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading && !localImages.length ? (
              // Initial loading placeholders
              Array.from({ length: 4 }).map((_, index) => (
                <motion.div
                  key={`loading-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative aspect-square rounded-2xl overflow-hidden backdrop-blur-sm border-2 border-white/5"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/20 animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
                  </div>
                  <div className="absolute top-3 left-3">
                    <div className="h-6 w-24 rounded-full bg-white/5 animate-pulse" />
                  </div>
                </motion.div>
              ))
            ) : (
              localImages.map((image, index) => (
                <ImageCard
                  key={`${image.url}-${index}`}
                  image={image}
                  index={index}
                  selectedVariation={selectedVariation}
                  onSelect={(idx) => {
                    setSelectedVariation(idx);
                    setSelectedImageIndex(idx);
                    setIsGalleryOpen(true);
                  }}
                  onDownload={() => downloadImage(image.url, prompt, image.label)}
                />
              ))
            )}
          </div>
        </div>

        {/* Selection Action Button */}
        {selectedVariation !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
          >
            {/* <button
              onClick={() => {
                // Handle selection - you can save to history, regenerate with this style, etc.
                const selected = localImages[selectedVariation];
                console.log('Selected variation:', selected);
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
            >
              Use Selected Style
            </button> */}
          </motion.div>
        )}

        {/* CustomGallery with null check */}
        {isGalleryOpen && galleryImages.length > 0 && (
          <CustomGallery
            images={galleryImages}
            isOpen={isGalleryOpen}
            onClose={() => {
              setIsGalleryOpen(false);
              setSelectedImageIndex(0);
            }}
            startIndex={selectedImageIndex}
          />
        )}
      </div>
    </section>
  );
};

export default ImageGenerator; 
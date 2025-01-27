"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Wand2, Loader2, Download, ImageIcon, Sparkles, Copy, Check, 
  Square, RectangleVertical, RectangleHorizontal, Settings2, X, RefreshCcw,
  Eraser, Palette, Layers, Zap, Monitor, Smartphone, AlertCircle
} from 'lucide-react';
import { saveImage } from '@/services/db';

const IMAGE_SIZES = [
  { width: 512, height: 512, label: 'Square', icon: Square },
  { width: 768, height: 1024, label: 'Portrait', icon: RectangleVertical },
  { width: 1024, height: 768, label: 'Landscape', icon: RectangleHorizontal },
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
    id: 'artistic', 
    label: 'Artistic', 
    icon: '🖌️', 
    prompt: 'digital illustration, vibrant colors, artistic style, detailed artwork, trending on artstation' 
  },
];

interface GeneratedImage {
  url: string;
  prompt: string;
  label: string;
  style: string;
  originalPrompt: string;
}

const NumberInput = ({ 
  value, 
  onChange, 
  onBlur, 
  placeholder,
  hasError 
}: { 
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  placeholder: string;
  hasError?: boolean;
}) => (
  <div className="relative">
    <input
      type="text"
      inputMode="decimal"
      value={value}
      onChange={(e) => {
        const val = e.target.value;
        if (/^\d*$/.test(val)) {
          onChange(val);
        }
      }}
      onBlur={onBlur}
      className={`w-full px-3 py-1.5 bg-gray-900/50 border rounded text-sm text-white pr-12 focus:outline-none focus:ring-1 focus:ring-purple-500/30 ${
        hasError ? 'border-red-500/50' : 'border-white/5'
      }`}
      placeholder={placeholder}
    />
    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">px</span>
  </div>
);

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
          className={`w-full px-3 py-1.5 bg-gray-900/50 border rounded text-sm text-white pr-12 focus:outline-none focus:ring-1 focus:ring-purple-500/30 ${
            widthError ? 'border-red-500/50' : 'border-white/5'
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
          className={`w-full px-3 py-1.5 bg-gray-900/50 border rounded text-sm text-white pr-12 focus:outline-none focus:ring-1 focus:ring-purple-500/30 ${
            heightError ? 'border-red-500/50' : 'border-white/5'
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

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [selectedSize, setSelectedSize] = useState(IMAGE_SIZES[0]);
  const [selectedVariation, setSelectedVariation] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isCustomSize, setIsCustomSize] = useState(false);
  const [customSize, setCustomSize] = useState({ width: 512, height: 512 });
  const [sizeWarning, setSizeWarning] = useState<string | null>(null);
  const [tempWidth, setTempWidth] = useState('');
  const [tempHeight, setTempHeight] = useState('');
  const [promptMode, setPromptMode] = useState<PromptMode>('enhanced');

  const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setPrompt(value);
  };

  const handleCopyPrompt = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const downloadImage = async (url: string, promptText: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${promptText.slice(0, 30)}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  };

  const generateDirectVariations = (basePrompt: string) => {
    return [
      {
        prompt: basePrompt,
        label: 'Original',
        style: 'custom'
      },
      {
        prompt: `${basePrompt}, anime key visual style, highly detailed anime illustration, studio ghibli inspired, vibrant colors, soft lighting, cel shading, beautiful anime art, trending on artstation, professional anime artwork`,
        label: 'Anime',
        style: 'anime'
      },
      {
        prompt: `${basePrompt}, digital art, highly detailed, intricate details, sharp focus, vibrant colors, professional digital painting, trending on artstation, 8k uhd`,
        label: 'Digital',
        style: 'digital'
      },
      {
        prompt: `${basePrompt}, realistic style, photorealistic, hyperrealistic, highly detailed, dramatic lighting, professional photography, 8k uhd`,
        label: 'Realistic',
        style: 'realistic'
      }
    ];
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || loading) return;
    
    setLoading(true);
    try {
      const currentSize = isCustomSize ? customSize : selectedSize;
      
      if (promptMode === 'direct') {
        // Direct mode: 4 variations without prompt enhancement
        const variations = generateDirectVariations(prompt);
        const generatedImages = variations.map(variation => ({
          url: `https://image.pollinations.ai/prompt/${encodeURIComponent(variation.prompt)}?width=${currentSize.width}&height=${currentSize.height}&nologo=true`,
          prompt: variation.prompt,
          label: variation.label,
          style: variation.style,
          originalPrompt: prompt
        }));
        setImages(generatedImages);
      } else {
        // Enhanced mode: with prompt enhancement and variations
        const variations = await generatePromptVariations(prompt);
        const generatedImages = variations.map(variation => ({
          url: `https://image.pollinations.ai/prompt/${encodeURIComponent(variation.prompt)}?width=${currentSize.width}&height=${currentSize.height}&nologo=true`,
          prompt: variation.prompt,
          label: variation.label,
          style: variation.style,
          originalPrompt: prompt
        }));
        setImages(generatedImages);
      }
    } catch (error) {
      console.error('Failed to generate images:', error);
    } finally {
      setLoading(false);
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

  const validateAndUpdateSize = () => {
    const width = parseInt(tempWidth);
    const height = parseInt(tempHeight);

    if (!width || !height) return;

    if (width < 64 || height < 64) {
      setSizeWarning('Size cannot be less than 64px');
      return;
    }
    if (width > 2048 || height > 2048) {
      setSizeWarning('Size cannot exceed 2048px');
      return;
    }

    setSizeWarning(null);
    setCustomSize({ width, height });
    setSelectedSize({ width, height, label: 'Custom', icon: Settings2 });
  };

  const SizeControl = () => {
    const handleSizeChange = (width: number, height: number) => {
      setCustomSize({ width, height });
      setSelectedSize({ width, height, label: 'Custom', icon: Settings2 });
    };

    return (
      <div className="space-y-2 bg-gray-900/30 rounded-xl p-3 border border-white/5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Image Size</span>
          <button
            onClick={() => setIsCustomSize(!isCustomSize)}
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
          <div className="grid grid-cols-1 gap-1">
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
                  }}
                  className={`p-2 rounded-lg flex items-center justify-between transition-colors ${
                    isSelected
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
          </div>
        )}
        
        {/* Current Size Indicator */}
        <div className="pt-1.5 border-t border-white/5">
          <div className="text-xs text-gray-400 flex items-center justify-between">
            <span>Current Size:</span>
            <span className="text-purple-400">
              {selectedSize.width}px × {selectedSize.height}px
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="bg-gray-900/50 rounded-xl border border-white/5">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium text-gray-300">AI Image Generator</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-400">
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
              <div className="flex space-x-1 mb-2 bg-gray-900/30 p-0.5 rounded-lg w-fit">
                <button
                  onClick={() => setPromptMode('enhanced')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    promptMode === 'enhanced'
                      ? 'bg-purple-600/20 text-purple-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Enhanced
                </button>
                <button
                  onClick={() => setPromptMode('direct')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    promptMode === 'direct'
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
                      handleGenerate();
                    }
                  }}
                  placeholder={
                    promptMode === 'direct'
                      ? "Enter your detailed prompt..."
                      : "Describe your image idea..."
                  }
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-white/5 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
                {promptMode === 'direct' && (
                  <div className="mt-2 text-xs text-gray-400">
                    Direct mode: Your prompt will be used exactly as written to generate 4 variations (Original, Anime, Digital Art, and Realistic).
                  </div>
                )}
                {promptMode === 'enhanced' && (
                  <div className="mt-2 text-xs text-gray-400">
                    Enhanced mode: Your prompt will be enhanced and generate 2 variations (Original and Anime style).
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-t border-white/5 bg-black/20">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <ImageIcon className="w-4 h-4" />
                  <span>4 Variations</span>
                </div>
                <div className="h-4 w-px bg-gray-700" />
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Settings2 className="w-4 h-4" />
                  <span>Custom Size</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleGenerate()}
                  disabled={loading || !prompt.trim()}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    loading || !prompt.trim()
                      ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-400 hover:from-purple-600/30 hover:to-blue-600/30'
                  }`}
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Wand2 className="w-4 h-4" />
                  )}
                  <span>{loading ? 'Generating...' : `Generate ${promptMode === 'enhanced' ? 'Variations' : 'Image'}`}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-48">
          <SizeControl />
        </div>
      </div>

      {/* Results Grid with Original Prompt */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {images.length > 0 ? (
          images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`group relative aspect-square rounded-2xl overflow-hidden backdrop-blur-sm border-2 transition-all duration-300 ${
                selectedVariation === index 
                  ? 'border-purple-500 ring-2 ring-purple-500/50 scale-105' 
                  : 'border-white/5 hover:border-white/20'
              }`}
              onClick={() => {
                setSelectedVariation(index);
                saveSelectedImage(image);
              }}
            >
              <div className="absolute top-3 left-3 z-10 flex gap-2">
                <span className="px-2 py-1 text-xs rounded-full bg-black/50 backdrop-blur-sm text-white border border-white/10">
                  {image.label}
                </span>
                {selectedVariation === index && (
                  <span className="px-2 py-1 text-xs rounded-full bg-purple-500/50 backdrop-blur-sm text-white border border-purple-300/20">
                    Selected
                  </span>
                )}
              </div>
              <img
                src={image.url}
                alt={prompt}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="relative group/prompt mb-3">
                    <p className="text-sm text-gray-300 line-clamp-2">
                      {prompt}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyPrompt(prompt, index);
                      }}
                      className="absolute -right-2 -top-2 p-2 rounded-full bg-black/50 opacity-0 group-hover/prompt:opacity-100 transition-opacity"
                    >
                      {copiedIndex === index ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400 hover:text-white" />
                      )}
                    </button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadImage(image.url, prompt);
                    }}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white text-sm flex items-center justify-center space-x-2 hover:bg-white/20"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div 
            className="col-span-full h-96 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-center">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-xl rounded-full" />
                <ImageIcon className="w-20 h-20 mx-auto mb-4 text-gray-400 relative" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-gray-400"
              >
                Your variations will appear here
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-sm text-gray-500 mt-2"
              >
                We'll generate 4 unique interpretations with different styles
              </motion.p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Selection Action Button */}
      {selectedVariation !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <button
            onClick={() => {
              // Handle selection - you can save to history, regenerate with this style, etc.
              const selected = images[selectedVariation];
              console.log('Selected variation:', selected);
            }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
          >
            Use Selected Style
          </button>
        </motion.div>
      )}
    </div>
  );
} 
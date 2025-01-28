import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Image {
  id: string;
  url: string;
  prompt: string;
  style?: string;
  width: number;
  height: number;
  isFavorite: boolean;
  createdAt: Date;
  label?: string;
}

interface ImageStore {
  images: Image[];
  addImages: (newImages: Image[]) => void;
  setImages: (images: Image[]) => void;
  deleteImage: (id: string) => void;
  toggleFavorite: (id: string) => void;
  lastUpdated: number;
}

export const useGeneratedImages = create<ImageStore>()(
  persist(
    (set) => ({
      images: [],
      lastUpdated: Date.now(),
      addImages: (newImages) => set((state) => ({ 
        images: [...newImages, ...state.images],
        lastUpdated: Date.now()
      })),
      setImages: (images) => set({ 
        images,
        lastUpdated: Date.now()
      }),
      deleteImage: (id) => set((state) => ({ 
        images: state.images.filter(img => img.id !== id),
        lastUpdated: Date.now()
      })),
      toggleFavorite: (id) => set((state) => ({
        images: state.images.map(img =>
          img.id === id ? { ...img, isFavorite: !img.isFavorite } : img
        ),
        lastUpdated: Date.now()
      })),
    }),
    {
      name: 'image-storage',
    }
  )
);

// Removed duplicate interfaces and fixed missing lastUpdated property
export const useImageStore = create<ImageStore>((set) => ({
  images: [],
  lastUpdated: Date.now(),
  addImages: (newImages) => set((state) => ({ 
    images: [...newImages, ...state.images],
    lastUpdated: Date.now()
  })),
  setImages: (images) => set({ 
    images,
    lastUpdated: Date.now()
  }),
  deleteImage: (id) => set((state) => ({ 
    images: state.images.filter(img => img.id !== id),
    lastUpdated: Date.now()
  })),
  toggleFavorite: (id) => set((state) => ({
    images: state.images.map(img =>
      img.id === id ? { ...img, isFavorite: !img.isFavorite } : img
    ),
    lastUpdated: Date.now()
  })),
}));
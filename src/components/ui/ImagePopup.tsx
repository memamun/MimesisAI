"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';

interface ImagePopupProps {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ImagePopup({ imageUrl, isOpen, onClose }: ImagePopupProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative max-w-[90vw] max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 z-10"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="relative rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt="Generated image"
              width={1024}
              height={768}
              className="object-contain"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 
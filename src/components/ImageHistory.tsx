"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Download, RefreshCw, Trash2, Clock, Filter } from 'lucide-react';
import { Button } from './ui/Button';

interface HistoryImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
  isFavorite: boolean;
}

export function ImageHistory() {
  const [history, setHistory] = useState<HistoryImage[]>([]);
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');

  useEffect(() => {
    const savedHistory = localStorage.getItem('imageHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const toggleFavorite = (id: string) => {
    const updatedHistory = history.map(img => 
      img.id === id ? { ...img, isFavorite: !img.isFavorite } : img
    );
    setHistory(updatedHistory);
    localStorage.setItem('imageHistory', JSON.stringify(updatedHistory));
  };

  const deleteImage = (id: string) => {
    const updatedHistory = history.filter(img => img.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('imageHistory', JSON.stringify(updatedHistory));
  };

  const filteredHistory = filter === 'all' 
    ? history 
    : history.filter(img => img.isFavorite);

  return (
    <div className="mt-24">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Clock className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
            Creation History
          </h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl ${
              filter === 'all' 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0' 
                : 'border-gray-700'
            }`}
          >
            All
          </Button>
          <Button
            variant="outline"
            onClick={() => setFilter('favorites')}
            className={`px-4 py-2 rounded-xl ${
              filter === 'favorites' 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0' 
                : 'border-gray-700'
            }`}
          >
            Favorites
          </Button>
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <AnimatePresence>
          {filteredHistory.map((image) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-gray-800/50"
            >
              <img
                src={image.url}
                alt={image.prompt}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-sm text-gray-300 line-clamp-2 mb-4">
                    {image.prompt}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleFavorite(image.id)}
                        className={`p-2 rounded-full ${
                          image.isFavorite 
                            ? 'bg-yellow-500/20 text-yellow-400' 
                            : 'bg-gray-800/50 text-gray-400 hover:text-yellow-400'
                        }`}
                      >
                        <Star className="w-4 h-4" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => window.open(image.url, '_blank')}
                        className="p-2 rounded-full bg-gray-800/50 text-gray-400 hover:text-white"
                      >
                        <Download className="w-4 h-4" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full bg-gray-800/50 text-gray-400 hover:text-white"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </motion.button>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteImage(image.id)}
                      className="p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
} 
"use client";

import { motion } from 'framer-motion';
import { Brain, ArrowRight, Sparkles, Code, Palette, Zap } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Creation",
    description: "Transform text into stunning visuals instantly"
  },
  {
    icon: Code,
    title: "Advanced Controls",
    description: "Fine-tune every aspect of your generation"
  },
  {
    icon: Palette,
    title: "Style Variety",
    description: "Choose from multiple artistic styles"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get results in seconds, not minutes"
  }
];

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-blue-500/5 to-transparent" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="container mx-auto px-4 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center px-4 py-1.5 mb-8 text-sm border border-purple-500/30 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm"
          >
            <Brain className="w-4 h-4 mr-2 text-purple-400" />
            Next-Generation AI Image Creation
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Bring Your Imagination to Life
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            MimesisAI transforms your ideas into stunning visuals using advanced artificial intelligence. Create unique, professional-quality images in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/create">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium flex items-center group shadow-lg shadow-purple-500/25"
              >
                Start Creating
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>
            <Link href="/explore">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl border border-white/10 hover:bg-white/5 text-gray-300 font-medium backdrop-blur-sm"
              >
                Explore Gallery
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm"
            >
              <feature.icon className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 
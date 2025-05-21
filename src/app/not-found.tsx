"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Brain, Home, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

// Generate a seed function to create deterministic "random" values
const seededRandom = (seed: number) => {
    return () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    };
};

export default function NotFound() {
    const [randomPrompts, setRandomPrompts] = useState<string[]>([]);
    const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
    const [particles, setParticles] = useState<any[]>([]);
    const [isClient, setIsClient] = useState(false);

    // List of creative AI image generation prompts
    const allPrompts = [
        "a lost astronaut wandering in a digital forest",
        "a broken robot trying to fix itself in a neon city",
        "a cosmic brain floating in outer space",
        "a door opening to multiple dimensions",
        "a glitched pixel landscape with binary rain",
        "a melting computer in a surreal desert",
        "a cybernetic phoenix rising from digital ashes",
        "a quantum computer in a crystal cave",
        "a neural network visualized as a cosmic web",
        "a holographic map leading nowhere",
        "404 spelled out in binary code constellations",
        "a labyrinth of broken hyperlinks"
    ];

    // Client-side only setup
    useEffect(() => {
        setIsClient(true);

        // Generate particles on the client side only
        const random = seededRandom(404); // Use a consistent seed
        const newParticles = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            width: (random() * 3 + 1).toFixed(2),
            height: (random() * 3 + 1).toFixed(2),
            top: (random() * 100).toFixed(2),
            left: (random() * 100).toFixed(2),
            duration: (random() * 5 + 5).toFixed(2),
            delay: (random() * 5).toFixed(2)
        }));
        setParticles(newParticles);

        // Select random prompts
        const shuffled = [...allPrompts].sort(() => 0.5 - Math.random());
        setRandomPrompts(shuffled.slice(0, 5));
    }, []);

    // Cycle through prompts every 4 seconds
    useEffect(() => {
        if (randomPrompts.length === 0) return;

        const interval = setInterval(() => {
            setCurrentPromptIndex((prevIndex) => (prevIndex + 1) % randomPrompts.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [randomPrompts]);

    const currentPrompt = randomPrompts[currentPromptIndex] || allPrompts[0];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-[#10002B]" />

            {/* Floating particles - only render on client side */}
            {isClient && (
                <div className="absolute inset-0">
                    {particles.map((particle) => (
                        <motion.div
                            key={particle.id}
                            className="absolute bg-white rounded-full opacity-30"
                            style={{
                                width: `${particle.width}px`,
                                height: `${particle.height}px`,
                                top: `${particle.top}%`,
                                left: `${particle.left}%`,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0.2, 0.8, 0.2],
                            }}
                            transition={{
                                duration: parseFloat(particle.duration),
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: parseFloat(particle.delay),
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="z-10 max-w-3xl w-full text-center relative">
                {/* Animated brain icon */}
                <motion.div
                    className="flex justify-center mb-6"
                    animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-md opacity-70"></div>
                        <Brain className="w-24 h-24 text-white relative" />
                    </div>
                </motion.div>

                {/* 404 text with gradient */}
                <motion.h1
                    className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    404
                </motion.h1>

                {/* Error message */}
                <motion.h2
                    className="text-3xl md:text-4xl font-semibold text-white mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    Page Not Found
                </motion.h2>

                {/* Creative description */}
                <motion.p
                    className="text-xl text-gray-300 mb-8 max-w-xl mx-auto"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                >
                    Looks like we've ventured into uncharted digital territory.
                </motion.p>

                {/* AI Prompt Box */}
                <motion.div
                    className="bg-black/30 p-6 rounded-xl border border-purple-500/20 mb-10 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                >
                    <p className="text-gray-400 mb-2 text-sm">Try an image prompt instead:</p>
                    <motion.div
                        key={currentPrompt}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="text-lg text-purple-300 font-medium"
                    >
                        "{currentPrompt}"
                    </motion.div>
                </motion.div>

                {/* Back to home button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-medium shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                    >
                        <Home className="mr-2 h-5 w-5" />
                        Return to Homepage
                    </Link>
                </motion.div>
            </div>

            {/* Footer with additional navigation */}
            <motion.div
                className="absolute bottom-8 w-full max-w-md mx-auto flex justify-center space-x-8 text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1 }}
            >
                <Link href="/blog" className="hover:text-purple-400 transition-colors">Blog</Link>
                <Link href="/community" className="hover:text-purple-400 transition-colors">Community</Link>
                <Link href="/contact" className="hover:text-purple-400 transition-colors">Help</Link>
            </motion.div>
        </div>
    );
} 
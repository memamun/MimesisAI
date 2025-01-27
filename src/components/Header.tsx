"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ui/ThemeToggle';
import { motion } from 'framer-motion';
import { Brain, Menu, X } from 'lucide-react';
import { useState } from 'react';

const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'Create', href: '/create' },
  { name: 'Explore', href: '/explore' },
  { name: 'Community', href: '/community' },
  { name: 'Pricing', href: '/pricing' },
];

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/0 backdrop-blur-xl border-b border-white/5" />
      <nav className="container mx-auto px-4 py-4 relative">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
              <Brain className="w-8 h-8 text-white relative" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              MimesisAI
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                {pathname === item.href && (
                  <motion.div
                    layoutId="bubble"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full"
                    style={{ borderRadius: 9999 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className={pathname === item.href ? 'text-white' : 'text-gray-300 hover:text-white'}>
                  {item.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-800/50"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-lg mt-2 py-4 rounded-2xl border border-white/10 shadow-xl"
          >
            {NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-6 py-3 text-sm ${
                  pathname === item.href
                    ? 'text-white bg-gradient-to-r from-purple-500/20 to-blue-500/20'
                    : 'text-gray-300 hover:bg-gray-800/50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </nav>
    </header>
  );
} 
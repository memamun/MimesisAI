"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ThemeToggle } from './ui/ThemeToggle';
import { motion } from 'framer-motion';
import { Brain, Menu, X, Image as ImageIcon, Wand2 } from 'lucide-react';
import { useState } from 'react';

const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'Create', href: '/#generate', scroll: true },
  { name: 'Gallery', href: '/gallery' }
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (href: string, scroll?: boolean) => {
    if (scroll) {
      // If we're not on the home page, first navigate to home
      if (pathname !== '/') {
        router.push('/');
        // Wait for navigation to complete before scrolling
        setTimeout(() => {
          const element = document.getElementById('generate');
          if (element) {
            const headerOffset = 100; // Adjust this value based on your header height + desired padding
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 100);
      } else {
        // If we're already on home page, just scroll
        const element = document.getElementById('generate');
        if (element) {
          const headerOffset = 100; // Adjust this value based on your header height + desired padding
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    } else {
      router.push(href);
    }
    setIsMenuOpen(false);
  };

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
              <button
                key={item.href}
                onClick={() => handleNavigation(item.href, item.scroll)}
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
                <span className={`inline-flex items-center gap-1.5 ${
                  pathname === item.href ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}>
                  {item.icon}
                  {item.name}
                </span>
              </button>
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
              <button
                key={item.href}
                onClick={() => handleNavigation(item.href, item.scroll)}
                className={`flex items-center gap-2 px-6 py-3 text-sm w-full text-left ${
                  pathname === item.href
                    ? 'text-white bg-gradient-to-r from-purple-500/20 to-blue-500/20'
                    : 'text-gray-300 hover:bg-gray-800/50'
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </motion.div>
        )}
      </nav>
    </header>
  );
} 
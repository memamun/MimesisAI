"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Menu, X } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

const NAVIGATION = [
  { 
    name: 'Home', 
    href: '/',
    icon: <Brain className="w-4 h-4" />
  },
  { 
    name: 'Create', 
    href: '/#generate', 
    scroll: true,
    icon: <Brain className="w-4 h-4" />
  },
  { 
    name: 'Gallery', 
    href: '/gallery',
    icon: <Brain className="w-4 h-4" />
  }
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToElement = useCallback((elementId: string, headerOffset: number = 100) => {
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const scrollY = window.scrollY || window.pageYOffset;
        const offsetPosition = elementPosition + scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        console.log(`Scrolled to #${elementId}, position:`, offsetPosition);
      } else {
        console.log(`#${elementId} element not found`);
      }
    }, 150); // Increased timeout for more reliability
  }, []);

  const handleNavigation = useCallback((href: string, scroll?: boolean) => {
    console.log('handleNavigation called:', { href, scroll, pathname });
    
    if (scroll) {
      console.log('Scroll navigation');
      const elementId = href.split('#')[1];
      
      // If we're not on the home page, first navigate to home
      if (pathname !== '/') {
        console.log('Not on home page, navigating to /');
        router.push('/');
        // Wait for navigation to complete before scrolling
        setTimeout(() => {
          scrollToElement(elementId);
        }, 300); // Give more time for the page to load
      } else {
        console.log('Already on home page, attempting to scroll');
        scrollToElement(elementId);
      }
    } else {
      console.log('Direct navigation to:', href);
      router.push(href);
    }
    
    setIsMenuOpen(false);
  }, [pathname, router, scrollToElement]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1332]/70 via-[#1a1332]/50 to-[#1a1332]/30 backdrop-blur-xl border-b border-white/10" />
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

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-lg mt-2 py-4 rounded-2xl border border-white/10 shadow-xl md:hidden"
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
        </AnimatePresence>
      </nav>
    </header>
  );
} 
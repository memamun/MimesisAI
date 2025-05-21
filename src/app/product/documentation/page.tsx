// src/app/product/documentation/page.tsx
"use client";

import Link from 'next/link';
import { useState } from 'react';
import {
  Book,
  Code,
  FileText,
  Grid,
  Terminal,
  Settings,
  Layout,
  Search,
  ChevronRight,
  ExternalLink,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

interface DocSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  articles: {
    title: string;
    path: string;
  }[];
}

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const docSections: DocSection[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Everything you need to know to get up and running with MimesisAI.',
      icon: <Layout className="w-6 h-6 text-purple-400" />,
      articles: [
        { title: 'Quick Start Guide', path: '/product/documentation/getting-started/quick-start' },
        { title: 'Account Setup', path: '/product/documentation/getting-started/account-setup' },
        { title: 'Generating Your First Image', path: '/product/documentation/getting-started/first-image' },
        { title: 'Understanding the Interface', path: '/product/documentation/getting-started/interface' },
      ]
    },
    {
      id: 'prompting',
      title: 'Prompting Guide',
      description: 'Learn the art of crafting effective prompts for superior AI image generation results.',
      icon: <FileText className="w-6 h-6 text-purple-400" />,
      articles: [
        { title: 'Prompt Basics', path: '/product/documentation/prompting/basics' },
        { title: 'Advanced Techniques', path: '/product/documentation/prompting/advanced' },
        { title: 'Style Modifiers', path: '/product/documentation/prompting/style-modifiers' },
        { title: 'Common Mistakes', path: '/product/documentation/prompting/mistakes' },
      ]
    },
    {
      id: 'api',
      title: 'API Reference',
      description: 'Comprehensive documentation for integrating MimesisAI into your applications.',
      icon: <Code className="w-6 h-6 text-purple-400" />,
      articles: [
        { title: 'Authentication', path: '/product/documentation/api/authentication' },
        { title: 'Image Generation Endpoints', path: '/product/documentation/api/endpoints' },
        { title: 'Response Formats', path: '/product/documentation/api/responses' },
        { title: 'Rate Limits', path: '/product/documentation/api/rate-limits' },
      ]
    },
    {
      id: 'customization',
      title: 'Customization',
      description: 'Tailor the image generation process to your specific needs.',
      icon: <Settings className="w-6 h-6 text-purple-400" />,
      articles: [
        { title: 'Resolution Settings', path: '/product/documentation/customization/resolution' },
        { title: 'Style Presets', path: '/product/documentation/customization/styles' },
        { title: 'Advanced Parameters', path: '/product/documentation/customization/parameters' },
        { title: 'Batch Processing', path: '/product/documentation/customization/batch' },
      ]
    },
    {
      id: 'tutorials',
      title: 'Tutorials',
      description: 'Step-by-step guides for common use cases and workflows.',
      icon: <Book className="w-6 h-6 text-purple-400" />,
      articles: [
        { title: 'Creating Character Portraits', path: '/product/documentation/tutorials/characters' },
        { title: 'Generating Landscapes', path: '/product/documentation/tutorials/landscapes' },
        { title: 'Product Visualization', path: '/product/documentation/tutorials/products' },
        { title: 'Concept Art Workflow', path: '/product/documentation/tutorials/concept-art' },
      ]
    },
    {
      id: 'sdks',
      title: 'SDKs & Libraries',
      description: 'Official client libraries and tools for various programming languages.',
      icon: <Terminal className="w-6 h-6 text-purple-400" />,
      articles: [
        { title: 'JavaScript/TypeScript SDK', path: '/product/documentation/sdks/javascript' },
        { title: 'Python SDK', path: '/product/documentation/sdks/python' },
        { title: 'Ruby Client', path: '/product/documentation/sdks/ruby' },
        { title: 'PHP Integration', path: '/product/documentation/sdks/php' },
      ]
    }
  ];

  // Filter sections based on search query
  const filteredSections = searchQuery
    ? docSections.map(section => ({
      ...section,
      articles: section.articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(section => section.articles.length > 0)
    : docSections;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Documentation
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Learn how to use MimesisAI's image generation tools through guides, tutorials, and API references.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documentation..."
              className="w-full bg-black/30 border border-white/10 rounded-lg px-5 py-4 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Documentation Sections */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {filteredSections.map((section) => (
            <div
              key={section.id}
              className="bg-black/20 border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="flex items-start mb-4">
                <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg p-3 mr-4">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                  <p className="text-gray-400 mt-1">{section.description}</p>
                </div>
              </div>

              <ul className="space-y-2 mt-4">
                {section.articles.map((article, idx) => (
                  <li key={idx}>
                    <Link
                      href={article.path}
                      className="flex items-center text-gray-300 hover:text-purple-400 py-1.5 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 mr-2 text-purple-400" />
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href={`/product/documentation/${section.id}`}
                className="inline-flex items-center mt-4 text-purple-400 hover:text-purple-300 font-medium"
              >
                View all {section.title} docs
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-8 border border-purple-500/10">
          <h2 className="text-2xl font-semibold text-white mb-6">Additional Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/product/api-access"
              className="bg-black/30 rounded-lg p-5 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="flex items-center">
                <Code className="w-5 h-5 text-purple-400 mr-3" />
                <h3 className="text-lg font-medium text-white">API Reference</h3>
              </div>
              <p className="text-gray-400 mt-2">
                Complete API documentation for developers.
              </p>
              <div className="flex items-center mt-3 text-purple-400">
                <span className="text-sm">Learn more</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </div>
            </Link>
            <Link
              href="https://github.com/mimesisai/examples"
              className="bg-black/30 rounded-lg p-5 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="flex items-center">
                <Grid className="w-5 h-5 text-purple-400 mr-3" />
                <h3 className="text-lg font-medium text-white">Example Projects</h3>
              </div>
              <p className="text-gray-400 mt-2">
                Ready-to-use sample code and projects.
              </p>
              <div className="flex items-center mt-3 text-purple-400">
                <span className="text-sm">View on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </div>
            </Link>
            <Link
              href="/contact"
              className="bg-black/30 rounded-lg p-5 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="flex items-center">
                <HelpCircle className="w-5 h-5 text-purple-400 mr-3" />
                <h3 className="text-lg font-medium text-white">Support</h3>
              </div>
              <p className="text-gray-400 mt-2">
                Get help from our technical support team.
              </p>
              <div className="flex items-center mt-3 text-purple-400">
                <span className="text-sm">Contact support</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

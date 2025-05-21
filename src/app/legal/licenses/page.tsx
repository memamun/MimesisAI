// src/app/legal/licenses/page.tsx
"use client";

import { useState } from 'react';
import { FileText, Search, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface License {
  name: string;
  version: string;
  license: string;
  description: string;
  link: string;
}

export default function LicensesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedLicense, setExpandedLicense] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend' | 'ai'>('frontend');

  const toggleLicense = (name: string) => {
    setExpandedLicense(expandedLicense === name ? null : name);
  };

  // Sample frontend libraries
  const frontendLibraries: License[] = [
    {
      name: 'React',
      version: '18.2.0',
      license: 'MIT',
      description: 'A JavaScript library for building user interfaces.',
      link: 'https://github.com/facebook/react/blob/main/LICENSE'
    },
    {
      name: 'Next.js',
      version: '13.4.7',
      license: 'MIT',
      description: 'The React Framework for Production.',
      link: 'https://github.com/vercel/next.js/blob/canary/license.md'
    },
    {
      name: 'TailwindCSS',
      version: '3.3.2',
      license: 'MIT',
      description: 'A utility-first CSS framework for rapidly building custom designs.',
      link: 'https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE'
    },
    {
      name: 'Lucide React',
      version: '0.259.0',
      license: 'ISC',
      description: 'Beautiful & consistent icons for React.',
      link: 'https://github.com/lucide-icons/lucide/blob/main/LICENSE'
    },
    {
      name: 'React Query',
      version: '4.29.7',
      license: 'MIT',
      description: 'Hooks for fetching, caching and updating asynchronous data in React.',
      link: 'https://github.com/tannerlinsley/react-query/blob/master/LICENSE'
    },
    {
      name: 'Framer Motion',
      version: '10.12.16',
      license: 'MIT',
      description: 'An open source motion library for React.',
      link: 'https://github.com/framer/motion/blob/main/LICENSE.md'
    },
    {
      name: 'React Hook Form',
      version: '7.44.3',
      license: 'MIT',
      description: 'Performant, flexible and extensible forms with easy-to-use validation.',
      link: 'https://github.com/react-hook-form/react-hook-form/blob/master/LICENSE'
    }
  ];

  // Sample backend libraries
  const backendLibraries: License[] = [
    {
      name: 'Node.js',
      version: '18.16.0',
      license: 'MIT',
      description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
      link: 'https://github.com/nodejs/node/blob/master/LICENSE'
    },
    {
      name: 'Express',
      version: '4.18.2',
      license: 'MIT',
      description: 'Fast, unopinionated, minimalist web framework for Node.js.',
      link: 'https://github.com/expressjs/express/blob/master/LICENSE'
    },
    {
      name: 'Prisma',
      version: '4.15.0',
      license: 'Apache-2.0',
      description: 'Next-generation ORM for Node.js and TypeScript.',
      link: 'https://github.com/prisma/prisma/blob/main/LICENSE'
    },
    {
      name: 'PostgreSQL',
      version: '14.8',
      license: 'PostgreSQL License',
      description: 'Advanced open source relational database.',
      link: 'https://www.postgresql.org/about/licence/'
    },
    {
      name: 'NextAuth.js',
      version: '4.22.1',
      license: 'ISC',
      description: 'Authentication for Next.js.',
      link: 'https://github.com/nextauthjs/next-auth/blob/main/LICENSE'
    },
    {
      name: 'AWS SDK for JavaScript',
      version: '3.360.0',
      license: 'Apache-2.0',
      description: 'AWS SDK for JavaScript in the browser and Node.js.',
      link: 'https://github.com/aws/aws-sdk-js-v3/blob/main/LICENSE'
    }
  ];

  // Sample AI libraries
  const aiLibraries: License[] = [
    {
      name: 'PyTorch',
      version: '2.0.1',
      license: 'BSD-3-Clause',
      description: 'An open source machine learning framework.',
      link: 'https://github.com/pytorch/pytorch/blob/master/LICENSE'
    },
    {
      name: 'TensorFlow',
      version: '2.12.0',
      license: 'Apache-2.0',
      description: 'An end-to-end open source platform for machine learning.',
      link: 'https://github.com/tensorflow/tensorflow/blob/master/LICENSE'
    },
    {
      name: 'Hugging Face Transformers',
      version: '4.30.2',
      license: 'Apache-2.0',
      description: 'State-of-the-art Machine Learning for PyTorch, TensorFlow, and JAX.',
      link: 'https://github.com/huggingface/transformers/blob/main/LICENSE'
    },
    {
      name: 'Diffusers',
      version: '0.17.1',
      license: 'Apache-2.0',
      description: 'State-of-the-art diffusion models for image and audio generation.',
      link: 'https://github.com/huggingface/diffusers/blob/main/LICENSE'
    },
    {
      name: 'ONNX Runtime',
      version: '1.15.1',
      license: 'MIT',
      description: 'Cross-platform, high performance ML inferencing and training accelerator.',
      link: 'https://github.com/microsoft/onnxruntime/blob/main/LICENSE'
    },
    {
      name: 'NumPy',
      version: '1.24.3',
      license: 'BSD-3-Clause',
      description: 'The fundamental package for scientific computing with Python.',
      link: 'https://github.com/numpy/numpy/blob/main/LICENSE.txt'
    }
  ];

  const getActiveLibraries = () => {
    switch (activeTab) {
      case 'frontend':
        return frontendLibraries;
      case 'backend':
        return backendLibraries;
      case 'ai':
        return aiLibraries;
      default:
        return frontendLibraries;
    }
  };

  const filteredLibraries = getActiveLibraries().filter(lib =>
    lib.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lib.license.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Open Source Licenses
        </h1>
        <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          MimesisAI stands on the shoulders of giants. We're grateful to the open source community for the incredible tools that power our platform.
        </p>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search libraries or licenses..."
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-white/10 mb-8">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('frontend')}
              className={`px-6 py-3 font-medium ${activeTab === 'frontend'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              Frontend
            </button>
            <button
              onClick={() => setActiveTab('backend')}
              className={`px-6 py-3 font-medium ${activeTab === 'backend'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              Backend
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-6 py-3 font-medium ${activeTab === 'ai'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              AI & ML
            </button>
          </div>
        </div>

        {/* License List */}
        <div className="space-y-4">
          {filteredLibraries.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              No libraries found matching your search criteria.
            </div>
          ) : (
            filteredLibraries.map((lib) => (
              <div
                key={lib.name}
                className="bg-black/20 border border-white/10 rounded-lg overflow-hidden"
              >
                <div
                  className="px-6 py-4 flex items-center justify-between cursor-pointer"
                  onClick={() => toggleLicense(lib.name)}
                >
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-purple-400 mr-3" />
                    <div>
                      <h3 className="text-lg font-medium text-white">{lib.name}</h3>
                      <div className="flex items-center text-sm">
                        <span className="text-gray-400 mr-3">v{lib.version}</span>
                        <span className="bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded text-xs">
                          {lib.license}
                        </span>
                      </div>
                    </div>
                  </div>
                  {expandedLicense === lib.name ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>

                {expandedLicense === lib.name && (
                  <div className="px-6 py-4 border-t border-white/10 bg-black/10">
                    <p className="text-gray-300 mb-4">{lib.description}</p>
                    <a
                      href={lib.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      View License <ExternalLink className="ml-1 w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* License Information */}
        <div className="mt-12 p-6 bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl border border-purple-500/10">
          <h2 className="text-2xl font-semibold text-white mb-4">About Open Source Licensing</h2>
          <p className="text-gray-300 mb-4">
            MimesisAI is built using various open source technologies, each with its own license terms. We're committed to compliance with all license requirements and supporting the open source community.
          </p>
          <p className="text-gray-300">
            This page lists the major open source components we use. For any questions about our use of open source software or compliance with license terms, please contact us at <a href="mailto:legal@mimesisai.com" className="text-purple-400 hover:underline">legal@mimesisai.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

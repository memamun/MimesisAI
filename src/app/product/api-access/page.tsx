// src/app/product/api-access/page.tsx
"use client";

import Link from 'next/link';
import { useState } from 'react';
import {
  Code,
  Server,
  Key,
  Shield,
  Zap,
  Copy,
  Check,
  FileJson,
  ImageIcon,
  Command,
  MessageSquare,
  ChevronRight,
  Menu
} from 'lucide-react';

const CodeBlock = ({ language, code }: { language: string; code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // Check if clipboard API is available
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback method for browsers that don't support clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = code;
        textArea.style.position = 'fixed';  // Avoid scrolling to bottom
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          const successful = document.execCommand('copy');
          if (successful) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } else {
            console.error('Failed to copy text');
          }
        } catch (err) {
          console.error('Error during copy operation:', err);
        }

        document.body.removeChild(textArea);
      }
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-6">
      <div className="flex items-center justify-between px-4 py-2 bg-black/30 border-b border-white/5">
        <div className="flex items-center space-x-2">
          <Code className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-mono text-gray-400">{language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-gray-300 font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default function ApiAccessPage() {
  const [activeTab, setActiveTab] = useState<'authentication' | 'images' | 'examples'>('authentication');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to change tab and close mobile menu
  const handleTabChange = (tab: 'authentication' | 'images' | 'examples') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            MimesisAI API Access
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-sm md:text-base">
            Integrate our powerful AI image generation capabilities directly into your applications.
            Our RESTful API provides programmatic access to all the features available in the MimesisAI platform.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-4 gap-6">
          {/* Mobile Menu Toggle */}
          <div className="block lg:hidden mb-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-full flex items-center justify-between bg-black/20 border border-white/10 rounded-xl p-4"
            >
              <span className="flex items-center text-white">
                <FileJson className="w-4 h-4 mr-2 text-purple-400" />
                {activeTab === 'authentication' && 'Authentication'}
                {activeTab === 'images' && 'Image Generation'}
                {activeTab === 'examples' && 'Code Examples'}
              </span>
              <Menu className="w-5 h-5 text-gray-400" />
            </button>

            {/* Mobile Navigation Dropdown */}
            {mobileMenuOpen && (
              <div className="mt-2 bg-black/30 border border-white/10 rounded-xl p-2 z-50 relative">
                <button
                  onClick={() => handleTabChange('authentication')}
                  className={`w-full px-4 py-3 rounded-lg text-left mb-1 flex items-center ${activeTab === 'authentication'
                    ? 'bg-purple-600/20 text-purple-400'
                    : 'text-gray-400 hover:bg-black/30 hover:text-white'
                    }`}
                >
                  <Key className="w-4 h-4 mr-2" />
                  Authentication
                </button>
                <button
                  onClick={() => handleTabChange('images')}
                  className={`w-full px-4 py-3 rounded-lg text-left mb-1 flex items-center ${activeTab === 'images'
                    ? 'bg-purple-600/20 text-purple-400'
                    : 'text-gray-400 hover:bg-black/30 hover:text-white'
                    }`}
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Image Generation
                </button>
                <button
                  onClick={() => handleTabChange('examples')}
                  className={`w-full px-4 py-3 rounded-lg text-left mb-1 flex items-center ${activeTab === 'examples'
                    ? 'bg-purple-600/20 text-purple-400'
                    : 'text-gray-400 hover:bg-black/30 hover:text-white'
                    }`}
                >
                  <Command className="w-4 h-4 mr-2" />
                  Code Examples
                </button>

                <div className="mt-2 pt-2 border-t border-white/10">
                  <Link
                    href="/product/pricing"
                    className="block w-full px-4 py-3 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-lg text-white hover:from-purple-600/40 hover:to-blue-600/40 transition-colors text-center"
                  >
                    View API Pricing
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Sidebar Navigation */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-black/20 border border-white/10 rounded-xl sticky top-24">
              <div className="p-4 border-b border-white/10">
                <h3 className="font-medium text-white flex items-center">
                  <FileJson className="w-4 h-4 mr-2 text-purple-400" />
                  API Documentation
                </h3>
              </div>
              <nav className="p-2">
                <button
                  onClick={() => setActiveTab('authentication')}
                  className={`w-full px-4 py-2 rounded-lg text-left mb-1 flex items-center ${activeTab === 'authentication'
                    ? 'bg-purple-600/20 text-purple-400'
                    : 'text-gray-400 hover:bg-black/30 hover:text-white'
                    }`}
                >
                  <Key className="w-4 h-4 mr-2" />
                  Authentication
                </button>
                <button
                  onClick={() => setActiveTab('images')}
                  className={`w-full px-4 py-2 rounded-lg text-left mb-1 flex items-center ${activeTab === 'images'
                    ? 'bg-purple-600/20 text-purple-400'
                    : 'text-gray-400 hover:bg-black/30 hover:text-white'
                    }`}
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Image Generation
                </button>
                <button
                  onClick={() => setActiveTab('examples')}
                  className={`w-full px-4 py-2 rounded-lg text-left mb-1 flex items-center ${activeTab === 'examples'
                    ? 'bg-purple-600/20 text-purple-400'
                    : 'text-gray-400 hover:bg-black/30 hover:text-white'
                    }`}
                >
                  <Command className="w-4 h-4 mr-2" />
                  Code Examples
                </button>
              </nav>

              <div className="p-4 border-t border-white/10">
                <Link
                  href="/product/pricing"
                  className="block w-full px-4 py-2 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-lg text-white hover:from-purple-600/40 hover:to-blue-600/40 transition-colors text-center"
                >
                  View API Pricing
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'authentication' && (
              <div>
                <div className="bg-black/20 border border-white/10 rounded-xl p-4 md:p-6 mb-6 md:mb-8">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-white flex items-center">
                    <Key className="w-5 h-5 mr-2 text-purple-400" />
                    Authentication
                  </h2>
                  <p className="text-gray-300 mb-6 text-sm md:text-base">
                    All API requests require authentication using an API key. You can obtain your API key from the Dashboard.
                    Your API key carries many privileges, so be sure to keep it secure. Don't share your secret API key in publicly
                    accessible areas such as GitHub, client-side code, etc.
                  </p>

                  <h3 className="text-lg md:text-xl font-medium mb-4 text-white">API Key Authentication</h3>
                  <p className="text-gray-300 mb-4 text-sm md:text-base">
                    Authentication to the API is performed via Bearer Authentication. Provide your API key as the bearer token value.
                  </p>

                  <CodeBlock
                    language="bash"
                    code={`curl -X POST https://api.mimesisai.com/v1/images/generations \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "prompt": "A futuristic city with flying cars and neon lights",
    "style": "digital",
    "n": 1,
    "size": "1024x1024"
  }'`}
                  />

                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 flex flex-col md:flex-row md:items-start">
                    <Shield className="w-5 h-5 text-purple-400 mr-3 mt-1 mb-3 md:mb-0 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-white mb-1">Security Best Practices</h4>
                      <ul className="text-gray-300 space-y-2 list-disc pl-5 text-sm md:text-base">
                        <li>Store API keys in environment variables, not in your codebase</li>
                        <li>Use HTTPS for all API requests</li>
                        <li>Restrict API key permissions to only what's necessary</li>
                        <li>Rotate your API keys periodically</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-black/20 border border-white/10 rounded-xl p-4 md:p-6">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-white flex items-center">
                    <Server className="w-5 h-5 mr-2 text-purple-400" />
                    Rate Limits
                  </h2>
                  <p className="text-gray-300 mb-6 text-sm md:text-base">
                    Rate limits vary based on your subscription tier. All rate limits are applied on a per-minute basis.
                  </p>

                  <div className="overflow-x-auto -mx-4 px-4 pb-1">
                    <table className="w-full text-left border-collapse min-w-[640px]">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="py-3 px-2 md:px-4 text-purple-400 font-medium text-xs md:text-sm">Plan</th>
                          <th className="py-3 px-2 md:px-4 text-purple-400 font-medium text-xs md:text-sm">Requests per Minute</th>
                          <th className="py-3 px-2 md:px-4 text-purple-400 font-medium text-xs md:text-sm">Monthly Quota</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-300 text-xs md:text-sm">
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-2 md:px-4">Basic</td>
                          <td className="py-3 px-2 md:px-4">10</td>
                          <td className="py-3 px-2 md:px-4">1,000 images</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-2 md:px-4">Professional</td>
                          <td className="py-3 px-2 md:px-4">60</td>
                          <td className="py-3 px-2 md:px-4">10,000 images</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-2 md:px-4">Enterprise</td>
                          <td className="py-3 px-2 md:px-4">Custom</td>
                          <td className="py-3 px-2 md:px-4">Custom</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 text-gray-300 text-sm md:text-base">
                    <p>Rate limit headers are included in all API responses:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li><code className="text-purple-400">X-RateLimit-Limit</code>: Maximum number of requests allowed per minute</li>
                      <li><code className="text-purple-400">X-RateLimit-Remaining</code>: Number of requests remaining in the current window</li>
                      <li><code className="text-purple-400">X-RateLimit-Reset</code>: Time at which the current rate limit window resets (UTC epoch seconds)</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'images' && (
              <div>
                <div className="bg-black/20 border border-white/10 rounded-xl p-4 md:p-6 mb-6 md:mb-8">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-white flex items-center">
                    <ImageIcon className="w-5 h-5 mr-2 text-purple-400" />
                    Image Generation
                  </h2>
                  <p className="text-gray-300 mb-6 text-sm md:text-base">
                    Generate images from text prompts using our advanced AI models.
                    You can customize the style, size, and number of images per request.
                  </p>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg md:text-xl font-medium mb-4 text-white">Create Images</h3>
                      <p className="text-gray-300 mb-4 text-sm md:text-base">
                        Generate images based on a text prompt.
                      </p>

                      <div className="mb-4 p-4 bg-black/30 rounded-lg border border-white/5">
                        <div className="flex items-center mb-2">
                          <span className="px-2 py-1 bg-purple-600/20 text-purple-400 rounded text-xs font-medium mr-2">POST</span>
                          <code className="text-gray-300 text-sm">v1/images/generations</code>
                        </div>
                      </div>

                      <h4 className="text-base md:text-lg font-medium mb-3 text-white">Request Parameters</h4>
                      <div className="overflow-x-auto -mx-4 px-4 pb-1">
                        <table className="w-full text-left border-collapse min-w-[640px]">
                          <thead>
                            <tr className="border-b border-white/10">
                              <th className="py-3 px-2 md:px-4 text-purple-400 font-medium text-xs md:text-sm">Parameter</th>
                              <th className="py-3 px-2 md:px-4 text-purple-400 font-medium text-xs md:text-sm">Type</th>
                              <th className="py-3 px-2 md:px-4 text-purple-400 font-medium text-xs md:text-sm">Required</th>
                              <th className="py-3 px-2 md:px-4 text-purple-400 font-medium text-xs md:text-sm">Description</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-300 text-xs md:text-sm">
                            <tr className="border-b border-white/5">
                              <td className="py-3 px-2 md:px-4 font-mono text-sm">prompt</td>
                              <td className="py-3 px-2 md:px-4">string</td>
                              <td className="py-3 px-2 md:px-4">Yes</td>
                              <td className="py-3 px-2 md:px-4">The text prompt to generate images from</td>
                            </tr>
                            <tr className="border-b border-white/5">
                              <td className="py-3 px-2 md:px-4 font-mono text-sm">style</td>
                              <td className="py-3 px-2 md:px-4">string</td>
                              <td className="py-3 px-2 md:px-4">No</td>
                              <td className="py-3 px-2 md:px-4">One of: "realistic", "digital", "cinematic", "anime"</td>
                            </tr>
                            <tr className="border-b border-white/5">
                              <td className="py-3 px-2 md:px-4 font-mono text-sm">n</td>
                              <td className="py-3 px-2 md:px-4">integer</td>
                              <td className="py-3 px-2 md:px-4">No</td>
                              <td className="py-3 px-2 md:px-4">Number of images to generate. Default: 1, Max: 4</td>
                            </tr>
                            <tr className="border-b border-white/5">
                              <td className="py-3 px-2 md:px-4 font-mono text-sm">size</td>
                              <td className="py-3 px-2 md:px-4">string</td>
                              <td className="py-3 px-2 md:px-4">No</td>
                              <td className="py-3 px-2 md:px-4">"512x512", "768x1024", "1024x1024", etc.</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-2 md:px-4 font-mono text-sm">seed</td>
                              <td className="py-3 px-2 md:px-4">integer</td>
                              <td className="py-3 px-2 md:px-4">No</td>
                              <td className="py-3 px-2 md:px-4">Random seed for reproducible results</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h4 className="text-lg font-medium mb-3 text-white">Example Request</h4>
                      <CodeBlock
                        language="json"
                        code={`{
  "prompt": "A serene Japanese garden with cherry blossoms and a small pond",
  "style": "realistic",
  "n": 2,
  "size": "1024x1024"
}`}
                      />

                      <h4 className="text-lg font-medium mb-3 text-white">Example Response</h4>
                      <CodeBlock
                        language="json"
                        code={`{
  "created": 1686979453,
  "data": [
    {
      "url": "https://api.mimesisai.com/images/generated/abcd1234.png",
      "prompt": "A serene Japanese garden with cherry blossoms and a small pond",
      "style": "realistic",
      "width": 1024,
      "height": 1024
    },
    {
      "url": "https://api.mimesisai.com/images/generated/efgh5678.png",
      "prompt": "A serene Japanese garden with cherry blossoms and a small pond",
      "style": "realistic",
      "width": 1024,
      "height": 1024
    }
  ]
}`}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-black/20 border border-white/10 rounded-xl p-6">
                  <h2 className="text-2xl font-semibold mb-4 text-white flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-purple-400" />
                    Error Handling
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Our API uses standard HTTP response codes to indicate success or failure of an API request.
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="py-3 px-4 text-purple-400 font-medium">Code</th>
                          <th className="py-3 px-4 text-purple-400 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-300">
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-4">200 - OK</td>
                          <td className="py-3 px-4">The request was successful</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-4">400 - Bad Request</td>
                          <td className="py-3 px-4">Invalid parameters were provided</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-4">401 - Unauthorized</td>
                          <td className="py-3 px-4">Authentication failed or API key is missing</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-4">403 - Forbidden</td>
                          <td className="py-3 px-4">The API key doesn't have permission to perform the request</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-4">429 - Too Many Requests</td>
                          <td className="py-3 px-4">Rate limit exceeded</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">500 - Server Error</td>
                          <td className="py-3 px-4">Something went wrong on our end</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 className="text-lg font-medium my-4 text-white">Example Error Response</h4>
                  <CodeBlock
                    language="json"
                    code={`{
  "error": {
    "code": "invalid_prompt",
    "message": "The prompt contains content that violates our terms of service",
    "param": "prompt",
    "type": "invalid_request_error"
  }
}`}
                  />
                </div>
              </div>
            )}

            {activeTab === 'examples' && (
              <div>
                <div className="bg-black/20 border border-white/10 rounded-xl p-6 mb-8">
                  <h2 className="text-2xl font-semibold mb-4 text-white flex items-center">
                    <Command className="w-5 h-5 mr-2 text-purple-400" />
                    Code Examples
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Integration examples in various programming languages to help you get started with our API.
                  </p>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-medium mb-4 text-white">Node.js</h3>
                      <CodeBlock
                        language="javascript"
                        code={`const fetch = require('node-fetch');

async function generateImage(prompt) {
  const response = await fetch('https://api.mimesisai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${process.env.MIMESISAI_API_KEY}\`
    },
    body: JSON.stringify({
      prompt,
      style: 'digital',
      n: 1,
      size: '1024x1024'
    })
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(\`API Error: \${data.error.message}\`);
  }
  
  return data;
}

// Example usage
generateImage('A cosmic landscape with nebulas and stars')
  .then(result => console.log(result))
  .catch(error => console.error(error));`}
                      />
                    </div>

                    <div>
                      <h3 className="text-xl font-medium mb-4 text-white">Python</h3>
                      <CodeBlock
                        language="python"
                        code={`import os
import requests

def generate_image(prompt):
    api_key = os.environ.get("MIMESISAI_API_KEY")
    if not api_key:
        raise ValueError("MIMESISAI_API_KEY environment variable not set")

    response = requests.post(
        "https://api.mimesisai.com/v1/images/generations",
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}"
        },
        json={
            "prompt": prompt,
            "style": "realistic",
            "n": 1,
            "size": "1024x1024"
        }
    )

    if response.status_code != 200:
        error = response.json().get("error", {})
        message = error.get("message", "Unknown error")
        raise Exception(f"API Error: {message}")

    return response.json()

# Example usage
if __name__ == "__main__":
    try:
        result = generate_image("A futuristic cityscape at sunset with flying vehicles")
        print(f"Image URL: {result['data'][0]['url']}")
    except Exception as e:
        print(f"Error: {e}")`}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-6 border border-purple-500/10">
                  <h3 className="text-xl font-semibold mb-4 text-white">Need Help Integrating?</h3>
                  <p className="text-gray-300 mb-4">
                    Our team is available to help you implement MimesisAI into your application.
                    For technical guidance or custom integration assistance, reach out to our developer support team.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/contact"
                      className="px-4 py-2 bg-purple-600/30 hover:bg-purple-600/40 border border-purple-500/30 rounded-lg text-white font-medium transition-colors flex items-center"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact Developer Support
                    </Link>
                    <a
                      href="#"
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors flex items-center"
                    >
                      <ChevronRight className="w-4 h-4 mr-2" />
                      Visit GitHub Samples
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

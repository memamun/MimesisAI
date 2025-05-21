import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-gradient-to-b from-transparent to-black/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent mb-4">
              Product
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-purple-400 transition-colors cursor-pointer"><Link href="/">Features</Link></li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer"><Link href="/product/api-access">API Access</Link></li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer"><Link href="/product/pricing">Pricing</Link></li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer"><Link href="/product/documentation">Documentation</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent mb-4">
              Company
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-purple-400 transition-colors cursor-pointer"><Link href="/about">About</Link></li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer"><Link href="/blog">Blog</Link></li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer"><Link href="/careers">Careers</Link></li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer"><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent mb-4">
              Legal
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-purple-400 transition-colors cursor-pointer"><Link href="/legal/privacy">Privacy</Link></li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer"><Link href="/legal/terms">Terms</Link></li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer"><Link href="/legal/security">Security</Link></li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer"><Link href="/legal/licenses">Licenses</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent mb-4">
              Community
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-purple-400 transition-colors cursor-pointer"><Link href="/community/discord">Discord</Link></li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer"><Link href="/community/twitter">Twitter</Link></li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer"><Link href="/community/github">GitHub</Link></li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer"><Link href="/community/youtube">YouTube</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 text-center">
          <p className="text-gray-400">© 2024 MimesisAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 
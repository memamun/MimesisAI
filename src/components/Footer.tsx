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
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Features</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">API Access</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Pricing</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Documentation</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent mb-4">
              Company
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-purple-400 transition-colors cursor-pointer">About</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Blog</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Careers</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent mb-4">
              Legal
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Privacy</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Terms</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Security</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Licenses</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent mb-4">
              Community
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Discord</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Twitter</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">GitHub</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">YouTube</li>
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
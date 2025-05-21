// src/app/legal/security/page.tsx
import Link from 'next/link';
import { Shield, Check, Lock, UserCheck, Database, AlertTriangle, Mail } from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Security
        </h1>
        <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          Your trust is our priority. Learn how we protect your data and ensure the security of our platform.
        </p>

        {/* Security Overview */}
        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-8 border border-purple-500/10 mb-12">
          <div className="flex items-center mb-6">
            <Shield className="w-10 h-10 text-purple-400 mr-4" />
            <h2 className="text-2xl font-semibold text-white">Our Security Commitment</h2>
          </div>
          <p className="text-gray-300 mb-6">
            At MimesisAI, we implement industry-leading security practices to protect your data and creative works.
            Our security infrastructure is designed with multiple layers of protection, and we continuously monitor and
            improve our systems to address emerging threats.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="bg-purple-500/20 p-2 rounded-full mr-3 mt-1">
                <Check className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <h3 className="text-white font-medium">SOC 2 Compliant</h3>
                <p className="text-gray-400 text-sm">Independent verification of our security controls</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-purple-500/20 p-2 rounded-full mr-3 mt-1">
                <Check className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <h3 className="text-white font-medium">GDPR Compliant</h3>
                <p className="text-gray-400 text-sm">Meeting the highest standards for data protection</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-purple-500/20 p-2 rounded-full mr-3 mt-1">
                <Check className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <h3 className="text-white font-medium">Penetration Tested</h3>
                <p className="text-gray-400 text-sm">Regular security assessments by third-party experts</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-purple-500/20 p-2 rounded-full mr-3 mt-1">
                <Check className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <h3 className="text-white font-medium">Bug Bounty Program</h3>
                <p className="text-gray-400 text-sm">Rewarding responsible disclosure of security issues</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">Security Features</h2>
        <div className="space-y-6 mb-12">
          <div className="bg-black/20 border border-white/10 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Lock className="w-8 h-8 text-purple-400 mr-4" />
              <h3 className="text-xl font-semibold text-white">Data Encryption</h3>
            </div>
            <p className="text-gray-300 mb-4">
              We encrypt your data both in transit and at rest. All communications with our servers use TLS 1.3,
              and we implement strong encryption for all stored data and generated images.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>End-to-end encryption for all API communications</li>
              <li>AES-256 encryption for stored data</li>
              <li>Secure key management with regular rotation</li>
              <li>HTTPS enforcement across all services</li>
            </ul>
          </div>

          <div className="bg-black/20 border border-white/10 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <UserCheck className="w-8 h-8 text-purple-400 mr-4" />
              <h3 className="text-xl font-semibold text-white">Account Security</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Protect your account with advanced authentication options and careful access controls.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Multi-factor authentication (MFA)</li>
              <li>Single sign-on (SSO) for enterprise users</li>
              <li>Password policies with breach detection</li>
              <li>Session management with automatic timeouts</li>
              <li>Detailed access logs and suspicious activity detection</li>
            </ul>
          </div>

          <div className="bg-black/20 border border-white/10 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Database className="w-8 h-8 text-purple-400 mr-4" />
              <h3 className="text-xl font-semibold text-white">Infrastructure Security</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Our infrastructure is built with security as a foundational principle, using industry best practices.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Cloud infrastructure with automatic security patching</li>
              <li>Network isolation and strict firewall rules</li>
              <li>Regular vulnerability scanning and remediation</li>
              <li>Redundant systems with failover capabilities</li>
              <li>Real-time monitoring and alerting</li>
            </ul>
          </div>
        </div>

        {/* Security Practices */}
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">Our Security Practices</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-black/20 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Security Reviews</h3>
            <p className="text-gray-300">
              All code changes undergo security reviews before deployment. We conduct regular security assessments and
              penetration tests by independent third parties to identify and address potential vulnerabilities.
            </p>
          </div>
          <div className="bg-black/20 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Employee Access</h3>
            <p className="text-gray-300">
              We follow the principle of least privilege for all employee access. Multi-factor authentication is required
              for all staff, and access to production systems is strictly controlled and audited.
            </p>
          </div>
          <div className="bg-black/20 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Incident Response</h3>
            <p className="text-gray-300">
              We have a comprehensive incident response plan to quickly address security events. Our security team
              is available 24/7 to respond to alerts and potential issues.
            </p>
          </div>
          <div className="bg-black/20 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Vendor Assessment</h3>
            <p className="text-gray-300">
              All third-party vendors undergo thorough security assessments before we integrate with their services,
              ensuring our entire supply chain maintains high security standards.
            </p>
          </div>
        </div>

        {/* Report Security Issues */}
        <div className="bg-black/20 border border-red-500/20 rounded-xl p-8 mb-12">
          <div className="flex items-start">
            <AlertTriangle className="w-10 h-10 text-red-400 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Report Security Issues</h3>
              <p className="text-gray-300 mb-4">
                If you believe you've found a security vulnerability in our service, we encourage you to notify us. We welcome working
                with security researchers to improve the security of our platform.
              </p>
              <Link
                href="mailto:security@mimesisai.com"
                className="inline-flex items-center px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-white transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                Report a Vulnerability
              </Link>
            </div>
          </div>
        </div>

        {/* Security FAQs */}
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">Security FAQs</h2>
        <div className="space-y-6 mb-12">
          <div className="bg-black/20 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-2">How do you protect my generated images?</h3>
            <p className="text-gray-300">
              All images generated through our platform are encrypted in storage. Access controls ensure that only you
              and users you explicitly share with can view your images. You can also permanently delete any images you
              create at any time.
            </p>
          </div>
          <div className="bg-black/20 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-2">Do you store my API credentials securely?</h3>
            <p className="text-gray-300">
              Yes, we use industry-standard practices for securing API keys. API keys are hashed before storage and
              are never displayed in full after creation. We recommend rotating your API keys periodically for enhanced security.
            </p>
          </div>
          <div className="bg-black/20 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-2">What happens if there's a data breach?</h3>
            <p className="text-gray-300">
              In the unlikely event of a data breach, we will promptly notify affected users in accordance with applicable
              laws and regulations. We will provide information about the breach and steps you can take to protect yourself.
            </p>
          </div>
        </div>

        {/* Certifications */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-8">Our Certifications</h2>
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-white">SOC2</span>
              </div>
              <span className="text-gray-400 text-sm">SOC 2 Type II</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-white">GDPR</span>
              </div>
              <span className="text-gray-400 text-sm">GDPR Compliant</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-white">ISO</span>
              </div>
              <span className="text-gray-400 text-sm">ISO 27001</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-white">CCPA</span>
              </div>
              <span className="text-gray-400 text-sm">CCPA Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

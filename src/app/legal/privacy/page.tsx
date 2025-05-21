// src/app/legal/privacy/page.tsx
export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Privacy Policy
        </h1>

        <div className="text-gray-300 space-y-8">
          <p>
            Last updated: May 1, 2024
          </p>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
            <p className="mb-4">
              MimesisAI ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
            <p>
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
            <p className="mb-4">
              We collect information that you provide directly to us, information we obtain automatically when you use our services, and information from third-party sources.
            </p>

            <h3 className="text-xl font-semibold text-white mb-2">Personal Information</h3>
            <p className="mb-4">
              When you create an account, subscribe to our services, or contact us, we may collect the following types of information:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Name, email address, and contact information</li>
              <li>Billing information and payment details</li>
              <li>Account credentials</li>
              <li>User preferences and settings</li>
              <li>Communication between you and MimesisAI</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-2">Usage Information</h3>
            <p className="mb-4">
              We automatically collect certain information about how you interact with our services:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Log data (IP address, browser type, pages visited, time spent)</li>
              <li>Device information (hardware model, operating system)</li>
              <li>Location information</li>
              <li>Images and prompts you generate using our service</li>
              <li>User activity and interaction with our platform</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Providing, maintaining, and improving our services</li>
              <li>Processing transactions and managing your account</li>
              <li>Sending you technical notices, updates, and support messages</li>
              <li>Responding to your comments and questions</li>
              <li>Developing new products and features</li>
              <li>Training and improving our AI models</li>
              <li>Monitoring and analyzing trends and usage</li>
              <li>Protecting against and preventing fraud and abuse</li>
              <li>Complying with legal obligations</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Sharing of Information</h2>
            <p className="mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Service providers who perform services on our behalf</li>
              <li>Partners with whom we offer co-branded services or engage in joint marketing activities</li>
              <li>Third parties in connection with a merger, sale, or acquisition</li>
              <li>Public authorities when required by law or to protect our rights</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Your Rights and Choices</h2>
            <p className="mb-4">
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access, correct, or delete your personal information</li>
              <li>Object to our use of your information</li>
              <li>Restrict certain processing of your information</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact us at privacy@mimesisai.com.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security of your personal information. However, no security system is impenetrable, and we cannot guarantee the security of our systems 100%. We also cannot guarantee that information you supply will not be intercepted while being transmitted to us over the Internet.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 13 (or the applicable age of digital consent in your country). We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">International Data Transfers</h2>
            <p>
              Your information may be transferred to, and processed in, countries other than the country in which you reside. These countries may have data protection laws that are different from the laws of your country. We have taken appropriate safeguards to require that your personal information will remain protected in accordance with this Privacy Policy.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date. You are advised to review this privacy policy periodically for any changes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our data practices, please contact us at:
            </p>
            <div className="mt-4 p-6 bg-black/20 rounded-xl border border-white/10">
              <p>MimesisAI</p>
              <p>123 AI Innovation Center</p>
              <p>San Francisco, CA 94103</p>
              <p>United States</p>
              <p className="mt-4">Email: privacy@mimesisai.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

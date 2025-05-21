// src/app/about/page.tsx
export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          About MimesisAI
        </h1>

        <div className="mt-12 space-y-16">
          {/* Story Section */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white">Our Story</h2>
            <div className="prose prose-invert max-w-none text-gray-300 space-y-4">
              <p>
                MimesisAI was founded in 2023 by a team of AI researchers and artists who shared a vision of making generative AI
                technology accessible to everyone. The name "Mimesis" comes from the ancient Greek concept of artistic representation
                and imitation of the natural world—a perfect reflection of our AI-powered creative tools.
              </p>
              <p>
                What started as a research project to explore the boundaries of AI and human creativity quickly evolved into
                a powerful platform that empowers users to transform their ideas into stunning visual art in seconds.
              </p>
              <p>
                Today, MimesisAI serves thousands of creators worldwide, from professional artists looking to augment their workflows
                to hobbyists discovering the joy of AI-assisted creation for the first time.
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white">Our Mission</h2>
            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/10 rounded-xl p-6">
              <p className="text-xl text-center text-white">
                To democratize creative expression by building AI tools that amplify human creativity,
                eliminating technical barriers and making professional-quality content creation accessible to everyone.
              </p>
            </div>
          </section>

          {/* Values Section */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-black/30 rounded-xl p-6 border border-white/5">
                <h3 className="text-xl font-medium mb-3 text-purple-400">Creativity Without Limits</h3>
                <p className="text-gray-300">
                  We believe everyone has creative potential. Our tools are designed to remove technical barriers and unleash your imagination.
                </p>
              </div>
              <div className="bg-black/30 rounded-xl p-6 border border-white/5">
                <h3 className="text-xl font-medium mb-3 text-purple-400">Human-AI Collaboration</h3>
                <p className="text-gray-300">
                  We see AI as a partner in the creative process, not a replacement. Our technology is designed to enhance human creativity, not substitute it.
                </p>
              </div>
              <div className="bg-black/30 rounded-xl p-6 border border-white/5">
                <h3 className="text-xl font-medium mb-3 text-purple-400">Ethical Innovation</h3>
                <p className="text-gray-300">
                  We develop our AI models responsibly, with careful consideration of fairness, transparency, and social impact.
                </p>
              </div>
              <div className="bg-black/30 rounded-xl p-6 border border-white/5">
                <h3 className="text-xl font-medium mb-3 text-purple-400">Accessibility</h3>
                <p className="text-gray-300">
                  We're committed to making advanced AI creative tools accessible to everyone, regardless of technical background.
                </p>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white">Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-4xl">👨‍💻</span>
                </div>
                <h3 className="text-xl font-medium text-white">Alex Chen</h3>
                <p className="text-purple-400 mb-2">CEO & Co-founder</p>
                <p className="text-gray-400 text-sm">
                  Former AI researcher at DeepMind with a passion for creative technologies
                </p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-4xl">👩‍🎨</span>
                </div>
                <h3 className="text-xl font-medium text-white">Maria Rodriguez</h3>
                <p className="text-purple-400 mb-2">CTO & Co-founder</p>
                <p className="text-gray-400 text-sm">
                  Computer vision specialist with a background in computational art
                </p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-4xl">👨‍🔬</span>
                </div>
                <h3 className="text-xl font-medium text-white">David Park</h3>
                <p className="text-purple-400 mb-2">Lead Engineer</p>
                <p className="text-gray-400 text-sm">
                  Specializes in building scalable AI systems and user-friendly interfaces
                </p>
              </div>
            </div>
            <div className="text-center mt-10">
              <p className="text-gray-300">
                Our team has grown to include 25+ talented individuals across engineering, design, and research,
                all united by the vision of empowering creativity through AI.
              </p>
            </div>
          </section>

          {/* Contact/Join Us Section */}
          <section className="text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white">Join Our Journey</h2>
            <p className="text-gray-300 mb-6">
              We're always looking for passionate people to join our team and help shape the future of AI-assisted creativity.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/careers" className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity">
                View Open Positions
              </a>
              <a href="/contact" className="px-6 py-3 bg-white/10 border border-white/10 rounded-lg text-white font-medium hover:bg-white/20 transition-colors">
                Contact Us
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

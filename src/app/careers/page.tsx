"use client";

// src/app/careers/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Building,
  Users,
  Clock,
  ChevronRight,
  DollarSign,
  Globe,
  Coffee,
  Award,
  Heart,
  BookOpen,
  Zap,
  Briefcase,
  Code,
  Palette,
  Terminal,
  Database,
  TrendingUp,
  MessageCircle,
  AlertTriangle
} from 'lucide-react';

interface JobPosition {
  id: string;
  title: string;
  department: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  location: string;
  remote: boolean;
  description: string;
  requirements: string[];
  responsibilities: string[];
  featured?: boolean;
  status: 'open' | 'closed';
}

const positions: JobPosition[] = [
  {
    id: 'eng-001',
    title: 'Senior Machine Learning Engineer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'San Francisco, CA',
    remote: true,
    description: 'We are looking for an experienced Machine Learning Engineer to help us build the next generation of AI image generation models. You will work closely with our research team to implement state-of-the-art papers and improve our existing models.',
    requirements: [
      '5+ years of experience in machine learning engineering',
      'Strong Python skills and experience with PyTorch or TensorFlow',
      'Experience with generative models (GANs, Diffusion Models, etc.)',
      'Background in computer vision and image processing',
      'Experience deploying ML models to production environments',
      'MS or PhD in Computer Science, Machine Learning, or related field'
    ],
    responsibilities: [
      'Implement state-of-the-art image generation algorithms',
      'Train, optimize, and fine-tune large language and vision models',
      'Work on improving the speed and efficiency of our inference pipelines',
      'Collaborate with the product team to integrate AI models into our products',
      'Stay current with the latest research in AI and generative models'
    ],
    featured: true,
    status: 'closed'
  },
  {
    id: 'eng-002',
    title: 'Frontend Engineer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'San Francisco, CA',
    remote: true,
    description: 'As a Frontend Engineer at MimesisAI, you will be responsible for building intuitive and responsive user interfaces for our AI-powered creative tools. You will work closely with design and product teams to create the best possible user experience.',
    requirements: [
      '3+ years of experience in frontend development',
      'Strong JavaScript/TypeScript skills',
      'Experience with React and Next.js',
      'Understanding of modern CSS and responsive design',
      'Experience with REST APIs and state management',
      'Bonus: Experience with Three.js or WebGL'
    ],
    responsibilities: [
      'Build and maintain responsive web applications',
      'Collaborate with designers to implement UI/UX improvements',
      'Write clean, maintainable, and performant code',
      'Optimize applications for maximum speed and scalability',
      'Participate in code reviews and ensure code quality'
    ],
    status: 'closed'
  },
  {
    id: 'eng-003',
    title: 'Backend Engineer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'San Francisco, CA',
    remote: true,
    description: 'We are seeking a talented Backend Engineer to help build and scale our infrastructure. You will be responsible for designing and implementing APIs, services, and data pipelines that power our AI platform.',
    requirements: [
      '3+ years of experience in backend development',
      'Experience with Node.js, Python, or similar backend technologies',
      'Experience with RESTful API design and implementation',
      'Familiarity with SQL and NoSQL databases',
      'Understanding of microservices architecture',
      'Experience with cloud platforms (AWS, GCP, or Azure)'
    ],
    responsibilities: [
      'Design and implement scalable API services',
      'Create and maintain data pipelines for our ML models',
      'Optimize systems for performance and reliability',
      'Collaborate with the frontend team to ensure seamless integration',
      'Implement authentication, security, and other backend features'
    ],
    status: 'closed'
  },
  {
    id: 'prd-001',
    title: 'Product Manager',
    department: 'Product',
    type: 'Full-time',
    location: 'San Francisco, CA',
    remote: true,
    description: 'As a Product Manager at MimesisAI, you will work with our engineering, design, and business teams to define product strategy and roadmap. You will be the voice of the user and ensure we build features that solve real problems.',
    requirements: [
      '3+ years of experience in product management',
      'Experience with AI products or creative tools',
      'Strong analytical and problem-solving skills',
      'Excellent communication and presentation skills',
      'Ability to translate complex technical concepts to non-technical stakeholders',
      'Experience with agile development methodologies'
    ],
    responsibilities: [
      'Define product vision, strategy, and roadmap',
      'Gather and analyze user feedback to inform product decisions',
      'Work with engineers and designers to create and ship new features',
      'Analyze product metrics and optimize user experiences',
      'Stay current with market trends and competitor offerings'
    ],
    status: 'closed'
  },
  {
    id: 'des-001',
    title: 'UX/UI Designer',
    department: 'Design',
    type: 'Full-time',
    location: 'San Francisco, CA',
    remote: true,
    description: 'We are looking for a creative and passionate UX/UI Designer to help create intuitive and beautiful interfaces for our AI-powered creative tools. You will be responsible for the visual design and user experience of our products.',
    requirements: [
      '3+ years of experience in UX/UI design',
      'Strong portfolio demonstrating UI design skills',
      'Experience with Figma or similar design tools',
      'Understanding of user-centered design principles',
      'Ability to create wireframes, prototypes, and high-fidelity designs',
      'Experience working with developers to implement designs'
    ],
    responsibilities: [
      'Create intuitive and visually appealing interfaces',
      'Design user flows, wireframes, and prototypes',
      'Conduct user research and usability testing',
      'Collaborate with developers to ensure design implementation',
      'Maintain and evolve our design system',
      'Stay current with design trends and best practices'
    ],
    status: 'closed'
  }
];

const JobCard = ({ job }: { job: JobPosition }) => {
  return (
    <div className={`bg-black/20 border ${job.featured ? 'border-purple-500' : 'border-white/10'} rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10`}>
      {job.featured && (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-medium px-3 py-1.5 flex items-center justify-center">
          <Award className="w-3.5 h-3.5 mr-1.5" />
          Featured Position
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{job.title}</h3>
            <div className="flex items-center text-gray-400 text-sm">
              <Building className="w-4 h-4 mr-1.5" />
              <span className="mr-3">{job.department}</span>
              <Clock className="w-4 h-4 mr-1.5" />
              <span>{job.type}</span>
            </div>
          </div>
          <div>
            {getDepartmentIcon(job.department)}
          </div>
        </div>

        <div className="flex items-center mt-4 mb-3">
          <div className="flex items-center text-purple-400 mr-4">
            <MapPin className="w-4 h-4 mr-1.5" />
            <span>{job.location}</span>
          </div>
          {job.remote && (
            <div className="flex items-center text-green-400">
              <Globe className="w-4 h-4 mr-1.5" />
              <span>Remote Available</span>
            </div>
          )}
        </div>

        {job.status === 'closed' && (
          <div className="mb-4 bg-gray-800/50 text-gray-400 px-3 py-1.5 rounded-md inline-flex items-center">
            <AlertTriangle className="w-4 h-4 mr-1.5" />
            Position Currently Closed
          </div>
        )}

        <p className="text-gray-300 mb-6">{job.description}</p>

        {job.status === 'closed' ? (
          <div className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-700/50 text-gray-400 cursor-not-allowed">
            Position Closed
          </div>
        ) : (
          <Link
            href={`/careers/${job.id}`}
            className={`inline-flex items-center px-4 py-2 rounded-lg ${job.featured
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90'
              : 'bg-white/10 text-white hover:bg-white/20'
              } transition-colors`}
          >
            View Details
            <ChevronRight className="ml-1 w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
};

const getDepartmentIcon = (department: string) => {
  switch (department) {
    case 'Engineering':
      return <Code className="w-10 h-10 p-2 bg-purple-600/20 rounded-lg text-purple-400" />;
    case 'Product':
      return <Zap className="w-10 h-10 p-2 bg-blue-600/20 rounded-lg text-blue-400" />;
    case 'Design':
      return <Palette className="w-10 h-10 p-2 bg-pink-600/20 rounded-lg text-pink-400" />;
    case 'Marketing':
      return <TrendingUp className="w-10 h-10 p-2 bg-green-600/20 rounded-lg text-green-400" />;
    case 'Operations':
      return <Briefcase className="w-10 h-10 p-2 bg-orange-600/20 rounded-lg text-orange-400" />;
    default:
      return <Users className="w-10 h-10 p-2 bg-purple-600/20 rounded-lg text-purple-400" />;
  }
};

const BenefitCard = ({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string
}) => {
  return (
    <div className="bg-black/20 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:border-purple-500/30">
      <div className="w-12 h-12 mb-4 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

export default function CareersPage() {
  const featuredPositions = positions.filter(job => job.featured);
  const otherPositions = positions.filter(job => !job.featured);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Help us build the future of creative AI technology. We're looking for talented individuals who are passionate about pushing the boundaries of what's possible.
          </p>
          <Link
            href="#open-positions"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
          >
            View Open Positions
            <ChevronRight className="ml-1 w-5 h-5" />
          </Link>
        </div>

        {/* Team Photo Section */}
        <div className="relative w-full h-96 rounded-2xl overflow-hidden mb-16">
          <Image
            src="/images/team-photo.jpg"
            alt="MimesisAI Team"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-center text-white">
              <Users className="w-5 h-5 mr-2" />
              <span className="font-medium">Our team of engineers, designers, and researchers</span>
            </div>
          </div>
        </div>

        {/* Culture Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">Our Culture</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-300 mb-6">
                At MimesisAI, we're building a company that values innovation, collaboration, and inclusivity. We believe that the best ideas come from diverse teams working together to solve complex problems.
              </p>
              <p className="text-gray-300 mb-6">
                We're committed to creating an environment where everyone can do their best work, grow professionally, and make a meaningful impact on the future of AI creativity.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-purple-600/20 p-2 rounded-full mr-4 mt-1">
                    <Zap className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Innovation First</h3>
                    <p className="text-gray-300">We encourage creative thinking and bold experimentation. Our team is constantly pushing the boundaries of what's possible with AI.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-600/20 p-2 rounded-full mr-4 mt-1">
                    <Users className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Collaborative Environment</h3>
                    <p className="text-gray-300">We work across disciplines, combining expertise in AI, design, and product development to build exceptional experiences.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-600/20 p-2 rounded-full mr-4 mt-1">
                    <Heart className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Diverse & Inclusive</h3>
                    <p className="text-gray-300">We actively work to create a diverse team and an inclusive workplace where everyone feels welcome and valued.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden aspect-square">
                <Image
                  src="/images/collaboration.jpg"
                  alt="Team collaboration"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="rounded-xl overflow-hidden aspect-square">
                <Image
                  src="/images/office.jpg"
                  alt="Office space"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="rounded-xl overflow-hidden aspect-square">
                <Image
                  src="/images/meeting.jpg"
                  alt="Team meeting"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="rounded-xl overflow-hidden aspect-square">
                <Image
                  src="/images/team-event.jpg"
                  alt="Team event"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">Benefits & Perks</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <BenefitCard
              icon={<Heart className="w-6 h-6 text-purple-400" />}
              title="Comprehensive Healthcare"
              description="We offer top-tier medical, dental, and vision coverage for you and your dependents."
            />
            <BenefitCard
              icon={<DollarSign className="w-6 h-6 text-purple-400" />}
              title="Competitive Compensation"
              description="We offer competitive salaries, equity packages, and performance bonuses."
            />
            <BenefitCard
              icon={<Clock className="w-6 h-6 text-purple-400" />}
              title="Flexible Work Hours"
              description="Work when you're most productive with our flexible schedule policy."
            />
            <BenefitCard
              icon={<Globe className="w-6 h-6 text-purple-400" />}
              title="Remote-Friendly"
              description="Work from anywhere with our distributed-first approach and home office stipend."
            />
            <BenefitCard
              icon={<Coffee className="w-6 h-6 text-purple-400" />}
              title="Unlimited PTO"
              description="Take the time you need to rest, recharge, and bring your best self to work."
            />
            <BenefitCard
              icon={<BookOpen className="w-6 h-6 text-purple-400" />}
              title="Learning & Development"
              description="Annual professional development budget for conferences, courses, and books."
            />
          </div>
        </div>

        {/* Open Positions Section */}
        <div id="open-positions">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">Open Positions</h2>

          <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-4 mb-8 text-center">
            <p className="text-gray-300">
              <span className="text-blue-400 font-medium">Note:</span> All positions are currently closed but are displayed for reference. Please check back later for new openings or <Link href="/contact" className="text-blue-400 hover:underline">contact us</Link> directly.
            </p>
          </div>

          {featuredPositions.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-medium text-white mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-purple-400" />
                Featured Positions
              </h3>
              <div className="grid md:grid-cols-1 gap-6">
                {featuredPositions.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>
          )}

          {otherPositions.length > 0 ? (
            <div className="grid md:grid-cols-1 gap-6">
              {otherPositions.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="bg-black/20 border border-white/10 rounded-xl p-8 text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No Other Positions</h3>
              <p className="text-gray-300 max-w-2xl mx-auto mb-6">
                We don't have any additional positions at the moment, but we're always interested in connecting with talented individuals.
              </p>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-8 border border-purple-500/10 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Don't see the right position?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals to join our team. If you're passionate about AI and creativity, we'd love to hear from you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
          >
            <MessageCircle className="mr-2 w-5 h-5" />
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}

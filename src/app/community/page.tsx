"use client";

import Link from 'next/link';
import Image from 'next/image';
import {
    MessageSquare,
    Twitter,
    Github,
    Youtube,
    Users,
    Calendar,
    Globe,
    ArrowRight,
    Image as ImageIcon,
    Code,
    Heart
} from 'lucide-react';

interface SocialPlatform {
    name: string;
    icon: React.ReactNode;
    description: string;
    url: string;
    color: string;
    members: string;
}

interface CommunityEvent {
    title: string;
    date: string;
    time: string;
    location: string;
    type: 'online' | 'in-person';
    imageUrl: string;
    url: string;
}

interface ShowcaseProject {
    title: string;
    creator: string;
    description: string;
    imageUrl: string;
    url: string;
}

export default function CommunityPage() {
    const socialPlatforms: SocialPlatform[] = [
        {
            name: 'Discord',
            icon: <MessageSquare className="w-8 h-8" />,
            description: 'Join our Discord community to chat with other users, share your creations, and get real-time help.',
            url: 'https://discord.gg/mimesisai',
            color: 'from-indigo-500 to-indigo-700',
            members: '15,000+'
        },
        {
            name: 'Twitter',
            icon: <Twitter className="w-8 h-8" />,
            description: 'Follow us on Twitter for the latest updates, feature announcements, and AI art inspiration.',
            url: 'https://twitter.com/mimesisai',
            color: 'from-blue-400 to-blue-600',
            members: '45,000+'
        },
        {
            name: 'GitHub',
            icon: <Github className="w-8 h-8" />,
            description: 'Explore our open-source projects, contribute to our repositories, and help shape the future of MimesisAI.',
            url: 'https://github.com/mimesisai',
            color: 'from-gray-700 to-gray-900',
            members: '5,000+'
        },
        {
            name: 'YouTube',
            icon: <Youtube className="w-8 h-8" />,
            description: 'Watch tutorials, feature demonstrations, and behind-the-scenes content on our YouTube channel.',
            url: 'https://youtube.com/mimesisai',
            color: 'from-red-500 to-red-700',
            members: '30,000+'
        }
    ];

    const communityEvents: CommunityEvent[] = [
        {
            title: 'MimesisAI Virtual Workshop',
            date: 'June 15, 2024',
            time: '1:00 PM - 3:00 PM EST',
            location: 'Zoom Webinar',
            type: 'online',
            imageUrl: '/images/blog/blog-cover-1.jpg',
            url: '/events/virtual-workshop'
        },
        {
            title: 'AI Art Exhibition',
            date: 'July 8-10, 2024',
            time: '10:00 AM - 6:00 PM',
            location: 'San Francisco Design Center',
            type: 'in-person',
            imageUrl: '/images/blog/blog-cover-2.jpg',
            url: '/events/ai-exhibition'
        },
        {
            title: 'Product Demo & Q&A',
            date: 'May 30, 2024',
            time: '2:00 PM - 3:30 PM EST',
            location: 'YouTube Live',
            type: 'online',
            imageUrl: '/images/blog/blog-cover-3.jpg',
            url: '/events/product-demo'
        }
    ];

    const showcaseProjects: ShowcaseProject[] = [
        {
            title: 'Dreamscape Environments',
            creator: 'Maria Zhang',
            description: 'A collection of surreal landscape scenes created with MimesisAI for an upcoming fantasy game.',
            imageUrl: '/images/blog/blog-cover-1.jpg',
            url: '/showcase/dreamscape'
        },
        {
            title: 'Historical Reimaginings',
            creator: 'Alex Rivera',
            description: 'Modern reinterpretations of historical events and figures using AI image generation.',
            imageUrl: '/images/blog/blog-cover-2.jpg',
            url: '/showcase/historical'
        },
        {
            title: 'Character Design Toolkit',
            creator: 'Jordan Lee',
            description: 'An open-source library of prompts and techniques for consistent character design with MimesisAI.',
            imageUrl: '/images/blog/blog-cover-3.jpg',
            url: '/showcase/character-toolkit'
        }
    ];

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        Join Our Community
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Connect with other MimesisAI users, share your creations, learn from experts, and stay updated on the latest developments.
                    </p>
                </div>

                {/* Social Platforms */}
                <div className="mb-20">
                    <h2 className="text-2xl font-semibold text-white mb-8 flex items-center">
                        <Users className="mr-3 h-6 w-6 text-purple-400" />
                        Connect With Us
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {socialPlatforms.map((platform) => (
                            <a
                                key={platform.name}
                                href={platform.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-black/20 rounded-xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all duration-300 flex flex-col h-full group"
                            >
                                <div className={`bg-gradient-to-r ${platform.color} p-6`}>
                                    <div className="flex items-center">
                                        <div className="bg-white/20 rounded-lg p-3 mr-4 backdrop-blur-sm">
                                            {platform.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-white">{platform.name}</h3>
                                            <p className="text-white/80 text-sm">{platform.members} members</p>
                                        </div>
                                        <div className="ml-auto">
                                            <div className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors">
                                                <ArrowRight className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-gray-300 mb-4">{platform.description}</p>
                                    <span className="text-sm font-medium text-purple-400 group-hover:text-purple-300 transition-colors inline-flex items-center">
                                        Join our {platform.name} community
                                        <ArrowRight className="ml-1 w-4 h-4" />
                                    </span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Upcoming Events */}
                <div className="mb-20">
                    <h2 className="text-2xl font-semibold text-white mb-8 flex items-center">
                        <Calendar className="mr-3 h-6 w-6 text-purple-400" />
                        Upcoming Events
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {communityEvents.map((event) => (
                            <Link
                                key={event.title}
                                href={event.url}
                                className="bg-black/20 rounded-xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all duration-300 flex flex-col h-full group"
                            >
                                <div className="relative aspect-video overflow-hidden">
                                    <Image
                                        src={event.imageUrl}
                                        alt={event.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <span className={`inline-block px-3 py-1 ${event.type === 'online' ? 'bg-blue-600/80' : 'bg-green-600/80'} backdrop-blur-sm text-white text-xs font-medium rounded-full`}>
                                            {event.type === 'online' ? 'Online' : 'In Person'}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 flex-grow flex flex-col">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                                        {event.title}
                                    </h3>

                                    <div className="flex items-start mb-4">
                                        <Calendar className="w-4 h-4 text-purple-400 mt-0.5 mr-2 flex-shrink-0" />
                                        <div>
                                            <p className="text-gray-300">{event.date}</p>
                                            <p className="text-gray-400 text-sm">{event.time}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Globe className="w-4 h-4 text-purple-400 mt-0.5 mr-2 flex-shrink-0" />
                                        <p className="text-gray-300">{event.location}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <Link
                            href="/events"
                            className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                        >
                            View All Events
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* Community Showcase */}
                <div className="mb-20">
                    <h2 className="text-2xl font-semibold text-white mb-8 flex items-center">
                        <ImageIcon className="mr-3 h-6 w-6 text-purple-400" />
                        Community Showcase
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {showcaseProjects.map((project) => (
                            <Link
                                key={project.title}
                                href={project.url}
                                className="bg-black/20 rounded-xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all duration-300 flex flex-col h-full group"
                            >
                                <div className="relative aspect-video overflow-hidden">
                                    <Image
                                        src={project.imageUrl}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                                <div className="p-6 flex-grow flex flex-col">
                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-purple-400 text-sm mb-3">by {project.creator}</p>
                                    <p className="text-gray-300 mb-4">
                                        {project.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <Link
                            href="/showcase"
                            className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                        >
                            View All Showcase Projects
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* Contribution Section */}
                <div className="mb-16">
                    <h2 className="text-2xl font-semibold text-white mb-8 flex items-center">
                        <Code className="mr-3 h-6 w-6 text-purple-400" />
                        Contribute to MimesisAI
                    </h2>

                    <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-8 border border-purple-500/10">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="md:w-2/3">
                                <h3 className="text-xl font-semibold text-white mb-4">Help Shape the Future of AI Image Generation</h3>
                                <p className="text-gray-300 mb-6">
                                    MimesisAI is built with input from our community. Whether you're a developer who can contribute code, a designer with UI/UX insights, or a user with feature suggestions, we welcome your contributions.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="bg-purple-500/20 rounded-full p-2 mr-3">
                                            <Code className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium">Open Source Projects</h4>
                                            <p className="text-gray-400">Contribute to our GitHub repositories and help improve our tools.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="bg-purple-500/20 rounded-full p-2 mr-3">
                                            <MessageSquare className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium">Feedback and Ideas</h4>
                                            <p className="text-gray-400">Share your thoughts on how we can improve MimesisAI.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="bg-purple-500/20 rounded-full p-2 mr-3">
                                            <Heart className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium">Community Support</h4>
                                            <p className="text-gray-400">Help other users and answer questions in our community forums.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <a
                                        href="https://github.com/mimesisai"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg inline-flex items-center hover:opacity-90 transition-opacity"
                                    >
                                        Get Involved
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                            <div className="md:w-1/3 flex-shrink-0">
                                <div className="bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-xl p-6 border border-purple-500/20">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center">
                                            <Github className="w-5 h-5 text-purple-400 mr-2" />
                                            <h4 className="text-white font-medium">GitHub Stats</h4>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-gray-300">Contributors</span>
                                            <span className="text-white font-medium">120+</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-300">Open PRs</span>
                                            <span className="text-white font-medium">27</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-300">Stars</span>
                                            <span className="text-white font-medium">5.2k</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-300">Forks</span>
                                            <span className="text-white font-medium">850</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 
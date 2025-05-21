"use client";

import Link from 'next/link';
import Image from 'next/image';
import {
    Calendar,
    Clock,
    Tag,
    ChevronRight,
    Search,
    Newspaper
} from 'lucide-react';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    coverImage: string;
    date: string;
    readTime: string;
    author: {
        name: string;
        avatar: string;
    };
    category: string;
}

interface Category {
    name: string;
    count: number;
}

interface BlogPageClientProps {
    featuredPost: BlogPost | null;
    remainingPosts: BlogPost[];
    categories: Category[];
    activeCategory?: string;
}

const FeaturedPost = ({ post }: { post: BlogPost }) => {
    return (
        <Link href={`/blog/post/${post.id}`} className="block">
            <div className="relative h-[500px] rounded-2xl overflow-hidden group">
                <div className="absolute inset-0">
                    <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="inline-block px-3 py-1 bg-purple-600/80 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-4">
                        {post.category}
                    </span>
                    <h2 className="text-3xl font-bold text-white mb-4">{post.title}</h2>
                    <p className="text-gray-200 mb-6 line-clamp-2">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                                <Image
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-white font-medium">{post.author.name}</p>
                                <div className="flex items-center text-gray-300 text-sm">
                                    <Calendar className="w-3.5 h-3.5 mr-1" />
                                    <span className="mr-3">{post.date}</span>
                                    <Clock className="w-3.5 h-3.5 mr-1" />
                                    <span>{post.readTime}</span>
                                </div>
                            </div>
                        </div>

                        <div className="px-4 py-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-lg flex items-center transition-colors">
                            Read More
                            <ChevronRight className="ml-1 w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const PostCard = ({ post }: { post: BlogPost }) => {
    return (
        <Link href={`/blog/post/${post.id}`} className="block h-full">
            <div className="bg-black/20 rounded-xl overflow-hidden border border-white/5 h-full flex flex-col group">
                <div className="relative aspect-video overflow-hidden">
                    <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                        <span className="inline-block px-3 py-1 bg-purple-600/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                            {post.category}
                        </span>
                    </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                        {post.title}
                    </h3>
                    <p className="text-gray-300 mb-4 line-clamp-3 flex-grow">
                        {post.excerpt}
                    </p>

                    <div className="mt-auto">
                        <div className="flex items-center justify-between text-sm border-t border-white/5 pt-4">
                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                    <Image
                                        src={post.author.avatar}
                                        alt={post.author.name}
                                        width={32}
                                        height={32}
                                        className="object-cover"
                                    />
                                </div>
                                <span className="text-gray-300 font-medium truncate">{post.author.name}</span>
                            </div>
                            <div className="flex items-center text-gray-400">
                                <Calendar className="w-3.5 h-3.5 mr-1" />
                                <span>{post.date}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default function BlogPageClient({ featuredPost, remainingPosts, categories, activeCategory }: BlogPageClientProps) {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        MimesisAI Blog
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Insights, tutorials, and updates from the world of AI-generated imagery.
                    </p>
                </div>

                {/* Featured Post */}
                {featuredPost ? (
                    <div className="mb-16">
                        <FeaturedPost post={featuredPost} />
                    </div>
                ) : (
                    <div className="text-center mb-16">
                        <p className="text-xl text-gray-400">No posts found for this category.</p>
                    </div>
                )}

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Main Content - Blog Posts */}
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                            <Newspaper className="mr-2 h-5 w-5 text-purple-400" />
                            Latest Articles
                        </h2>

                        <div className="grid sm:grid-cols-2 gap-6 mb-8">
                            {remainingPosts.map(post => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>

                        <div className="flex justify-center mt-8">
                            <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center transition-colors">
                                Load More Articles
                                <ChevronRight className="ml-1 w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="mt-8 md:mt-0">
                        {/* Search */}
                        <div className="bg-black/20 rounded-xl p-6 border border-white/5 mb-6">
                            <h3 className="text-lg font-medium text-white mb-4">Search</h3>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="bg-black/20 rounded-xl p-6 border border-white/5 mb-6">
                            <h3 className="text-lg font-medium text-white mb-4">Categories</h3>
                            <ul className="space-y-2">
                                {activeCategory && (
                                    <li>
                                        <Link
                                            href="/blog"
                                            className="flex items-center justify-between py-2 px-3 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 transition-colors group mb-2"
                                        >
                                            <div className="flex items-center">
                                                <Tag className="w-4 h-4 text-purple-400 mr-2" />
                                                <span className="text-white">All Categories</span>
                                            </div>
                                        </Link>
                                    </li>
                                )}
                                {categories.map(category => (
                                    <li key={category.name}>
                                        <Link
                                            href={`/blog?category=${encodeURIComponent(category.name.toLowerCase())}`}
                                            className={`flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/5 transition-colors group ${activeCategory === category.name.toLowerCase() ? 'bg-purple-600/20 hover:bg-purple-600/30' : ''
                                                }`}
                                        >
                                            <div className="flex items-center">
                                                <Tag className="w-4 h-4 text-purple-400 mr-2" />
                                                <span className={`${activeCategory === category.name.toLowerCase() ? 'text-white' : 'text-gray-300 group-hover:text-white'
                                                    } transition-colors`}>{category.name}</span>
                                            </div>
                                            <span className="bg-white/10 text-gray-400 text-xs rounded-full px-2 py-1">
                                                {category.count}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter Signup */}
                        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-6 border border-purple-500/10">
                            <h3 className="text-lg font-medium text-white mb-2">Subscribe to Our Newsletter</h3>
                            <p className="text-gray-300 text-sm mb-4">
                                Get the latest articles, tutorials, and updates delivered to your inbox.
                            </p>
                            <div className="space-y-3">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                                />
                                <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity">
                                    Subscribe
                                </button>
                            </div>
                            <p className="text-gray-400 text-xs mt-3">
                                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 
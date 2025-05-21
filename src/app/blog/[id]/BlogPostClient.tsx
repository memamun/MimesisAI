"use client";

import Link from 'next/link';
import Image from 'next/image';
import {
    Calendar,
    Clock,
    Tag,
    ChevronLeft,
    User,
    Share2,
    Bookmark,
    MessageCircle,
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

interface BlogPostClientProps {
    post: BlogPost;
    relatedPosts: BlogPost[];
}

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
                {/* Breadcrumb */}
                <div className="mb-8">
                    <Link
                        href="/blog"
                        className="flex items-center text-gray-400 hover:text-purple-400 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to All Articles
                    </Link>
                </div>

                {/* Post Header */}
                <div className="mb-8">
                    <span className="inline-block px-3 py-1 bg-purple-600/80 text-white text-sm font-medium rounded-full mb-4">
                        {post.category}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>

                    <div className="flex items-center justify-between flex-wrap gap-4">
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

                        <div className="flex items-center gap-2">
                            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                                <Share2 className="w-4 h-4 text-gray-300" />
                            </button>
                            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                                <Bookmark className="w-4 h-4 text-gray-300" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-10">
                    <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                    />
                </div>

                {/* Article Content */}
                <div className="prose prose-invert prose-purple max-w-none mb-12">
                    <p className="text-xl text-gray-300 mb-6">
                        {post.excerpt}
                    </p>

                    <h2>Introduction to AI Image Generation</h2>
                    <p>
                        The field of AI image generation has seen remarkable advancements in recent years. From the early days of GANs (Generative Adversarial Networks) to the cutting-edge diffusion models that power today's most impressive AI art tools, the technology has evolved at a breathtaking pace.
                    </p>

                    <p>
                        In this article, we'll explore the journey of AI image generation technology, looking at key milestones, technical breakthroughs, and the implications for artists, designers, and the broader creative industry.
                    </p>

                    <h2>The GAN Revolution</h2>
                    <p>
                        Generative Adversarial Networks, introduced by Ian Goodfellow and his colleagues in 2014, represented a paradigm shift in how machines could create images. The innovative architecture pitted two neural networks against each other: a generator that created images, and a discriminator that evaluated them.
                    </p>

                    <p>
                        This adversarial process led to increasingly realistic outputs as the generator learned to produce images that could fool the discriminator. Models like StyleGAN later refined this approach, giving users unprecedented control over generated content.
                    </p>

                    <h2>The Diffusion Model Era</h2>
                    <p>
                        While GANs were groundbreaking, they often struggled with training stability and mode collapse. Diffusion models, which emerged as the dominant paradigm around 2020, took a different approach. These models start with noise and gradually remove it to create an image.
                    </p>

                    <p>
                        The controlled denoising process proved to be more stable and produced higher quality results. Models like DALL-E, Stable Diffusion, and Midjourney have demonstrated remarkable capabilities, generating images from text descriptions with unprecedented quality and creativity.
                    </p>

                    <h2>What's Next for AI Image Generation</h2>
                    <p>
                        As we look to the future, several trends are likely to shape the evolution of AI image generation:
                    </p>

                    <ul>
                        <li>Improved control and editing capabilities</li>
                        <li>Higher resolution and more photorealistic outputs</li>
                        <li>Better integration with 3D modeling and animation</li>
                        <li>More accessible tools for non-technical users</li>
                        <li>Continued ethical discussions around ownership and bias</li>
                    </ul>

                    <p>
                        At MimesisAI, we're excited to be part of this journey, building tools that empower creators to harness the power of AI while maintaining their unique creative vision.
                    </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-10">
                    <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">
                        AI Image Generation
                    </span>
                    <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">
                        GANs
                    </span>
                    <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">
                        Diffusion Models
                    </span>
                    <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">
                        Machine Learning
                    </span>
                </div>

                {/* Author Bio */}
                <div className="bg-black/20 border border-white/10 rounded-xl p-6 mb-12">
                    <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden shrink-0">
                            <Image
                                src={post.author.avatar}
                                alt={post.author.name}
                                width={64}
                                height={64}
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="text-white font-semibold text-lg mb-2">About {post.author.name}</h3>
                            <p className="text-gray-300 mb-4">
                                {post.author.name} is a leading researcher in AI image generation with over 10 years of experience in machine learning and computer vision. They hold a PhD in Computer Science and have published numerous papers on generative models.
                            </p>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 bg-white/10 hover:bg-white/20 text-gray-300 rounded-lg text-sm transition-colors">
                                    View Profile
                                </button>
                                <button className="px-3 py-1 bg-purple-600/80 hover:bg-purple-600 text-white rounded-lg text-sm transition-colors">
                                    Follow
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                            <Newspaper className="mr-2 h-5 w-5 text-purple-400" />
                            Related Articles
                        </h2>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {relatedPosts.map(relatedPost => (
                                <Link key={relatedPost.id} href={`/blog/post/${relatedPost.id}`} className="group">
                                    <div className="bg-black/20 rounded-xl overflow-hidden border border-white/5 h-full flex flex-col">
                                        <div className="relative aspect-video overflow-hidden">
                                            <Image
                                                src={relatedPost.coverImage}
                                                alt={relatedPost.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                            <div className="absolute top-3 left-3">
                                                <span className="inline-block px-3 py-1 bg-purple-600/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                                                    {relatedPost.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-4">
                                            <h3 className="text-white font-medium mb-2 group-hover:text-purple-400 transition-colors">
                                                {relatedPost.title}
                                            </h3>
                                            <div className="flex items-center text-gray-400 text-xs">
                                                <Calendar className="w-3 h-3 mr-1" />
                                                <span>{relatedPost.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Comments Section */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold text-white flex items-center">
                            <MessageCircle className="mr-2 h-5 w-5 text-purple-400" />
                            Discussion (3)
                        </h2>
                        <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg transition-opacity hover:opacity-90">
                            Add Comment
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Comment 1 */}
                        <div className="bg-black/20 border border-white/10 rounded-xl p-5">
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                                    <Image
                                        src="/images/blog/author-2.jpg"
                                        alt="Comment Author"
                                        width={40}
                                        height={40}
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-white font-medium">Maria Rodriguez</h4>
                                        <span className="text-gray-400 text-sm">2 days ago</span>
                                    </div>
                                    <p className="text-gray-300 mt-2">
                                        Great overview of the evolution of generative AI! I'm particularly interested in how artists are using diffusion models in their creative processes. Would love to see a follow-up article on specific techniques.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 ml-13 pl-13">
                                <button className="text-gray-400 text-sm hover:text-purple-400 transition-colors">Reply</button>
                                <button className="text-gray-400 text-sm hover:text-purple-400 transition-colors">Like</button>
                            </div>
                        </div>

                        {/* Comment 2 */}
                        <div className="bg-black/20 border border-white/10 rounded-xl p-5">
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                                    <Image
                                        src="/images/blog/author-3.jpg"
                                        alt="Comment Author"
                                        width={40}
                                        height={40}
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-white font-medium">David Park</h4>
                                        <span className="text-gray-400 text-sm">3 days ago</span>
                                    </div>
                                    <p className="text-gray-300 mt-2">
                                        The ethical implications of these technologies deserve more attention. As these models become more accessible, we need to think about copyright, attribution, and the impact on human artists.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 ml-13 pl-13">
                                <button className="text-gray-400 text-sm hover:text-purple-400 transition-colors">Reply</button>
                                <button className="text-gray-400 text-sm hover:text-purple-400 transition-colors">Like</button>
                            </div>
                        </div>

                        {/* Comment 3 */}
                        <div className="bg-black/20 border border-white/10 rounded-xl p-5">
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                                    <Image
                                        src="/images/blog/author-5.jpg"
                                        alt="Comment Author"
                                        width={40}
                                        height={40}
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-white font-medium">James Wilson</h4>
                                        <span className="text-gray-400 text-sm">5 days ago</span>
                                    </div>
                                    <p className="text-gray-300 mt-2">
                                        From a business perspective, these tools are transformative. We're already seeing entire workflows change in design, advertising, and product development. The efficiency gains are massive.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 ml-13 pl-13">
                                <button className="text-gray-400 text-sm hover:text-purple-400 transition-colors">Reply</button>
                                <button className="text-gray-400 text-sm hover:text-purple-400 transition-colors">Like</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 
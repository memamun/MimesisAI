"use client";

import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation';
import BlogPostClient from '../../[id]/BlogPostClient';

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

// Blog post data - should be same as main blog page
const blogPosts: BlogPost[] = [
    {
        id: '1',
        title: 'The Evolution of AI Image Generation: From GANs to Diffusion Models',
        excerpt: 'Explore the revolutionary journey of AI image generation technology, from early GAN models to the cutting-edge diffusion models powering today\'s most impressive AI art.',
        coverImage: '/images/blog/blog-cover-1.jpg',
        date: 'May 15, 2024',
        readTime: '8 min read',
        author: {
            name: 'Dr. Alex Chen',
            avatar: '/images/blog/author-1.jpg'
        },
        category: 'Technology'
    },
    {
        id: '2',
        title: 'How Artists Are Using AI to Enhance Their Creative Workflows',
        excerpt: 'Professional artists share their experiences integrating AI tools into their creative processes, highlighting how technology is augmenting human creativity rather than replacing it.',
        coverImage: '/images/blog/blog-cover-2.jpg',
        date: 'May 8, 2024',
        readTime: '6 min read',
        author: {
            name: 'Maria Rodriguez',
            avatar: '/images/blog/author-2.jpg'
        },
        category: 'Art & Design'
    },
    {
        id: '3',
        title: 'The Ethics of AI-Generated Content: Navigating Ownership and Attribution',
        excerpt: 'As AI-generated content becomes more widespread, questions about ownership, copyright, and attribution are coming to the forefront. We explore the evolving ethical landscape.',
        coverImage: '/images/blog/blog-cover-3.jpg',
        date: 'April 30, 2024',
        readTime: '9 min read',
        author: {
            name: 'David Park',
            avatar: '/images/blog/author-3.jpg'
        },
        category: 'Ethics'
    },
    {
        id: '4',
        title: '5 Ways to Improve Your AI Prompts for Better Image Results',
        excerpt: 'Learn practical techniques to craft more effective prompts that guide AI image generators toward your vision, with examples and case studies of before-and-after results.',
        coverImage: '/images/blog/blog-cover-1.jpg',
        date: 'April 22, 2024',
        readTime: '5 min read',
        author: {
            name: 'Sophia Lee',
            avatar: '/images/blog/author-4.jpg'
        },
        category: 'Tutorials'
    },
    {
        id: '5',
        title: 'The Business Impact of AI Image Generation: Industry Transformations',
        excerpt: 'From advertising to product design, AI image generation is reshaping workflows and business models across industries. We examine the economic impact and future projections.',
        coverImage: '/images/blog/blog-cover-2.jpg',
        date: 'April 15, 2024',
        readTime: '7 min read',
        author: {
            name: 'James Wilson',
            avatar: '/images/blog/author-5.jpg'
        },
        category: 'Business'
    },
    {
        id: '6',
        title: 'Behind the Scenes at MimesisAI: How We Built Our Image Generator',
        excerpt: 'Our engineering team shares insights into the technical challenges and breakthroughs involved in creating MimesisAI\'s image generation technology.',
        coverImage: '/images/blog/blog-cover-3.jpg',
        date: 'April 5, 2024',
        readTime: '10 min read',
        author: {
            name: 'Dr. Alex Chen',
            avatar: '/images/blog/author-1.jpg'
        },
        category: 'Technology'
    }
];

// Helper function to get related posts
const getRelatedPosts = (currentPostId: string, category: string) => {
    return blogPosts
        .filter(post => post.id !== currentPostId && post.category === category)
        .slice(0, 2); // Get up to 2 related posts
};

export default function BlogPostPage() {
    const params = useParams();
    const postId = params.id as string;

    const post = blogPosts.find(post => post.id === postId);

    if (!post) {
        notFound();
    }

    const relatedPosts = getRelatedPosts(postId, post.category);

    return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
} 
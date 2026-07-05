import Link from 'next/link';
import { CalendarDays, ArrowRight, BookOpen } from 'lucide-react';

export const mockPosts = [
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js App Router',
    excerpt: 'Learn the fundamentals of the new App Router in Next.js 14 and how it changes the way we build React applications.',
    date: '2026-07-01',
    readTime: '5 min read',
    category: 'React',
  },
  {
    slug: 'mastering-tailwind-animations',
    title: 'Mastering Tailwind CSS Micro-animations',
    excerpt: 'Elevate your UI with subtle, premium micro-animations using only Tailwind CSS utility classes and group modifiers.',
    date: '2026-07-03',
    readTime: '8 min read',
    category: 'Design',
  },
  {
    slug: 'state-management-2026',
    title: 'State Management in 2026',
    excerpt: 'An overview of the modern state management landscape in React, from Zustand to the native Context API.',
    date: '2026-07-05',
    readTime: '6 min read',
    category: 'Architecture',
  },
];

export default function BlogApp() {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="mb-16 border-b border-slate-800 pb-12">
        <div className="inline-flex items-center justify-center p-3 bg-orange-500/10 rounded-2xl mb-6">
          <BookOpen className="w-8 h-8 text-orange-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
          The Developer Journal
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
          Insights, tutorials, and thoughts on modern web development. Built with Next.js dynamic routing.
        </p>
      </div>

      <div className="grid gap-10">
        {mockPosts.map((post) => (
          <article 
            key={post.slug} 
            className="group relative flex flex-col md:flex-row gap-8 bg-slate-900/40 border border-slate-800/60 rounded-3xl p-6 md:p-8 hover:bg-slate-800/40 transition-all duration-300"
          >
            {/* Category Badge - Desktop */}
            <div className="hidden md:flex flex-col items-center justify-center w-32 flex-shrink-0 border-r border-slate-800/60 pr-8">
              <span className="text-sm font-bold text-slate-500 tracking-wider uppercase mb-2">Category</span>
              <span className="text-orange-400 font-medium text-center">{post.category}</span>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                <span className="md:hidden text-orange-400 font-medium">{post.category}</span>
                <span className="md:hidden">•</span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              
              <Link href={`/examples/blog/${post.slug}`} className="block">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-200 mb-4 group-hover:text-orange-400 transition-colors">
                  {post.title}
                </h2>
              </Link>
              
              <p className="text-slate-400 text-lg leading-relaxed mb-6">
                {post.excerpt}
              </p>
              
              <Link 
                href={`/examples/blog/${post.slug}`} 
                className="inline-flex items-center font-medium text-orange-400 hover:text-orange-300 transition-colors"
              >
                Read article <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

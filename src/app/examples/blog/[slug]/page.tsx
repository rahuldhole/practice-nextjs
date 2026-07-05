import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CalendarDays } from 'lucide-react';
import { mockPosts } from '../page';

// Simulated database fetch
async function getPost(slug: string) {
  const post = mockPosts.find((p) => p.slug === slug);
  return post || null;
}

// In Next.js 15+, params is a Promise
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 mb-20">
      <Link 
        href="/examples/blog"
        className="inline-flex items-center text-slate-400 hover:text-orange-400 transition-colors mb-12 font-medium"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to all posts
      </Link>

      <article>
        <header className="mb-12">
          <div className="flex items-center gap-4 text-orange-400 font-medium mb-6">
            <span className="px-3 py-1 bg-orange-500/10 rounded-full text-sm border border-orange-500/20">
              {post.category}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 flex items-center gap-2 text-sm">
              <CalendarDays className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 text-sm">{post.readTime}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-100 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-slate-400 leading-relaxed border-l-4 border-slate-700 pl-6 py-2">
            {post.excerpt}
          </p>
        </header>

        <div className="prose prose-invert prose-lg prose-slate max-w-none prose-headings:text-slate-100 prose-a:text-orange-400 hover:prose-a:text-orange-300">
          <p>
            This is a mock article demonstrating dynamic routing in Next.js. In a real application, 
            this content would be fetched from a database or CMS based on the slug: <code>{resolvedParams.slug}</code>.
          </p>
          
          <h2>The Magic of Dynamic Routes</h2>
          <p>
            By simply creating a folder named <code>[slug]</code>, we tell Next.js to catch any URL pattern 
            that matches and pass that parameter down to our page component.
          </p>

          <pre className="bg-slate-900 border border-slate-800 rounded-xl p-6 overflow-x-auto shadow-2xl">
            <code className="text-sm text-slate-300">
{`export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) notFound();
  
  return <Article data={post} />;
}`}
            </code>
          </pre>

          <h2>Premium Design Considerations</h2>
          <p>
            Notice how the typography scales beautifully across device sizes. We're using Tailwind's typography 
            plugin (mocked here with raw classes) to establish a clear hierarchy, with high-contrast headings 
            and softer body text to reduce eye strain in dark mode.
          </p>
        </div>
      </article>
    </div>
  );
}

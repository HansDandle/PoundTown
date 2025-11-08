import type { Metadata } from 'next'
import Link from 'next/link'
import bloggerContent from '../../../blogger_content.json'

export const metadata: Metadata = {
  title: 'Blog - Pound Town, Texas | Dripping Springs News & Updates',
  description: 'Stay updated with news, stories, and updates from Pound Town, Texas. Learn about local events, new gifts, and Dripping Springs community happenings.',
}

export default function BlogPage() {
  return (
    <div className="py-16">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Blog & Updates
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            News, stories, and updates from Pound Town, Texas and the Dripping Springs community
          </p>
        </div>

        {/* Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bloggerContent.posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="card group">
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-3">
                  {new Date(post.published).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <span className="text-primary font-semibold group-hover:underline">
                  Read More →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

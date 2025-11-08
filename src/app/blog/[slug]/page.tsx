import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import bloggerContent from '../../../../blogger_content.json'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  return bloggerContent.posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = bloggerContent.posts.find((p) => p.slug === params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Pound Town, Texas`,
    description: `${post.title} - Read more about Pound Town, Texas gifts and updates from Dripping Springs, TX 78620`,
    openGraph: {
      title: post.title,
      description: `${post.title} from Pound Town, Texas`,
      type: 'article',
      publishedTime: post.published,
      modifiedTime: post.updated,
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = bloggerContent.posts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="py-16">
      <div className="container-custom max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-primary">Home</Link>
          {' / '}
          <Link href="/blog" className="hover:text-primary">Blog</Link>
          {' / '}
          <span className="text-gray-900">{post.title}</span>
        </nav>

        {/* Post Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-gray-600">
            <time dateTime={post.published}>
              {new Date(post.published).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span>•</span>
            <span>By Dr. Pound's Ghost</span>
          </div>
        </header>

        {/* Post Content */}
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Call to Action */}
        <div className="mt-12 p-8 bg-gradient-to-br from-primary to-blue-800 text-white rounded-xl text-center">
          <h3 className="text-2xl font-bold mb-4">Love what you see?</h3>
          <p className="text-lg mb-6 text-blue-100">
            Browse our unique gifts and exclusive merchandise from Dripping Springs, Texas!
          </p>
          <Link href="/shop" className="btn-secondary inline-block">
            Shop Gifts Now
          </Link>
        </div>

        {/* Back to Blog */}
        <div className="mt-8 text-center">
          <Link href="/blog" className="text-primary hover:underline font-semibold">
            ← Back to All Posts
          </Link>
        </div>
      </div>

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "datePublished": post.published,
            "dateModified": post.updated,
            "author": {
              "@type": "Person",
              "name": post.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "Pound Town, Texas",
              "logo": {
                "@type": "ImageObject",
                "url": "https://poundtowntx.com/logo.png"
              }
            },
            "description": post.title,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://poundtowntx.com/blog/${post.slug}`
            }
          })
        }}
      />
    </article>
  )
}

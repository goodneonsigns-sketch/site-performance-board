import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { posts } from './Blog'

// ─── Hero Image with gradient fallback ────────────────────────────────────────
function HeroImage({ post }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  if (!post.image || error) {
    return (
      <div className={`w-full h-full bg-gradient-to-br ${post.gradient || 'from-navy-600 to-navy-800'} flex items-center justify-center`}>
        <span className="text-7xl">{post.emoji || '📝'}</span>
      </div>
    )
  }

  return (
    <>
      {!loaded && (
        <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient || 'from-navy-600 to-navy-800'} flex items-center justify-center`}>
          <span className="text-7xl">{post.emoji || '📝'}</span>
        </div>
      )}
      <img
        src={post.image}
        alt={post.title}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </>
  )
}

// ─── Related Post Card ─────────────────────────────────────────────────────────
function RelatedCard({ post }) {
  const [imgError, setImgError] = useState(false)
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
    >
      <div className="aspect-video overflow-hidden relative">
        {post.image && !imgError ? (
          <img
            src={post.image}
            alt={post.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${post.gradient || 'from-navy-600 to-navy-800'} flex items-center justify-center`}>
            <span className="text-4xl">{post.emoji || '📝'}</span>
          </div>
        )}
      </div>
      <div className="h-0.5 bg-gradient-to-r from-gold-400 via-gold-500 to-transparent" />
      <div className="p-4">
        <span className="text-xs font-bold text-navy-600 uppercase tracking-wider">{post.category}</span>
        <h4 className="font-display font-bold text-gray-900 mt-1 mb-2 leading-snug group-hover:text-navy-700 transition-colors line-clamp-2">
          {post.title}
        </h4>
        <p className="text-gray-500 text-xs">{post.date} · {post.readTime}</p>
      </div>
    </Link>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find(p => p.slug === slug)

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Virtus Realty Group`
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) {
        metaDesc.setAttribute('content', post.excerpt)
      } else {
        const meta = document.createElement('meta')
        meta.name = 'description'
        meta.content = post.excerpt
        document.head.appendChild(meta)
      }
      // OG tags
      const ogTitle = document.querySelector('meta[property="og:title"]')
      if (ogTitle) {
        ogTitle.setAttribute('content', `${post.title} | Virtus Realty Group`)
      }
      const ogDesc = document.querySelector('meta[property="og:description"]')
      if (ogDesc) {
        ogDesc.setAttribute('content', post.excerpt)
      }
      const ogUrl = document.querySelector('meta[property="og:url"]')
      if (ogUrl) {
        ogUrl.setAttribute('content', `https://virtusrealtygroup.com/blog/${slug}`)
      }
    } else {
      document.title = 'Article Not Found | Virtus Realty Group'
      // Fallback OG tags
      const ogTitle = document.querySelector('meta[property="og:title"]')
      if (ogTitle) ogTitle.setAttribute('content', 'Blog Post | Virtus Realty Group')
      const ogDesc = document.querySelector('meta[property="og:description"]')
      if (ogDesc) ogDesc.setAttribute('content', 'Read real estate insights and investment tips from Virtus Realty Group.')
      const ogUrl = document.querySelector('meta[property="og:url"]')
      if (ogUrl) ogUrl.setAttribute('content', 'https://virtusrealtygroup.com/blog')
    }
    return () => {
      document.title = 'Virtus Realty Group'
    }
  }, [post, slug])

  // ── 404 state ───────────────────────────────────────────────────────────────
  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🏚️</div>
          <h1 className="font-display text-4xl font-bold text-navy-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">
            We couldn't find the article you're looking for. It may have been moved or the link might be incorrect.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-navy-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-navy-700 transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  // Related posts: same category, excluding current, max 3
  const related = posts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3)

  // Split content into paragraphs
  const paragraphs = (post.content || '').split('\n\n').filter(Boolean)

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <div className="relative w-full h-[50vh] min-h-[320px] max-h-[560px] overflow-hidden bg-navy-900">
        <HeroImage post={post} />
        {/* Overlay gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/30 to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute top-6 left-0 right-0 px-4 sm:px-8 lg:px-12">
          <nav className="flex items-center gap-2 text-sm text-white/80">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/50">›</span>
            <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span className="text-white/50">›</span>
            <span className="text-white/70 line-clamp-1 max-w-xs">{post.title}</span>
          </nav>
        </div>

        {/* Category badge over hero */}
        <div className="absolute bottom-8 left-0 right-0 px-4 sm:px-8 lg:px-12">
          <span className="inline-block bg-gold-500 text-navy-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
            {post.category}
          </span>
        </div>
      </div>

      {/* Gold accent line */}
      <div className="h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-300" />

      {/* ── Article Header ──────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-4">
        {/* Back link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-navy-600 hover:text-navy-800 text-sm font-medium mb-6 transition-colors group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
          Back to Blog
        </Link>

        {/* Title */}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 leading-tight mb-6">
          {post.title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-navy-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
              NG
            </div>
            <span className="font-medium text-gray-700">Nicolas Gonzalez</span>
          </div>
          <span className="text-gray-300">·</span>
          <span>{post.date}</span>
          <span className="text-gray-300">·</span>
          <span>{post.readTime}</span>
          <span className="ml-auto">
            <span className="bg-navy-50 text-navy-700 border border-navy-100 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
              {post.category}
            </span>
          </span>
        </div>
      </div>

      {/* ── Article Body ────────────────────────────────────────────────────── */}
      <article className="max-w-[720px] mx-auto px-4 sm:px-6 pb-12">
        {/* Excerpt / Lead */}
        <p className="text-xl text-gray-600 leading-relaxed mb-8 font-light border-l-4 border-gold-400 pl-5 italic">
          {post.excerpt}
        </p>

        {/* Body paragraphs */}
        <div className="space-y-6">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-lg text-gray-700 leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Tags</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="bg-navy-50 text-navy-700 border border-navy-100 text-sm px-3 py-1.5 rounded-full font-medium hover:bg-navy-100 transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* ── CTAs ────────────────────────────────────────────────────────────── */}
      <section className="bg-navy-900 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            Ready to Take the Next Step?
          </h2>
          <p className="text-navy-200 mb-8 text-lg">
            Whether you're buying, selling, or investing — our team is here to guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-gold-500 text-navy-900 px-8 py-3.5 rounded-full font-bold hover:bg-gold-400 transition-colors shadow-lg hover:shadow-xl text-sm"
            >
              Talk to an Agent
            </Link>
            <Link
              to="/listings"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-3.5 rounded-full font-semibold hover:bg-white/20 transition-colors text-sm"
            >
              Browse Listings
            </Link>
          </div>
        </div>
      </section>

      {/* ── Related Posts ────────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="font-display text-2xl font-bold text-navy-900">Related Articles</h2>
              <div className="flex-1 h-px bg-gray-200" />
              <Link to="/blog" className="text-sm text-navy-600 hover:text-navy-800 font-medium transition-colors whitespace-nowrap">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(rp => (
                <RelatedCard key={rp.id} post={rp} />
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  )
}

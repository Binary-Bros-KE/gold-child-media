import { useParams } from "react-router-dom";
import { getBlogBySlug, getRelatedBlogs } from "../../data/blogs"

export default function BlogDetailPage({  }) {
    const { blogName } = useParams();

  const blog = getBlogBySlug(blogName)

  if (!blog) {
    <h1>Blog you are looking for was not found!</h1>
  }

  const relatedBlogs = getRelatedBlogs(blog.id, 3)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-secondary text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <a href="/blog" className="text-teal-200 hover:text-white transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </a>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">{blog.category}</span>
            <span className="text-teal-200">{blog.date}</span>
            <span className="text-teal-200">•</span>
            <span className="text-teal-200">{blog.readTime}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{blog.title}</h1>

          <p className="text-xl text-teal-100 mb-8 leading-relaxed">{blog.excerpt}</p>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              {blog.authorImage ? (
                <img
                  src={blog.authorImage || "/placeholder.svg"}
                  alt={blog.author}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-white font-bold text-lg">{blog.author.charAt(0)}</span>
              )}
            </div>
            <div>
              <p className="font-semibold">{blog.author}</p>
              <p className="text-teal-200 text-sm">{blog.authorRole}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {blog.featuredImage && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <img
              src={blog.featuredImage || "/placeholder.svg"}
              alt={blog.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        </div>
      )}

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <div
            className="blog-content text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-orange-100 hover:text-orange-700 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author Bio */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              {blog.authorImage ? (
                <img
                  src={blog.authorImage || "/placeholder.svg"}
                  alt={blog.author}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-white font-bold text-xl">{blog.author.charAt(0)}</span>
              )}
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-1">{blog.author}</h4>
              <p className="text-orange-600 font-medium mb-2">{blog.authorRole}</p>
              <p className="text-gray-600">
                Expert instructor at Goldchild Media Institute with years of industry experience in{" "}
                {blog.category.toLowerCase()} and creative media production.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Articles</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog) => (
                <article
                  key={relatedBlog.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      {relatedBlog.image ? (
                        <img
                          src={relatedBlog.image || "/placeholder.svg"}
                          alt={relatedBlog.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400">Image placeholder</span>
                      )}
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        {relatedBlog.date}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <a href={`/blog/${relatedBlog.slug}`}>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary transition-colors cursor-pointer">
                        {relatedBlog.title}
                      </h3>
                    </a>

                    <p className="text-gray-600 mb-4 leading-relaxed">{relatedBlog.excerpt.substring(0, 120)}...</p>

                    <a
                      href={`/blog/${relatedBlog.slug}`}
                      className="text-primary hover:text-orange-600 font-medium flex items-center gap-2 transition-colors"
                    >
                      Read More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

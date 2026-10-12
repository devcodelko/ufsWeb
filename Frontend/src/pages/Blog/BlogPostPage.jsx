import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Seo from "../../components/Seo/Seo";
import { siteMeta } from "../../seo/siteMeta";
import { publicApi } from "../../services/publicApi";
import "./BlogPostPage.css";

function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [relatedSame, setRelatedSame] = useState([]);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    publicApi.getBlogBySlug(slug)
      .then((data) => setPost(data))
      .catch((err) => {
        if (err.status === 404 || err.message) setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (!post) return;
    let cancelled = false;
    const fetchRelated = async () => {
      try {
        const all = await publicApi.listBlogs(post.category_slug || null);
        const filtered = all.filter((p) => p.slug !== post.slug);
        if (!cancelled) {
          setRelatedSame(filtered.slice(0, 3));
          setRelatedOther([]);
        }
      } catch {
        // ignore
      }
    };
    fetchRelated();
    return () => { cancelled = true; };
  }, [post]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (loading) {
    return (
      <div className="blog-post-page">
        <div className="blog-post-page__loading">Loading...</div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="blog-post-page">
        <div className="blog-post-page__notfound">
          <h1>Blog not found</h1>
          <Link to="/blog">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : "";

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || "",
    image: post.cover_image_url || siteMeta.imageUrl,
    datePublished: post.published_at || "",
    author: { "@type": "Organization", name: siteMeta.name, url: siteMeta.url },
    publisher: { "@type": "Organization", name: siteMeta.name, logo: { "@type": "ImageObject", url: siteMeta.absoluteUrl("/favicon.png") } },
    mainEntityOfPage: { "@type": "WebPage", "@id": siteMeta.absoluteUrl(`/blog/${slug}`) },
  };

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt || post.title}
        canonicalPath={`/blog/${slug}`}
        imagePath={post.cover_image_url || siteMeta.imagePath}
        keywords={[post.category_name, post.tag, "UFS Digital blog", "financial inclusion"].filter(Boolean).join(", ")}
        type="article"
        schema={[siteMeta.organizationSchema(), blogSchema, siteMeta.breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${slug}` },
        ])]}
      />

      <article className="blog-post-page">
        {post.cover_image_url && (
          <div className="blog-post-page__hero" style={{ backgroundImage: `url(${post.cover_image_url})` }}>
            <div className="blog-post-page__hero-overlay" />
            <div className="blog-post-page__hero-content content-wrap">
              <span className="blog-post-page__tag">{post.category_name || post.tag}</span>
              <h1 className="blog-post-page__title">{post.title}</h1>
              <p className="blog-post-page__date">{publishedDate}</p>
            </div>
          </div>
        )}

        {!post.cover_image_url && (
          <div className="blog-post-page__header content-wrap">
            <span className="blog-post-page__tag">{post.category_name || post.tag}</span>
            <h1 className="blog-post-page__title blog-post-page__title--dark">{post.title}</h1>
            <p className="blog-post-page__date blog-post-page__date--dark">{publishedDate}</p>
          </div>
        )}

        <div className="blog-post-page__body content-wrap">
          <Link to="/blog" className="blog-post-page__back">
            <i className="fa-solid fa-arrow-left" aria-hidden="true" /> Back to Blog
          </Link>

          {post.excerpt && <p className="blog-post-page__lead">{post.excerpt}</p>}

          {post.content && (
            <div
              className="blog-post-page__content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}

          <div className="related-blogs">
            {relatedSame.length > 0 && (
              <>
                <h3 className="related-blogs__heading">Related posts</h3>
                <div className="related-grid">
                  {relatedSame.map((r) => (
                    <Link key={r.id} to={`/blog/${r.slug}`} className="related-card">
                      {r.cover_image_url ? <img src={r.cover_image_url} alt={r.title} className="related-card__img" /> : <div className="related-card__img" />}
                      <div className="related-card__meta">
                        <div className="related-card__title">{r.title}</div>
                        <div className="related-card__cat">{r.category_name || r.tag}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </article>
    </>
  );
}

export default BlogPostPage;

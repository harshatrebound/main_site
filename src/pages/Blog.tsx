import BlogHero from '../components/BlogHero/BlogHero';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogSection from '../components/BlogSection';
import NewsletterSection from '../components/NewsletterSection';

const Blog = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      <main>
        {/* Hero Section */}
        <BlogHero 
          title="Stories & Insights"
          subtitle="Discover the latest trends in team building, corporate events, and workplace culture"
        />

        {/* Main Navigation */}
        <Navbar />

        {/* Blog Posts Section */}
        <BlogSection />

        {/* Newsletter Section */}
        <NewsletterSection />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
};

export default Blog; 
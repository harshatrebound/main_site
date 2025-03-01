import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import BlogCard from '../BlogCard';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Interface for blog posts
interface BlogPost {
  id: number;
  name: string;
  slug: string;
  small_description: string;
  thumbnail_image: string;
  published_on: string;
  author: string;
}

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 6;

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Fetch blog posts from Supabase
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);

        // Calculate offset for pagination
        const offset = (currentPage - 1) * postsPerPage;

        // Build the URL with query parameters
        const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/blog_posts`;
        const countUrl = `${url}?select=count`;
        const postsUrl = `${url}?select=id,name,slug,small_description,thumbnail_image,published_on,author&order=published_on.desc&limit=${postsPerPage}&offset=${offset}`;

        // Fetch total count
        const countResponse = await fetch(countUrl, {
          headers: {
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
            'Content-Type': 'application/json',
            'Prefer': 'count=exact'
          }
        });
        
        // Get total count from headers
        const totalCount = parseInt(countResponse.headers.get('content-range')?.split('/')[1] || '0');
        setTotalPages(Math.ceil(totalCount / postsPerPage));

        // Fetch posts
        const postsResponse = await fetch(postsUrl, {
          headers: {
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
            'Content-Type': 'application/json'
          }
        });

        if (postsResponse.ok) {
          const data = await postsResponse.json();
          setBlogPosts(data);
        } else {
          console.error('Failed to fetch blog posts');
          // Use sample posts as fallback
          setBlogPosts(samplePosts);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        // Use sample posts as fallback
        setBlogPosts(samplePosts);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of the blog section
    document.getElementById('blog-section')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Sample blog posts for development or fallback
  const samplePosts: BlogPost[] = [
    {
      id: 1,
      name: "Hidden Gems of Europe",
      slug: "hidden-gems-of-europe",
      small_description: "Explore lesser-known European destinations that offer charm, culture, and unforgettable experiences.",
      thumbnail_image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2066&auto=format&fit=crop",
      published_on: "2023-06-24",
      author: "Sarah Johnson"
    },
    {
      id: 2,
      name: "12 Top Team Building PowerPoint Topics",
      slug: "12-top-team-building-powerpoint-topics",
      small_description: "Engage your team with these powerful presentation ideas designed to strengthen bonds and improve collaboration.",
      thumbnail_image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
      published_on: "2023-04-22",
      author: "Michael Chen"
    },
    {
      id: 3,
      name: "How to Plan a Successful Corporate Retreat in 2023",
      slug: "how-to-plan-a-successful-corporate-retreat-in-2023",
      small_description: "A comprehensive guide to organizing a memorable and effective corporate retreat that delivers real business value.",
      thumbnail_image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
      published_on: "2023-03-10",
      author: "Emily Rodriguez"
    },
    {
      id: 4,
      name: "Building Resilient Teams: Strategies That Actually Work",
      slug: "building-resilient-teams-strategies-that-actually-work",
      small_description: "Learn proven approaches to develop resilience in your teams, enabling them to thrive amidst challenges and changes.",
      thumbnail_image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
      published_on: "2023-02-18",
      author: "David Thompson"
    },
    {
      id: 5,
      name: "Remote Team Building: 15 Virtual Activities That Engage",
      slug: "remote-team-building-15-virtual-activities-that-engage",
      small_description: "Creative ways to strengthen remote team connections and maintain company culture in a distributed work environment.",
      thumbnail_image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
      published_on: "2023-01-25",
      author: "Lisa Wang"
    },
    {
      id: 6,
      name: "The Science Behind Effective Team Collaboration",
      slug: "the-science-behind-effective-team-collaboration",
      small_description: "Research-backed insights into what makes teams work together effectively and how to apply these principles.",
      thumbnail_image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
      published_on: "2022-12-12",
      author: "James Wilson"
    }
  ];

  // Create loading skeletons
  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <div key={index} className="animate-pulse">
        <div className="bg-gray-200 h-48 rounded-t-xl"></div>
        <div className="p-6 space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
          <div className="h-5 bg-gray-200 rounded w-1/4 mt-6"></div>
        </div>
      </div>
    ));
  };

  return (
    <section 
      id="blog-section"
      ref={ref} 
      className="pt-8 pb-20 px-4 lg:px-8 overflow-hidden bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-14"
        >
          <h2 className="text-base md:text-lg text-[#FF4C39] font-semibold mb-4">
            LATEST INSIGHTS
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 font-outfit">
            Latest from our{' '}
            <span className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">
              Blog
            </span>
          </h3>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends, insights, and success stories in team building and corporate events
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerChildren}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {loading ? (
            renderSkeletons()
          ) : (
            blogPosts.map((post) => (
              <BlogCard
                key={post.id}
                id={post.id}
                title={post.name}
                slug={post.slug}
                description={post.small_description}
                image={post.thumbnail_image}
                date={post.published_on}
                variants={fadeInUp}
              />
            ))
          )}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-14">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-primary/10 text-primary hover:bg-primary/20'
                } transition-colors duration-200`}
              >
                Previous
              </button>
              
              <div className="px-4 py-2 font-medium">
                {currentPage} / {totalPages}
              </div>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-primary/10 text-primary hover:bg-primary/20'
                } transition-colors duration-200`}
              >
                Next
              </button>
                  </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useBlogPosts } from '../../lib/hooks/useSupabaseData';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}'${date.getFullYear().toString().slice(2)}`;
};

const ViewMoreButton = () => (
  <div className="relative h-[45px] group w-[180px]">
    <div className="absolute inset-0 bg-gradient-to-b from-[#ff4c39] to-[#ffb573] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[8px]" />
    <button className="absolute inset-0 w-full h-full px-6 flex items-center justify-center border border-[#979797] rounded-[8px] group-hover:border-transparent transition-colors duration-300">
      <span className="text-base font-medium font-['DM Sans'] text-[#979797] group-hover:text-white transition-colors duration-300">
        View More
      </span>
    </button>
  </div>
);

const BlogSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { blogPosts, loading: postsLoading, error: postsError } = useBlogPosts();

  // Take first 3 blog posts
  const selectedPosts = blogPosts?.slice(0, 3)?.map(post => ({
    image: post.main_image || post.thumbnail_image,
    title: post.name,
    description: post.small_description,
    author: post.author,
    date: post.date_time,
    slug: post.slug,
  })) || [];

  if (postsError) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>Error loading blog posts: {postsError}</p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-[#f8fafc]" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 lg:gap-8 mb-12">
          <div className="flex-1 space-y-2">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block text-sm md:text-base font-medium font-['DM Sans'] text-[#636363]"
            >
              Team Building Insights
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl md:text-[40px] font-semibold font-['Inter'] leading-[1.1] bg-gradient-to-b from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent"
            >
              Explore Our Latest Blog Posts
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:max-w-[360px] text-left lg:text-right text-base font-normal font-['DM Sans'] text-[#757575] lg:pt-4"
          >
            Discover expert insights, success stories, and practical tips for building stronger teams and creating memorable experiences.
          </motion.p>
        </div>

        {/* Blog Posts Grid */}
        {postsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="bg-white rounded-[20px] overflow-hidden shadow-sm">
                <div className="w-full aspect-[1.5/1] bg-[#eeeeee] animate-pulse" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-[#eeeeee] rounded animate-pulse w-1/4" />
                  <div className="h-6 bg-[#eeeeee] rounded animate-pulse" />
                  <div className="h-4 bg-[#eeeeee] rounded animate-pulse w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {selectedPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-[20px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <a href={`/blog/${post.slug}`} className="block">
                  <div className="relative">
                    <div className="w-full aspect-[1.5/1] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="text-[#636363] text-sm font-medium font-['DM Sans']">
                      {formatDate(post.date)}
                    </div>
                    <h3 className="text-xl font-semibold font-['DM Sans'] text-[#1A1A1A] transition-all duration-300 line-clamp-2 group-hover:bg-gradient-to-r group-hover:from-[#ff4c39] group-hover:to-[#ff8573] group-hover:bg-clip-text group-hover:text-transparent">
                      {post.title}
                    </h3>
                    <p className="text-[#757575] text-base line-clamp-2">
                      {post.description}
                    </p>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        )}

        {/* View More Button */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a href="/blog">
              <ViewMoreButton />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

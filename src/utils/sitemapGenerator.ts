import { supabase } from '../lib/supabaseClient';

interface SitemapURL {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const BASE_URL = 'https://www.trebound.com';

// Static routes with their priorities and change frequencies
const staticRoutes: SitemapURL[] = [
  { loc: '/', priority: 1.0, changefreq: 'weekly' },
  { loc: '/team-outing-regions', priority: 0.9, changefreq: 'weekly' },
  { loc: '/corporate-team-outing-places', priority: 0.9, changefreq: 'weekly' },
  { loc: '/stays', priority: 0.8, changefreq: 'weekly' },
  { loc: '/team-outings', priority: 0.8, changefreq: 'weekly' },
  { loc: '/team-building-activity', priority: 0.8, changefreq: 'weekly' },
  { loc: '/jobs', priority: 0.7, changefreq: 'daily' },
  { loc: '/blog', priority: 0.8, changefreq: 'daily' },
  { loc: '/teambuilding', priority: 0.9, changefreq: 'weekly' },
  { loc: '/corporate-teambuilding', priority: 0.9, changefreq: 'weekly' },
  { loc: '/customized-training', priority: 0.8, changefreq: 'weekly' },
  { loc: '/contact', priority: 0.7, changefreq: 'monthly' },
];

// Function to escape special characters in XML
const escapeXml = (unsafe: string): string => {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
};

// Function to format date for sitemap
const formatDate = (date: Date): string => {
  return date.toISOString();
};

// Function to generate sitemap URL entry
const generateUrlEntry = ({ loc, lastmod, changefreq, priority }: SitemapURL): string => {
  let entry = `  <url>\n    <loc>${escapeXml(BASE_URL + loc)}</loc>\n`;
  if (lastmod) entry += `    <lastmod>${lastmod}</lastmod>\n`;
  if (changefreq) entry += `    <changefreq>${changefreq}</changefreq>\n`;
  if (priority) entry += `    <priority>${priority}</priority>\n`;
  entry += '  </url>';
  return entry;
};

// Function to fetch dynamic routes from database
const fetchDynamicRoutes = async (): Promise<SitemapURL[]> => {
  const dynamicRoutes: SitemapURL[] = [];

  // Fetch blog posts
  const { data: blogPosts } = await supabase
    .from('blog_posts')
    .select('slug, updated_at')
    .eq('status', 'published');

  blogPosts?.forEach(post => {
    dynamicRoutes.push({
      loc: `/blog/${post.slug}`,
      lastmod: formatDate(new Date(post.updated_at)),
      changefreq: 'monthly',
      priority: 0.7
    });
  });

  // Fetch stays
  const { data: stays } = await supabase
    .from('stays')
    .select('slug, updated_at');

  stays?.forEach(stay => {
    dynamicRoutes.push({
      loc: `/stays/${stay.slug}`,
      lastmod: stay.updated_at ? formatDate(new Date(stay.updated_at)) : undefined,
      changefreq: 'weekly',
      priority: 0.7
    });
  });

  // Fetch activities
  const { data: activities } = await supabase
    .from('activities')
    .select('slug, updated_at');

  activities?.forEach(activity => {
    dynamicRoutes.push({
      loc: `/team-building-activity/${activity.slug}`,
      lastmod: activity.updated_at ? formatDate(new Date(activity.updated_at)) : undefined,
      changefreq: 'weekly',
      priority: 0.7
    });
  });

  // Fetch destinations
  const { data: destinations } = await supabase
    .from('destinations')
    .select('slug, updated_at');

  destinations?.forEach(destination => {
    dynamicRoutes.push({
      loc: `/corporate-team-outing-places/${destination.slug}`,
      lastmod: destination.updated_at ? formatDate(new Date(destination.updated_at)) : undefined,
      changefreq: 'weekly',
      priority: 0.8
    });
  });

  return dynamicRoutes;
};

// Main function to generate sitemap
export const generateSitemap = async (): Promise<string> => {
  const dynamicRoutes = await fetchDynamicRoutes();
  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  const urlEntries = allRoutes.map(generateUrlEntry).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}; 
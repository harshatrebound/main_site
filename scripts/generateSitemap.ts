import fs from 'fs/promises';
import path from 'path';
import { generateSitemap } from '../src/utils/sitemapGenerator';

async function writeSitemap() {
  try {
    console.log('Generating sitemap...');
    const sitemap = await generateSitemap();
    
    // Write to public directory
    const publicDir = path.join(process.cwd(), 'public');
    await fs.mkdir(publicDir, { recursive: true });
    await fs.writeFile(path.join(publicDir, 'sitemap.xml'), sitemap);
    
    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

// Generate sitemap
writeSitemap(); 
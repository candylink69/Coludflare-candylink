const fs = require('fs');
const SITE_URL = 'https://candylink69.com';

console.log("🚀 Generating Sitemap for v= and category= structure...");

// 1. Read data.js (Video IDs)
const dataContent = fs.readFileSync('./data.js', 'utf-8');
const videoIdRegex = /id:\s*['"]([^'"]+)['"]/g;
const videoIds = [...dataContent.matchAll(videoIdRegex)].map(m => m[1]);

// 2. Read categories.json
const categoriesData = JSON.parse(fs.readFileSync('./categories.json', 'utf-8'));
const categoryIds = categoriesData.map(cat => cat.id);

// 3. XML Build (EXACT MATCH TO YOUR LINKS)
let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// Home Page
xml += `  <url><loc>${SITE_URL}/</loc><priority>1.0</priority></url>\n`;

// Category Pages (list?category=ID)
categoryIds.forEach(id => {
  xml += `  <url><loc>${SITE_URL}/list?category=${id}</loc><priority>0.8</priority></url>\n`;
});

// Video Pages (video?v=ID) -> matched with your 'v' parameter
videoIds.forEach(id => {
  xml += `  <url><loc>${SITE_URL}/video?v=${id}</loc><priority>0.9</priority></url>\n`;
});

xml += `</urlset>`;

// 4. Save
fs.writeFileSync('./sitemap.xml', xml);
console.log(`✅ Success! Links now match: video?v= and list?category=`);

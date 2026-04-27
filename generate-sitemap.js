const fs = require('fs');

const SITE_URL = 'https://candylink69.com';

console.log("🚀 Generating 100% Accurate Sitemap...");

// 1. Read data.js (Video IDs nikalne ke liye)
const dataContent = fs.readFileSync('./data.js', 'utf-8');
const videoIdRegex = /id:\s*['"]([^'"]+)['"]/g;
const videoIds = [...dataContent.matchAll(videoIdRegex)].map(m => m[1]);

// 2. Read categories.json
const categoriesData = JSON.parse(fs.readFileSync('./categories.json', 'utf-8'));
const categoryIds = categoriesData.map(cat => cat.id);

// 3. XML Build Karo
let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// Home Page
xml += `  <url><loc>${SITE_URL}/</loc><priority>1.0</priority></url>\n`;

// Category Pages (Bina .html, jaisa tere browser mein dikhta hai)
categoryIds.forEach(id => {
  xml += `  <url><loc>${SITE_URL}/list?category=${id}</loc><priority>0.8</priority></url>\n`;
});

// Video Pages (v ki jagah id= kyunki tera JS yahi samajhta hai)
videoIds.forEach(id => {
  xml += `  <url><loc>${SITE_URL}/video?id=${id}</loc><priority>0.9</priority></url>\n`;
});

xml += `</urlset>`;

// 4. Save
fs.writeFileSync('./sitemap.xml', xml);

console.log(`✅ SUCCESS: ${videoIds.length} videos and ${categoryIds.length} categories added!`);
                                                        

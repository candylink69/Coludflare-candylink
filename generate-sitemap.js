const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://candylink69.com'; // Tera domain

console.log("🚀 Scanning files for Sitemap...");

// 1. Read data.js (Videos ke liye)
const dataContent = fs.readFileSync('./data.js', 'utf-8');
const videoIdRegex = /id:\s*['"]([^'"]+)['"]/g;
const videoIds = [...dataContent.matchAll(videoIdRegex)].map(m => m[1]);

// 2. Read categories.json (Categories ke liye)
const categoriesData = JSON.parse(fs.readFileSync('./categories.json', 'utf-8'));
const categoryIds = categoriesData.map(cat => cat.id);

// 3. XML Build Karo
let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// Static Pages
xml += `  <url><loc>${SITE_URL}/</loc><priority>1.0</priority></url>\n`;
xml += `  <url><loc>${SITE_URL}/index.html</loc><priority>0.8</priority></url>\n`;

// Category Pages (Dynamic from categories.json)
categoryIds.forEach(id => {
    xml += `  <url><loc>${SITE_URL}/list.html?category=${id}</loc><priority>0.8</priority></url>\n`;
});

// Video Pages (Dynamic from data.js)
videoIds.forEach(id => {
    xml += `  <url><loc>${SITE_URL}/video.html?id=${id}</loc><priority>0.9</priority></url>\n`;
});

xml += `</urlset>`;

// 4. Save file
fs.writeFileSync('./sitemap.xml', xml);
console.log(`✅ Success! ${videoIds.length} videos and ${categoryIds.length} categories added.`);

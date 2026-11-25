
const fs = require('fs');
const { URL } = require('node:url');

const SITE_URL = 'https://candylink69.com';

console.log('🚀 Generating sitemap...');

function xmlEscape(value) {
  return String(value).replace(/[<>&'"]/g, char => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;'
  })[char]);
}

// 1. Read video IDs
const dataContent = fs.readFileSync('./data/data.js', 'utf-8');

const videoIdRegex = /id:\s*['"]([^'"]+)['"]/g;
const videoIds = [...dataContent.matchAll(videoIdRegex)]
  .map(match => match[1]);

// 2. Read categories
const categoriesData = JSON.parse(
  fs.readFileSync('./data/categories.json', 'utf-8')
);

const categoryIds = categoriesData.map(cat => cat.id);

// 3. Build URLs safely
function buildUrl(path, key, value) {
  const url = new URL(path, SITE_URL);
  url.searchParams.set(key, value);
  return xmlEscape(url.href);
}

// 4. Generate XML
let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

xml += `  <url>
    <loc>${xmlEscape(SITE_URL + '/')}</loc>
    <priority>1.0</priority>
  </url>\n`;

categoryIds.forEach(id => {
  xml += `  <url>
    <loc>${buildUrl('/list.html', 'category', id)}</loc>
    <priority>0.8</priority>
  </url>\n`;
});

videoIds.forEach(id => {
  xml += `  <url>
    <loc>${buildUrl('/video.html', 'v', id)}</loc>
    <priority>0.9</priority>
  </url>\n`;
});

xml += '</urlset>';

// 5. Save sitemap
fs.writeFileSync('./sitemap.xml', xml, 'utf-8');

console.log(`✅ Sitemap generated successfully!`);
console.log(`Videos: ${videoIds.length}`);
console.log(`Categories: ${categoryIds.length}`);

import { getAllStorefrontProducts } from '../lib/api';

function escapeXml(value: string): string {
  return value.replace(/[<>&'\"]/g, (character) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  })[character]!);
}

export async function GET(): Promise<Response> {
  const products = await getAllStorefrontProducts();
  const urls = products.map((product) => {
    const path = `/productos/${encodeURIComponent(product.slug ?? product.id)}`;
    return `  <url><loc>${escapeXml(`https://jocoso.cl${path}`)}</loc><changefreq>daily</changefreq><priority>0.8</priority></url>`;
  }).join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}

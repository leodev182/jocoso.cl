export function GET(): Response {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /login',
    'Disallow: /carrito',
    'Disallow: /checkout',
    'Disallow: /cuenta',
    'Sitemap: https://jocoso.cl/sitemap-index.xml',
    'Sitemap: https://jocoso.cl/sitemap-products.xml',
  ].join('\n');

  return new Response(`${body}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

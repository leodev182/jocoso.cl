const BASE = `${import.meta.env.PUBLIC_API_URL ?? 'https://backend.jocoso.cl'}/api/v1`;

export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  stock: number;
  images: string[];
  // Ficha técnica del producto (idéntica entre variantes); NO distingue variantes
  attributes: { name: string; value: string }[];
}

export interface ProductTag {
  id: string;
  name: string;
  slug: string;
  color: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string | null;
  description: string;
  brand: string | null;
  images: string[];
  featured: boolean;
  variants: ProductVariant[];
  tags: ProductTag[];
}

export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function get<T>(path: string, retries = 3): Promise<T | null> {
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await fetch(`${BASE}${path}`);

      // 429 (rate limit): reintenta con backoff respetando Retry-After si viene
      if (res.status === 429 && attempt < retries) {
        const retryAfter = Number(res.headers.get('retry-after'));
        await sleep(retryAfter > 0 ? retryAfter * 1000 : 300 * 2 ** attempt);
        continue;
      }

      if (!res.ok) {
        console.warn(`[api] ${res.status} ${res.statusText} en ${path}`);
        return null;
      }
      return res.json();
    } catch (err) {
      if (attempt < retries) {
        await sleep(300 * 2 ** attempt);
        continue;
      }
      console.warn(`[api] fetch falló en ${path}:`, err instanceof Error ? err.message : err);
      return null;
    }
  }
}

export async function getStorefrontProducts(params: {
  featured?: boolean;
  tag?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<Paginated<Product>> {
  const qs = new URLSearchParams();
  if (params.featured !== undefined) qs.set('featured', String(params.featured));
  if (params.tag)    qs.set('tag', params.tag);
  if (params.search) qs.set('search', params.search);
  if (params.page)   qs.set('page', String(params.page));
  if (params.limit)  qs.set('limit', String(params.limit));

  const result = await get<Paginated<Product>>(`/products/storefront?${qs}`);
  return result ?? { data: [], total: 0, page: 1, limit: 12, totalPages: 0 };
}

// Trae TODOS los productos paginando (el backend topa el limit en 100)
export async function getAllStorefrontProducts(params: {
  featured?: boolean;
  tag?: string;
  search?: string;
} = {}): Promise<Product[]> {
  const limit = 100;
  const all: Product[] = [];
  let page = 1;
  while (true) {
    const res = await getStorefrontProducts({ ...params, page, limit });
    all.push(...res.data);
    if (res.data.length === 0 || page >= res.totalPages) break;
    page++;
  }
  return all;
}

export async function getStorefrontTags(): Promise<ProductTag[]> {
  const result = await get<ProductTag[]>('/tags/storefront');
  return result ?? [];
}

export function minPrice(variants: ProductVariant[]): number {
  if (!variants.length) return 0;
  return Math.min(...variants.map((v) => v.price));
}

export function totalStock(variants: ProductVariant[]): number {
  return variants.reduce((acc, v) => acc + v.stock, 0);
}

export function isMainTag(tag: ProductTag): boolean {
  return !tag.name.startsWith('#');
}

export interface AuthResponse {
  user: { id: string; email: string; name: string | null; phone: string | null; role: string };
  accessToken: string;
  refreshToken: string;
}

export interface Address {
  id: string;
  alias: string;
  fullName: string;
  rut: string;
  email: string;
  phone: string;
  region: string;
  ciudad: string;
  comuna: string;
  calle: string;
  numero: string;
  depto: string | null;
  referencia: string | null;
  isDefault: boolean;
}

export type NewAddress = Omit<Address, 'id' | 'isDefault'>;

const authHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

async function parseError(res: Response, fallback: string): Promise<string> {
  const body = await res.json().catch(() => null);
  const msg = body?.message;
  return Array.isArray(msg) ? msg.join(', ') : (msg ?? fallback);
}

export async function getAddresses(token: string): Promise<Address[]> {
  const res = await fetch(`${BASE}/addresses`, { headers: authHeaders(token) });
  if (!res.ok) throw new Error(await parseError(res, 'No se pudieron cargar las direcciones'));
  return res.json();
}

export async function createAddress(token: string, data: NewAddress): Promise<Address> {
  const res = await fetch(`${BASE}/addresses`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await parseError(res, 'No se pudo crear la dirección'));
  return res.json();
}

export async function setDefaultAddress(token: string, id: string): Promise<void> {
  const res = await fetch(`${BASE}/addresses/${id}/default`, { method: 'PATCH', headers: authHeaders(token) });
  if (!res.ok) throw new Error(await parseError(res, 'No se pudo marcar como predeterminada'));
}

export async function deleteAddress(token: string, id: string): Promise<void> {
  const res = await fetch(`${BASE}/addresses/${id}`, { method: 'DELETE', headers: authHeaders(token) });
  if (!res.ok) throw new Error(await parseError(res, 'No se pudo eliminar la dirección'));
}

// Edita el perfil del usuario autenticado (PATCH /auth/me, 204). Requiere accessToken.
export async function updateProfile(
  token: string,
  data: { name?: string | null; phone?: string | null },
): Promise<void> {
  const res = await fetch(`${BASE}/auth/me`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const msg = await res.json().catch(() => null);
    throw new Error(msg?.message ?? 'No se pudo actualizar el perfil');
  }
}

// Login con Google: manda el ID token de GIS al backend, que lo verifica y devuelve la sesión
export async function loginWithGoogle(idToken: string): Promise<AuthResponse> {
  const res = await fetch(`${BASE}/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  });
  if (!res.ok) {
    const msg = await res.json().catch(() => null);
    throw new Error(msg?.message ?? 'No se pudo iniciar sesión con Google');
  }
  return res.json();
}

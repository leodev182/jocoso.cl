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

const JSON_HEADERS = { 'Content-Type': 'application/json' };

function getAccessToken(): string | null {
  return typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
}

async function parseError(res: Response, fallback: string): Promise<string> {
  const body = await res.json().catch(() => null);
  const msg = body?.message;
  return Array.isArray(msg) ? msg.join(', ') : (msg ?? fallback);
}

// Renueva el access token usando el refresh token guardado. Devuelve el nuevo token o null.
async function refreshSession(): Promise<string | null> {
  const refreshToken = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('refreshToken') : null;
  if (!refreshToken) return null;
  try {
    const res = await fetch(`${BASE}/auth/refresh`, {
      method: 'POST', headers: JSON_HEADERS, body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    sessionStorage.setItem('accessToken', data.accessToken);
    if (data.refreshToken) sessionStorage.setItem('refreshToken', data.refreshToken);
    return data.accessToken;
  } catch {
    return null;
  }
}

// fetch autenticado con refresh-on-401. Si no se puede renovar la sesión, limpia y manda a /login.
async function authedFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const run = (token: string | null) =>
    fetch(`${BASE}${path}`, {
      ...options,
      headers: { ...(options.headers ?? {}), ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    });

  let res = await run(getAccessToken());
  if (res.status === 401) {
    const fresh = await refreshSession();
    if (fresh) {
      res = await run(fresh);
    } else {
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      sessionStorage.removeItem('user');
      location.href = `/login?redirect=${encodeURIComponent(location.pathname + location.search)}`;
      throw new Error('Sesión expirada');
    }
  }
  return res;
}

export async function getAddresses(): Promise<Address[]> {
  const res = await authedFetch('/addresses');
  if (!res.ok) throw new Error(await parseError(res, 'No se pudieron cargar las direcciones'));
  return res.json();
}

export async function createAddress(data: NewAddress): Promise<Address> {
  const res = await authedFetch('/addresses', { method: 'POST', headers: JSON_HEADERS, body: JSON.stringify(data) });
  if (!res.ok) throw new Error(await parseError(res, 'No se pudo crear la dirección'));
  return res.json();
}

export async function setDefaultAddress(id: string): Promise<void> {
  const res = await authedFetch(`/addresses/${id}/default`, { method: 'PATCH' });
  if (!res.ok) throw new Error(await parseError(res, 'No se pudo marcar como predeterminada'));
}

export async function deleteAddress(id: string): Promise<void> {
  const res = await authedFetch(`/addresses/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(await parseError(res, 'No se pudo eliminar la dirección'));
}

export interface OrderItemInput { variantId: string; quantity: number; }

// Crea la orden (POST /orders). Devuelve la orden con su id.
export async function createOrder(data: { items: OrderItemInput[]; addressId?: string }): Promise<{ id: string }> {
  const res = await authedFetch('/orders', { method: 'POST', headers: JSON_HEADERS, body: JSON.stringify(data) });
  if (!res.ok) throw new Error(await parseError(res, 'No se pudo crear el pedido'));
  return res.json();
}

// Inicia el pago en MercadoPago (POST /payments/orders/:id). Devuelve la URL de checkout.
export async function initiatePayment(orderId: string): Promise<{ paymentId: string; checkoutUrl: string }> {
  const res = await authedFetch(`/payments/orders/${orderId}`, { method: 'POST' });
  if (!res.ok) throw new Error(await parseError(res, 'No se pudo iniciar el pago'));
  return res.json();
}

// Edita el perfil del usuario autenticado (PATCH /auth/me, 204).
export async function updateProfile(data: { name?: string | null; phone?: string | null }): Promise<void> {
  const res = await authedFetch('/auth/me', { method: 'PATCH', headers: JSON_HEADERS, body: JSON.stringify(data) });
  if (!res.ok) throw new Error(await parseError(res, 'No se pudo actualizar el perfil'));
}

// ── Pedidos ───────────────────────────────────────────────────────────────────

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface OrderItem {
  id: string;
  variantId: string;
  quantity: number;
  price: number;
  productName?: string;
  sku?: string;
}

export interface MyOrder {
  id: string;
  status: OrderStatus;
  totalAmount: number;
  trackingCode: string | null;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export async function getMyOrders(page = 1, limit = 10): Promise<Paginated<MyOrder>> {
  const res = await authedFetch(`/orders/my?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error(await parseError(res, 'No se pudieron cargar los pedidos'));
  return res.json();
}

// ── Wishlist ──────────────────────────────────────────────────────────────────

export interface WishlistProduct {
  id: string;
  title: string;
  slug: string | null;
  brand: string | null;
  images: string[];
  minPrice: number | null;
}

export interface WishlistEntry {
  item: { id: string; userId: string; productId: string };
  product: WishlistProduct;
}

export async function getWishlist(): Promise<WishlistEntry[]> {
  const res = await authedFetch('/wishlist');
  if (!res.ok) return [];
  return res.json();
}

export async function addToWishlist(productId: string): Promise<void> {
  await authedFetch(`/wishlist/${productId}`, { method: 'POST' });
}

export async function removeFromWishlist(productId: string): Promise<void> {
  await authedFetch(`/wishlist/${productId}`, { method: 'DELETE' });
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

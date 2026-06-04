import { atom } from 'nanostores';
import type { WishlistEntry } from '../lib/api';
import { getWishlist, addToWishlist as apiAdd, removeFromWishlist as apiRemove } from '../lib/api';

export const wishlistStore = atom<Set<string>>(new Set());

const SS_KEY = 'wishlist_ids';

function persist(ids: Set<string>) {
  if (typeof sessionStorage === 'undefined') return;
  sessionStorage.setItem(SS_KEY, JSON.stringify([...ids]));
}

export async function initWishlist(): Promise<void> {
  if (typeof sessionStorage === 'undefined') return;
  const token = sessionStorage.getItem('accessToken');
  if (!token) return;

  // Carga desde sessionStorage primero (sin fetch) para respuesta inmediata
  const cached = sessionStorage.getItem(SS_KEY);
  if (cached) {
    try { wishlistStore.set(new Set(JSON.parse(cached))); } catch { /* ignora */ }
    return;
  }

  // Sin caché → fetch único y persiste
  try {
    const items = await getWishlist();
    const ids = new Set(items.map((w: WishlistEntry) => w.product.id));
    wishlistStore.set(ids);
    persist(ids);
  } catch { /* wishlist no es crítica */ }
}

export async function toggleWishlist(productId: string): Promise<void> {
  const current = wishlistStore.get();
  const isIn = current.has(productId);
  const next = new Set(current);
  isIn ? next.delete(productId) : next.add(productId);
  wishlistStore.set(next);
  persist(next);
  try {
    isIn ? await apiRemove(productId) : await apiAdd(productId);
  } catch {
    wishlistStore.set(current);
    persist(current);
  }
}

export function clearWishlist() {
  wishlistStore.set(new Set());
  if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem(SS_KEY);
}

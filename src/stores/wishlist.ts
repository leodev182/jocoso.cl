import { atom } from 'nanostores';
import type { WishlistEntry } from '../lib/api';
import { getWishlist, addToWishlist as apiAdd, removeFromWishlist as apiRemove } from '../lib/api';

export const wishlistStore = atom<Set<string>>(new Set());

export async function initWishlist(): Promise<void> {
  const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
  if (!token) return;
  try {
    const items = await getWishlist();
    wishlistStore.set(new Set(items.map((w: WishlistEntry) => w.product.id)));
  } catch { /* wishlist no es crítica */ }
}

export async function toggleWishlist(productId: string): Promise<void> {
  const current = wishlistStore.get();
  const isIn = current.has(productId);
  const next = new Set(current);
  isIn ? next.delete(productId) : next.add(productId);
  wishlistStore.set(next);
  try {
    isIn ? await apiRemove(productId) : await apiAdd(productId);
  } catch {
    wishlistStore.set(current);
  }
}

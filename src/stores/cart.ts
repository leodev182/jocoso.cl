import { atom } from 'nanostores';

export interface CartItem {
  variantId: string;
  productId: string;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen: string;
  slug: string | null;
  sku: string;
}

export const cartStore = atom<CartItem[]>([]);

export function initCart() {
  const saved = sessionStorage.getItem('cart');
  cartStore.set(saved ? JSON.parse(saved) : []);
}

function persist(items: CartItem[]) {
  sessionStorage.setItem('cart', JSON.stringify(items));
  cartStore.set(items);
}

export function addToCart(item: CartItem) {
  const current = cartStore.get();
  const existing = current.find(i => i.variantId === item.variantId);
  if (existing) {
    persist(current.map(i => i.variantId === item.variantId ? { ...i, cantidad: i.cantidad + item.cantidad } : i));
  } else {
    persist([...current, item]);
  }
}

export function removeFromCart(variantId: string) {
  persist(cartStore.get().filter(i => i.variantId !== variantId));
}

export function updateQuantity(variantId: string, cantidad: number) {
  if (cantidad < 1) { removeFromCart(variantId); return; }
  persist(cartStore.get().map(i => i.variantId === variantId ? { ...i, cantidad } : i));
}

export function clearCart() {
  persist([]);
}

export function cartTotal(): number {
  return cartStore.get().reduce((sum, i) => sum + i.precio * i.cantidad, 0);
}

export function cartCount(): number {
  return cartStore.get().reduce((sum, i) => sum + i.cantidad, 0);
}

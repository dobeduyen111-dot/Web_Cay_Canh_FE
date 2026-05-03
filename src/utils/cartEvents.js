export const CART_UPDATED_EVENT = "cart-updated";
export const WISHLIST_UPDATED_EVENT = "wishlist-updated";

export const notifyCartUpdated = () => {
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
};

export const notifyWishlistUpdated = () => {
  window.dispatchEvent(new Event(WISHLIST_UPDATED_EVENT));
};

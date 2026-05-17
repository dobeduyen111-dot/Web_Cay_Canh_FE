export const WISHLIST_UPDATED_EVENT = "wishlist:updated";

export const notifyWishlistUpdated = () => {
  window.dispatchEvent(new Event(WISHLIST_UPDATED_EVENT));
};

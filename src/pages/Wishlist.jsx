import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import wishlistApi from "../api/wishlistApi";
import cartApi from "../api/cartApi";
import { notifyCartUpdated, notifyWishlistUpdated } from "../utils/cartEvents";

const resolveImage = (image) => {
  if (!image) return "https://placehold.co/160x160?text=Cay+Canh";
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return `/images/${image}`;
};

const formatPrice = (price) => Number(price || 0).toLocaleString("vi-VN");

const Wishlist = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workingId, setWorkingId] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchWishlist = async () => {
      if (!isAuthenticated) {
        if (isMounted) {
          setWishlistItems([]);
          setLoading(false);
        }
        return;
      }

      try {
        const response = await wishlistApi.getWishlist();
        const items = Array.isArray(response?.items) ? response.items : [];
        if (isMounted) {
          setWishlistItems(items);
        }
      } catch (error) {
        if (isMounted) {
          setWishlistItems([]);
        }
        console.error("Lỗi lấy danh sách yêu thích:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchWishlist();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);

  const handleRemove = async (productId) => {
    if (!window.confirm("Bạn muốn xóa sản phẩm này khỏi danh sách yêu thích?")) {
      return;
    }

    setWorkingId(productId);
    try {
      await wishlistApi.removeFromWishlist(productId);
      setWishlistItems((currentItems) => currentItems.filter((item) => item.productId !== productId));
      notifyWishlistUpdated();
      toast.success("Đã xóa khỏi danh sách yêu thích.");
    } catch (error) {
      toast.error(error.customMessage || "Không thể xóa sản phẩm yêu thích.");
      console.error(error);
    } finally {
      setWorkingId(null);
    }
  };

  const handleAddToCart = async (productId) => {
    setWorkingId(productId);
    try {
      await cartApi.addItemToCart(productId, 1);
      notifyCartUpdated();
      toast.success("Đã thêm sản phẩm vào giỏ hàng.");
    } catch (error) {
      toast.error(error.customMessage || "Lỗi khi thêm vào giỏ hàng.");
      console.error(error);
    } finally {
      setWorkingId(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <section className="section-frame py-10 sm:py-12">
        <div className="glass-card mx-auto max-w-3xl px-6 py-12 text-center sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Yeu thich</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">Đăng nhập để xem danh sách yêu thích</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Lưu lại cây cảnh và phụ kiện bạn quan tâm để quay lại mua nhanh hơn.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button type="button" onClick={() => navigate("/login")} className="primary-button">
              Đăng nhập
            </button>
            <Link to="/product/cay" className="secondary-button">
              Xem sản phẩm
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-frame py-10 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 rounded-[2rem] bg-[linear-gradient(135deg,_#052e16,_#14532d_55%,_#34d399)] px-6 py-8 text-white shadow-[0_24px_70px_rgba(5,46,22,0.25)] sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-100">Danh sach luu</p>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Sản phẩm yêu thích</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-emerald-50/90">
                Theo dõi những sản phẩm bạn muốn mua sau và thêm nhanh vào giỏ hàng khi sẵn sàng.
              </p>
            </div>
            <div className="inline-flex w-fit items-center rounded-full bg-white/12 px-4 py-2 text-sm font-medium text-white">
              {wishlistItems.length} sản phẩm
            </div>
          </div>
        </div>

        {loading ? (
          <div className="glass-card px-6 py-12 text-center text-slate-500 sm:px-10">
            Đang tải danh sách yêu thích...
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="glass-card px-6 py-12 text-center sm:px-10">
            <h2 className="text-2xl font-semibold text-slate-900">Chưa có sản phẩm nào được lưu</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Khi bạn thêm sản phẩm vào yêu thích, chúng sẽ xuất hiện ở đây để theo dõi dễ hơn.
            </p>
            <Link to="/product/cay" className="primary-button mt-8">
              Khám phá cây cảnh
            </Link>
          </div>
        ) : (
          <div className="grid gap-5">
            {wishlistItems.map((item) => {
              const isWorking = workingId === item.productId;

              return (
                <article
                  key={item.productId}
                  className="glass-card grid gap-5 overflow-hidden px-5 py-5 sm:px-6 lg:grid-cols-[140px_minmax(0,1fr)_auto] lg:items-center"
                >
                  <Link to={`/product/${item.productId}`} className="overflow-hidden rounded-[1.5rem] bg-emerald-50">
                    <img
                      src={resolveImage(item.image)}
                      alt={item.productName}
                      className="h-[140px] w-full object-cover transition duration-300 hover:scale-[1.03]"
                    />
                  </Link>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">Yêu thích</p>
                    <Link to={`/product/${item.productId}`} className="mt-2 block text-2xl font-semibold tracking-tight text-slate-900">
                      {item.productName}
                    </Link>
                    <p className="mt-3 text-lg font-semibold text-emerald-700">{formatPrice(item.price)} đ</p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                    <button
                      type="button"
                      onClick={() => handleAddToCart(item.productId)}
                      disabled={isWorking}
                      className="primary-button min-w-[180px]"
                    >
                      {isWorking ? "Đang xử lý..." : "Thêm vào giỏ hàng"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemove(item.productId)}
                      disabled={isWorking}
                      className="secondary-button min-w-[180px]"
                    >
                      Xóa khỏi yêu thích
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;

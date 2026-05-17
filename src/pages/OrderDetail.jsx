import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import orderApi from "../api/orderApi";
import OrderProgress, { getOrderStatusMeta } from "../components/OrderProgress";
import "./OrderDetail.css";

const formatCurrency = (value) =>
  Number(value || 0).toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const formatDateTime = (value) => {
  if (!value) return "--";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString("vi-VN");
};

const resolveProductImage = (image) => {
  if (!image) return "https://placehold.co/120x120?text=No+Image";
  if (typeof image === "string" && (image.startsWith("http://") || image.startsWith("https://"))) {
    return image;
  }
  return `/images/${image}`;
};

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchOrderDetail = async () => {
      try {
        const response = await orderApi.getOrderDetails(orderId);
        if (isMounted) {
          setOrder(response);
        }
      } catch (err) {
        console.error("Lỗi lấy chi tiết đơn hàng:", err);
        if (isMounted) {
          setError("Không thể tải chi tiết đơn hàng. Vui lòng thử lại.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchOrderDetail();

    return () => {
      isMounted = false;
    };
  }, [orderId]);

  if (loading) {
    return (
      <section className="order-detail-page">
        <div className="order-detail-shell order-detail-state">
          <div className="order-detail-spinner" aria-hidden="true"></div>
          <p>Đang tải chi tiết đơn hàng...</p>
        </div>
      </section>
    );
  }

  if (error || !order) {
    return (
      <section className="order-detail-page">
        <div className="order-detail-shell order-detail-state order-detail-state-error">
          <h1>Không xem được chi tiết đơn hàng</h1>
          <p>{error || "Đơn hàng không tồn tại hoặc bạn không có quyền truy cập."}</p>
          <Link to="/order/history" className="order-detail-backlink">
            Quay lại lịch sử đơn hàng
          </Link>
        </div>
      </section>
    );
  }

  const items = Array.isArray(order.items) ? order.items : [];
  const computedTotal = items.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );
  const status = getOrderStatusMeta(order.status);

  return (
    <section className="order-detail-page">
      <div className="order-detail-shell">
        <div className="order-detail-topbar">
          <Link to="/order/history" className="order-detail-backlink">
            <i className="fas fa-arrow-left" aria-hidden="true"></i>
            Quay lại lịch sử đơn hàng
          </Link>
        </div>

        <div className="order-detail-hero">
          <div className="order-detail-hero-copy">
            <span className="order-detail-kicker">Theo dõi đơn hàng</span>
            <h1>Đơn hàng #{order.orderId}</h1>
            <p>
              Đặt lúc {formatDateTime(order.orderDate)}. Bạn có thể xem trạng thái xử lý, sản phẩm
              và thông tin giao hàng tại đây.
            </p>
          </div>

          <div className={`order-detail-status-chip ${status.tone}`}>{status.label}</div>
        </div>

        <OrderProgress status={order.status} />

        <div className="order-detail-grid">
          <div className="order-detail-main">
            <div className="order-detail-card">
              <div className="order-detail-card-head">
                <h2>Sản phẩm trong đơn</h2>
                <span>{items.length} mặt hàng</span>
              </div>

              {items.length === 0 ? (
                <div className="order-detail-empty">
                  API chưa trả về danh sách sản phẩm cho đơn hàng này.
                </div>
              ) : (
                <div className="order-detail-items">
                  {items.map((item) => (
                    <div
                      key={item.orderItemId || `${item.productId}-${item.quantity}`}
                      className="order-detail-item"
                    >
                      <div className="order-detail-item-media">
                        <img
                          src={resolveProductImage(item.product?.image)}
                          alt={item.product?.productName || `Sản phẩm ${item.productId}`}
                        />
                      </div>

                      <div className="order-detail-item-info">
                        <h3>{item.product?.productName || `Sản phẩm #${item.productId}`}</h3>
                        <p>Đơn giá: {formatCurrency(item.price)}</p>
                        <span>Số lượng: {item.quantity || 0}</span>
                      </div>

                      <div className="order-detail-item-total">
                        {formatCurrency(Number(item.price || 0) * Number(item.quantity || 0))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {order.note ? (
              <div className="order-detail-card">
                <div className="order-detail-card-head">
                  <h2>Ghi chú đơn hàng</h2>
                </div>
                <div className="order-detail-note">{order.note}</div>
              </div>
            ) : null}
          </div>

          <aside className="order-detail-side">
            <div className="order-detail-card order-detail-summary">
              <div className="order-detail-card-head">
                <h2>Tổng quan</h2>
              </div>

              <div className="order-detail-summary-list">
                <div>
                  <span>Mã đơn</span>
                  <strong>#{order.orderId}</strong>
                </div>
                <div>
                  <span>Ngày đặt</span>
                  <strong>{formatDateTime(order.orderDate)}</strong>
                </div>
                <div>
                  <span>Người nhận</span>
                  <strong>{order.fullName || "--"}</strong>
                </div>
                <div>
                  <span>Trạng thái</span>
                  <strong>{status.label}</strong>
                </div>
                <div>
                  <span>Tổng thanh toán</span>
                  <strong>{formatCurrency(order.totalAmount || computedTotal)}</strong>
                </div>
              </div>
            </div>

            <div className="order-detail-card">
              <div className="order-detail-card-head">
                <h2>Địa chỉ giao hàng</h2>
              </div>
              <div className="order-detail-address">
                <i className="fas fa-location-dot" aria-hidden="true"></i>
                <p>{order.shippingAddress || "--"}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default OrderDetail;

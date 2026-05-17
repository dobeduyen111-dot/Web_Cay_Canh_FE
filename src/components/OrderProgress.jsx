import React from "react";

const ORDER_STEPS = [
  { key: "pending", title: "Chờ xử lý", hint: "Đơn hàng đã được tiếp nhận." },
  { key: "processing", title: "Đang xử lý", hint: "Cửa hàng đang chuẩn bị sản phẩm." },
  { key: "shipped", title: "Đang giao", hint: "Đơn hàng đang trên đường vận chuyển." },
  { key: "delivered", title: "Đã giao", hint: "Đơn hàng đã được giao thành công." },
];

const STATUS_META = {
  pending: { label: "Chờ xử lý", tone: "pending", stepIndex: 0 },
  processing: { label: "Đang xử lý", tone: "processing", stepIndex: 1 },
  shipped: { label: "Đang giao", tone: "shipped", stepIndex: 2 },
  delivered: { label: "Đã giao", tone: "delivered", stepIndex: 3 },
  cancelled: { label: "Đã hủy", tone: "cancelled", stepIndex: -1 },
};

export const normalizeOrderStatus = (status) => {
  const normalized = (status || "").toString().trim().toLowerCase();

  switch (normalized) {
    case "chờ xử lý":
    case "cho xu ly":
    case "pending":
      return "pending";
    case "đang xử lý":
    case "dang xu ly":
    case "processing":
    case "confirmed":
      return "processing";
    case "đang giao":
    case "dang giao":
    case "shipping":
    case "shipped":
      return "shipped";
    case "hoàn thành":
    case "hoan thanh":
    case "completed":
    case "delivered":
      return "delivered";
    case "đã hủy":
    case "da huy":
    case "cancel":
    case "cancelled":
    case "canceled":
      return "cancelled";
    default:
      return "pending";
  }
};

export const getOrderStatusMeta = (status) => {
  const normalizedStatus = normalizeOrderStatus(status);
  return STATUS_META[normalizedStatus] || STATUS_META.pending;
};

const TONE_STYLES = {
  pending: {
    badge: "bg-amber-100 text-amber-800 border-amber-200",
    fill: "from-amber-500 via-emerald-500 to-emerald-600",
    activeRing: "ring-amber-200",
    activeDot: "bg-amber-500 border-amber-500 text-white",
    doneDot: "bg-emerald-600 border-emerald-600 text-white",
  },
  processing: {
    badge: "bg-sky-100 text-sky-800 border-sky-200",
    fill: "from-sky-500 via-emerald-500 to-emerald-600",
    activeRing: "ring-sky-200",
    activeDot: "bg-sky-500 border-sky-500 text-white",
    doneDot: "bg-emerald-600 border-emerald-600 text-white",
  },
  shipped: {
    badge: "bg-indigo-100 text-indigo-800 border-indigo-200",
    fill: "from-indigo-500 via-emerald-500 to-emerald-600",
    activeRing: "ring-indigo-200",
    activeDot: "bg-indigo-500 border-indigo-500 text-white",
    doneDot: "bg-emerald-600 border-emerald-600 text-white",
  },
  delivered: {
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    fill: "from-emerald-500 to-emerald-700",
    activeRing: "ring-emerald-200",
    activeDot: "bg-emerald-600 border-emerald-600 text-white",
    doneDot: "bg-emerald-600 border-emerald-600 text-white",
  },
  cancelled: {
    badge: "bg-rose-100 text-rose-700 border-rose-200",
    fill: "from-rose-400 to-rose-500",
    activeRing: "ring-rose-200",
    activeDot: "bg-rose-500 border-rose-500 text-white",
    doneDot: "bg-rose-500 border-rose-500 text-white",
  },
};

const OrderProgress = ({ status, className = "" }) => {
  const meta = getOrderStatusMeta(status);
  const toneStyles = TONE_STYLES[meta.tone] || TONE_STYLES.pending;
  const isCancelled = meta.tone === "cancelled";
  const progressPercent = isCancelled ? 0 : (meta.stepIndex / (ORDER_STEPS.length - 1)) * 100;

  return (
    <div
      className={`order-progress-card overflow-hidden rounded-[24px] border border-emerald-100/80 bg-white/90 p-5 shadow-[0_18px_40px_rgba(20,83,45,0.08)] backdrop-blur md:p-6 ${className}`.trim()}
    >
      <div className="order-progress-head mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="m-0 text-[22px] font-semibold text-slate-900">Tiến độ xử lý đơn hàng</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Theo dõi trạng thái hiện tại của đơn hàng từ khi tiếp nhận đến lúc giao thành công.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className={`inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${toneStyles.badge}`}>
            {meta.label}
          </span>
          {isCancelled ? (
            <span className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700">
              Đơn hàng đã hủy, tiến độ dừng tại đây.
            </span>
          ) : null}
        </div>
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div className="absolute left-6 right-6 top-6 hidden h-1 rounded-full bg-slate-200 md:block" aria-hidden="true" />
        <div
          className={`absolute left-6 top-6 hidden h-1 rounded-full bg-gradient-to-r transition-all duration-500 md:block ${toneStyles.fill}`}
          style={{ width: `calc((100% - 3rem) * ${progressPercent / 100})` }}
          aria-hidden="true"
        />

        <div className="grid gap-4 md:grid-cols-4 md:gap-3">
          {ORDER_STEPS.map((step, index) => {
            const isCompleted = !isCancelled && index < meta.stepIndex;
            const isActive = !isCancelled && index === meta.stepIndex;
            const dotClassName = isCompleted
              ? toneStyles.doneDot
              : isActive
                ? `${toneStyles.activeDot} ring-4 ${toneStyles.activeRing}`
                : "bg-white border-slate-200 text-slate-400";

            return (
              <div
                key={step.key}
                className={`relative flex items-start gap-4 rounded-2xl border px-4 py-4 md:flex-col md:items-center md:border-transparent md:px-3 md:py-0 ${
                  isCompleted || isActive ? "border-emerald-100 bg-emerald-50/50 md:bg-transparent" : "border-slate-200 bg-slate-50/70 md:bg-transparent"
                }`}
              >
                <div
                  className={`relative z-[1] flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-all ${dotClassName}`}
                >
                  {isCompleted ? (
                    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
                      <path d="M5 10.5L8.5 14L15 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>

                <div className="min-w-0 md:text-center">
                  <p className="text-sm font-semibold text-slate-900">{step.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">{step.hint}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderProgress;
